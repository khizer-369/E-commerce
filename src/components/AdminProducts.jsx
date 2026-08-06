"use client";
import { useState } from "react";
import Image from "next/image";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

const AdminProducts = ({ adminProducts }) => {
    const [displayAdminProducts, setDisplayAdminProducts] = useState(adminProducts);
    const [category, setCategory] = useState("All");
    const options = ["All", "New Arrivals", "Shirts", "Polos", "Trousers", "Knitwear", "Blazers", "Outerwear", "Footwear", "Accessories"];
    const [deleteConfirmation, setDeleteConfirmation] = useState(undefined);
    const [deletedProduct, setDeletedProduct] = useState({});
    const [loaderStatus, setLoaderStatus] = useState(false);
    const router = useRouter();

    const getCategorizedProducts = (e) => {
        setCategory(e.target.value);
        const Category = e.target.value;
        if (Category === "All") {
            setDisplayAdminProducts(adminProducts);
        }
        else {
            setDisplayAdminProducts(adminProducts.filter((product) => product.category === Category));
        }
    }

    const productDeleteHandler = async () => {
        setLoaderStatus(true);
        try {
            const productId = adminProducts[deleteConfirmation]._id;
            const response = await axios.delete("/api/admin/manage-product", { data: { productId } });
            setDeletedProduct({ productId, message: response.data.message });
        } catch (error) {
            console.error(error);
        }
        setLoaderStatus(false);
    }

    return (
        <div className="min-h-[91vh] bg-gray-50 flex flex-col">
            <div className="h-17 bg-gray-200 flex justify-between items-center px-5">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight">All products</h2>
                    <span className="text-sm text-gray-700">12 items in new arrivals</span>
                </div>
                <select className="border" value={category} onChange={(e) => {
                    getCategorizedProducts(e);
                }}>
                    {options.map((e, i) => {
                        return (
                            <option key={i}>{e}</option>
                        )
                    })}
                </select>
            </div>
            <div className="flex-1 flex justify-center items-start gap-5 sm:gap-10 py-5 sm:p-5 flex-wrap">
                {(displayAdminProducts && displayAdminProducts.length > 0) ? displayAdminProducts.map((e, i) => {
                    return (
                        <div className="h-68 sm:h-80 w-[45%] sm:w-60 border border-gray-300 flex flex-col justify-between items-center flex-wrap shadow" key={i}>
                            {deleteConfirmation !== i ? <div className="h-full w-full flex flex-col justify-between items-center">
                                <div className="w-full overflow-hidden">
                                    <Image className="h-40 sm:h-50 w-full hover:scale-105 transition duration-300" src={e.image} height={168} width={140} priority alt="product image" />
                                </div>
                                <h3 className="w-[90%] text-lg font-semibold tracking-tighter">{e.title}</h3>
                                <span className="w-[90%] text-green-500 text-sm">Rs.{e.price} PKR</span>
                                <div className="w-[90%] flex justify-between mb-2">
                                    <button onClick={() => { router.push(`/admin/update-product?_id=${e._id}&title=${e.title}&description=${e.description}&price=${e.price}&category=${e.category}&units=${e.units}`) }} className="h-8 md:h-9 w-18 md:w-25 bg-black text-white text-sm hover:bg-black/95 hover:text-gray-50 transition-colors duration-150">Update</button>
                                    <button onClick={() => { setDeleteConfirmation(i) }} className="h-8 md:h-9 w-18 md:w-25 border border-gray-300 hover:bg-gray-100 transition-colors duration-150">Delete</button>
                                </div>
                            </div> : <div className="h-full w-full bg-gray-100 flex justify-center items-center">
                                {deletedProduct.productId !== e._id ? <div className="h-35 w-full flex flex-col justify-between items-center">
                                    <RiDeleteBinLine className="text-red-500 text-3xl" />
                                    <h5 className="text-gray-600  md:text-lg font-semibold tracking-tight">Delete this product?</h5>
                                    <span className="text-sm font-semibold text-gray-400">{"This can't be undone"}</span>
                                    <div className="w-45 flex justify-between items-center px-3 md:px-0">
                                        <button onClick={() => { setDeleteConfirmation(undefined); }} className="h-7 w-17 md:h-9 md:w-20 text-sm border border-gray-300 text-gray-600 font-semibold hover:bg-black hover:text-white transition-colors duration-150 rounded cursor-pointer">Cancel</button>
                                        <button onClick={() => { productDeleteHandler(); }} className="h-7 w-17 md:h-9 md:w-20 bg-red-500 text-white font-semibold rounded cursor-pointer hover:bg-red-500/90  hover:text-gray-50 transition-colors duration-150 flex justify-center items-center">
                                            {loaderStatus ? <Loader /> : <span>Delete</span>}
                                        </button>
                                    </div>
                                </div> : <span className="text-red-500 font-semibold">{deletedProduct.message}</span>
                                }
                            </div>}
                        </div>
                    )
                }) : <span className="text-xl text-gray-700 font-semibold">No Products available</span>}
            </div>
        </div>
    )
}

export default AdminProducts
