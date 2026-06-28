import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your Firebase configuration
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

document.addEventListener('DOMContentLoaded', () => {
    
    // Login Functionality
    document.getElementById('loginBtn').addEventListener('click', () => {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Login successful!");
                // Force an absolute path to the dashboard in your repository
                window.location.assign("/sanskrit-quiz-game/dashboard.html");
            })
            .catch((error) => {
                alert("Login error: " + error.message);
            });
    });

    // Register Functionality
    document.getElementById('signupBtn').addEventListener('click', () => {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => alert("Account created! You can now log in."))
            .catch((error) => alert("Registration error: " + error.message));
    });
});
