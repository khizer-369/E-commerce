"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const Page = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loaderStatus, setLoaderStatus] = useState(false);
    const router = useRouter();

    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callbackUrl") || "/";

    const signUpHandler = async (e) => {
        e.preventDefault();
        setLoaderStatus(true);
        try {
            const response = await axios.post("/api/sign-up", { name, email, password });
            router.push("/sign-in");
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error(error);
        }
        setName("");
        setEmail("");
        setPassword("");
        setLoaderStatus(false);
    }

    const signInGoogle = async () => {
        try {
            await signIn("google", { callbackUrl: callBackUrl });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="h-130 w-88 sm:w-102 flex justify-center items-center border shadow-md">
                <form onSubmit={signUpHandler} className="h-115 w-75 sm:w-87 flex flex-col justify-between text-sm">
                    <h1 className="text-3xl font-bold">Sign up</h1>
                    <div className="h-70 flex flex-col justify-between">
                        <div className="flex flex-col">
                            <span className="font-medium tracking-wide mb-1">Username</span>
                            <input value={name} onChange={(e) => { setName(e.target.value); }} type="text" className="h-10 border pl-3 tracking-wide" placeholder="Enter your username" required />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium tracking-wide mb-1">Email</span>
                            <input value={email} onChange={(e) => { setEmail(e.target.value); }} type="email" className="h-10 border pl-3 tracking-wide" placeholder="Enter your email" required />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium tracking-wide mb-1">Password</span>
                            <input value={password} onChange={(e) => { setPassword(e.target.value); }} type="password" className="h-10 border pl-3 tracking-wide" placeholder="Enter your password" required />
                        </div>
                        <button disabled={loaderStatus} className="h-10 bg-black text-white font-medium hover:bg-black/93 transition duration-150 flex justify-center items-center">
                            {loaderStatus ? <Loader /> : <span>Sign up</span>}
                        </button>
                    </div>
                    <div className="flex justify-evenly items-center">
                        <div className="h-px flex-1 w-30 bg-gray-300"></div>
                        <span className="mx-5">OR</span>
                        <div className="h-px flex-1 w-30 bg-gray-300"></div>
                    </div>
                    <button type="button" onClick={signInGoogle} className="h-10 flex justify-center gap-5 items-center border hover:bg-gray-50 transition duration-150">
                        <FcGoogle className="text-xl" />
                        <span className="font-medium">Continue with Google</span>
                    </button>
                    <div className="flex justify-center items-center">
                        <span>{"Already have an account?"}</span>
                        <Link href={"/sign-in"} className="ml-1 font-medium">Signin</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page
