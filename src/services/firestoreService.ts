import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.config";

export async function saveRecord<T extends object>(collectionName: string, data: T) {
  if (!db) {
    const key = `carebridge:${collectionName}`;
    const records = JSON.parse(localStorage.getItem(key) ?? "[]");
    records.push({ ...data, createdAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(records));
    return;
  }
  await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() });
}

export async function getRecords<T>(collectionName: string): Promise<T[]> {
  if (!db) return JSON.parse(localStorage.getItem(`carebridge:${collectionName}`) ?? "[]");
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
}
