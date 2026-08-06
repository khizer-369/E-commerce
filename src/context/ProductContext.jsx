"use client";
import { createContext, useState } from 'react';

export const UserProductsContext = createContext();

const ProductContext = ({ children }) => {
    const [displayProducts, setDisplayProducts] = useState();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const data = { selectedCategory, setSelectedCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, displayProducts, setDisplayProducts };
    return (
        <UserProductsContext.Provider value={data}>
            {children}
        </UserProductsContext.Provider>
    )
}

export default ProductContext
