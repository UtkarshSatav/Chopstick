"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaTimes } from "react-icons/fa";
import { saveFeedback } from "@/lib/feedback";

interface FeedbackModalProps {
    isOpen: boolean;
    orderId: string;
    onClose: () => void;
    onSubmitSuccess: () => void;
}

export default function FeedbackModal({ isOpen, orderId, onClose, onSubmitSuccess }: FeedbackModalProps) {
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [comment, setComment] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (rating === 0) {
            setStatus("error");
            return;
        }

        setStatus("submitting");

        try {
            await saveFeedback({ orderId, rating, comment });
            setStatus("success");
            setTimeout(() => {
                onSubmitSuccess();
                setStatus("idle");
                setRating(0);
                setComment("");
            }, 2000);
        } catch (error) {
            console.error("Failed to submit feedback:", error);
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[80]"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-[90%] max-w-md"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                            <div className="p-6 sm:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-secondary uppercase tracking-[0.2em] font-bold text-xs mb-1">Rate Your Order</h3>
                                        <h2 className="text-2xl font-display font-bold text-accent">How was your food?</h2>
                                    </div>
                                    <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                                        <FaTimes />
                                    </button>
                                </div>

                                {status === "success" ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                            ✓
                                        </div>
                                        <h3 className="text-xl font-bold text-accent mb-2">Thank you!</h3>
                                        <p className="text-gray-500">Your feedback helps us serve you better.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-3 text-center">Tap a star to rate</label>
                                            <div className="flex justify-center gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                                                    >
                                                        <FaStar
                                                            className={`text-4xl sm:text-5xl transition-colors ${(hoverRating || rating) >= star ? "text-primary" : "text-gray-200"
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                            {status === "error" && rating === 0 && (
                                                <p className="text-red-500 text-xs text-center mt-3 font-medium">Please select a rating</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="comment" className="block text-sm font-bold text-gray-700 mb-2">Tell us more (optional)</label>
                                            <textarea
                                                id="comment"
                                                rows={3}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="What did you like or dislike?"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="w-full bg-primary text-accent font-bold uppercase tracking-widest py-3.5 px-6 rounded-xl hover:bg-yellow-500 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {status === "submitting" ? "Submitting..." : "Submit Feedback"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
