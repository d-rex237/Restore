"use server";

import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

// ============================================================
// SYNC — Clerk → DB on sign-in
// ============================================================

export async function syncUser() {
  try {
    const user = await currentUser();
    if (!user) return null;

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (existingUser) {
      // Backfill: if this user was created before role syncing existed,
      // or their Clerk metadata somehow drifted from the DB, fix it here.
      if (user.publicMetadata?.role !== existingUser.role) {
        const client = await clerkClient();
        await client.users.updateUserMetadata(user.id, {
          publicMetadata: { role: existingUser.role },
        });
      }
      return existingUser;
    }

    const dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        avatarUrl: user.imageUrl,
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { role: dbUser.role },
    });

    return dbUser;
  } catch (error) {
    console.error("Error syncing user:", error);
    return null;
  }
}

// ============================================================
// ADMIN — user management
// ============================================================

async function requireAdmin() {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser) throw new Error("User not found in database");
  if (dbUser.role !== "ADMIN") throw new Error("Not authorized");

  return dbUser;
}

export async function getAllUsers() {
  try {
    await requireAdmin();

    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUserById(userId: string) {
  try {
    await requireAdmin();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        customerProfile: true,
        providerProfile: true,
        driverProfile: true,
        restaurants: true,
      },
    });
    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch user");
  }
}
