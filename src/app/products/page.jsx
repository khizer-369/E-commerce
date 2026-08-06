import ProductCategory from "@/components/ProductCategory";
import Products from "@/components/Products";

const getAllProducts = async () => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/all-products`, { next: { revalidate: 60 } });
    const data = await response.json();
    return data.allProducts;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Page = async () => {
  const allProducts = await getAllProducts();

  return (
    <div className='min-h-[116vh]'>
      <div className='h-[25vh] border-b border-gray-300 flex flex-col justify-center gap-2 px-7'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>Outerwear & Essentials</h1>
        <p className='w-[85%] md:w-150 text-xs md:text-base text-gray-600'>Considered layers built from raw canvas, brushed wool, and washed cotton — cut for wear that outlasts the season.</p>
      </div>
      <div className="flex flex-col md:flex-row min-h-[91vh]">
        <ProductCategory allProducts={allProducts} />
        <Products allProducts={allProducts} />
      </div>
    </div>
  )
}

export default Page
