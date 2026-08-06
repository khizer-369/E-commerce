import connectDb from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDb();
        const allProducts = await Product.find().sort({ createdAt: -1 });
        return NextResponse.json({ allProducts }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}