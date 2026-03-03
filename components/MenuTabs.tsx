"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
    name: string;
    price?: number;
    half?: number;
    full?: number;
    description?: string;
    note?: string;
}

interface MenuCategory {
    category: string;
    cuisine: string;
    type: string;
    section: string;
    items: MenuItem[];
}

interface MenuData {
    restaurant: {
        name: string;
        address: string;
        timings: string;
        notes: string[];
    };
    menu: MenuCategory[];
}

export default function MenuTabs() {
    const [menuData, setMenuData] = useState<MenuData | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load menu data from JSON file
        fetch('/menu.json')
            .then(response => response.json())
            .then((data: MenuData) => {
                setMenuData(data);
                // Extract unique categories
                const uniqueCategories = data.menu.map(cat => cat.category);
                setCategories(uniqueCategories);
                setActiveTab(uniqueCategories[0] || "");
                setLoading(false);
            })
            .catch(error => {
                console.error('Error loading menu:', error);
                setLoading(false);
            });
    }, []);

    const getActiveMenuItems = () => {
        if (!menuData || !activeTab) return [];
        const category = menuData.menu.find(cat => cat.category === activeTab);
        return category?.items || [];
    };

    const formatPrice = (item: MenuItem) => {
        if (item.half !== null && item.half !== undefined && item.full !== null && item.full !== undefined) {
            return `Half: ₹${item.half} | Full: ₹${item.full}`;
        }
        if (item.price !== null && item.price !== undefined) {
            return `₹${item.price}`;
        }
        if (item.note) {
            return item.note;
        }
        return "Price on request";
    };

    const getItemImage = (itemName: string, category: string) => {
        // Default images based on category
        const imageMap: { [key: string]: string } = {
            "Chinese Non-Veg Appetizer": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574",
            "Chinese Non-Veg Soups": "https://images.unsplash.com/photo-1547592166-23acbe346499?q=80&w=2670",
            "Chinese Non-Veg Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574",
            "Chinese Non-Veg Noodles": "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2584",
            "Chinese Non-Veg Chopsuey": "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574",
            "Chinese Chicken Dishes": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670",
            "Chinese Sea Food": "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670",
            "Chinese Veg Appetizer": "https://images.unsplash.com/photo-1625938146369-adc83226b919?q=80&w=2574",
            "Chinese Veg Soups": "https://images.unsplash.com/photo-1547592166-23acbe346499?q=80&w=2670",
            "Chinese Veg Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574",
            "Chinese Veg Noodles": "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=2584",
            "Chinese Veg Chopsuey": "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574",
            "Chinese Veg Dishes": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2600",
            "Kerala Non-Veg Soups": "https://images.unsplash.com/photo-1547592166-23acbe346499?q=80&w=2670",
            "Kerala Non-Veg Starters": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574",
            "Kerala Special Fish Fry & Curry": "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670",
            "Kerala Non-Veg Meals": "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574",
            "Kerala Special Meals": "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574",
            "Kerala Fish & Sea Food Curries": "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670",
            "Kerala Chicken Curries": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670",
            "Kerala Egg Dishes": "https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=2574",
            "Kerala Mutton Curries": "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2670",
            "Kerala Biryani": "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670",
            "Kerala Veg Starters": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2600",
            "Kerala Veg Dishes": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2600",
            "Kerala Paratha & Bread": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=2670",
            "Chettinad Veg Dishes": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2600",
            "Chettinad Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574",
            "Indian Non-Veg Main Course Chicken": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670",
            "Indian Non-Veg Fish": "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=2670",
            "Indian Non-Veg Main Course Mutton": "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2670",
            "Indian Veg Starters": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2600",
            "Indian Veg Dishes": "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2600",
            "Indian Paneer Dishes": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2574",
            "Indian Veg Pulav": "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574",
            "Indian Dal": "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574",
            "Indian Rice": "https://images.unsplash.com/photo-1603133872878-684f208fb65b?q=80&w=2574",
            "Tandoor Non-Veg": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500",
            "Tandoor Veg": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2600",
            "Tandoor Roti & Paratha": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=2670",
            "Salad & Raita": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2580",
            "Papad": "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670"
        };

        return imageMap[category] || "https://images.unsplash.com/photo-1546833998-877b37c2e5b4?q=80&w=2574";
    };

    if (loading) {
        return (
            <section id="menu" className="py-20 md:py-32 bg-cream">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center">
                        <p className="text-accent text-lg">Loading menu...</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="menu" className="py-20 md:py-32 bg-cream">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-sm mb-3">Our Menu</h3>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-6">Explore Our Flavors</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                {/* Tab Navigation */}
                <div className="sticky top-20 z-40 bg-cream/95 backdrop-blur-sm py-4 mb-12 border-b border-accent/10">
                    <div className="flex overflow-x-auto space-x-2 md:space-x-4 pb-2 md:justify-start no-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveTab(category)}
                                className={`whitespace-nowrap px-6 py-2 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === category
                                        ? "bg-primary text-accent shadow-md scale-105"
                                        : "bg-transparent text-accent/60 hover:text-accent hover:bg-accent/5"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Items Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12"
                    >
                        {getActiveMenuItems().map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-6 p-4 rounded-sm hover:bg-white hover:shadow-lg transition-all duration-300 group ring-1 ring-transparent hover:ring-accent/5"
                            >
                                <div className="relative w-full sm:w-32 h-32 flex-shrink-0 overflow-hidden rounded-sm">
                                    <Image
                                        src={getItemImage(item.name, activeTab)}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <div className="flex-grow flex flex-col justify-center">
                                    <div className="flex justify-between items-baseline border-b border-dashed border-accent/20 pb-2 mb-2">
                                        <h4 className="text-xl font-display font-bold text-accent group-hover:text-secondary transition-colors">
                                            {item.name}
                                        </h4>
                                        <span className="text-lg font-bold text-primary whitespace-nowrap ml-2">
                                            {formatPrice(item)}
                                        </span>
                                    </div>
                                    {item.description && (
                                        <p className="text-gray-600 text-sm font-light leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                    {item.note && !item.price && !item.half && (
                                        <p className="text-gray-500 text-xs italic mt-1">
                                            {item.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <div className="text-center mt-12">
                    <p className="text-sm text-gray-500 italic">* Prices are subject to change. 5% GST Applicable.</p>
                </div>
            </div>
        </section>
    );
}
