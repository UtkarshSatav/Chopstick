"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaUtensils } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuGrid from "@/components/menu/MenuGrid";
import FilterChips from "@/components/menu/FilterChips";
import SearchBar from "@/components/menu/SearchBar";
import CategoryModal from "@/components/menu/CategoryModal";

export default function MenuPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [resultsCount, setResultsCount] = useState<number | undefined>(undefined);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const handleSelectCategory = (id: string) => {
        setSelectedCategory(id);
        setIsCategoryModalOpen(false);

        if (id === "all") {
            const scrollArea = document.getElementById("scrollable-menu");
            if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    };

    return (
        <main className="h-screen flex flex-col bg-white overflow-hidden">
            <Navbar />

            {/* Fixed header area: search + filters (sits below navbar, never scrolls) */}
            <div className="flex-shrink-0 pt-[100px] sm:pt-[112px] md:pt-[128px]">
                <SearchBar onSearchChange={setSearchQuery} searchQuery={searchQuery} resultsCount={resultsCount} />
                <FilterChips selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
            </div>

            {/* Scrollable menu area */}
            <div id="scrollable-menu" className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-0 sm:px-6 lg:px-8 py-2 sm:py-4">
                    <MenuGrid
                        selectedFilter={selectedFilter}
                        searchQuery={searchQuery}
                        onResultsChange={setResultsCount}
                    />
                </div>
                <Footer />
            </div>

            {/* Floating Menu FAB */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCategoryModalOpen(true)}
                className="fixed bottom-6 right-6 bg-accent text-white px-5 sm:px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-bold z-50 cursor-pointer hover:shadow-3xl transition-shadow"
            >
                <FaUtensils className="text-base" />
                <span className="text-sm sm:text-base">Menu</span>
            </motion.button>

            {/* Category Selection Modal */}
            <CategoryModal
                isOpen={isCategoryModalOpen}
                onClose={() => setIsCategoryModalOpen(false)}
                onSelectCategory={handleSelectCategory}
                selectedCategory={selectedCategory}
            />
        </main>
    );
}
