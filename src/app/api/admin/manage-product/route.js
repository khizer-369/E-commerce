import authOption from "@/lib/auth";
import uploadImage from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const session = await getServerSession(authOption);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Access denied. Admin privileges required." }, { status: 400 });
        }

        await connectDb();
        const { productId } = await request.json();
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return NextResponse.json({ message: "Product not found" }, { status: 400 });
        }
        await Product.deleteOne({ _id: productId });
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Errror" }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const session = await getServerSession(authOption);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ message: "Access denied. Admin privileges required." }, { status: 400 });
        }

        const formData = await request.formData();
        const productId = formData.get("_id");
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get("image");
        const price = formData.get("price");
        const category = formData.get("category");
        const units = formData.get("units");
        if (!productId || !title || !description || !image || !price || !category || !units) {
            return NextResponse.json({ message: "Please fill in all the details" }, { status: 400 });
        }

        await connectDb();
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return NextResponse.json({ message: "Product not found" }, { status: 400 });
        }

        const imageUrl = await uploadImage(image);

        await Product.updateOne({ _id: productId }, {
            title,
            description,
            image: imageUrl,
            price,
            category,
            units
        });

        return NextResponse.json({ message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Errror" }, { status: 500 });
    }
}