"use client";
import Image from 'next/image';
import { IoBagAddOutline } from "react-icons/io5";
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserProductsContext } from '@/context/ProductContext';
import { UserCartContext } from '@/context/CartContext';

const Products = ({ allProducts }) => {
  const { displayProducts, setDisplayProducts } = useContext(UserProductsContext);
  const { addToCart } = useContext(UserCartContext);
  const router = useRouter();
  const containerVariants = {
    rest: { width: 40 },
    hover: { width: 122 },
  };

  const textVariants = {
    rest: { opacity: 0, x: -10 },
    hover: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    setDisplayProducts(allProducts);
  }, [])

  return (
    <div className='h-full flex-1 pb-5'>
      <div className='h-20 flex items-center pl-5'>
        <span className='text-sm'>SHOWING {displayProducts?.length} of {allProducts.length}</span>
      </div>
      <div className='min-h-20 w-full'>
        {(displayProducts && displayProducts.length > 0) ? <div className='flex justify-center md:justify-start gap-x-[4%] gap-y-10 flex-wrap md:pl-5'>
          {displayProducts.map((e, i) => {
            return (
              <div onClick={() => { router.push(`/products/product?_id=${e._id}&title=${e.title}&description=${e.description}&image=${e.image}&price=${e.price}&units=${e.units}`) }} key={i} className='md:min-w-50 md:max-w-65 w-70 md:w-[40%] lg:w-[27%] flex flex-col border border-gray-300'>
                <div className='relative h-80 w-full overflow-hidden'>
                  <Image fill src={e.image} alt='image' className='cursor-pointer hover:scale-103 transition duration-300' />
                </div>
                <h4 className='pl-2 text-lg font-semibold tracking-tight'>{e.title}</h4>
                <span className='pl-2 text-sm text-gray-600'>{e.category}</span>
                <div className='flex justify-between items-center px-2 mb-2'>
                  <span className='text-sm text-green-500'>Rs.{e.price} PKR</span>
                  <motion.div onClick={(E) => {
                    E.stopPropagation();
                    addToCart(e, 1);
                  }} initial='rest' whileHover='hover' variants={containerVariants} transition={{ duration: 0.3, ease: 'easeInOut' }} className='flex items-center h-9 bg-gray-200 border border-gray-400 rounded overflow-hidden cursor-pointer'>
                    <IoBagAddOutline className='mx-3 shrink-0' />
                    <motion.span variants={textVariants} transition={{ duration: 0.3, ease: 'easeInOut' }} className='whitespace-nowrap text-sm'>Add to Cart</motion.span>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div> : <div className='flex justify-center items-center'>
          <span className='text-sm text-gray-600 pt-7'>No Products Available</span>
        </div>}
      </div>
    </div>
  )
}

export default Products
