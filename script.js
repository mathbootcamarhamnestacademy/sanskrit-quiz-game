// 1. IMPORTS
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 2. INITIALIZATION
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

// 3. UI LOGIC (Only run this when the DOM is ready)
document.addEventListener('DOMContentLoaded', () => {
    
    // Login Button Listener
    document.getElementById('loginBtn').addEventListener('click', () => {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;
        
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Logged in as:", userCredential.user.email);
            })
            .catch((error) => {
                alert("Login Error: " + error.message);
            });
    });

    // Auth State Observer
    onAuthStateChanged(auth, (user) => {
        if (user) {
            document.getElementById('authScreen').style.display = 'none';
            document.getElementById('homeScreen').style.display = 'block';
        } else {
            document.getElementById('authScreen').style.display = 'block';
            document.getElementById('homeScreen').style.display = 'none';
        }
    });
});
