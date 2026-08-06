import authOption from "@/lib/auth";
import connectDb from "@/lib/db";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import Orders from "@/components/Orders";

const getOrders = async () => {
  try {
    const session = await getServerSession(authOption);
    if (!session || session.user.role !== "admin") {
      return [];
    }

    await connectDb();
    const orders = await Order.find({ paymentStatus: { $in: ["pending", "paid"] }, deliveryStatus: "pending" }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    console.error(error);
    return [];
  }
}

const page = async () => {
  const orders = await getOrders();
  return (
    <div className="min-h-[91vh]">
      <Orders orders={orders} />
    </div>
  )
}

export default page
