import { getRecords, saveRecord } from "../services/firestoreService";

export function useFirestore<T extends object>(collectionName: string) {
  return {
    getAll: () => getRecords<T>(collectionName),
    save: (data: T) => saveRecord(collectionName, data)
  };
}
