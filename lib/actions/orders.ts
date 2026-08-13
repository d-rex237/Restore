"use server";

import { prisma } from "../prisma";

export async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: {
          select: { name: true, email: true },
        },
        restaurant: {
          select: { name: true },
        },
        driver: {
          select: { name: true, email: true },
        },
        address: {
          select: { address: true, city: true },
        },
        items: {
          include: {
            menuItem: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Reshape to match the flat MockOrder shape the frontend already expects,
    // so AdminOrders.tsx doesn't need to change.
    return orders.map((order) => ({
      id: order.id,
      customerId: order.customerId,
      customerName: order.customer.name,
      restaurantId: order.restaurantId,
      restaurantName: order.restaurant.name,
      driverId: order.driverId ?? undefined,
      driverName: order.driver?.name ?? undefined,
      status: order.status.toLowerCase() as
        | "pending"
        | "accepted"
        | "preparing"
        | "ready_for_pickup"
        | "out_for_delivery"
        | "delivered"
        | "rejected"
        | "cancelled",
      items: order.items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.menuItem.name,
        quantity: item.quantity,
        priceAtOrder: item.priceAtOrder,
      })),
      total: order.total,
      deliveryAddress: `${order.address.address}, ${order.address.city}`,
      createdAt: order.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
