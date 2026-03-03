"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrash, FaPlus, FaMinus, FaUtensils } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartSidebar() {
    const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, toggleCart } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                    />

                    {/* Sidebar - Full width on small screens, max-width on larger */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-cream">
                            <h2 className="text-xl sm:text-2xl font-display font-bold text-accent">Your Order</h2>
                            <button
                                onClick={toggleCart}
                                className="text-accent hover:text-primary transition-colors p-2 -mr-2"
                                aria-label="Close cart"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 no-scrollbar">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                        <FaUtensils className="text-3xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-gray-900 font-bold text-lg">Your cart is empty</p>
                                        <p className="text-gray-500 text-sm max-w-[200px] mx-auto">Looks like you haven't added anything to your order yet.</p>
                                    </div>
                                    <button
                                        onClick={toggleCart}
                                        className="px-8 py-3 bg-primary text-accent font-bold rounded-sm uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all shadow-md"
                                    >
                                        Browse Menu
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden bg-gray-100 shadow-sm">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between h-20">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-accent line-clamp-1 text-sm sm:text-base">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                    aria-label={`Remove ${item.name} from cart`}
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mt-auto">
                                                <p className="text-primary font-bold">₹{item.price}</p>

                                                <div className="flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-100">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white hover:shadow-sm text-xs transition-all disabled:opacity-30"
                                                        disabled={item.quantity <= 1}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary text-xs transition-all"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-4 sm:p-6 bg-cream border-t space-y-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between text-lg sm:text-xl font-bold text-accent">
                                    <span>Total</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                <button className="w-full py-4 bg-primary text-accent font-bold uppercase tracking-widest rounded-sm hover:bg-accent hover:text-white transition-all shadow-lg active:scale-[0.98] text-sm">
                                    Proceed to Checkout
                                </button>
                                <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest">Taxes and delivery calculated at checkout</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
