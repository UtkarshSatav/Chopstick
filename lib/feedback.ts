import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface FeedbackData {
    orderId: string;
    rating: number;
    comment: string;
}

const FEEDBACK_COLLECTION = "feedback";

/**
 * Save order feedback to Firestore.
 */
export async function saveFeedback(data: FeedbackData): Promise<string> {
    const docRef = await addDoc(collection(db, FEEDBACK_COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
    });
    return docRef.id;
}
