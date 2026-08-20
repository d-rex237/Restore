"use server";

import { prisma } from "../prisma";
import { requireOwnRestaurant } from "./restaurants";

export async function getProviderDashboardStats() {
  try {
    const restaurant = await requireOwnRestaurant();

    const now = new Date();
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    const [
      revenueThisMonth,
      revenueLastMonth,
      totalOrders,
      ordersThisWeek,
      ordersLastWeek,
      menuItemCount,
      menuItemsThisMonth,
    ] = await Promise.all([
      prisma.order.aggregate({
        where: {
          restaurantId: restaurant.id,
          status: "DELIVERED",
          createdAt: { gte: startOfThisMonth },
        },
        _sum: { total: true },
      }),
      prisma.order.aggregate({
        where: {
          restaurantId: restaurant.id,
          status: "DELIVERED",
          createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
        },
        _sum: { total: true },
      }),
      prisma.order.count({ where: { restaurantId: restaurant.id } }),
      prisma.order.count({
        where: {
          restaurantId: restaurant.id,
          createdAt: { gte: startOfThisWeek },
        },
      }),
      prisma.order.count({
        where: {
          restaurantId: restaurant.id,
          createdAt: { gte: startOfLastWeek, lt: startOfThisWeek },
        },
      }),
      prisma.menuItem.count({ where: { restaurantId: restaurant.id } }),
      prisma.menuItem.count({
        where: {
          restaurantId: restaurant.id,
          createdAt: { gte: startOfThisMonth },
        },
      }),
    ]);

    const revThis = revenueThisMonth._sum.total ?? 0;
    const revLast = revenueLastMonth._sum.total ?? 0;
    const revenueChangePct =
      revLast === 0 ? null : ((revThis - revLast) / revLast) * 100;

    const orderChangePct =
      ordersLastWeek === 0
        ? null
        : ((ordersThisWeek - ordersLastWeek) / ordersLastWeek) * 100;

    return {
      totalRevenueThisMonth: revThis,
      revenueChangePct,
      totalOrders,
      ordersThisWeek,
      orderChangePct,
      menuItemCount,
      menuItemsAddedThisMonth: menuItemsThisMonth,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to fetch dashboard stats");
  }
}
