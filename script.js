// =======================================================
// ArhamNest Academy - Sanskrit Quest v1.0
// Engine Logic File
// =======================================================

let currentQuestion = 0;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval = null;
let transitionTimeout = null;
let questions = [];

// DOM Elements
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const finishScreen = document.getElementById("finishScreen");
const studentName = document.getElementById("studentName");
const chapterSelect = document.getElementById("chapter");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const finalScore = document.getElementById("finalScore");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

// Event Listeners
if (startBtn) startBtn.addEventListener("click", startQuest);
if (nextBtn) nextBtn.addEventListener("click", nextQuestion);

function startQuest() {
    if (!studentName || studentName.value.trim() === "") {
        alert("Please enter your name to begin!");
        return;
    }

    if (typeof allQuestions === "undefined") {
        alert("Error: 'questions.js' didn't load properly. Check script order in index.html.");
        return;
    }

    const selectedChapter = chapterSelect ? chapterSelect.value : "1";
    
    if (allQuestions[selectedChapter] && allQuestions[selectedChapter].length > 0) {
        questions = allQuestions[selectedChapter];
    } else {
        alert("No questions configured for this chapter yet!");
        return;
    }

    currentQuestion = 0;
    score = 0;
    lives = 3;

    if (homeScreen) homeScreen.style.display = "none";
    if (finishScreen) finishScreen.style.display = "none";
    if (quizScreen) quizScreen.style.display = "block";

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
                resultEl.textContent = "⏰ Time's Up!";
                resultEl.style.color = "red";
            }

            transitionTimeout = setTimeout(() => {
                currentQuestion++;
                if (lives <= 0) {
                    finishQuiz();
                } else {
                    loadQuestion();
                }
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
            resultEl.innerHTML = "✅ Correct! +10 XP";
            resultEl.style.color = "green";
        }
    } else {
        lives--;
        score = Math.max(0, score - 5);
        if (resultEl) {
            resultEl.innerHTML = "❌ Wrong!<br>Correct: <b>" + q.options[q.answer] + "</b>";
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
    if (lives <= 0 || currentQuestion >= questions.length) {
        finishQuiz();
    } else {
        loadQuestion();
    }
}

function finishQuiz() {
    clearInterval(timerInterval);
    clearTimeout(transitionTimeout);

    if (quizScreen) quizScreen.style.display = "none";
    if (finishScreen) finishScreen.style.display = "block";

    const totalPossible = questions.length * 10;
    const percentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;

    let medal = "专 Bronze Medal";
    let message = "Good Job!";

    if (percentage >= 90) { medal = "🥇 Gold Medal"; message = "Outstanding!"; }
    else if (percentage >= 70) { medal = "🥈 Silver Medal"; message = "Excellent!"; }
    else if (percentage >= 50) { medal = "🥉 Bronze Medal"; message = "Well Done!"; }

    if (finalScore) {
        finalScore.innerHTML = `
            <h2>${message}</h2>
            <h3>👤 ${studentName ? studentName.value : 'Student'}</h3>
            <hr>
            <p>⭐ XP Earned: <b>${score}</b></p>
            <p>📊 Accuracy: <b>${percentage}%</b></p>
            <h2>${medal}</h2>
        `;
    }
}

// Global View States Setup
if (homeScreen) homeScreen.style.display = "block";
if (quizScreen) quizScreen.style.display = "none";
if (finishScreen) finishScreen.style.display = "none";
