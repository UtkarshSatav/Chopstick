"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaShoppingCart, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useCart } from "@/context/CartContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Order Online", href: "/menu" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-lg py-2" : "bg-white py-4"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-300">
                {/* Logo */}
                <Link href="/" className="relative h-20 w-40 sm:h-24 sm:w-48 md:h-32 md:w-64 flex items-center transition-transform duration-300 hover:scale-105">
                    <Image
                        src="/chopsticklog.png"
                        alt="Chopsticks Spice Malbar"
                        fill
                        priority
                        className="object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs lg:text-sm tracking-widest uppercase font-medium transition-colors text-gray-800 hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <Link
                        href="/cart"
                        className="relative p-2 hover:text-primary transition-colors text-gray-800"
                        aria-label="Open shopping cart"
                    >
                        <FaShoppingCart className="text-xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Menu Action Area */}
                <div className="flex items-center gap-2 sm:gap-4 md:hidden">
                    <Link
                        href="/cart"
                        className="relative p-2 text-gray-800"
                        aria-label="Open shopping cart"
                    >
                        <FaShoppingCart className="text-xl" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full text-[8px] sm:text-[10px]">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <button
                        className="p-2 text-2xl transition-colors text-gray-800 hover:text-primary"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-white z-40 md:hidden flex flex-col pt-24 pb-12 transition-colors duration-300"
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 p-2 text-gray-800 hover:text-primary transition-colors"
                            aria-label="Close menu"
                        >
                            <FaTimes className="text-3xl" />
                        </button>

                        <div className="container mx-auto px-6 flex flex-col h-full">
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col space-y-6 flex-grow"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 + (index * 0.1) }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="text-gray-800 text-3xl sm:text-4xl font-display font-bold hover:text-primary transition-colors inline-block"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-auto space-y-8"
                            >
                                <div className="h-px w-full bg-gray-200" />

                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <p className="text-primary text-xs uppercase tracking-[0.2em] font-bold">Contact Us</p>
                                        <p className="text-gray-600 text-sm">+91 98765 43210</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-800 hover:bg-primary hover:border-primary hover:text-white transition-all">
                                            <FaFacebookF />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-800 hover:bg-primary hover:border-primary hover:text-white transition-all">
                                            <FaInstagram />
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-800 hover:bg-primary hover:border-primary hover:text-white transition-all">
                                            <FaTwitter />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
