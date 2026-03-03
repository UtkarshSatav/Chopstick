"use client";

import { motion } from "framer-motion";

const filters = [
    { id: "all", label: "Filters", icon: "tune", type: "icon" },
    { id: "veg", label: "Veg", type: "veg" },
    { id: "non-veg", label: "Non-veg", type: "nonveg" },
];

interface FilterChipsProps {
    selectedFilter: string;
    onSelectFilter: (id: string) => void;
}

export default function FilterChips({ selectedFilter, onSelectFilter }: FilterChipsProps) {
    return (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-100">
            {filters.map((filter) => {
                const isActive = selectedFilter === filter.id;
                return (
                    <motion.button
                        key={filter.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectFilter(isActive && filter.id !== "all" ? "all" : filter.id)}
                        className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${isActive && filter.id !== "all"
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-gray-200 text-gray-700 hover:border-gray-300"
                            }`}
                    >
                        {filter.type === "icon" && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                                <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                                <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" />
                                <line x1="17" y1="16" x2="23" y2="16" />
                            </svg>
                        )}
                        {filter.type === "veg" && (
                            <span className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 ${isActive ? "border-green-600" : "border-green-600"}`}>
                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                            </span>
                        )}
                        {filter.type === "nonveg" && (
                            <span className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 ${isActive ? "border-red-600" : "border-red-600"}`}>
                                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                            </span>
                        )}
                        {filter.label}
                    </motion.button>
                );
            })}
        </div>
    );
}
