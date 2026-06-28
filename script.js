// Import Firebase functions from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase configuration (Use the exact keys from your Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyBEd1ylBG88RIF8EVvrxoS2tFFKhpPzGpQ",
  authDomain: "sanskrit-quest.firebaseapp.com",
  projectId: "sanskrit-quest",
  storageBucket: "sanskrit-quest.firebasestorage.app",
  messagingSenderId: "983562344506",
  appId: "1:983562344506:web:66662e460343b070687d03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Add listener to the login button
document.getElementById('loginBtn').addEventListener('click', () => {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login Successful!");
            // Switch screens here
        })
        .catch((error) => {
            alert("Login Failed: " + error.message);
        });
});
