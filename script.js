// =======================================================
// ArhamNest Academy - Sanskrit Quest v1.0
// Tailored script.js
// =======================================================

let currentQuestion = 0;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval = null;
let transitionTimeout = null; 
let questions = []; // Active question pool

// Elements matched perfectly to your index.html IDs
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const finishScreen = document.getElementById("finishScreen");

const studentName = document.getElementById("studentName");
const chapterSelect = document.getElementById("chapter"); // Matches id="chapter"

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

startBtn.addEventListener("click", startQuest);
nextBtn.addEventListener("click", nextQuestion);

function startQuest() {
    if (studentName.value.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    const selectedChapter = chapterSelect.value; // Will be "1", "2", "3", etc.

    // Checks if allQuestions exists in questions.js and pulls the selected chapter data
    if (typeof allQuestions !== "undefined" && allQuestions[selectedChapter]) {
        questions = allQuestions[selectedChapter];
    } else {
        alert("No questions found for this chapter yet!");
        return;
    }

    currentQuestion = 0;
    score = 0;
    lives = 3;

    homeScreen.style.display = "none";
    finishScreen.style.display = "none";
    quizScreen.style.display = "block";

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

    progressBar.style.width = ((currentQuestion + 1) / questions.length) * 100 + "%";

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    resultEl.textContent = "";
    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option";
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });

    startTimer();
}

function startTimer() {
    timerEl.textContent = "⏳ " + timer;

    timerInterval = setInterval(() => {
        timer--;
        timerEl.textContent = "⏳ " + timer;

        if (timer <= 0) {
            clearInterval(timerInterval);
            lives--;
            updateHeader();

            resultEl.textContent = "⏰ Time's Up!";
            resultEl.style.color = "red";

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
    scoreEl.textContent = "⭐ " + score + " XP";
    livesEl.textContent = "❤️".repeat(lives);
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
        resultEl.innerHTML = "✅ Correct! +10 XP";
        resultEl.style.color = "green";
    } else {
        lives--;
        score = Math.max(0, score - 5);
        resultEl.innerHTML = "❌ Wrong!<br>Correct Answer: <b>" + q.options[q.answer] + "</b>";
        resultEl.style.color = "red";
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
        return;
    }

    loadQuestion();
}

function finishQuiz() {
    clearInterval(timerInterval);
    clearTimeout(transitionTimeout);

    quizScreen.style.display = "none";
    finishScreen.style.display = "block";

    const percentage = Math.round((score / (questions.length * 10)) * 100);

    let medal = "🥉 Bronze Medal";
    let message = "Good Job!";

    if (percentage >= 90) {
        medal = "🥇 Gold Medal";
        message = "Outstanding!";
    } else if (percentage >= 70) {
        medal = "🥈 Silver Medal";
        message = "Excellent!";
    } else if (percentage >= 50) {
        medal = "🥉 Bronze Medal";
        message = "Well Done!";
    }

    finalScore.innerHTML = `
        <h2>${message}</h2>
        <h3>👤 ${studentName.value}</h3>
        <hr>
        <p>⭐ XP : <b>${score}</b></p>
        <p>📊 Score : <b>${percentage}%</b></p>
        <h2>${medal}</h2>
    `;
}

// Initial view states
homeScreen.style.display = "block";
quizScreen.style.display = "none";
finishScreen.style.display = "none";
