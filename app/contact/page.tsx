"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            {/* Page Header */}
            <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-accent overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('/images/contact_header_bg.png')] bg-cover bg-center"></div>
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-display font-bold text-white mb-4"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-1 bg-primary mx-auto rounded-full"
                    ></motion.div>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        {/* Contact Information */}
                        <div className="lg:col-span-1 space-y-8 bg-white p-8 rounded-sm shadow-xl border-l-4 border-primary">
                            <div>
                                <h3 className="text-2xl font-display font-bold text-accent mb-6">Get in Touch</h3>
                                <p className="text-gray-600 mb-8 font-light">
                                    Have a question or feedback? We'd love to hear from you.
                                    Reach out to us through any of the following channels.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-accent">Location</h4>
                                        <p className="text-gray-600 text-sm">Datta Mandir Chowk, Viman Nagar, Pune.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                                        <FaPhone />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-accent">Phone</h4>
                                        <p className="text-gray-600 text-sm">9665065344 / 9890082699</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-accent">Email</h4>
                                        <p className="text-gray-600 text-sm">chopsticksspicemalabar@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-cream rounded-full flex items-center justify-center text-primary shadow-sm shrink-0">
                                        <FaClock />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-accent">Opening Hours</h4>
                                        <p className="text-gray-600 text-sm">Mon - Sun: 11:30 AM - 11:30 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form - We wrap it to handle its own section logic if needed, 
                            but since ContactForm has its own section, we might need to be careful.
                            Actually, using the component directly will bring its section wrapper.
                        */}
                        <div className="lg:col-span-2">
                            <ContactForm minimal />
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section Full Width */}
            <section className="h-[450px] w-full border-t border-gray-100">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.0847469896707!2d73.91447807516857!3d18.57254826835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c14df5e7e1c5%3A0x8e4e4e4e4e4e4e4e!2sDatta%20Mandir%20Chowk!5e0!3m2!1sen!2sin!4v1647844059000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Restaurant Location"
                ></iframe>
            </section>

            <Footer />
        </main>
    );
}
