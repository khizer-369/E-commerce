"use client";
import { UserProductsContext } from '@/context/ProductContext';
import { useContext, useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const ProductCategory = ({ allProducts }) => {
    const category = ["Shirts", "Polos", "Trousers", "Knitwear", "Blazers", "Outerwear", "Footwear", "Accessories"];
    const { selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, setDisplayProducts } = useContext(UserProductsContext);
    const [priceFilterStatus, setPriceFilterStatus] = useState(false);
    const [appliedPrices, setAppliedPrices] = useState({ min: "", max: "" });

    const categoryHandler = (value) => {
        setPriceFilterStatus(false);
        setAppliedPrices({ min: "", max: "" });
        if (selectedCategory === value) {
            setSelectedCategory("");
            setDisplayProducts(allProducts);
        }
        else {
            setSelectedCategory(value);
            const products = allProducts.filter((product) => product.category === value);
            setDisplayProducts(products);
        }
    }

    const priceFilter = (e) => {
        e.preventDefault();
        const min = Number(minPrice);
        const max = Number(maxPrice);
        setAppliedPrices({ min, max });
        setPriceFilterStatus(true);
        let base;
        if (selectedCategory) {
            base = allProducts.filter((product) => product.category === selectedCategory);
        }
        else {
            base = allProducts;
        }
        setDisplayProducts(base.filter((product) => product.price >= min && product.price <= max));
        setMinPrice("");
        setMaxPrice("");
    }

    const cancelPriceFilter = () => {
        setPriceFilterStatus(false);
        setAppliedPrices({ min: "", max: "" });
        if (selectedCategory) {
            setDisplayProducts(allProducts.filter((product) => product.category === selectedCategory));
        }
        else {
            setDisplayProducts(allProducts);
        }
    }

    const clearAll = () => {
        setSelectedCategory("");
        setPriceFilterStatus(false);
        setAppliedPrices({ min: "", max: "" });
        setDisplayProducts(allProducts);
    }
    return (
        <div className='md:sticky md:top-[9%] md:self-start h-[91vh] w-full md:w-75 border-r border-gray-300 bg-gray-50'>
            <div className='h-[65%] md:h-[55%] flex flex-col justify-evenly px-5'>
                <div className='flex justify-between items-center'>
                    <span className='text-lg font-medium tracking-wide'>REFINE</span>
                    <span onClick={clearAll} className='h-4.5 text-sm text-gray-600 cursor-pointer tracking-tight border-b'>Clear all</span>
                </div>
                <span className='text-lg font-medium'>CATEGORY</span>
                <div>
                    {category.map((e, i) => {
                        return (
                            <div key={i} className='flex justify-between'>
                                <div className='w-28'>
                                    <input type="checkbox" className='accent-black cursor-pointer mr-2' onChange={() => { categoryHandler(e); }} checked={selectedCategory.includes(e)} />
                                    <span className='text-sm text-gray-800'>{e}</span>
                                </div>
                                <span className='text-xs text-gray-600'>2</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='h-[35%] md:h-[45%]'>
                <form onSubmit={priceFilter} className='h-full px-5'>
                    <span className='text-lg font-medium'>Price</span>
                    <div className='flex justify-between items-center mt-3'>
                        <input value={minPrice} onChange={(e) => { setMinPrice(e.target.value); }} type="number" className='h-9 w-[35%] bg-white border border-gray-400 text-sm px-2' placeholder='Min' required />
                        <div className='h-px w-[20%] bg-gray-300'></div>
                        <input value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value); }} type="number" className='h-9 w-[35%] bg-white border border-gray-400 text-sm px-2' placeholder='Max' required />
                    </div>
                    <button className='h-10 w-full bg-black text-white mt-4 hover:bg-black/93 transition duration-150'>Apply</button>
                    {priceFilterStatus && <div className='h-10 w-fit bg-gray-500/10 rounded mt-3 relative flex justify-center gap-1 items-center px-3 shadow-sm'>
                        <span className='font-medium'>Price: </span>
                        <span className='text-sm mt-0.5 text-gray-700'>{appliedPrices.min}</span>
                        <div className='h-px w-5 mt-0.5 bg-gray-700'></div>
                        <span className='text-sm mt-0.5 text-gray-700'>{appliedPrices.max}</span>
                        <div onClick={cancelPriceFilter} className='absolute -top-1 -right-1 text-xs z-1 cursor-pointer'>
                            <RxCross2 />
                        </div>
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default ProductCategory
