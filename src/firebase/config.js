// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZES_Tr_2jpe-r6i83OWFmKwPjMqNattE",
    authDomain: "gambling-6db52.firebaseapp.com",
    projectId: "gambling-6db52",
    storageBucket: "gambling-6db52.firebasestorage.app",
    messagingSenderId: "341472740035",
    appId: "1:341472740035:web:63aa43d6c4942c71c65876",
    measurementId: "G-1LX93PVDQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, analytics };