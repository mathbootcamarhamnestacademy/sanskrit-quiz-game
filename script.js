// Ensure this script is loaded after questions.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get('topic');
    const questions = allQuestions[chapterId]; // Fetches data from questions.js

    let currentQ = 0;
    let score = 0;
    let lives = 3;
    let timer = 30;
    let countdown;

    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const scoreEl = document.getElementById('score');
    const livesEl = document.getElementById('lives');
    const timerEl = document.getElementById('timer');
    const nextBtn = document.getElementById('nextBtn');

    function startTimer() {
        timer = 30;
        timerEl.innerText = `⏳ ${timer}`;
        clearInterval(countdown);
        countdown = setInterval(() => {
            timer--;
            timerEl.innerText = `⏳ ${timer}`;
            if (timer <= 0) {
                clearInterval(countdown);
                handleAnswer(-1); // Time out counts as wrong
            }
        }, 1000);
    }

    function loadQuestion() {
        if (currentQ >= questions.length) {
            document.querySelector('.container').style.display = 'none';
            document.getElementById('finishScreen').style.display = 'block';
            document.getElementById('finalScore').innerText = `Your Score: ${score}`;
            return;
        }

        const qData = questions[currentQ];
        questionEl.innerText = qData.question;
        optionsEl.innerHTML = '';
        
        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.className = 'optionBtn';
            btn.onclick = () => handleAnswer(index);
            optionsEl.appendChild(btn);
        });

        startTimer();
    }

    function handleAnswer(index) {
        clearInterval(countdown);
        const correct = questions[currentQ].answer;
        
        if (index === correct) {
            score += 10;
            scoreEl.innerText = `⭐ Score: ${score}`;
        } else {
            lives--;
            livesEl.innerText = '❤️'.repeat(lives);
        }

        if (lives <= 0) {
            alert("Game Over!");
            location.href = 'dashboard.html';
        } else {
            currentQ++;
            loadQuestion();
        }
    }

    nextBtn.onclick = () => handleAnswer(-1); // Skip button
    loadQuestion();
});
