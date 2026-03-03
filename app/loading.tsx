"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-cream z-[9999] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: [0.8, 1.1, 0.8],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative w-32 h-32 sm:w-48 sm:h-48"
            >
                <Image
                    src="/chopsticklog.png"
                    alt="Loading..."
                    fill
                    className="object-contain"
                    priority
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-20 flex space-x-2"
            >
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                        }}
                        className="w-3 h-3 bg-primary rounded-full"
                    />
                ))}
            </motion.div>
        </div>
    );
}
