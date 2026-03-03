"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function Toast() {
    const { notification, clearNotification } = useCart();

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                clearNotification();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification, clearNotification]);

    return (
        <AnimatePresence>
            {notification && (
                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-sm px-4 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md bg-opacity-90 border border-white/10"
                    >
                        <FaCheckCircle className="text-green-400 text-xl flex-shrink-0" />
                        <p className="font-medium text-sm">{notification}</p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
