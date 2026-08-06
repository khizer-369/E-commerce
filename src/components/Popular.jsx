import connectDb from '@/lib/db';
import PopularProducts from './PopularProducts';
import Product from "@/models/Product";
import Order from "@/models/Order";

const getfavoriteProducts = async () => {
  try {
    await connectDb();
    //⚠️ I used AI for this code
    const topProducts = await Order.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products._id", totalOrders: { $sum: 1 }, totalUnitsSold: { $sum: "$products.quantity" } }, },
      { $sort: { totalOrders: -1 } },
      { $limit: 6 },
    ]);
    const productIds = topProducts.map((item) => item._id);
    const products = await Product.find({ _id: { $in: productIds } }).lean();
    const result = topProducts.map((stat) => {
      const productDetail = products.find((p) => p._id.toString() === stat._id?.toString());
      if (!productDetail) return null;
      return { ...productDetail, totalOrders: stat.totalOrders, totalUnitsSold: stat.totalUnitsSold, };
    }).filter(Boolean);
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    return [];
  }
}

const Popular = async () => {
  const favoriteProducts = await getfavoriteProducts();
  
  return (
    <div className='h-[91vh] flex flex-col justify-evenly'>
      <div className='h-[9vh] flex flex-col gap-0.5 justify-center items-center'>
        <h2 className='text-2xl font-semibold text-gray-800 tracking-tight'>Customer Favorites</h2>
        <span className='text-sm text-gray-500'>Our most admired old money essentials.</span>
      </div>
      <PopularProducts favoriteProducts={favoriteProducts} />
    </div>
  )
}

export default Popular
