"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
    {
        id: 1,
        name: "Rahul Mehta",
        rating: 5,
        text: "The most authentic Malabar food I've had in Pune! The biryani is absolutely divine and the service makes you feel right at home. A must-visit!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574"
    },
    {
        id: 2,
        name: "Sneha Kapoor",
        rating: 5,
        text: "We celebrated my parents' anniversary here and everything was perfect. The Tandoori Platter was the highlight. Friendly staff and great ambience.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574"
    },
    {
        id: 3,
        name: "Arjun Deshmukh",
        rating: 5,
        text: "Consistent taste for the last 10 years. Chopsticks Spice Malbar never disappoints. Their Chinese spread is as good as their Indian dishes.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574"
    },
    {
        id: 4,
        name: "Priya Nair",
        rating: 5,
        text: "Being a Malayali, I'm picky about my fish curry, but this place nails it every time. Authentic, flavorful, and full of soul.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2574"
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 8000); // More time to read on mobile
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-16 sm:py-24 md:py-32 bg-cream overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3">Testimonials</h3>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-accent mb-6">Unforgettable Experiences</h2>
                    <div className="w-16 sm:w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="max-w-4xl mx-auto relative px-4 xs:px-8">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="bg-white p-6 sm:p-10 md:p-12 rounded-sm shadow-xl text-center relative"
                        >
                            <FaQuoteLeft className="text-2xl sm:text-4xl text-primary/10 absolute top-4 left-4 sm:top-8 sm:left-8" />

                            <div className="flex justify-center mb-4 sm:mb-6">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <FaStar key={i} className="text-primary text-base sm:text-xl mx-0.5" />
                                ))}
                            </div>

                            <p className="text-gray-600 text-base sm:text-lg md:text-xl italic font-light leading-relaxed mb-6 sm:mb-8 relative z-10">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div className="flex flex-col items-center justify-center">
                                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-3 border-2 border-primary p-0.5 sm:p-1">
                                    <Image
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].name}
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <h4 className="text-accent font-bold font-display text-base sm:text-lg">{testimonials[currentIndex].name}</h4>
                                <span className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">Happy Customer</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons - Hidden on very small screens, use dots instead */}
                    <button
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-2 sm:-left-6 md:-left-12 transform -translate-y-1/2 bg-white text-accent p-2 sm:p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-20 hidden xs:flex items-center justify-center"
                        aria-label="Previous testimonial"
                    >
                        <FaChevronLeft className="text-sm sm:text-base" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-2 sm:-right-6 md:-right-12 transform -translate-y-1/2 bg-white text-accent p-2 sm:p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all z-20 hidden xs:flex items-center justify-center"
                        aria-label="Next testimonial"
                    >
                        <FaChevronRight className="text-sm sm:text-base" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center mt-6 sm:mt-10 space-x-2 sm:space-x-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${index === currentIndex ? "bg-secondary w-6 sm:w-10" : "bg-gray-300 hover:bg-primary w-1.5 sm:w-2"
                                    }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
