// 1. IMPORT FIREBASE MODULAR SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 2. INITIALIZE SERVICES
const firebaseConfig = {
  apiKey: "AIzaSyBEd1ylBG88RIF8EVvrxoS2tFFKhpPzGpQ",
  authDomain: "sanskrit-quest.firebaseapp.com",
  projectId: "sanskrit-quest",
  storageBucket: "sanskrit-quest.firebasestorage.app",
  messagingSenderId: "983562344506",
  appId: "1:983562344506:web:66662e460343b070687d03"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. APPLY YOUR LOGIC
// Replace your old "firebase.auth()" calls with the new "auth" constant
// Example: Instead of auth.onAuthStateChanged, use:
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        // ... rest of your home logic
    } else {
        // ... auth screen logic
    }
});
