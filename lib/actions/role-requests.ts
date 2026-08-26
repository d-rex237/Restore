// lib/actions/role-requests.ts
"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

async function requireDbUser() {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser) throw new Error("User not found in database");

  return dbUser;
}

export type RoleRequestInput = {
  requestedRole: "DRIVER" | "PROVIDER";
  extraData: Record<string, string>;
};

export async function createRoleRequest(input: RoleRequestInput) {
  try {
    const dbUser = await requireDbUser();

    if (dbUser.role === input.requestedRole) {
      throw new Error(`You're already a ${input.requestedRole.toLowerCase()}`);
    }

    const existingPending = await prisma.roleRequest.findFirst({
      where: {
        userId: dbUser.id,
        requestedRole: input.requestedRole,
        status: "PENDING",
      },
    });
    if (existingPending) {
      throw new Error("You already have a pending application for this role");
    }

    return await prisma.roleRequest.create({
      data: {
        userId: dbUser.id,
        requestedRole: input.requestedRole,
        extraData: input.extraData,
      },
    });
  } catch (error) {
    console.error("Error creating role request:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to submit application");
  }
}

// Used to gate the form: if the signed-in user already has a pending
// (or approved) request for a role, show that status instead of the form.
export async function getMyRoleRequests() {
  try {
    const dbUser = await requireDbUser();

    return await prisma.roleRequest.findMany({
      where: { userId: dbUser.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching role requests:", error);
    throw new Error("Failed to fetch role requests");
  }
}

// ============================================================
// ADMIN — reviewing and acting on requests
// ============================================================

async function requireAdmin() {
  const dbUser = await requireDbUser();
  if (dbUser.role !== "ADMIN") throw new Error("Not authorized");
  return dbUser;
}

export async function getAllRoleRequests() {
  try {
    await requireAdmin();

    return await prisma.roleRequest.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching role requests:", error);
    throw new Error("Failed to fetch role requests");
  }
}

// Approving does more than flip a status — it actually promotes the user:
// updates User.role, creates the matching profile (DriverProfile or
// Restaurant + ProviderProfile) from the submitted extraData, and syncs
// Clerk's publicMetadata.role so session-based redirects pick it up.
export async function approveRoleRequest(requestId: string) {
  try {
    await requireAdmin();

    const request = await prisma.roleRequest.findUnique({
      where: { id: requestId },
      include: { user: true },
    });
    if (!request) throw new Error("Request not found");
    if (request.status !== "PENDING") {
      throw new Error("This request has already been reviewed");
    }

    const extraData = request.extraData as Record<string, string>;

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: request.userId },
        data: { role: request.requestedRole },
      });

      if (request.requestedRole === "DRIVER") {
        await tx.driverProfile.upsert({
          where: { userId: request.userId },
          create: {
            userId: request.userId,
            vehicleType: extraData.vehicleType ?? "",
            plateNumber: extraData.plateNumber ?? "",
            licenseNumber: extraData.licenseNumber ?? null,
          },
          update: {
            vehicleType: extraData.vehicleType ?? "",
            plateNumber: extraData.plateNumber ?? "",
            licenseNumber: extraData.licenseNumber ?? null,
          },
        });
      }

      if (request.requestedRole === "PROVIDER") {
        const existingRestaurant = await tx.restaurant.findUnique({
          where: { ownerId: request.userId },
        });
        if (!existingRestaurant) {
          await tx.restaurant.create({
            data: {
              ownerId: request.userId,
              name: extraData.restaurantName ?? "Unnamed Restaurant",
              description: extraData.description ?? null,
              address: extraData.address ?? "",
              phone: extraData.phone ?? null,
            },
          });
        }

        await tx.providerProfile.upsert({
          where: { userId: request.userId },
          create: {
            userId: request.userId,
            businessName: extraData.restaurantName ?? "Unnamed Restaurant",
            businessPhone: extraData.phone ?? null,
          },
          update: {
            businessName: extraData.restaurantName ?? "Unnamed Restaurant",
            businessPhone: extraData.phone ?? null,
          },
        });
      }

      await tx.roleRequest.update({
        where: { id: requestId },
        data: { status: "APPROVED" },
      });
    });

    // Sync Clerk metadata outside the DB transaction — separate system.
    const client = await clerkClient();
    await client.users.updateUserMetadata(request.user.clerkId, {
      publicMetadata: { role: request.requestedRole },
    });

    return { success: true };
  } catch (error) {
    console.error("Error approving role request:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to approve request");
  }
}

export async function rejectRoleRequest(requestId: string) {
  try {
    await requireAdmin();

    const request = await prisma.roleRequest.findUnique({
      where: { id: requestId },
    });
    if (!request) throw new Error("Request not found");
    if (request.status !== "PENDING") {
      throw new Error("This request has already been reviewed");
    }

    await prisma.roleRequest.update({
      where: { id: requestId },
      data: { status: "REJECTED" },
    });

    return { success: true };
  } catch (error) {
    console.error("Error rejecting role request:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to reject request");
  }
}
