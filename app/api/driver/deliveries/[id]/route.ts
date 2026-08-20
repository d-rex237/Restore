// app/api/driver/deliveries/[id]/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/client";
import { z } from "zod";

const statusSchema = z.enum([
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
]);

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { status, note } = body;

    if (!statusSchema.safeParse(status).success) {
      return new NextResponse("Invalid status", { status: 400 });
    }

    const orderId = params.id;

    // Get driver profile
    const driverProfile = await prisma.driverProfile.findUnique({
      where: { userId },
    });

    if (!driverProfile) {
      return new NextResponse("Driver profile not found", { status: 404 });
    }

    // Check if order belongs to driver
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        driverId: driverProfile.id,
      },
    });

    if (!order) {
      return new NextResponse("Order not found or not assigned to you", { status: 404 });
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: status === "PICKED_UP" ? "OUT_FOR_DELIVERY" : status,
        updatedAt: new Date(),
        actualDeliveryTime: status === "DELIVERED" ? new Date() : undefined,
      },
    });

    // Log status change
    await prisma.orderStatusLog.create({
      data: {
        orderId,
        status: status === "PICKED_UP" ? "OUT_FOR_DELIVERY" : status,
        note: note || Driver updated status to ${status},
      },
    });

    // If delivered, update earnings
    if (status === "DELIVERED") {
      await prisma.driverProfile.update({
        where: { userId },
        data: {
          earnings: { increment: order.deliveryFee || 3.99 },
        },
      });
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
    });
  } catch (error) {
    console.error("[UPDATE_DELIVERY_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}