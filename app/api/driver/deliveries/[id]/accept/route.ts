// app/api/driver/deliveries/[id]/accept/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const orderId = params.id;

    // Get driver profile
    const driverProfile = await prisma.driverProfile.findUnique({
      where: { userId },
      include: { user: true },
    });

    if (!driverProfile) {
      return new NextResponse("Driver profile not found", { status: 404 });
    }

    if (!driverProfile.isAvailable) {
      return new NextResponse("Driver is not available", { status: 400 });
    }

    // Check if order exists and is available
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return new NextResponse("Order not found", { status: 404 });
    }

    if (order.driverId) {
      return new NextResponse("Order already assigned", { status: 400 });
    }

    if (!["READY_FOR_PICKUP", "PENDING"].includes(order.status)) {
      return new NextResponse("Order not available for pickup", {
        status: 400,
      });
    }

    // Update order with driver
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        driverId: driverProfile.id,
        status: "OUT_FOR_DELIVERY",
        updatedAt: new Date(),
      },
      include: {
        restaurant: {
          select: {
            name: true,
            address: true,
            phone: true,
          },
        },
        customer: {
          select: {
            name: true,
            address: true,
            phone: true,
          },
        },
      },
    });

    // Update driver stats (increment total deliveries)
    await prisma.driverProfile.update({
      where: { userId },
      data: {
        totalDeliveries: { increment: 1 },
      },
    });

    // Log status change
    await prisma.orderStatusLog.create({
      data: {
        orderId,
        status: "OUT_FOR_DELIVERY",
        note: "Driver accepted delivery",
      },
    });

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("[ACCEPT_DELIVERY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
