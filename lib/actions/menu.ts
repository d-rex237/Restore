"use server";

import { prisma } from "../prisma";
import { requireOwnRestaurant } from "./restaurants";

// ---------------- Types ----------------

export type MenuItemInput = {
  name: string;
  description: string;
  price: number;
  category?: string;
  ingredients?: string[];
  isPopular?: boolean;
  preparationTime?: number;
  image?: string;
  available?: boolean;
};

// ---------------- Read ----------------

// Returns [] instead of throwing when the provider has no restaurant yet —
// the menu page can then show a "set up your restaurant" prompt instead
// of a 500 error page.
export async function getMenuItems() {
  try {
    const restaurant = await requireOwnRestaurant();

    return await prisma.menuItem.findMany({
      where: { restaurantId: restaurant.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "NO_RESTAURANT") {
      return [];
    }
    console.error("Error fetching menu items:", error);
    throw new Error("Failed to fetch menu items");
  }
}

// Get all available menu items from all restaurants
export async function getAllAvailableMenuItems() {
  try {
    return await prisma.menuItem.findMany({
      where: {
        available: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching all available menu items:", error);
    throw new Error("Failed to fetch available menu items");
  }
}

export async function getMenuByRestaurantId(restaurantId: string) {
  try {
    return await prisma.menuItem.findMany({
      where: { restaurantId, available: true },
      orderBy: { category: "asc" },
    });
  } catch (error) {
    console.error("Error fetching restaurant menu:", error);
    throw new Error("Failed to fetch restaurant menu");
  }
}

export async function getMenuItemById(id: string) {
  try {
    const menuItem = await prisma.menuItem.findUnique({ where: { id } });
    if (!menuItem) throw new Error("Menu item not found");
    return menuItem;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw new Error("Failed to fetch menu item");
  }
}

// ---------------- Create ----------------

export async function createMenuItem(data: MenuItemInput) {
  try {
    const restaurant = await requireOwnRestaurant();

    return await prisma.menuItem.create({
      data: {
        ...data,
        restaurantId: restaurant.id,
      },
    });
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw new Error("Failed to create menu item");
  }
}

// ---------------- Update ----------------

export async function updateMenuItem(id: string, data: Partial<MenuItemInput>) {
  try {
    const restaurant = await requireOwnRestaurant();

    const existing = await prisma.menuItem.findUnique({ where: { id } });
    if (!existing || existing.restaurantId !== restaurant.id) {
      throw new Error("Menu item not found or not owned by this provider");
    }

    return await prisma.menuItem.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw new Error("Failed to update menu item");
  }
}

export async function toggleMenuItemAvailability(id: string) {
  try {
    const restaurant = await requireOwnRestaurant();

    const existing = await prisma.menuItem.findUnique({ where: { id } });
    if (!existing || existing.restaurantId !== restaurant.id) {
      throw new Error("Menu item not found or not owned by this provider");
    }

    return await prisma.menuItem.update({
      where: { id },
      data: { available: !existing.available },
    });
  } catch (error) {
    console.error("Error toggling menu item availability:", error);
    throw new Error("Failed to toggle menu item availability");
  }
}

// ---------------- Delete ----------------

export async function deleteMenuItem(id: string) {
  try {
    const restaurant = await requireOwnRestaurant();

    const existing = await prisma.menuItem.findUnique({ where: { id } });
    if (!existing || existing.restaurantId !== restaurant.id) {
      throw new Error("Menu item not found or not owned by this provider");
    }

    await prisma.menuItem.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw new Error("Failed to delete menu item");
  }
}