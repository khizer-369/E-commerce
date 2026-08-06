"use client";
import { createContext, useEffect, useState } from "react";

export const UserCartContext = createContext();
const CartContext = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const addToCart = (product, quantity) => {
        if (!cartProducts.find((e) => e._id === product._id)) {
            setCartProducts([...cartProducts, { ...product, quantity: quantity, totalPrice: product.price * quantity }]);
        }
    }

    const addProduct = (id) => {
        setCartProducts(prev => prev.map((e) => (e._id === id && e.units > e.quantity) ? { ...e, quantity: e.quantity + 1, totalPrice: e.totalPrice + e.price } : e));
    }

    const subtractProduct = (id) => {
        setCartProducts(prev => prev.map((e) => (e._id === id && 0 < e.quantity) ? { ...e, quantity: e.quantity - 1, totalPrice: e.totalPrice - e.price } : e).filter((e) => e.quantity > 0));
    }

    const deleteProduct = (id) => {
        setCartProducts(prev => prev.filter((e) => e._id !== id));
    }

    useEffect(() => {
        if (cartProducts && cartProducts.length > 0) {
            let total = 0;
            cartProducts.map((e) => {
                total = total + e.totalPrice;
            });
            setTotalAmount(total);
        }
    }, [cartProducts])

    const data = { addToCart, cartProducts, showCart, setShowCart, deleteProduct, addProduct, subtractProduct, totalAmount, setCartProducts };
    return (
        <UserCartContext.Provider value={data}>
            {children}
        </UserCartContext.Provider>
    )
}

export default CartContext
