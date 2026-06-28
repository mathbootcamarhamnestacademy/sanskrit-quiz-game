// =======================================================
// ArhamNest Academy - Sanskrit Quest v1.6
// Firebase Engine with Real-Time Daily Record Saving
// =======================================================

// PASTE YOUR UNIQUE FIREBASE CONFIG HERE:
const firebaseConfig = {
    apiKey: "AIzaSyA1-ExampleKeyHere...",
    authDomain: "sanskrit-quest-xxxx.firebaseapp.com",
    projectId: "sanskrit-quest-xxxx",
    storageBucket: "sanskrit-quest-xxxx.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ... the rest of your script.js code continues below ...
