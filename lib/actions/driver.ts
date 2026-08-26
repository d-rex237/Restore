// lib/actions/driver.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

async function requireDriver() {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { driverProfile: true },
  });
  if (!dbUser) throw new Error("User not found in database");
  if (dbUser.role !== "DRIVER") throw new Error("Not authorized");
  if (!dbUser.driverProfile) throw new Error("Driver profile not found");

  return dbUser;
}

export async function getDriverStatus() {
  try {
    const dbUser = await requireDriver();
    return { isOnline: dbUser.driverProfile!.isOnline };
  } catch (error) {
    console.error("Error fetching driver status:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch driver status");
  }
}

export async function toggleDriverOnline() {
  try {
    const dbUser = await requireDriver();

    const updated = await prisma.driverProfile.update({
      where: { userId: dbUser.id },
      data: { isOnline: !dbUser.driverProfile!.isOnline },
    });

    return { isOnline: updated.isOnline };
  } catch (error) {
    console.error("Error toggling driver status:", error);
    throw error instanceof Error ? error : new Error("Failed to update status");
  }
}

export async function getDriverStats() {
  try {
    const dbUser = await requireDriver();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [totalDeliveries, activeDeliveries, completedToday, earningsAgg] =
      await Promise.all([
        prisma.order.count({
          where: { driverId: dbUser.id, status: "DELIVERED" },
        }),
        prisma.order.count({
          where: { driverId: dbUser.id, status: "OUT_FOR_DELIVERY" },
        }),
        prisma.order.count({
          where: {
            driverId: dbUser.id,
            status: "DELIVERED",
            updatedAt: { gte: startOfToday },
          },
        }),
        prisma.order.aggregate({
          where: { driverId: dbUser.id, status: "DELIVERED" },
          _sum: { total: true },
        }),
      ]);

    return {
      totalDeliveries,
      activeDeliveries,
      completedToday,
      // NOTE: no commission/payout field exists in the schema yet — this
      // sums full order totals as a stand-in. Swap for a real calculation
      // once a driver payout/commission model is added.
      earnings: earningsAgg._sum.total ?? 0,
    };
  } catch (error) {
    console.error("Error fetching driver stats:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch driver stats");
  }
}
