"use client";
import NavBar from "@/components/NavBar";
import BlankSpace from "@/components/BlankSpace";
import { useContext, useState } from "react";
import { UserCartContext } from "@/context/CartContext";
import Image from "next/image";
import axios from "axios";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {
    const { cartProducts, totalAmount, setCartProducts } = useContext(UserCartContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [loaderStatus, setLoaderStatus] = useState(false);
    const router = useRouter();

    const orderHandler = async (e) => {
        e.preventDefault();
        setLoaderStatus(true);
        try {
            const response = await axios.post("/api/checkout", {
                products: cartProducts,
                firstName,
                lastName,
                address1,
                address2,
                city,
                postalCode,
                phone,
                paymentMethod,
                totalAmount,
            });
            setFirstName("");
            setLastName("");
            setAddress1("");
            setAddress2("");
            setCity("");
            setPostalCode("");
            setPhone("");
            setCartProducts([]);
            toast.success(response.data.message);
            if (paymentMethod === "online" && response.data.checkOutUrl) {
                window.location.href = response.data.checkOutUrl;
                console.log(response.data);
            }
            else {
                router.push("/");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
        setLoaderStatus(false);
    }
    return (
        <div>
            <NavBar />
            <BlankSpace />
            <div className="flex flex-col-reverse md:flex-row">
                <div className="min-h-full w-full md:w-[50%] lg:w-[55%] flex justify-center lg:justify-end md:pb-11">
                    <form onSubmit={orderHandler} className="h-full w-full md:w-[90%] lg:w-130 flex flex-col justify-evenly gap-7 items-center my-7">
                        <div className="w-[90%] flex flex-col gap-3">
                            <h2 className="text-xl font-semibold">Delivery</h2>
                            <select className="h-10 w-full border border-gray-300 text-gray-500 rounded-lg outline-blue-500 pl-1">
                                <option>Pakistan</option>
                            </select>
                            <div className="w-full flex justify-between">
                                <input value={firstName} onChange={(e) => { setFirstName(e.target.value); }} className="h-10 w-[49%] border border-gray-300 rounded-lg outline-blue-500 text-sm pl-2" type="text" placeholder="First name" required />
                                <input value={lastName} onChange={(e) => { setLastName(e.target.value); }} className="h-10 w-[49%] border border-gray-300 rounded-lg outline-blue-500 text-sm pl-2" type="text" placeholder="Last name" required />
                            </div>
                            <input value={address1} onChange={(e) => { setAddress1(e.target.value); }} className="h-10 w-full border border-gray-300 rounded-lg outline-blue-500 text-sm pl-2" type="text" placeholder="Address" required />
                            <input value={address2} onChange={(e) => { setAddress2(e.target.value); }} className="h-10 w-full border border-gray-300 rounded-lg outline-blue-500 text-sm pl-2" type="text" placeholder="Apartment, suite, etc. (optional)" />
                            <div className="w-full flex justify-between">
                                <input value={city} onChange={(e) => { setCity(e.target.value); }} className="h-10 w-[49%] border border-gray-300 rounded-lg outline-blue-500 text-sm pl-2" type="text" placeholder="City" required />
                                <input value={postalCode} onChange={(e) => { setPostalCode(e.target.value); }} className="h-10 w-[49%] border border-gray-300 rounded-lg outline-blue-500 text-sm pl-2" type="text" placeholder="Postal code (optional)" />
                            </div>
                            <input value={phone} onChange={(e) => { setPhone(e.target.value); }} className="h-10 w-full border border-gray-300 rounded-lg outline-blue-500 text-sm pl-2" type="number" placeholder="Phone" required />
                        </div>
                        <div className="w-[90%] text-sm font-medium">
                            <h3 className="font-medium tracking-tight mb-2">Shipping method</h3>
                            <div className="h-11 w-full flex justify-between items-center border border-blue-500 rounded-lg bg-gray-100 px-2">
                                <span>Pakistan Shipping Rates</span>
                                <span>FREE</span>
                            </div>
                        </div>
                        <div className="w-[90%] text-sm">
                            <h2 className="text-lg font-medium">Payment</h2>
                            <div className="text-sm tracking-tight text-gray-500 mb-2">All transactions are secure and encrypted.</div>
                            <div>
                                <div onClick={() => { setPaymentMethod("cash"); }} className={`h-11 border pt-2.5 pl-2 font-medium rounded-t-lg cursor-pointer ${paymentMethod === "cash" ? "border-blue-500 bg-gray-100" : "border-gray-300"}`}>Cash on Delivery (COD)</div>
                                <div onClick={() => { setPaymentMethod("online"); }} className={`h-11 border pt-2.5 pl-2 font-medium rounded-b-lg cursor-pointer ${paymentMethod === "online" ? "border-blue-500 bg-gray-100" : "border-gray-300"}`}>Credit/Debit Card</div>
                            </div>
                        </div>
                        <button disabled={loaderStatus} className="h-10 w-[90%] text-white bg-blue-600 rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-700 transition duration-300 flex justify-center items-center">
                            {loaderStatus ? <Loader /> : <span>Complete Order</span>}
                        </button>
                    </form>
                </div>
                <div className={`h-fit md:h-[91vh] w-full md:w-[50%] lg:w-[45%] bg-gray-100 md:sticky md:top-[9vh] flex justify-center lg:justify-start ${(cartProducts && cartProducts.length) ? "md:pl-10" : ""}`}>
                    {(cartProducts && cartProducts.length > 0) ? <div className="h-fit w-[90%] lg:w-95 my-5">
                        <div className="w-full flex flex-col gap-3">
                            {(cartProducts && cartProducts.length > 0) && cartProducts.map((e, i) => {
                                return (
                                    <div key={i} className="flex justify-between">
                                        <div className="flex gap-3">
                                            <div className="h-18">
                                                <Image src={e.image} height={72} width={55} alt="image" className="rounded-lg borde border-gray-300 shadow-sm" />
                                            </div>
                                            <div className="pt-1">
                                                <div className="text-sm  tracking-tight">{e.title}</div>
                                                <div className="text-xs text-gray-600 tracking-tight">{e.category}</div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-900 pt-1">Rs {e.price}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex flex-col gap-2 pt-3">
                            <div className="flex justify-between items-center text-sm tracking-tight">
                                <span>Subtotal · {cartProducts.length} items</span>
                                <span>Rs {totalAmount}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm tracking-tight">
                                <span>Shipping</span>
                                <span className="text-gray-700">Free</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Total</span>
                                <div>
                                    <span className="text-xs text-gray-600 tracking-tight pr-1">PKR</span>
                                    <span className="font-medium">RS {totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div> : <div className="h-fit w-full flex justify-center pt-5">
                        <span className="text-gray-600">Your cart is empty</span>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Page
