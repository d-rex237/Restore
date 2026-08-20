// lib/actions/orders.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { requireOwnRestaurant } from "./restaurants";
import type {
  MappedOrder,
  OrderFilters,
  OrderStatusValue,
  PaginatedOrders,
} from "../types"; // adjust path to match your generated client output
import { Prisma } from "@/src/generated/prisma/client";

// ---------------- Shared include + mapper ----------------
// Every role query uses the same include shape and mapping function,
// so the frontend always receives the same flat MappedOrder shape
// no matter who's asking.

const ORDER_INCLUDE = {
  customer: { select: { name: true, email: true } },
  restaurant: { select: { id: true, name: true } },
  driver: { select: { id: true, name: true, email: true } },
  address: { select: { address: true, city: true } },
  items: {
    include: {
      menuItem: { select: { name: true } },
    },
  },
} satisfies Prisma.OrderInclude;

type OrderWithRelations = Prisma.OrderGetPayload<{
  include: typeof ORDER_INCLUDE;
}>;

function mapOrder(order: OrderWithRelations): MappedOrder {
  return {
    id: order.id,
    customerId: order.customerId,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    restaurantId: order.restaurantId,
    restaurantName: order.restaurant.name,
    driverId: order.driverId ?? undefined,
    driverName: order.driver?.name ?? undefined,
    status: order.status.toLowerCase(),
    items: order.items.map((item) => ({
      menuItemId: item.menuItemId,
      name: item.menuItem.name,
      quantity: item.quantity,
      priceAtOrder: item.priceAtOrder,
    })),
    total: order.total,
    deliveryAddress: `${order.address.address}, ${order.address.city}`,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
}

// Builds the shared `where` clause pieces every fetcher can extend —
// status, search, and date range are identical across all four roles,
// only the "scope" (which orders you're even allowed to see) differs.
function buildBaseWhere(filters: OrderFilters): Prisma.OrderWhereInput {
  const where: Prisma.OrderWhereInput = {};

  if (filters.status) {
    where.status = filters.status;
  }

  if (filters.search) {
    where.OR = [
      { id: { contains: filters.search, mode: "insensitive" } },
      { customer: { name: { contains: filters.search, mode: "insensitive" } } },
      {
        restaurant: { name: { contains: filters.search, mode: "insensitive" } },
      },
    ];
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {
      ...(filters.dateFrom ? { gte: new Date(filters.dateFrom) } : {}),
      ...(filters.dateTo ? { lte: new Date(filters.dateTo) } : {}),
    };
  }

  return where;
}

function buildPagination(filters: OrderFilters) {
  const page = filters.page && filters.page > 0 ? filters.page : 1;
  const limit = filters.limit && filters.limit > 0 ? filters.limit : 10;
  const skip = (page - 1) * limit;
  const orderBy = {
    [filters.sortBy ?? "createdAt"]: filters.sortOrder ?? "desc",
  };
  return { page, limit, skip, orderBy };
}

// ---------------- Role helper ----------------

async function requireDbUser() {
  const user = await currentUser();
  if (!user) throw new Error("Not signed in");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  if (!dbUser) throw new Error("User not found in database");

  return dbUser;
}

// ============================================================
// ADMIN — sees every order on the platform, no scoping
// ============================================================

export async function getAdminOrders(
  filters: OrderFilters = {},
): Promise<PaginatedOrders> {
  try {
    const dbUser = await requireDbUser();
    if (dbUser.role !== "ADMIN") throw new Error("Not authorized");

    const where = buildBaseWhere(filters);
    const { page, limit, skip, orderBy } = buildPagination(filters);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: ORDER_INCLUDE,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map(mapOrder),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// ============================================================
// PROVIDER — only orders belonging to their own restaurant
// ============================================================

export async function getProviderOrders(
  filters: OrderFilters = {},
): Promise<PaginatedOrders> {
  try {
    const restaurant = await requireOwnRestaurant();

    const where: Prisma.OrderWhereInput = {
      ...buildBaseWhere(filters),
      restaurantId: restaurant.id,
    };
    const { page, limit, skip, orderBy } = buildPagination(filters);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: ORDER_INCLUDE,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map(mapOrder),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  } catch (error) {
    console.error("Error fetching provider orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// ============================================================
// DRIVER — two views: their own assigned deliveries, and the
// pool of unclaimed deliveries they could pick up
// ============================================================

export async function getDriverOrders(
  filters: OrderFilters = {},
): Promise<PaginatedOrders> {
  try {
    const dbUser = await requireDbUser();
    if (dbUser.role !== "DRIVER") throw new Error("Not authorized");

    const where: Prisma.OrderWhereInput = {
      ...buildBaseWhere(filters),
      driverId: dbUser.id,
    };
    const { page, limit, skip, orderBy } = buildPagination(filters);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: ORDER_INCLUDE,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map(mapOrder),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  } catch (error) {
    console.error("Error fetching driver orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Unclaimed orders ready for pickup — ignores the `status` filter param
// on purpose, since this view only ever makes sense for one status.
export async function getAvailableDeliveries(
  filters: Omit<OrderFilters, "status"> = {},
): Promise<PaginatedOrders> {
  try {
    const dbUser = await requireDbUser();
    if (dbUser.role !== "DRIVER") throw new Error("Not authorized");

    const where: Prisma.OrderWhereInput = {
      ...buildBaseWhere(filters),
      status: "READY_FOR_PICKUP",
      driverId: null,
    };
    const { page, limit, skip, orderBy } = buildPagination(filters);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: ORDER_INCLUDE,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map(mapOrder),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  } catch (error) {
    console.error("Error fetching available deliveries:", error);
    throw new Error("Failed to fetch available deliveries");
  }
}

// ============================================================
// CUSTOMER — only their own orders
// ============================================================

export async function getCustomerOrders(
  filters: OrderFilters = {},
): Promise<PaginatedOrders> {
  try {
    const dbUser = await requireDbUser();

    const where: Prisma.OrderWhereInput = {
      ...buildBaseWhere(filters),
      customerId: dbUser.id,
    };
    const { page, limit, skip, orderBy } = buildPagination(filters);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: ORDER_INCLUDE,
        orderBy,
        skip,
        take: limit,
      }),
      prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map(mapOrder),
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// ============================================================
// Shared mutation — status update (admin approve/reject,
// provider stage updates, driver pickup/delivery)
// ============================================================

// ============================================================
// Shared mutation — status update (admin approve/reject,
// provider stage updates, driver pickup/delivery)
// ============================================================

const VALID_STATUSES: OrderStatusValue[] = [
  "PENDING",
  "ACCEPTED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "REJECTED",
  "CANCELLED",
];

// Which statuses each role is allowed to *set* an order to.
// Admin can set anything; provider handles the kitchen side of the
// lifecycle; driver only confirms pickup/delivery on orders assigned
// to them (READY_FOR_PICKUP -> OUT_FOR_DELIVERY normally happens via
// claimDelivery, but it's allowed here too in case a driver needs to
// re-set it, e.g. after an app retry).
const ROLE_ALLOWED_STATUSES: Record<string, OrderStatusValue[]> = {
  ADMIN: VALID_STATUSES,
  PROVIDER: [
    "ACCEPTED",
    "PREPARING",
    "READY_FOR_PICKUP",
    "REJECTED",
    "CANCELLED",
  ],
  DRIVER: ["OUT_FOR_DELIVERY", "DELIVERED"],
};

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatusValue,
) {
  try {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error("Invalid order status");
    }

    const dbUser = await requireDbUser();

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    const allowed = ROLE_ALLOWED_STATUSES[dbUser.role];
    if (!allowed || !allowed.includes(status)) {
      throw new Error(`Not authorized to set status to ${status}`);
    }

    if (dbUser.role === "PROVIDER") {
      const restaurant = await requireOwnRestaurant();
      if (order.restaurantId !== restaurant.id) {
        throw new Error("Not authorized to update this order");
      }
    } else if (dbUser.role === "DRIVER") {
      if (order.driverId !== dbUser.id) {
        throw new Error("Not authorized to update this order");
      }
    }
    // ADMIN: no additional scoping needed.

    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to update order status");
  }
}

// Driver claims an unassigned, ready-for-pickup order.
export async function claimDelivery(orderId: string) {
  try {
    const dbUser = await requireDbUser();
    if (dbUser.role !== "DRIVER") throw new Error("Not authorized");

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");
    if (order.driverId)
      throw new Error("Order already claimed by another driver");
    if (order.status !== "READY_FOR_PICKUP") {
      throw new Error("Order is not ready for pickup yet");
    }

    return await prisma.order.update({
      where: { id: orderId },
      data: { driverId: dbUser.id, status: "OUT_FOR_DELIVERY" },
    });
  } catch (error) {
    console.error("Error claiming delivery:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to claim delivery");
  }
}

// ============================================================
// CHECKOUT — creates a real Order from the client-side cart
// ============================================================

export type CheckoutItem = {
  menuItemId: string;
  quantity: number;
};

export type CheckoutInput = {
  items: CheckoutItem[];
  deliveryAddress: string; // free text for now, e.g. "Hospital Roundabout, Bamenda"
};

export async function createOrder(input: CheckoutInput) {
  try {
    const dbUser = await requireDbUser();

    if (!input.items || input.items.length === 0) {
      throw new Error("Your cart is empty");
    }
    if (!input.deliveryAddress?.trim()) {
      throw new Error("Delivery address is required");
    }

    // Look up real menu items from the DB — never trust client-sent
    // prices or restaurant IDs, since those could be tampered with.
    const menuItemIds = input.items.map((i) => i.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds } },
    });

    if (menuItems.length !== menuItemIds.length) {
      throw new Error("One or more items in your cart are no longer available");
    }

    const unavailable = menuItems.find((m) => !m.available);
    if (unavailable) {
      throw new Error(`"${unavailable.name}" is currently unavailable`);
    }

    // Enforce single-restaurant orders, matching the schema
    // (Order.restaurantId is singular, not per-item).
    const restaurantIds = new Set(menuItems.map((m) => m.restaurantId));
    if (restaurantIds.size > 1) {
      throw new Error(
        "Your cart has items from multiple restaurants. Please check out one restaurant at a time.",
      );
    }
    const restaurantId = menuItems[0].restaurantId;

    const total = input.items.reduce((sum, item) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId)!;
      return sum + menuItem.price * item.quantity;
    }, 0);

    // No saved-address flow yet — create a lightweight Address row
    // per order from the free-text input, since Order.addressId is required.
    const address = await prisma.address.create({
      data: {
        userId: dbUser.id,
        label: "Delivery",
        address: input.deliveryAddress.trim(),
        city: "",
      },
    });

    const order = await prisma.order.create({
      data: {
        customerId: dbUser.id,
        restaurantId,
        addressId: address.id,
        total,
        status: "PENDING",
        items: {
          create: input.items.map((item) => {
            const menuItem = menuItems.find((m) => m.id === item.menuItemId)!;
            return {
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              priceAtOrder: menuItem.price,
            };
          }),
        },
      },
      include: ORDER_INCLUDE,
    });

    return mapOrder(order);
  } catch (error) {
    console.error("Error creating order:", error);
    throw error instanceof Error ? error : new Error("Failed to place order");
  }
}

// Single order lookup, scoped to the signed-in customer who placed it.
export async function getOrderById(orderId: string) {
  try {
    const dbUser = await requireDbUser();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: ORDER_INCLUDE,
    });

    if (!order || order.customerId !== dbUser.id) {
      throw new Error("Order not found");
    }

    return mapOrder(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch order");
  }
}

// Deletes an order outright (not just status change). OrderItems cascade-delete
// automatically per the schema. Scoped so a provider can only delete orders
// belonging to their own restaurant — prevents deleting someone else's order
// by guessing an id.
export async function deleteOrder(orderId: string) {
  try {
    const dbUser = await requireDbUser();

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    if (dbUser.role === "PROVIDER") {
      const restaurant = await requireOwnRestaurant();
      if (order.restaurantId !== restaurant.id) {
        throw new Error("Not authorized to delete this order");
      }
    } else if (dbUser.role !== "ADMIN") {
      throw new Error("Not authorized to delete this order");
    }

    await prisma.order.delete({ where: { id: orderId } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error instanceof Error ? error : new Error("Failed to delete order");
  }
}
