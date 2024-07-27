// src/stores/itemStore.js
import { defineStore } from "pinia";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export const useItemStore = defineStore("itemStore", {
  state: () => ({
    items: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const querySnapshot = await getDocs(collection(db, "items"));
        this.items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async addItem(item) {
      try {
        const docRef = await addDoc(collection(db, "items"), item);
        this.items.push({ id: docRef.id, ...item });
      } catch (error) {
        console.error("Error adding item:", error);
      }
    },
    async updateItem(item) {
      try {
        const itemRef = doc(db, "items", item.id);
        await updateDoc(itemRef, item);
        const index = this.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          this.items[index] = item;
        }
      } catch (error) {
        console.error("Error updating item:", error);
      }
    },
    async deleteItem(id) {
      try {
        const itemRef = doc(db, "items", id);
        await deleteDoc(itemRef);
        this.items = this.items.filter((item) => item.id !== id);
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },
  },
});
