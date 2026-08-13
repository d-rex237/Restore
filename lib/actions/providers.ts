"use server";

import { prisma } from "../prisma";

export async function getProviders() {
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        _count: { select: { menuItems: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return restaurants.map((restaurant) => ({
      ...restaurant,
      productCount: restaurant._count.menuItems,
    }));
  } catch (error) {
    console.error("Error fetching providers:", error);
    throw new Error("Failed to fetch providers");
  }
}
