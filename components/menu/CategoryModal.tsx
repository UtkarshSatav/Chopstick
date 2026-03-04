"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface CategoryItem {
    id: string;
    name: string;
    count: number;
}

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectCategory: (id: string) => void;
    selectedCategory: string;
}

export default function CategoryModal({ isOpen, onClose, onSelectCategory, selectedCategory }: CategoryModalProps) {
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    useEffect(() => {
        fetch('/Menu.json')
            .then(response => response.json())
            .then(data => {
                const catList: CategoryItem[] = [];

                data.menu.forEach((categoryData: any) => {
                    catList.push({
                        id: categoryData.category.toLowerCase().replace(/\s+/g, '-'),
                        name: categoryData.category,
                        count: categoryData.items.length
                    });
                });

                catList.unshift({
                    id: 'recommended',
                    name: 'Recommended',
                    count: 4 // The number of random items we picked in MenuGrid
                });

                setCategories(catList);
            })
            .catch(error => {
                console.error('Error loading categories:', error);
            });
    }, []);

    const handleSelect = (id: string) => {
        onSelectCategory(id);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
                        onClick={onClose}
                    />

                    {/* Modal + Close Button Container */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-x-0 bottom-0 z-[70] flex flex-col items-center px-4 pb-8"
                    >
                        {/* Modal Card */}
                        <div className="w-full max-w-md bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col mb-4">
                            {/* Header */}
                            <div className="px-6 pt-6 pb-2">
                                <h2 className="text-xl font-bold text-secondary tracking-tight">Browse Categories</h2>
                            </div>

                            {/* Category List */}
                            <div className="max-h-[60vh] overflow-y-auto px-6 py-2">
                                {/* All Dishes - highlighted */}
                                <button
                                    onClick={() => handleSelect("all")}
                                    className="w-full flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer"
                                >
                                    <span className={`font-semibold ${selectedCategory === "all" ? "text-secondary" : "text-secondary"}`}>
                                        All Dishes
                                    </span>
                                    <span className="text-gray-900 font-medium">
                                        {categories.reduce((sum, c) => sum + c.count, 0)}
                                    </span>
                                </button>

                                {categories.map((cat, index) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleSelect(cat.id)}
                                        className={`w-full flex items-center justify-between py-4 cursor-pointer ${index < categories.length - 1 ? "border-b border-gray-100" : ""
                                            }`}
                                    >
                                        <span className={`font-medium ${selectedCategory === cat.id
                                            ? "text-secondary"
                                            : "text-gray-800"
                                            }`}>
                                            {cat.name}
                                        </span>
                                        <span className="text-gray-500">{cat.count}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Close Button */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="bg-accent text-white px-8 py-3.5 rounded-full flex items-center gap-2 font-semibold shadow-xl cursor-pointer"
                        >
                            <FaTimes className="text-sm" />
                            <span>Close</span>
                        </motion.button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
