import connectDb from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        let event;
        try {
            const body = await req.text();
            const signature = (await headers()).get("stripe-signature");
            event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (error) {
            console.log(error);
            return new Response(`Webhook Error: ${error.message}`, { status: 400, });
        }

        await connectDb();
        const session = event.data.object;

        if (event.type === "checkout.session.completed") {
            const order = await Order.findById(session.metadata.orderId);
            if (!order) {
                return new Response("Order not found", { status: 404 });
            }
            if (order.paymentStatus === "paid") {
                return new Response("Already processed", { status: 200 });
            }
            for (const item of order.products) {
                const updatedProduct = await Product.findOneAndUpdate(
                    { _id: item._id, units: { $gte: item.quantity }, },
                    { $inc: { units: -item.quantity }, },
                    { new: true }
                );
                if (!updatedProduct) {
                    console.log(`Insufficient stock for ${item.title}`);
                    order.deliveryStatus = "stock issue";
                }
            }
            order.paymentStatus = "paid";
            await order.save();
        }
        else if (event.type === "checkout.session.expired") {
            await Order.findByIdAndUpdate(session.metadata.orderId, { paymentStatus: "cancelled", });
        }
        else {
            console.log(`Unhandled event: ${event.type}`);
        }

        return new Response("Webhook received", { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Server Error" }, { status: 500 });
    }
}