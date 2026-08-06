"use client";
import Image from 'next/image';
import { IoBagAddOutline } from "react-icons/io5";
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { UserCartContext } from '@/context/CartContext';

const PopularProducts = ({ favoriteProducts }) => {
    const router = useRouter();
    const containerVariants = {
        rest: { width: 40 },
        hover: { width: 122 },
    };
    const textVariants = {
        rest: { opacity: 0, x: -10 },
        hover: { opacity: 1, x: 0 },
    };
    const { addToCart } = useContext(UserCartContext);
    return (
        <div className='h-114 flex overflow-x-auto no-scrollbar'>
            {(favoriteProducts && favoriteProducts.length > 0) ? favoriteProducts?.map((e, i) => {
                return (
                    <div onClick={() => { router.push(`/products/product?_id=${e._id}&title=${e.title}&description=${e.description}&image=${e.image}&price=${e.price}&units=${e.units}`) }} key={i} className='shrink-0 cursor-pointer'>
                        <div className='relative h-100 w-75'>
                            <Image className='h-full w-full' src={e.image} height={400} width={300} unoptimized alt='product image' />
                            <motion.div onClick={(E) => {
                                E.stopPropagation();
                                addToCart(e, 1);
                            }} initial='rest' whileHover='hover' variants={containerVariants} transition={{ duration: 0.3, ease: 'easeInOut' }} className='flex items-center absolute right-3 bottom-3 z-1 h-10 bg-gray-300 border border-gray-400 rounded-lg overflow-hidden cursor-pointer'>
                                <IoBagAddOutline className='mx-3 shrink-0' />
                                <motion.span variants={textVariants} transition={{ duration: 0.3, ease: 'easeInOut' }} className='whitespace-nowrap text-sm'>Add to Cart</motion.span>
                            </motion.div>
                        </div>
                        <h4 className='pl-2 text-lg font-semibold tracking-tight'>{e.title}</h4>
                        <span className='pl-2 text-sm text-green-500'>Rs.{e.price} PKR</span>
                    </div>
                )
            }) : <span className='w-full text-center text-gray-600 tracking-tight'>No Products Available</span>}
        </div>
    )
}

export default PopularProducts
