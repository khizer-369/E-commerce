import uploadImage from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOption from "@/lib/auth";

export async function POST(request) {
    try {
        const session = await getServerSession(authOption);
        if (!session || session.user.role !== "admin"){
            return NextResponse.json({ message: "Access denied. Admin privileges required." }, { status: 400 });
        }

        const formData = await request.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const image = formData.get("image");
        const price = formData.get("price");
        const category = formData.get("category");
        const units = formData.get("units");
        if (!title || !description || !image || !price || !category || !units){
            return NextResponse.json({ message: "Please fill in all the details" }, { status: 400 });
        }
        
        const imageUrl = await uploadImage(image);

        await connectDb();
        await Product.create({
            title,
            description,
            image: imageUrl,
            price,
            category,
            units,
        });

        return NextResponse.json({ message: "Product created successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}