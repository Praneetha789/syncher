import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApps, initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3e60F4fOs-VfAZ31K1zPoN3GxDiZi4fc",
  authDomain: "web-app-6bc4e.firebaseapp.com",
  projectId: "web-app-6bc4e",
  storageBucket: "web-app-6bc4e.firebasestorage.app",
  messagingSenderId: "738429688523",
  appId: "1:738429688523:web:4760c7ae1499b9427ad94e",
  measurementId: "G-53QZWBE9K5"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);