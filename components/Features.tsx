"use client";

import { motion } from "framer-motion";
import { FaUtensils, FaLeaf, FaAward, FaUsers } from "react-icons/fa";

const features = [
    {
        icon: <FaUtensils className="text-4xl text-primary" />,
        title: "Authentic Flavours",
        description: "Recipes passed down through generations, maintaining the true essence of Malabar and Chinese cuisine."
    },
    {
        icon: <FaLeaf className="text-4xl text-primary" />,
        title: "Premium Ingredients",
        description: "We source only the freshest produce and highest quality spices to ensure every dish is perfect."
    },
    {
        icon: <FaAward className="text-4xl text-primary" />,
        title: "25+ Years Experience",
        description: "A legacy of culinary excellence serving Pune's food lovers with consistency and passion."
    },
    {
        icon: <FaUsers className="text-4xl text-primary" />,
        title: "Family-Friendly",
        description: "A warm, inviting atmosphere perfect for family gatherings, celebrations, and detailed conversations."
    }
];

export default function Features() {
    return (
        <section className="py-20 md:py-32 bg-accent text-cream relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#D4A017 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h3 className="text-primary uppercase tracking-[0.2em] font-bold text-sm mb-3">Why Choose Us</h3>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Our Commitment</h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-sm p-8 rounded-sm border border-white/10 hover:bg-white/10 transition-colors duration-300 text-center group"
                        >
                            <div className="mb-6 inline-block p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-300 transform group-hover:scale-110">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-display font-bold text-primary mb-4">{feature.title}</h3>
                            <p className="text-gray-300 font-light leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
