export const dynamic = "force-dynamic";
import AdminProducts from "@/components/AdminProducts";
import authOption from "@/lib/auth";
import connectDb from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";

const getAdminProducts = async () => {
  try {
    const session = await getServerSession(authOption);
    if (!session || session.user.role !== "admin") {
      return [];
    }
    await connectDb();
    const products = await Product.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error(error);
    return [];
  }
}

const page = async () => {
  const adminProducts = await getAdminProducts();
  return (
    <div>
      <AdminProducts adminProducts={adminProducts} />
    </div>
  )
}

export default page
