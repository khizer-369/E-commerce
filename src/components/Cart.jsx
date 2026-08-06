"use client";
import { UserCartContext } from "@/context/CartContext";
import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

const Cart = () => {
    const { showCart, setShowCart, cartProducts, deleteProduct, addProduct, subtractProduct, totalAmount } = useContext(UserCartContext);
    const router = useRouter();
    return (
        <div className={`fixed top-0 right-0 bg-white h-full w-full sm:w-100 z-1 transition-transform duration-300 ${showCart ? "translate-x-0" : "translate-x-full"}`}>
            <div className="h-[10vh] flex justify-between items-center px-4">
                <div className="flex justify-between items-center gap-2">
                    <span className="text-gray-800 text-sm">Cart</span>
                    <div className="h-6 w-6 bg-gray-200 rounded-full flex justify-center items-center text-sm">{cartProducts.length}</div>
                </div>
                <RxCross2 onClick={() => { setShowCart(false); }} className="text-lg text-gray-700 cursor-pointer hover:text-gray-500 transition duration-150" />
            </div>
            <div>
                {(cartProducts && cartProducts.length > 0) ? <div className="h-[65vh] w-full flex flex-col gap-3 items-center overflow-y-auto">
                    {cartProducts.map((e, i) => {
                        return (
                            <div key={i} className="min-h-35 w-[90%] flex flex-col justify-center gap-3">
                                <div className="flex justify-between">
                                    <div className="flex gap-3">
                                        <div className="h-16">
                                            <Image src={e.image} height={64} width={50} alt="image" />
                                        </div>
                                        <div className="h-25">
                                            <span className="tracking-tight">{e.title}</span>
                                            <div className="text-sm text-gray-500">{e.category}</div>
                                            <div className="flex gap-3 items-center mt-3">
                                                <div className="h-9 w-23 flex justify-evenly items-center bg-gray-50 border border-gray-300 rounded">
                                                    <span onClick={() => { subtractProduct(e._id); }} className="cursor-pointer">-</span>
                                                    <span className="text-gray-700">{e.quantity}</span>
                                                    <span onClick={() => { addProduct(e._id); }} className="cursor-pointer">+</span>
                                                </div>
                                                <RiDeleteBin5Line onClick={() => { deleteProduct(e._id); }} className="text-lg cursor-pointer text-gray-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-sm">Rs.{e.totalPrice} PKR</span>
                                </div>
                                <div className="h-px w-full bg-gray-300"></div>
                            </div>
                        )
                    })}
                </div> : <div className="text-center text-gray-600">Your cart is empty</div>}
                {(cartProducts && cartProducts.length > 0) && <div className="h-[25vh] flex flex-col justify-evenly items-center">
                    <div className="w-[90%] flex justify-between items-center">
                        <span className="text-sm text-gray-600">Estimated total</span>
                        <span>Rs.{totalAmount} PKR</span>
                    </div>
                    <button onClick={() => {
                        router.push("/checkout");
                        setShowCart(false);
                    }} className="h-12 w-[90%] bg-black text-white cursor-pointer hover:bg-black/94 transition duration-200">Check out</button>
                </div>}
            </div>
        </div>
    )
}

export default Cart
