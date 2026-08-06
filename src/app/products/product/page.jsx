"use client";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useContext, useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UserCartContext } from "@/context/CartContext";
import { Suspense } from "react";

const PageContent = () => {
    const searchParams = useSearchParams();
    const product = {
        _id: searchParams.get("_id"),
        title: searchParams.get("title"),
        description: searchParams.get("description"),
        image: searchParams.get("image"),
        price: searchParams.get("price"),
        units: searchParams.get("units"),
    };
    const [count, setCount] = useState(1);
    const [direction, setDirection] = useState(1);
    const { addToCart } = useContext(UserCartContext);
    const router = useRouter();

    const handleIncrement = () => {
        setDirection(1);
        setCount((prev) => prev + 1);
    };

    const handleDecrement = () => {
        setDirection(-1);
        setCount((prev) => prev - 1);
    };

    return (
        <div className="min-h-[80vh] flex flex-col md:flex-row justify-center gap-16 items-center py-5">
            <div className="w-90 md:w-[40%] lg:w-90">
                <Image src={product.image} height={400} width={360} alt="image" className="border border-gray-300" />
            </div>
            <div className="h-px w-full bg-gray-300 md:hidden"></div>
            <div className="h-120 md:h-100 w-[90%] md:w-[45%] lg:w-115 flex flex-col justify-between items-start">
                <div>
                    <span className="text-gray-500 text-sm tracking-tight">Men's collection</span>
                    <h2 className="text-3xl font-semibold">{product.title}</h2>
                </div>
                <h4 className="text-xl font-medium tracking-wide">Rs.{product.price} PKR</h4>
                <p className="text-gray-800 tracking-tight text-sm">{product.description}</p>
                <div className="h-px w-full bg-gray-300"></div>
                <div className="flex justify-center gap-2 items-center text-yellow-500">
                    <div className="bg-yellow-500 h-2 w-2 rounded-full"></div>
                    <span className="tracking-tight">Only {product.units} units left</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm">Quantity</span>
                    {/* ⚠️ I used ai for count animation */}
                    <div className="h-9 w-23 flex justify-evenly items-center bg-gray-50 border border-gray-300 rounded">
                        <button onClick={handleDecrement} className="flex items-center justify-center cursor-pointer border-gray-400" disabled={count === 1}>-</button>
                        <div className="relative h-full w-9 overflow-hidden flex items-center justify-center">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span key={count} initial={{ y: direction * 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: direction * -15, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="absolute">{count}</motion.span>
                            </AnimatePresence>
                        </div>
                        <button onClick={handleIncrement} className="flex items-center justify-center cursor-pointer border-gray-400" disabled={count === Number(product.units)}>+</button>
                    </div>
                </div>
                <button onClick={() => { addToCart(product, count); }} className="h-10 w-full bg-black text-white hover:bg-black/95 transition duration-150 cursor-pointer">Add to Cart</button>
                <button onClick={() => {
                    addToCart(product, count);
                    router.push("/checkouts");
                }} className="h-10 w-full border hover:bg-gray-50 transition duration-150">Buy Now</button>
            </div>
        </div>
    )

}

const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

export default Page
