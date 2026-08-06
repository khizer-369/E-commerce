// ⚠️ I used AI for this component
"use client";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiChevronUp } from "react-icons/fi";
import { IoWalletSharp } from "react-icons/io5";

const paymentStyles = {
    paid: "bg-black text-white",
    pending: "bg-gray-200 text-black",
};

const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }) + " · " + d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

const Orders = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState(initialOrders);
    const [open, setOpen] = useState([]);
    const [deliverySelectAble, setDeliverySelectAble] = useState(false);
    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-[91vh] bg-white flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-black font-semibold text-lg">No orders yet</p>
                    <p className="text-gray-500 text-sm mt-1">New orders will show up here once customers check out.</p>
                </div>
            </div>
        );
    }

    const deliveryStatusHandler = async (value, id) => {
        setOrders(prev => prev.map((e) => e._id === id ? { ...e, deliveryStatus: value, paymentStatus: (e.paymentMethod === "cash" && value === "delivered") ? "paid" : e.paymentMethod === "online" ? "paid" : "pending" } : e));
        setDeliverySelectAble(true);
        try {
            const response = await axios.put("/api/admin/delivery-status", { deliveryStatus: value, id });
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
        setDeliverySelectAble(false);
    }

    return (
        <div className="min-h-[91vh] bg-white px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
            <div className="max-w-5xl mx-auto flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-black text-xl sm:text-2xl font-bold">Orders</h1>
                    <span className="text-sm text-gray-500">{orders.length} total</span>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4">
                    {(orders && orders.length > 0) && orders.map((order) => (
                        <div key={order._id} order={order} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <button onClick={() => {
                                if (open.find((e) => e === order._id)) {
                                    setOpen(prev => prev.filter((e) => e !== order._id));
                                }
                                else {
                                    setOpen([...open, order._id]);
                                }
                            }} className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:p-5 text-left">
                                <div className="flex items-start sm:items-center gap-3">
                                    <div className="flex flex-col">
                                        <span className="text-black font-semibold text-sm sm:text-base">{order.firstName} {order.lastName}</span>
                                        <span className="text-xs text-gray-500 mt-0.5">{formatDate(order.createdAt)}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between sm:justify-start flex-wrap items-center sm:gap-3">
                                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full capitalize ${paymentStyles[order.paymentStatus] || 'bg-gray-200 text-black'}`}>
                                        <IoWalletSharp className="text-base" />
                                        {order.paymentStatus}
                                    </span>
                                    <select disabled={deliverySelectAble} onChange={(e) => { deliveryStatusHandler(e.target.value, order._id); }} value={order.deliveryStatus} onClick={(e) => { e.stopPropagation(); }} className="h-6 border border-gray-600 text-gray-700 rounded-lg text-xs">
                                        <option>pending</option>
                                        <option>delivered</option>
                                        <option>failed</option>
                                    </select>
                                    <div className="flex gap-1 items-center">
                                        <span className="text-black font-semibold text-sm sm:text-base whitespace-nowrap">Rs. {order.totalAmount?.toLocaleString()} PKR</span>
                                        <FiChevronUp className="w-4 h-4" />
                                    </div>
                                </div>
                            </button>
                            {open.find((e) => e === order._id) && (
                                <div className="border-t border-gray-200 bg-gray-50 p-4 sm:p-5 flex flex-col md:flex-row gap-6">
                                    <div className="md:w-1/3 flex flex-col gap-2 text-sm">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Delivery details</h4>
                                        <p className="text-black"> {order.address1} {order.address2 ? `, ${order.address2}` : ""}</p>
                                        <p className="text-black">{order.city}, {order.postalCode}</p>
                                        <p className="text-black">{order.phone}</p>
                                        <p className="text-gray-600 capitalize">Payment method: <span className="text-black">{order.paymentMethod}</span></p>
                                    </div>
                                    <div className="md:w-2/3 flex flex-col gap-3">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Products ({order.products.length})</h4>
                                        <div className="flex flex-col gap-3">
                                            {order.products.map((product) => (
                                                <div key={product._id} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3">
                                                    <div className="w-12 h-16 rounded-md border border-gray-200 bg-white overflow-hidden">
                                                        <Image height={64} width={48} src={product.image} alt="image" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-black text-sm font-medium truncate">{product.title}</p>
                                                        <p className="text-gray-500 text-xs">{product.category}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-black text-sm font-medium">Rs. {product.price?.toLocaleString()} × {product.quantity} PKR</p>
                                                        <p className="text-gray-500 text-xs">= Rs. {product.totalPrice?.toLocaleString()} PKR</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;