"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppFloat() {
    return (
        <motion.a
            href="https://wa.me/919890082699"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-xl shadow-[#25D366]/30 flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
            aria-label="Chat with us on WhatsApp"
        >
            <FaWhatsapp className="text-2xl sm:text-3xl" />
        </motion.a>
    );
}
