
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash, FaPlus, FaMinus, FaMapMarkerAlt, FaShoppingBag, FaExclamationTriangle } from "react-icons/fa";
import { calculateDeliveryCharge, calculateDistance } from "@/utils/deliveryUtils";
import { placeOrder } from "@/lib/orders";
import { subscribeToRestaurantStatus } from "@/lib/status";

// Pune coordinates based on Footer location
const RESTAURANT_COORDS = { lat: 18.572548, lng: 73.914478 };

export default function CartPage() {
    const router = useRouter();
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const unsub = subscribeToRestaurantStatus((status) => {
            setIsOpen(status.isOpen);
        });
        return () => unsub();
    }, []);

    // User Details
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // Address Details
    const [flatNo, setFlatNo] = useState("");
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");

    // Location & Delivery
    const [distance, setDistance] = useState<string>("");
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [deliveryCharge, setDeliveryCharge] = useState(0);

    useEffect(() => {
        const dist = parseFloat(distance);
        if (!isNaN(dist)) {
            const charge = calculateDeliveryCharge(dist, cartTotal);
            setDeliveryCharge(charge === -1 ? 0 : charge); // Handle out of range gracefully in UI
        } else {
            setDeliveryCharge(0);
        }
    }, [distance, cartTotal]);

    const handleLocateMe = () => {
        setIsLocating(true);
        setLocationError("");

        if (!navigator.geolocation) {
            setLocationError("Geolocation is not supported by your browser.");
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const distKm = calculateDistance(RESTAURANT_COORDS.lat, RESTAURANT_COORDS.lng, userLat, userLng);

                // Adding a small buffer (1.2x) to account for road curvature vs straight line
                const roadDistanceEst = (distKm * 1.2).toFixed(1);

                setDistance(roadDistanceEst);
                setLocationError(""); // Explicitly clear any previous errors
                setIsLocating(false);
            },
            (error) => {
                console.error("Error fetching location:", error);
                let errorMessage = "Unable to retrieve location.";
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = "Location permission denied. Please enable it in browser settings.";
                } else if (error.code === error.TIMEOUT) {
                    errorMessage = "Location request timed out.";
                }
                setLocationError(errorMessage);
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };


    const isValidPhone = (p: string) => {
        const cleaned = p.replace(/\D/g, '');
        return cleaned.length === 10;
    };

    const isValidEmail = (e: string) => {
        if (!e) return true; // Email is optional
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    };

    const isFormValid = isOpen && name && isValidPhone(phone) && isValidEmail(email) && flatNo && area && distance && !locationError && cart.length > 0;

    const handlePlaceOrder = async () => {
        if (!isOpen) {
            alert("Sorry, we are currently closed and not accepting new orders.");
            return;
        }

        if (!isFormValid) {
            if (!name) alert("Please enter your name.");
            else if (!phone) alert("Please enter your phone number.");
            else if (!isValidPhone(phone)) alert("Please enter a valid 10-digit phone number.");
            else if (!isValidEmail(email)) alert("Please enter a valid email address.");
            else if (!flatNo) alert("Please enter your Flat / House number.");
            else if (!area) alert("Please enter your Area / Locality.");
            else if (!distance) alert("Please locate your delivery address to calculate charges.");
            return;
        }

        setIsPlacingOrder(true);
        try {
            const orderId = await placeOrder({
                customerName: name,
                customerPhone: phone.replace(/\D/g, ''),
                customerEmail: email || "",
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
                subtotal: cartTotal,
                deliveryCharge,
                total: cartTotal + deliveryCharge,
                address: {
                    flatNo,
                    area,
                    landmark: landmark || "",
                    distance,
                },
            });

            // Save order ID to localStorage for tracking
            const existingIds = JSON.parse(localStorage.getItem('chopstick-order-ids') || '[]');
            existingIds.unshift(orderId);
            localStorage.setItem('chopstick-order-ids', JSON.stringify(existingIds));

            // Save customer info for future orders
            localStorage.setItem('chopstick-customer', JSON.stringify({ name, phone, email }));

            clearCart();
            router.push('/orders');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <main className="min-h-screen bg-cream flex flex-col">
            <Navbar />

            <div className="flex-shrink-0 pt-[120px] sm:pt-[140px] md:pt-[160px] relative z-40">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-red-600 text-white overflow-hidden"
                        >
                            <div className="container mx-auto px-4 py-3 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase shadow-inner">
                                <FaExclamationTriangle className="animate-pulse" />
                                <span>We are currently closed for new orders</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:py-32">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-accent mb-8 text-center pt-8 sm:pt-0">Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm max-w-lg mx-auto">
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                        <Link href="/menu" className="inline-block px-8 py-3 bg-primary text-accent font-bold uppercase tracking-widest rounded-sm hover:bg-accent hover:text-white transition-all shadow-md">
                            Browse Menu
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Cart Items */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-6 space-y-6">
                                <h2 className="text-xl font-bold text-accent border-b pb-4">Items</h2>
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-6 last:pb-0 last:border-0">
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between h-24 py-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-bold text-accent text-lg line-clamp-1">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                                    aria-label={`Remove ${item.name}`}
                                                >
                                                    <FaTrash size={14} />
                                                </button>
                                            </div>

                                            <div className="flex justify-between items-center mt-auto">
                                                <p className="text-primary font-bold text-md">₹{item.price}</p>

                                                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1 border border-gray-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-accent transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <FaMinus size={10} />
                                                    </button>
                                                    <span className="font-bold text-accent w-6 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-accent transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <FaPlus size={10} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Checkout Section */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                                <h2 className="text-xl font-bold text-accent border-b pb-4">Delivery Details</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Your Phone Number"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Your Email"
                                        />
                                    </div>

                                    {/* Address Details */}
                                    <div className="pt-2 border-t border-gray-100 mt-4">
                                        <h3 className="text-md font-bold text-accent mb-3">Delivery Address</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label htmlFor="flatNo" className="block text-sm font-medium text-gray-700 mb-1">Flat / House No / Floor / Building <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    id="flatNo"
                                                    value={flatNo}
                                                    onChange={(e) => setFlatNo(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    placeholder="e.g. Flat 402, Sunshine Apts"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Area / Sector / Locality <span className="text-red-500">*</span></label>
                                                <input
                                                    type="text"
                                                    id="area"
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    placeholder="e.g. Viman Nagar"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">Nearby Landmark <span className="text-gray-400 font-normal">(Optional)</span></label>
                                                <input
                                                    type="text"
                                                    id="landmark"
                                                    value={landmark}
                                                    onChange={(e) => setLandmark(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                                    placeholder="e.g. Near Datta Mandir"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="pt-4 border-t border-gray-100 mt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Delivery Distance <span className="text-red-500">*</span></label>
                                        <div className="flex gap-2 items-center">
                                            <button
                                                onClick={handleLocateMe}
                                                disabled={isLocating}
                                                className="flex-1 bg-blue-50 text-blue-600 px-4 py-3 rounded-lg font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border border-blue-200"
                                            >
                                                {isLocating ? (
                                                    <span className="animate-spin w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full"></span>
                                                ) : (
                                                    <FaMapMarkerAlt />
                                                )}
                                                {isLocating ? "Locating..." : (distance ? `Location Found (${distance} km)` : "Locate Me")}
                                            </button>
                                        </div>
                                        {locationError && (
                                            <p className="text-xs text-red-500 mt-2">{locationError}</p>
                                        )}
                                        {distance && !locationError && (
                                            <p className="text-xs text-green-600 mt-2 font-medium">
                                                {deliveryCharge === 0 ? "Free Delivery! 🎉" : `Distance: ${distance} km`}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
                                <h2 className="text-xl font-bold text-accent border-b pb-4">Order Summary</h2>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>₹{cartTotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Charges</span>
                                        <span>{distance ? `₹${deliveryCharge}` : '--'}</span>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-accent pt-4 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>₹{cartTotal + deliveryCharge}</span>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={isPlacingOrder}
                                    className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 text-white uppercase tracking-wider
                                        ${isFormValid && !isPlacingOrder
                                            ? 'bg-primary hover:bg-accent cursor-pointer transform hover:-translate-y-1'
                                            : !isOpen ? 'bg-red-500 cursor-not-allowed' : 'bg-gray-300 cursor-not-allowed'}`}
                                >
                                    {isPlacingOrder ? (
                                        <><span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> Placing Order...</>
                                    ) : !isOpen ? (
                                        <>Store Closed</>
                                    ) : (
                                        <><FaShoppingBag className="text-lg" /> Place Order</>
                                    )}
                                </button>
                                <p className="text-center text-xs text-gray-400">
                                    Your order will be sent to the restaurant for confirmation.
                                </p>


                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
