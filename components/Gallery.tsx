"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const galleryImages = [
    { id: 1, category: "Food", src: "/images/IMG_20240310_134802992_HDR.jpg" },
    { id: 2, category: "Food", src: "/images/IMG_20240310_134810465_HDR.jpg" },
    { id: 3, category: "Food", src: "/images/IMG_20240310_134834415_HDR.jpg" },
    { id: 4, category: "Food", src: "/images/IMG_20240310_135859376.jpg" },
    { id: 5, category: "Food", src: "/images/IMG_20240310_141322313_HDR.jpg" },
    { id: 6, category: "Food", src: "/images/IMG_20240310_141324653_HDR.jpg" },
    { id: 7, category: "Food", src: "/images/IMG_20240310_142903998_HDR.jpg" },
    { id: 8, category: "Food", src: "/images/IMG_20240310_142912910_HDR.jpg" },
    { id: 9, category: "Food", src: "/images/IMG_20240310_205612326.jpg" },
    { id: 10, category: "Food", src: "/images/IMG_20240310_205630276.jpg" },
    { id: 11, category: "Food", src: "/images/IMG_20240310_205718582.jpg" },
    { id: 12, category: "Food", src: "/images/IMG_20240310_205825741.jpg" },
    { id: 13, category: "Food", src: "/images/IMG_20240310_205939416.jpg" },
    { id: 14, category: "Food", src: "/images/IMG-20240310-WA0003.jpg" }
];

export default function Gallery() {
    const [filter, setFilter] = useState("All");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const filteredImages = filter === "All"
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    return (
        <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-12">
                    <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3">Gallery</h3>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-accent mb-6">Moments & Memories</h2>
                    <div className="w-16 sm:w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Filter Buttons - with horizontal scroll on mobile */}
                <div className="flex justify-start sm:justify-center items-center space-x-2 sm:space-x-4 mb-10 overflow-x-auto pb-4 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                    {["All", "Food", "Ambience", "Events"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 text-[10px] sm:text-sm font-bold uppercase tracking-widest border-b-2 transition-all duration-300 flex-shrink-0 ${filter === cat ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-accent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid - 1 column on extra small, 2 on small, 3 on md, 4 on lg */}
                <motion.div layout className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image) => (
                            <motion.div
                                layout
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative aspect-square overflow-hidden rounded-sm cursor-pointer group shadow-sm hover:shadow-xl transition-shadow"
                                onClick={() => setSelectedImage(image.src)}
                            >
                                <Image
                                    src={image.src}
                                    alt={`Gallery image ${image.id}`}
                                    fill
                                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-bold uppercase tracking-widest text-[10px] sm:text-xs border border-white px-4 py-2">View</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white text-3xl hover:text-primary transition-colors z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-square sm:aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Selected"
                                fill
                                priority
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
