"use client";

import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

export default function OwnerSpeaks() {
    return (
        <section id="founder" className="py-20 md:py-32 bg-white overflow-hidden relative scroll-mt-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Owner Photo */}
                    <div className="w-full lg:w-5/12 relative">
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden shadow-2xl border-4 border-cream">
                            <Image
                                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2670"
                                alt="Owner of Chopsticks Spice Malabar"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute top-0 right-10 md:right-20 w-32 h-32 md:w-48 md:h-48 bg-primary rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-7/12 text-center lg:text-left">
                        <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-base sm:text-lg mb-3">A Word From Our Owner</h3>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-accent mb-6">Serving Pune for 25 Years</h2>
                        <div className="w-16 h-1 bg-primary mx-auto lg:mx-0 rounded-full mb-8"></div>

                        <div className="relative">
                            <FaQuoteLeft className="text-4xl sm:text-6xl text-primary/10 absolute -top-4 -left-2 sm:-left-6" />
                            <p className="text-gray-600 text-lg sm:text-xl font-light leading-relaxed mb-8 relative z-10 italic">
                                "What started as a small dream to bring authentic Malabar flavors to Pune has blossomed into a beautiful 25-year journey. We don't just cook food; we craft memories. Every spice we blend, every dish we serve carries the warmth of our heritage and the love we have for our patrons. Thank you for making Chopsticks Spice Malabar a part of your lives."
                            </p>

                            <div>
                                <h4 className="text-xl font-bold font-display text-accent mb-1">Mr. Santosh Nair</h4>
                                <p className="text-sm font-medium text-primary uppercase tracking-wider">Founder & Head Chef</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
