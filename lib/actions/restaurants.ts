"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export type RestaurantInput = {
  name: string;
  description?: string;
  address: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  coverImageUrl?: string;
};

// Non-throwing lookup — returns null if the signed-in provider hasn't
// created a restaurant yet, so callers can decide how to handle that
// (show a setup prompt, redirect, etc.) instead of getting a hard error.
export async function getOwnRestaurant() {
  const user = await currentUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });
  if (!dbUser) return null;

  return prisma.restaurant.findUnique({
    where: { ownerId: dbUser.id },
  });
}

// Throwing variant for actions that require a restaurant to exist
// (menu CRUD, order management) — used internally by other action files.
export async function requireOwnRestaurant() {
  const restaurant = await getOwnRestaurant();
  if (!restaurant) {
    throw new Error("NO_RESTAURANT");
  }
  return restaurant;
}

export async function createRestaurant(data: RestaurantInput) {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Not signed in");

    const dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (!dbUser) throw new Error("User not found in database");

    const existing = await prisma.restaurant.findUnique({
      where: { ownerId: dbUser.id },
    });
    if (existing)
      throw new Error("Restaurant already exists for this provider");

    return await prisma.restaurant.create({
      data: {
        ...data,
        ownerId: dbUser.id,
      },
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to create restaurant");
  }
}
