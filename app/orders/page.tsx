"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { subscribeToOrder, Order } from "@/lib/orders";
import { FaCheckCircle, FaTimesCircle, FaClock, FaArrowLeft, FaUtensils } from "react-icons/fa";

function getStoredOrders(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = localStorage.getItem("chopstick-order-ids");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "accepted":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                    <FaCheckCircle className="text-green-600" /> Accepted
                </span>
            );
        case "rejected":
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-bold">
                    <FaTimesCircle className="text-red-600" /> Rejected
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                    <FaClock className="text-yellow-600" /> Pending
                </span>
            );
    }
}

function OrderCard({ order }: { order: Order }) {
    const createdAt = order.createdAt
        ? new Date(order.createdAt.seconds * 1000).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        })
        : "Just now";

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                    <p className="text-xs text-gray-400 font-mono">#{order.id?.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{createdAt}</p>
                </div>
                <StatusBadge status={order.status} />
            </div>

            {/* Items */}
            <div className="px-5 py-4 space-y-3">
                {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">×{item.quantity}</span>
                            <span className="font-medium text-accent">{item.name}</span>
                        </div>
                        <span className="text-gray-600">₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center px-5 py-3 bg-gray-50 border-t border-gray-100">
                <span className="text-sm text-gray-500">Total</span>
                <span className="text-lg font-bold text-accent">₹{order.total}</span>
            </div>

            {/* Status message */}
            {order.status === "accepted" && (
                <div className="px-5 py-3 bg-green-50 border-t border-green-100">
                    <p className="text-sm text-green-700 font-medium">🎉 Your order has been accepted! It will be prepared shortly.</p>
                </div>
            )}
            {order.status === "rejected" && (
                <div className="px-5 py-3 bg-red-50 border-t border-red-100">
                    <p className="text-sm text-red-700 font-medium">Sorry, your order was not accepted. Please try again or contact us.</p>
                </div>
            )}
            {order.status === "placed" && (
                <div className="px-5 py-3 bg-yellow-50 border-t border-yellow-100">
                    <p className="text-sm text-yellow-700 font-medium">⏳ Waiting for restaurant to confirm your order...</p>
                </div>
            )}
        </div>
    );
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const orderIds = getStoredOrders();
        if (orderIds.length === 0) {
            setLoading(false);
            return;
        }

        const unsubscribes: (() => void)[] = [];

        orderIds.forEach((orderId) => {
            const unsub = subscribeToOrder(orderId, (order) => {
                if (order) {
                    setOrders((prev) => {
                        const existing = prev.findIndex((o) => o.id === order.id);
                        if (existing >= 0) {
                            const updated = [...prev];
                            updated[existing] = order;
                            return updated;
                        }
                        return [order, ...prev];
                    });
                }
                setLoading(false);
            });
            unsubscribes.push(unsub);
        });

        return () => {
            unsubscribes.forEach((unsub) => unsub());
        };
    }, []);

    return (
        <main className="min-h-screen bg-cream flex flex-col">
            <Navbar />

            <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 sm:py-32">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link href="/menu" className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                            <FaArrowLeft />
                        </Link>
                        <h1 className="text-2xl sm:text-3xl font-display font-bold text-accent">Your Orders</h1>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin w-8 h-8 border-3 border-primary border-t-transparent rounded-full"></div>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center space-y-6 bg-white p-10 rounded-2xl shadow-sm">
                            <FaUtensils className="text-5xl text-gray-300 mx-auto" />
                            <p className="text-gray-500 text-lg">No orders yet.</p>
                            <Link href="/menu" className="inline-block px-8 py-3 bg-primary text-accent font-bold uppercase tracking-widest rounded-sm hover:bg-accent hover:text-white transition-all shadow-md">
                                Browse Menu
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders
                                .sort((a, b) => {
                                    const aTime = a.createdAt?.seconds || 0;
                                    const bTime = b.createdAt?.seconds || 0;
                                    return bTime - aTime;
                                })
                                .map((order) => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
