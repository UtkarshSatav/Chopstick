"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { subscribeToMenu } from "@/lib/menu";

const categoryImages: Record<string, string> = {
    "chinese": "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2672",
    "kerala": "https://images.unsplash.com/photo-1596797038558-9da39b968efe?q=80&w=2574",
    "indian": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=2672",
    "tandoori": "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2500",
    "starters": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574",
    "main-course": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2670",
    "rice-breads": "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2670",
    "default": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670"
};

function processMenuData(menuData: any): any[] {
    const products: any[] = [];
    let itemIdCounter = 1;

    menuData.menu.forEach((categoryData: any) => {
        const categoryName = categoryData.category.toLowerCase();
        const categoryId = categoryData.category.toLowerCase().replace(/\s+/g, '-');
        const cuisineType = categoryData.cuisine.toLowerCase();
        const itemType = categoryData.type.toLowerCase();

        categoryData.items.forEach((item: any) => {
            const categories = ["all", categoryId];

            if (cuisineType.includes("chinese")) categories.push("chinese");
            if (cuisineType.includes("kerala")) categories.push("kerala");
            if (cuisineType.includes("indian")) categories.push("indian");
            if (cuisineType.includes("chettinad")) categories.push("indian");
            if (cuisineType.includes("tandoor")) categories.push("tandoori");

            if (categoryName.includes("appetizer") || categoryName.includes("starter")) {
                categories.push("starters");
            }
            if (categoryName.includes("main course") || categoryName.includes("curry") ||
                categoryName.includes("curries") || categoryName.includes("dishes") ||
                categoryName.includes("meals") || categoryName.includes("thali")) {
                categories.push("main-course");
            }
            if (categoryName.includes("rice") || categoryName.includes("noodles") ||
                categoryName.includes("bread") || categoryName.includes("paratha") ||
                categoryName.includes("biryani") || categoryName.includes("pulav") ||
                categoryName.includes("chopsuey")) {
                categories.push("rice-breads");
            }

            // Use the category-level `type` as the primary source of truth.
            // Also check for a per-item `type` override (e.g. "Drumstick Soup" inside a non-veg category).
            const itemLevelType = (item.type || "").toLowerCase();
            const effectiveType = itemLevelType || itemType;

            const isVeg = effectiveType === "vegetarian" ||
                // Match "veg" as a standalone word in category name, NOT inside "non-veg"
                /\bveg\b/.test(categoryName.replace(/non-veg/gi, "")) ||
                item.name.toLowerCase().includes("veg") ||
                item.name.toLowerCase().includes("paneer") ||
                item.name.toLowerCase().includes("dal") ||
                item.name.toLowerCase().includes("gobi") ||
                item.name.toLowerCase().includes("aloo");

            const displayPrice = item.price || item.full || item.half || 0;

            products.push({
                id: `item_${itemIdCounter++}`,
                name: item.name,
                price: displayPrice,
                priceHalf: item.half,
                priceFull: item.full,
                categories: categories,
                categoryName: categoryData.category,
                veg: isVeg,
                image: categoryImages[categories[1]] || categoryImages["default"]
            });
        });
    });

    return products;
}

function levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix: number[][] = [];
    for (let i = 0; i <= len1; i++) matrix[i] = [i];
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[len1][len2];
}

function calculateRelevance(itemName: string, searchQuery: string): number {
    const itemLower = itemName.toLowerCase();
    const queryLower = searchQuery.toLowerCase();
    if (itemLower === queryLower) return 1000;
    if (itemLower.startsWith(queryLower)) return 500;
    if (itemLower.includes(queryLower)) return 300;
    const distance = levenshteinDistance(itemLower, queryLower);
    const maxLength = Math.max(itemLower.length, queryLower.length);
    const similarity = 1 - distance / maxLength;
    if (similarity > 0.4) return similarity * 100;
    const itemWords = itemLower.split(/\s+/);
    const queryWords = queryLower.split(/\s+/);
    for (const queryWord of queryWords) {
        for (const itemWord of itemWords) {
            if (itemWord.startsWith(queryWord)) return 200;
            if (itemWord.includes(queryWord)) return 150;
            const wordDistance = levenshteinDistance(itemWord, queryWord);
            const wordSimilarity = 1 - wordDistance / Math.max(itemWord.length, queryWord.length);
            if (wordSimilarity > 0.6) return wordSimilarity * 100;
        }
    }
    return 0;
}

// Group products by categoryName and prepend a "Recommended" category.
function groupByCategory(products: any[]): { name: string; items: any[] }[] {
    const map = new Map<string, any[]>();
    for (const p of products) {
        const key = p.categoryName;
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(p);
    }

    // Pick 4 random items for a Recommended category
    const allProductsArray = Array.from(products);
    const seed = 42;
    const shuffled = [...allProductsArray].sort((a, b) => {
        const ha = ((a.id.charCodeAt(a.id.length - 1) * seed) % 997);
        const hb = ((b.id.charCodeAt(b.id.length - 1) * seed) % 997);
        return ha - hb;
    });

    const recs = shuffled.slice(0, 4);
    const groups = Array.from(map.entries()).map(([name, items]) => ({ name, items }));

    if (recs.length > 0) {
        groups.unshift({ name: "Recommended", items: recs });
    }

    return groups;
}

export default function MenuGrid({ selectedFilter = "all", searchQuery = "", onResultsChange }: {
    selectedFilter?: string;
    searchQuery?: string;
    onResultsChange?: (count: number) => void;
}) {
    const { addToCart, cart, updateQuantity } = useCart();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

    useEffect(() => {
        const unsub = subscribeToMenu((data) => {
            if (data) {
                const processedProducts = processMenuData(data);
                setProducts(processedProducts);
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const filteredProducts = useMemo(() => {
        let results: any[] = [];

        if (searchQuery.trim()) {
            const productsWithRelevance = products.map((product: any) => ({
                ...product,
                relevance: calculateRelevance(product.name, searchQuery)
            }));
            results = productsWithRelevance
                .filter((p: any) => p.relevance > 0)
                .sort((a: any, b: any) => b.relevance - a.relevance);
        } else {
            results = products;
        }

        // Apply dietary filter
        if (selectedFilter === "veg") {
            results = results.filter((p: any) => p.veg);
        } else if (selectedFilter === "non-veg") {
            results = results.filter((p: any) => !p.veg);
        }

        return results;
    }, [products, searchQuery, selectedFilter]);

    useEffect(() => {
        if (searchQuery.trim() && onResultsChange) {
            onResultsChange(filteredProducts.length);
        } else if (onResultsChange) {
            onResultsChange(undefined as any);
        }
    }, [filteredProducts.length, searchQuery, onResultsChange]);

    const toggleSection = (name: string) => {
        setCollapsedSections(prev => {
            const next = new Set(prev);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-accent text-lg">Loading menu...</p>
            </div>
        );
    }

    const grouped = groupByCategory(filteredProducts);

    return (
        <div className="pb-32">
            {grouped.map((group) => {
                const isCollapsed = collapsedSections.has(group.name);

                return (
                    <section key={group.name} id={group.name.toLowerCase().replace(/\s+/g, '-')} className="mt-2 scroll-mt-32">
                        {/* Section Header */}
                        <button
                            onClick={() => toggleSection(group.name)}
                            className="w-full px-4 sm:px-0 flex items-center justify-between py-4 cursor-pointer"
                        >
                            <h2 className="text-lg sm:text-xl font-bold text-accent">{group.name}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">{group.items.length} items</span>
                                <motion.svg
                                    animate={{ rotate: isCollapsed ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                >
                                    <polyline points="18 15 12 9 6 15" />
                                </motion.svg>
                            </div>
                        </button>

                        {/* Items */}
                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    {group.items.map((product, idx) => {
                                        const cartItem = cart.find(item => item.id === product.id);
                                        const quantity = cartItem ? cartItem.quantity : 0;

                                        return (
                                            <div
                                                key={product.id}
                                                className={`px-4 sm:px-0 pb-8 mb-4 ${idx < group.items.length - 1
                                                    ? "border-b border-dashed border-gray-200"
                                                    : ""
                                                    }`}
                                            >
                                                <div className="flex gap-4">
                                                    {/* Left: Info */}
                                                    <div className="flex-1 min-w-0">
                                                        {/* Veg/Non-veg indicator */}
                                                        <div className="mb-1.5">
                                                            <span className={`inline-flex w-4 h-4 border items-center justify-center p-0.5 ${product.veg ? "border-green-600" : "border-red-600"
                                                                }`}>
                                                                <span className={`w-1.5 h-1.5 rounded-full ${product.veg ? "bg-green-600" : "bg-red-600"
                                                                    }`}></span>
                                                            </span>
                                                        </div>

                                                        {/* Name */}
                                                        <h3 className="text-base sm:text-lg font-bold text-accent leading-tight mb-1">
                                                            {product.name}
                                                        </h3>

                                                        {/* Price */}
                                                        <p className="font-semibold text-accent mb-2">
                                                            ₹{product.price}
                                                        </p>

                                                        {/* Description */}
                                                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                                            Authentic preparation with fresh ingredients and traditional spices.
                                                        </p>
                                                    </div>

                                                    {/* Right: Image + ADD button */}
                                                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            sizes="(max-width: 640px) 112px, 144px"
                                                            className="object-cover rounded-2xl shadow-sm"
                                                        />

                                                        {/* ADD / Quantity Button */}
                                                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10">
                                                            {quantity === 0 ? (
                                                                <motion.button
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() => addToCart({
                                                                        id: product.id,
                                                                        name: product.name,
                                                                        price: product.price,
                                                                        image: product.image
                                                                    })}
                                                                    className="bg-white border border-primary/20 shadow-md text-primary font-bold px-6 sm:px-8 py-1.5 sm:py-2 rounded-lg text-sm relative cursor-pointer hover:shadow-lg transition-shadow"
                                                                >
                                                                    ADD
                                                                    <span className="absolute top-0.5 right-1.5 text-primary/60 text-[10px]">+</span>
                                                                </motion.button>
                                                            ) : (
                                                                <div className="bg-white border border-primary/20 shadow-md rounded-lg flex items-center overflow-hidden">
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => updateQuantity(product.id, quantity - 1)}
                                                                        className="px-2.5 py-1.5 text-primary font-bold text-sm hover:bg-primary/5 transition-colors cursor-pointer"
                                                                    >
                                                                        <FaMinus size={10} />
                                                                    </motion.button>
                                                                    <span className="px-3 py-1.5 text-primary font-bold text-sm min-w-[28px] text-center">
                                                                        {quantity}
                                                                    </span>
                                                                    <motion.button
                                                                        whileTap={{ scale: 0.9 }}
                                                                        onClick={() => updateQuantity(product.id, quantity + 1)}
                                                                        className="px-2.5 py-1.5 text-primary font-bold text-sm hover:bg-primary/5 transition-colors cursor-pointer"
                                                                    >
                                                                        <FaPlus size={10} />
                                                                    </motion.button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {/* End of Items */}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                );
            })}

            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <p className="text-lg font-medium">No dishes found</p>
                    <p className="text-sm mt-1">Try adjusting your filters or search</p>
                </div>
            )}
        </div>
    );
}
