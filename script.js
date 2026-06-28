import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

// Use DOMContentLoaded to make sure buttons exist before we add events
document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('loginBtn').addEventListener('click', () => {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => alert("Login successful!"))
            .catch((error) => alert("Login error: " + error.message));
    });

    document.getElementById('signupBtn').addEventListener('click', () => {
        const email = document.getElementById('authEmail').value;
        const password = document.getElementById('authPassword').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => alert("Account created! You can now log in."))
            .catch((error) => alert("Registration error: " + error.message));
    });
});
