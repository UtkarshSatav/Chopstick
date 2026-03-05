import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const MENU_COLLECTION = "menuData";
const MENU_DOC_ID = "current";

export async function getMenuFromDb() {
    try {
        const docRef = doc(db, MENU_COLLECTION, MENU_DOC_ID);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            return snap.data();
        }
    } catch (e) {
        console.error("Failed to load menu from DB", e);
    }

    // Fallback if db fails or doesn't exist
    const res = await fetch("/Menu.json");
    return await res.json();
}

export function subscribeToMenu(callback: (menu: any) => void): () => void {
    const docRef = doc(db, MENU_COLLECTION, MENU_DOC_ID);
    return onSnapshot(
        docRef,
        async (snap) => {
            if (snap.exists()) {
                callback(snap.data());
            } else {
                // Fallback
                try {
                    const res = await fetch("/Menu.json");
                    const data = await res.json();
                    callback(data);
                } catch (e) {
                    console.error("Failed to fetch fallback static menu");
                }
            }
        },
        async (error) => {
            console.error("Firestore menu subscription error, falling back to static menu:", error);
            try {
                const res = await fetch("/Menu.json");
                const data = await res.json();
                callback(data);
            } catch (e) {
                console.error("Failed to fetch fallback static menu after Firestore error");
            }
        }
    );
}
