// lib/actions/orders.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import { requireOwnRestaurant } from "./restaurants"; // adjust path to match your generated client output
import {
  MappedOrder,
  OrderFilters,
  OrderStatusValue,
  PaginatedOrders,
} from "../types";
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

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatusValue,
) {
  try {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error("Invalid order status");
    }

    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Failed to update order status");
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
