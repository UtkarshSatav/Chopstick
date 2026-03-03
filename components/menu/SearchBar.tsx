"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

interface SearchBarProps {
    onSearchChange: (query: string) => void;
    searchQuery: string;
    resultsCount?: number;
}

export default function SearchBar({ onSearchChange, searchQuery, resultsCount }: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);

    const handleClear = () => {
        onSearchChange("");
    };

    return (
        <div className="py-3 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
            <div className="container mx-auto max-w-2xl">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative transition-all duration-300 ${isFocused ? "scale-[1.01]" : "scale-100"}`}
                >
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <FaSearch className="text-sm" />
                    </div>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search in menu"
                        className={`w-full pl-10 pr-10 py-2.5 text-sm rounded-full transition-all duration-300 outline-none ${isFocused
                            ? "bg-gray-100 ring-2 ring-primary/20"
                            : "bg-gray-100 hover:bg-gray-200/70"
                            } text-accent placeholder:text-gray-400 border-none`}
                    />

                    <AnimatePresence>
                        {searchQuery && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleClear}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
                                aria-label="Clear search"
                            >
                                <FaTimes className="text-sm" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>

                {searchQuery && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-gray-500 mt-2 text-center"
                    >
                        {resultsCount !== undefined ? `${resultsCount} result${resultsCount !== 1 ? 's' : ''} found for "${searchQuery}"` : `Searching for "${searchQuery}"...`}
                    </motion.p>
                )}
            </div>
        </div>
    );
}
