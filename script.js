// =======================================================
// ArhamNest Academy - Sanskrit Quest v1.7
// Firebase Engine with Real-Time Daily Record Saving
// =======================================================

const firebaseConfig = {
    apiKey: "YOUR_PASTED_API_KEY_HERE", 
    authDomain: "sanskrit-quest.firebaseapp.com",
    projectId: "sanskrit-quest",
    storageBucket: "sanskrit-quest.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID_HERE",
    appId: "YOUR_PASTED_APP_ID_HERE"
};

// Initialize Firebase Production Services
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Application Engine Memory States
let currentQuestion = 0;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval = null;
let transitionTimeout = null;
let questions = [];
let currentUser = null;

// UI Components Layout Elements
const authScreen = document.getElementById("authScreen");
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const finishScreen = document.getElementById("finishScreen");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const userGreeting = document.getElementById("userGreeting");
const chapterSelect = document.getElementById("chapter");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const finalScore = document.getElementById("finalScore");

// Button Listeners
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

// =======================================================
// SYSTEM CONTROL PERMISSIONS (Authentication Handling)
// =======================================================
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        userGreeting.textContent = "👤 " + user.email.split('@')[0];
        showScreen(homeScreen);
    } else {
        currentUser = null;
        showScreen(authScreen);
    }
});

if (signupBtn) signupBtn.addEventListener("click", () => {
    const email = authEmail.value.trim();
    const password = authPassword.value;
    if(!email || !password) return alert("Please fill out all login boxes!");
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => alert("Registration Complete! Account created."))
        .catch(err => alert("Registration Failed: " + err.message));
});

if (loginBtn) loginBtn.addEventListener("click", () => {
    const email = authEmail.value.trim();
    const password = authPassword.value;
    if(!email || !password) return alert("Please fill out all login boxes!");

    auth.signInWithEmailAndPassword(email, password)
        .catch(err => alert("Login System Error: " + err.message));
});

if (logoutBtn) logoutBtn.addEventListener("click", () => {
    auth.signOut();
});

function showScreen(screenToOpen) {
    authScreen.style.display = "none";
    homeScreen.style.display = "none";
    quizScreen.style.display = "none";
    finishScreen.style.display = "none";
    screenToOpen.style.display = "block";
}

// =======================================================
// SANSKRIT QUEST GAME CORE LOGIC ENGINE
// =======================================================
if (startBtn) startBtn.addEventListener("click", startQuest);
if (nextBtn) nextBtn.addEventListener("click", nextQuestion);

function startQuest() {
    if (typeof allQuestions === "undefined") {
        alert("System error: question source data array missing.");
        return;
    }

    const selectedChapter = chapterSelect ? chapterSelect.value : "1";
    if (allQuestions[selectedChapter]) {
        questions = allQuestions[selectedChapter];
    } else {
        alert("Configuration Error: Questions data index not matching.");
        return;
    }

    currentQuestion = 0;
    score = 0;
    lives = 3;

    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    clearInterval(timerInterval);
    clearTimeout(transitionTimeout);

    if (currentQuestion >= questions.length) {
        finishQuiz();
        return;
    }

    timer = 30;
    updateHeader();

    if (progressBar) {
        progressBar.style.width = ((currentQuestion + 1) / questions.length) * 100 + "%";
    }

    const q = questions[currentQuestion];
    if (questionEl) questionEl.textContent = q.question;
    if (resultEl) resultEl.textContent = "";
    
    if (optionsEl) {
        optionsEl.innerHTML = "";
        q.options.forEach((option, index) => {
            const btn = document.createElement("button");
            btn.className = "option";
            btn.textContent = option;
            btn.onclick = () => checkAnswer(index);
            optionsEl.appendChild(btn);
        });
    }

    startTimer();
}

function startTimer() {
    if (timerEl) timerEl.textContent = "⏳ " + timer;

    timerInterval = setInterval(() => {
        timer--;
        if (timerEl) timerEl.textContent = "⏳ " + timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            lives--;
            updateHeader();

            if (resultEl) {
                resultEl.textContent = "⏰ समय समाप्त! (Time's Up!)";
                resultEl.style.color = "red";
            }

            transitionTimeout = setTimeout(() => {
                currentQuestion++;
                if (lives <= 0) finishQuiz();
                else loadQuestion();
            }, 1500);
        }
    }, 1000);
}

function updateHeader() {
    if (scoreEl) scoreEl.textContent = "⭐ " + score + " XP";
    if (livesEl) livesEl.textContent = "❤️".repeat(Math.max(0, lives));
}

function checkAnswer(index) {
    clearInterval(timerInterval);
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll(".option");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.answer) {
            btn.style.background = "#4CAF50";
            btn.style.color = "#fff";
        }
        if (i === index && index !== q.answer) {
            btn.style.background = "#F44336";
            btn.style.color = "#fff";
        }
    });

    if (index === q.answer) {
        score += 10;
        if (resultEl) {
            resultEl.innerHTML = "✅ उत्तमम्! +10 XP";
            resultEl.style.color = "green";
        }
    } else {
        lives--;
        score = Math.max(0, score - 5);
        if (resultEl) {
            resultEl.innerHTML = "❌ अशुद्धम्!<br>सही उत्तर: <b>" + q.options[q.answer] + "</b>";
            resultEl.style.color = "red";
        }
    }

    updateHeader();

    transitionTimeout = setTimeout(() => {
        currentQuestion++;
        if (lives <= 0 || currentQuestion >= questions.length) {
            finishQuiz();
        } else {
            loadQuestion();
        }
    }, 2000);
}

function nextQuestion() {
    clearInterval(timerInterval);
    clearTimeout(transitionTimeout);
    currentQuestion++;
    if (lives <= 0 || currentQuestion >= questions.length) finishQuiz();
    else loadQuestion();
}

// =======================================================
// DATA TELEMETRY SUBMISSION (Syncing Records to Cloud)
// =======================================================
function finishQuiz() {
    clearInterval(timerInterval);
    clearTimeout(transitionTimeout);

    showScreen(finishScreen);

    const totalPossible = questions.length * 10;
    const percentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;
    const selectedChapter = chapterSelect ? chapterSelect.value : "Unknown";

    let medal = "🥉 Bronze Medal";
    let message = "सराहनीय प्रयास!";

    if (percentage >= 90) { medal = "🥇 Gold Medal"; message = "अति उत्तमम्! अति सुन्दरम्!"; }
    else if (percentage >= 70) { medal = "🥈 Silver Medal"; message = "बहुत बढ़िया!"; }
    else if (percentage >= 50) { medal = "🥉 Bronze Medal"; message = "उत्तम प्रयास!"; }

    if (finalScore) {
        finalScore.innerHTML = `
            <h2>${message}</h2>
            <h3>👤 ${currentUser ? currentUser.email : 'Student'}</h3>
            <hr style="border: 1px solid #ccc; margin: 10px 0;">
            <p>📁 Chapter Quest: <b>${selectedChapter}</b></p>
            <p>⭐ कुल अर्जित XP: <b>${score}</b></p>
            <p>📊 शुद्धता (Accuracy): <b>${percentage}%</b></p>
            <h2>${medal}</h2>
            <p style="font-size:12px; color:green;">☁️ Cloud Record Saved Successfully!</p>
        `;
    }

    // Secure Cloud Record Writing Action
    if (currentUser) {
        db.collection("daily_activity").add({
            studentUid: currentUser.uid,
            studentEmail: currentUser.email,
            chapter: selectedChapter,
            scoreEarned: score,
            accuracy: percentage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => console.log("Cloud synced!"))
        .catch(err => console.error("Database cloud syncing issue: ", err));
    }
}
// Make sure this is at the very top of your script.js file
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const db = getFirestore(app);
