"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section id="about" className="py-16 sm:py-24 md:py-32 bg-cream overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">

                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative min-h-[350px] sm:min-h-[450px] md:h-[600px] lg:sticky lg:top-32"
                    >
                        <div className="absolute inset-0 bg-accent/5 rounded-sm transform translate-x-4 translate-y-4" />
                        <div className="relative h-[350px] sm:h-[450px] md:h-full w-full rounded-sm overflow-hidden shadow-xl">
                            <Image
                                src="/image.png"
                                alt="Chopsticks Spice Malabar Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Badge */}
                        <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-right-12 bg-secondary text-cream p-4 sm:p-6 rounded-full w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center shadow-lg z-10 border-4 border-cream">
                            <span className="text-2xl sm:text-3xl font-bold font-display">25+</span>
                            <span className="text-[8px] sm:text-xs uppercase tracking-widest text-center">Years of Legacy</span>
                        </div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full lg:w-1/2 space-y-6 md:space-y-8"
                    >
                        <div className="space-y-2">
                            <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-xs sm:text-sm">About Us</h3>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-accent leading-tight">
                                Refined. Authentic. <br /> <span className="text-primary italic">Enduring.</span>
                            </h2>
                        </div>

                        <div className="space-y-4 sm:space-y-6 text-gray-700 leading-relaxed font-light text-base sm:text-lg">
                            <p>
                                For over 25 years, <strong className="font-semibold text-accent">Chopsticks Spice Malabar</strong> has been a distinguished name in Pune's dining landscape, celebrated for its commitment to quality, authenticity, and timeless flavours. Rooted in tradition yet evolving with the city, our restaurant has earned the trust of generations who value refined taste, consistency, and thoughtfully prepared cuisine.
                            </p>

                            <p>
                                Our culinary philosophy brings together the richness of <strong className="font-semibold text-accent">Kerala's Malabar heritage</strong>, the finesse of Chinese cuisine, the depth of Indian flavours, and the robust character of Tandoori specialities. Each dish is carefully crafted using premium ingredients, balanced spices, and techniques perfected over decades — resulting in flavours that are both memorable and comforting.
                            </p>

                            <p>
                                At <strong className="font-semibold text-accent">Chopsticks Spice Malabar</strong>, dining is more than a meal; it is an experience shaped by experience, warmth, and attention to detail. Whether it's an intimate gathering or a family celebration, we invite you to savour cuisine that reflects our legacy — refined, authentic, and enduring.
                            </p>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="space-y-4 sm:space-y-6 overflow-hidden"
                                    >
                                        <p>
                                            What sets us apart is our unwavering dedication to excellence. From sourcing quality ingredients to maintaining the highest standards of hygiene and service, every aspect of our kitchen and hospitality is guided by precision and care. We believe true luxury lies in consistency — in delivering exceptional flavours time after time.
                                        </p>
                                        <p>
                                            Our chefs bring decades of expertise to the table, blending traditional recipes with contemporary presentation. Signature Malabar curries, expertly wok-tossed Chinese favourites, aromatic Indian classics, and perfectly charred tandoori creations come together in a menu designed to satisfy diverse palates while preserving authenticity.
                                        </p>
                                        <p>
                                            Today, as Pune continues to grow and redefine its culinary identity, <strong className="font-semibold text-accent">Chopsticks Spice Malabar</strong> remains proudly rooted in its heritage. We are grateful to the families, loyal patrons, and new guests who continue to make us part of their celebrations, conversations, and everyday moments — a legacy we honour with every dish we serve.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="mt-4 px-8 py-3 bg-accent text-primary text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-secondary hover:text-white transition-all shadow-md"
                        >
                            {isExpanded ? "Show Less" : "Learn More"}
                        </motion.button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
