import connectDb from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();
        if (!name || !email || !password){
            return NextResponse.json({ message: "Please fill in all the details" }, { status: 400 });
        }

        await connectDb();
        const userName = await User.findOne({ name });
        if (userName){
            return NextResponse.json({ message: `${name} is not available` }, { status: 400 });
        }

        const userEmail = await User.findOne({ email });
        if (userEmail){
            return NextResponse.json({ message: `${email} already registered` }, { status: 400 });
        }
        
        const hasedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hasedPassword,
            role: "user",
        });

        return NextResponse.json({message: "User created successfully"}, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}