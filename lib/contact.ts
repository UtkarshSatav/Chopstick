import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface ContactData {
    name: string;
    phone: string;
    email: string;
    message: string;
}

const CONTACTS_COLLECTION = "contacts";

/**
 * Save a new contact form message to Firestore.
 */
export async function saveContactMessage(data: ContactData): Promise<string> {
    const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}
