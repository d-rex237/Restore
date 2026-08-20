import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const querySchema = z.object({
  lat: z.string().optional(),
  lng: z.string().optional(),
  radius: z.string().optional().default("10"),
  status: z.enum(["all", "pending", "ready"]).optional().default("all"),
});

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = querySchema.parse({
      lat: searchParams.get("lat"),
      lng: searchParams.get("lng"),
      radius: searchParams.get("radius"),
      status: searchParams.get("status"),
    });

    // Check if user is a driver
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { driverProfile: true },
    });

    if (!user?.driverProfile) {
      return new NextResponse("Not a driver", { status: 403 });
    }

    // Build where clause
    const where: any = {
      status: {
        in: ["READY_FOR_PICKUP", "PENDING"],
      },
      driverId: null,
    };

    // Filter by status
    if (query.status === "pending") {
      where.status = "PENDING";
    } else if (query.status === "ready") {
      where.status = "READY_FOR_PICKUP";
    }

    // Get available deliveries
    const deliveries = await prisma.order.findMany({
      where,
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            address: true,
            phone: true,
          },
        },
        items: {
          include: {
            menuItem: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    // Transform data
    const formattedDeliveries = deliveries.map((delivery) => ({
      id: delivery.id,
      restaurant: delivery.restaurant,
      customer: delivery.customer,
      items: delivery.items.map((item) => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: delivery.total,
      deliveryFee: delivery.deliveryFee || 3.99,
      distance: Math.random() * 5 + 1, // Mock distance in miles
      estimatedTime: Math.floor(Math.random() * 30) + 15,
      status: delivery.status.toLowerCase(),
      createdAt: delivery.createdAt,
    }));

    return NextResponse.json(formattedDeliveries);
  } catch (error) {
    console.error("[AVAILABLE_DELIVERIES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
