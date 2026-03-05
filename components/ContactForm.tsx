"use client";

import { useState } from "react";
import { saveContactMessage } from "@/lib/contact";

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.phone || !formData.message) {
            setStatus("error");
            return;
        }

        setStatus("submitting");

        try {
            await saveContactMessage(formData);
            setStatus("success");
            setFormData({ name: "", phone: "", email: "", message: "" });

            // Revert back to idle after a few seconds
            setTimeout(() => {
                setStatus("idle");
            }, 5000);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setStatus("error");
        }
    };

    return (
        <section id="contact-us" className="py-20 bg-cream scroll-mt-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-sm shadow-xl border-t-4 border-primary">
                    <div className="text-center mb-10">
                        <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-xs sm:text-sm mb-3">Get in Touch</h3>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-accent mb-4">We'd love to hear from you</h2>
                        <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-accent mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="Rohan Sharma"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-bold text-accent mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    placeholder="9876543210"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-accent mb-2">Email Address (Optional)</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="rohan@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-accent mb-2">Your Message *</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="How can we help you?"
                                required
                            ></textarea>
                        </div>

                        {status === "error" && (
                            <p className="text-red-500 text-sm font-medium">Please fill out all required fields properly.</p>
                        )}

                        {status === "success" && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm font-medium">
                                Thank you! Your message has been sent successfully. We will get back to you soon.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === "submitting" || status === "success"}
                            className="w-full bg-primary text-accent font-bold uppercase tracking-widest py-4 px-8 rounded-sm hover:bg-yellow-500 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {status === "submitting" ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
