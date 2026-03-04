import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type OrderStatus = "placed" | "accepted" | "rejected" | "out_for_delivery" | "delivered";

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface OrderAddress {
    flatNo: string;
    area: string;
    landmark?: string;
    distance: string;
}

export interface Order {
    id?: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    items: OrderItem[];
    subtotal: number;
    deliveryCharge: number;
    total: number;
    address: OrderAddress;
    status: OrderStatus;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

const ORDERS_COLLECTION = "orders";

/**
 * Place a new order — writes to Firestore and returns the generated order ID.
 */
export async function placeOrder(orderData: Omit<Order, "id" | "status" | "createdAt" | "updatedAt">): Promise<string> {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
        ...orderData,
        status: "placed" as OrderStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

/**
 * Fetch a single order by ID.
 */
export async function getOrder(orderId: string): Promise<Order | null> {
    const docSnap = await getDoc(doc(db, ORDERS_COLLECTION, orderId));
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Order;
}

/**
 * Fetch all orders for a given phone number.
 */
export async function getUserOrders(phone: string): Promise<Order[]> {
    const q = query(
        collection(db, ORDERS_COLLECTION),
        where("customerPhone", "==", phone),
        orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

/**
 * Fetch ALL orders (for admin).
 */
export async function getAllOrders(): Promise<Order[]> {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

/**
 * Update order status (admin accept/reject).
 */
export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await updateDoc(doc(db, ORDERS_COLLECTION, orderId), {
        status,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Subscribe to real-time updates for a single order.
 * Returns an unsubscribe function.
 */
export function subscribeToOrder(orderId: string, callback: (order: Order | null) => void): () => void {
    return onSnapshot(doc(db, ORDERS_COLLECTION, orderId), (docSnap) => {
        if (!docSnap.exists()) {
            callback(null);
            return;
        }
        callback({ id: docSnap.id, ...docSnap.data() } as Order);
    });
}

/**
 * Subscribe to real-time updates for ALL orders (admin).
 * Returns an unsubscribe function.
 */
export function subscribeToAllOrders(callback: (orders: Order[]) => void): () => void {
    const q = query(collection(db, ORDERS_COLLECTION), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
        callback(orders);
    });
}
