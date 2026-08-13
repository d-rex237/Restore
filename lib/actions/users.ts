"use server";

import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

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

    // New user defaults to CUSTOMER in the DB (schema default) —
    // mirror that into Clerk's publicMetadata so sessionClaims.metadata.role
    // and user.publicMetadata.role are populated immediately.
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
