import authOption from "@/lib/auth";
import connectDb from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
    try {
        const session = await getServerSession(authOption);
        if (!session || session.user.role !== "user") {
            return NextResponse.json({ message: "Access denied. Authentication required" }, { status: 400 });
        }

        const { products, firstName, lastName, address1, address2, city, postalCode, phone, paymentMethod, totalAmount } = await request.json();
        let serverSideProducts = [], totalServerSideAmount = 0;
        if (!products || products.length === 0 || !firstName || !lastName || !address1 || !city || !phone || !paymentMethod || !totalAmount) {
            return NextResponse.json({ message: "Please fill in all the details" }, { status: 400 });
        }

        await connectDb();
        for (const item of products) {
            const product = await Product.findById(item._id);
            if (!product || product.units < item.quantity) {
                return NextResponse.json({ message: `${product.title} is out of stock or insufficient quantity available` }, { status: 400 });
            }
            if (product.price != item.price) {
                return NextResponse.json({ message: `Price mismatch for ${product.title}.` }, { status: 400 });
            }
            serverSideProducts.push({
                _id: product._id,
                title: product.title,
                description: product.description,
                image: product.image,
                price: product.price,
                category: product.category,
                quantity: item.quantity,
                totalPrice: product.price * item.quantity,
            });
            totalServerSideAmount = totalServerSideAmount + (product.price * item.quantity);
        }

        if (totalAmount !== totalServerSideAmount) {
            return NextResponse.json({ message: "Total amount does not match." }, { status: 400 });
        }

        if (paymentMethod === "cash") {
            for (const item of products) {
                const updatedProduct = await Product.findOneAndUpdate(
                    { _id: item._id, units: { $gte: item.quantity } },
                    { $inc: { units: -item.quantity } },
                    { new: true },
                );
                if (!updatedProduct) {
                    return NextResponse.json({ message: `Stock changed for one of the items. Please try again.` }, { status: 400 });
                }
            }
            await Order.create({
                buyer: session.user.id,
                products: serverSideProducts,
                firstName,
                lastName,
                address1,
                address2,
                city,
                postalCode,
                phone,
                paymentMethod,
                totalAmount: totalServerSideAmount,
                paymentStatus: "pending",
            });
            return NextResponse.json({ message: "Order successfully created" }, { status: 201 });
        }

        const order = await Order.create({
            buyer: session.user.id,
            products: serverSideProducts,
            firstName,
            lastName,
            address1,
            address2,
            city,
            postalCode,
            phone,
            paymentMethod,
            totalAmount: totalServerSideAmount,
            paymentStatus: "pending",
        });

        const Session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            metadata: {
                buyer: session.user.id.toString(),
                orderId: order._id.toString(),
            },
            line_items: serverSideProducts.map((product) => ({
                price_data: {
                    currency: "pkr",
                    product_data: { name: product.title, images: [product.image], },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: product.quantity,
            })),
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-failed`,
        });

        return NextResponse.json({ checkOutUrl: Session.url }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}