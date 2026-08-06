import authOption from "@/lib/auth";
import connectDb from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        const session = await getServerSession(authOption);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Access denied. Admin privileges required." }, { status: 400 });
        }

        const { deliveryStatus, id } = await request.json();
        if (!deliveryStatus || !id) {
            return NextResponse.json({ message: "Please fill in all the details" }, { status: 400 });
        }

        await connectDb();
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 400 });
        }

        if (order.paymentMethod === "online") {
            order.deliveryStatus = deliveryStatus;
            await order.save();
        }
        else {
            if (deliveryStatus === "pending" || deliveryStatus === "failed") {
                order.deliveryStatus = deliveryStatus;
                order.paymentStatus = "pending";
                await order.save();
            }
            else {
                order.deliveryStatus = deliveryStatus;
                order.paymentStatus = "paid";
                await order.save();
            }
        }

        return NextResponse.json({ message: "Delivery status update successfully" }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}