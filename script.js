let currentQuestion = 0;
let score = 0;
let lives = 3;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const progressBar = document.getElementById("progressBar");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {

    if (currentQuestion >= questions.length || lives === 0) {
        finishQuiz();
        return;
    }

    resultEl.textContent = "";

    const q = questions[currentQuestion];

    questionEl.textContent = q.question;

    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {

        const btn = document.createElement("button");

        btn.className = "option";

        btn.textContent = option;

        btn.onclick = () => checkAnswer(index);

        optionsEl.appendChild(btn);

    });

    progressBar.style.width =
        ((currentQuestion) / questions.length) * 100 + "%";
}

function checkAnswer(selected) {

    const q = questions[currentQuestion];

    const buttons = document.querySelectorAll(".option");

    buttons.forEach(btn => btn.disabled = true);

    if (selected === q.answer) {

        score += 10;

        scoreEl.textContent = "⭐ Score: " + score;

        resultEl.innerHTML = "✅ Correct! +10";

        resultEl.style.color = "green";

    } else {

        lives--;

        livesEl.textContent = "❤️".repeat(lives);

        resultEl.innerHTML =
            "❌ Wrong! Correct answer: " +
            q.options[q.answer];

        resultEl.style.color = "red";
    }

}

nextBtn.onclick = () => {

    currentQuestion++;

    loadQuestion();

};

function finishQuiz() {

    document.querySelector(".container").style.display = "none";

    document.getElementById("finishScreen").style.display = "block";

    document.getElementById("finalScore").innerHTML =
        "⭐ Your Score: " + score +
        "<br><br>🏆 " +
        Math.round((score / (questions.length * 10)) * 100) +
        "%";

}

loadQuestion();
