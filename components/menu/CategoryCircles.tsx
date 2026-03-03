"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Category {
    id: string;
    name: string;
    image: string;
    count: number;
}

// Function to get image based on category name
function getCategoryImage(categoryName: string): string {
    const name = categoryName.toLowerCase();

    // Chinese categories
    if (name.includes("chinese") && name.includes("appetizer")) {
        return "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574";
    }
    if (name.includes("chinese") && name.includes("soup")) {
        return "https://images.unsplash.com/photo-1547592166-23acbe346499?q=80&w=2670";
    }
    if (name.includes("chinese") && name.includes("rice")) {
        return "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574";
    }
    if (name.includes("chinese") && name.includes("noodle")) {
        return "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2584";
    }
    if (name.includes("chinese") && (name.includes("chicken") || name.includes("sea food"))) {
        return "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670";
    }
    if (name.includes("chinese")) {
        return "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2672";
    }

    // Kerala categories
    if (name.includes("kerala") && name.includes("starter")) {
        return "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574";
    }
    if (name.includes("kerala") && name.includes("fish")) {
        return "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670";
    }
    if (name.includes("kerala") && name.includes("biryani")) {
        return "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670";
    }
    if (name.includes("kerala") && (name.includes("meal") || name.includes("thali"))) {
        return "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574";
    }
    if (name.includes("kerala") && name.includes("curry")) {
        return "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670";
    }
    if (name.includes("kerala") && (name.includes("bread") || name.includes("paratha"))) {
        return "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=2670";
    }
    if (name.includes("kerala")) {
        return "https://images.unsplash.com/photo-1596797038558-9da39b968efe?q=80&w=2574";
    }

    // Chettinad
    if (name.includes("chettinad")) {
        return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2672";
    }

    // Indian categories
    if (name.includes("indian") && name.includes("chicken")) {
        return "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670";
    }
    if (name.includes("indian") && name.includes("mutton")) {
        return "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2670";
    }
    if (name.includes("indian") && name.includes("fish")) {
        return "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670";
    }
    if (name.includes("indian") && name.includes("paneer")) {
        return "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2574";
    }
    if (name.includes("indian") && (name.includes("dal") || name.includes("veg"))) {
        return "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574";
    }
    if (name.includes("indian") && (name.includes("rice") || name.includes("pulav"))) {
        return "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574";
    }
    if (name.includes("indian")) {
        return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2672";
    }

    // Tandoor
    if (name.includes("tandoor") && (name.includes("roti") || name.includes("paratha") || name.includes("naan"))) {
        return "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=2670";
    }
    if (name.includes("tandoor")) {
        return "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500";
    }

    // Salad & Raita
    if (name.includes("salad") || name.includes("raita")) {
        return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2580";
    }

    // Papad
    if (name.includes("papad")) {
        return "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670";
    }

    // Default
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670";
}

export default function CategoryCircles({
    selectedCategory,
    onSelectCategory
}: {
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
}) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch menu data and build categories
        fetch('/Menu.json')
            .then(response => response.json())
            .then(data => {
                // Build category array from menu data
                const categoryList: Category[] = [
                    {
                        id: "all",
                        name: "All Dishes",
                        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670",
                        count: data.menu.reduce((total: number, cat: any) => total + cat.items.length, 0)
                    }
                ];

                // Add each menu category
                data.menu.forEach((categoryData: any) => {
                    categoryList.push({
                        id: categoryData.category.toLowerCase().replace(/\s+/g, '-'),
                        name: categoryData.category,
                        image: getCategoryImage(categoryData.category),
                        count: categoryData.items.length
                    });
                });

                setCategories(categoryList);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading categories:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="py-6 bg-white border-b border-accent/5 sticky top-32 sm:top-36 md:top-40 z-30 shadow-sm">
                <div className="flex justify-center">
                    <p className="text-gray-400 text-sm">Loading categories...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-2 sm:py-6 overflow-x-auto md:overflow-x-auto no-scrollbar bg-white border-b border-accent/5 sticky top-32 sm:top-36 md:top-40 z-30 shadow-sm category-container">
            <div className="category-grid flex justify-start items-start space-x-4 sm:space-x-6 px-4 sm:px-10 min-w-max md:min-w-max">
                {categories.map((cat) => (
                    <motion.div
                        key={cat.id}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group flex-shrink-0"
                        onClick={() => onSelectCategory(cat.id)}
                    >
                        <div className={`relative w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden p-0.5 transition-all duration-500 ${selectedCategory === cat.id ? "bg-primary shadow-lg shadow-primary/20 scale-105" : "bg-gray-100 group-hover:bg-primary/20"
                            }`}>
                            <div className="relative w-full h-full rounded-full overflow-hidden border border-white">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    fill
                                    sizes="(max-width: 768px) 44px, 64px"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            {/* Item count badge */}
                            <div className="absolute -bottom-1 -right-1 bg-primary text-accent text-[8px] sm:text-[9px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border-2 border-white shadow-md">
                                {cat.count}
                            </div>
                        </div>
                        <span className={`category-label text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-center leading-tight transition-colors duration-300 ${selectedCategory === cat.id ? "text-primary" : "text-gray-500 group-hover:text-accent"
                            }`}>
                            {cat.name}
                        </span>
                        {selectedCategory === cat.id && (
                            <motion.div
                                layoutId="categoryUnderline"
                                className="w-6 h-0.5 bg-primary rounded-full"
                            />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
