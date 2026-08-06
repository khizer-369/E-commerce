export const dynamic = "force-dynamic";
import NavBar from "@/components/NavBar";
import BlankSpace from "@/components/BlankSpace";
import UserOrders from "@/components/UserOrders";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import authOption from "@/lib/auth";
import connectDb from "@/lib/db";
import Order from "@/models/Order";

const getUserOrders = async () => {
    const session = await getServerSession(authOption);
    await connectDb();
    const orders = await Order.find({ buyer: session?.user?.id });
    return { orders: JSON.parse(JSON.stringify(orders)), user: session?.user };
}

const page = async () => {
    const { orders, user } = await getUserOrders();
    return (
        <div>
            <NavBar />
            <BlankSpace />
            <UserOrders orders={orders} user={user} />
            <Footer />
        </div>
    )
}

export default page
