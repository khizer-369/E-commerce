// ⚠️ I used AI for nav bar animation
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { IoBagOutline, IoPersonOutline } from "react-icons/io5";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { UserCartContext } from '@/context/CartContext';

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
];

const menuVariants = {
    closed: {
        opacity: 0,
        height: 0,
        transition: { duration: 0.25, ease: "easeInOut" },
    },
    open: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.3, ease: "easeInOut" },
    },
};

const listVariants = {
    open: {
        transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
    closed: {
        transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
};

const itemVariants = {
    open: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    closed: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const NavBar = () => {
    const session = useSession();
    const pathName = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [userType, setUserType] = useState("");
    const [sessionStatus, setSessionStatus] = useState(false);
    const { cartProducts, setShowCart } = useContext(UserCartContext);

    const linkClass = (href) =>
        pathName !== href
            ? "text-gray-300 hover:text-white transition duration-150"
            : "text-white";

    const getUserData = () => {
        if (session?.data?.user?.role === "admin") {
            setUserType("admin");
        }
        else {
            setUserType("user");
        }
    }

    useEffect(() => {
        if (session.status === "authenticated") {
            if (session?.data?.user?.role === "admin") {
                setUserType("admin");
            }
            else {
                setUserType("user");
            }
            setSessionStatus(true);
        }
        else {
            setUserType("");
            setSessionStatus(true);
        }
    }, [session])
    return (
        <div className='w-full bg-black text-white fixed z-1'>
            <div className='h-[9vh] flex justify-between items-center px-7'>
                <div className='hidden sm:flex w-32 justify-between text-sm'>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            className={linkClass(link.href)}
                            href={link.href}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
                <button
                    type="button"
                    className='sm:hidden text-2xl cursor-pointer'
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <RxCross2 /> : <RxHamburgerMenu />}
                </button>
                {sessionStatus && <div className='w-15 flex justify-between text-lg'>
                    <div onClick={() => { setShowCart(true); }} className='relative cursor-pointer'>
                        <IoBagOutline />
                        {cartProducts.length > 0 && <div className='h-3 w-3 rounded-full bg-white absolute -bottom-1 -right-1 flex justify-center items-center text-black font-medium'><span className='text-xs'>{cartProducts.length}</span></div>}
                    </div>
                    <Link href={`${userType === "admin" ? "/admin" : "/user"}`}><IoPersonOutline className='cursor-pointer' /></Link>
                </div>}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className='sm:hidden overflow-hidden border-t border-gray-800'
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        <motion.ul
                            className='flex flex-col px-7 py-4 gap-4 text-sm'
                            variants={listVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            {navLinks.map((link) => (
                                <motion.li key={link.href} variants={itemVariants}>
                                    <Link
                                        className={linkClass(link.href)}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default NavBar