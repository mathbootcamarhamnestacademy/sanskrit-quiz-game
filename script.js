document.addEventListener('DOMContentLoaded', () => {
    // 1. Immediate check: Does the data exist?
    if (typeof allQuestions === 'undefined') {
        document.getElementById('question').innerText = "Critical Error: questions.js not loaded!";
        console.error("allQuestions is undefined. Check if questions.js is loaded in quiz.html before script.js");
        return;
    }

    // 2. Extract and Validate Topic
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get('topic');
    const questions = allQuestions[chapterId];

    if (!questions) {
        document.getElementById('question').innerText = "Topic not found. Please return to dashboard.";
        console.error("No questions found for topic:", chapterId);
        return;
    }

    // 3. Setup Logic
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
    const progressBar = document.getElementById('progressBar');

    function startTimer() {
        timer = 30;
        timerEl.innerText = `⏳ ${timer}`;
        clearInterval(countdown);
        countdown = setInterval(() => {
            timer--;
            timerEl.innerText = `⏳ ${timer}`;
            if (timer <= 0) {
                clearInterval(countdown);
                handleAnswer(-1); // Timeout
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
        optionsEl.innerHTML = ''; // Clear old buttons
        
        // Progress bar
        const progress = ((currentQ) / questions.length) * 100;
        if(progressBar) progressBar.style.width = progress + '%';

        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.className = 'option';
            btn.onclick = () => handleAnswer(index);
            optionsEl.appendChild(btn);
        });

        startTimer();
    }

    function handleAnswer(index) {
        clearInterval(countdown);
        if (index === questions[currentQ].answer) {
            score += 10;
            scoreEl.innerText = `⭐ Score: ${score}`;
        } else {
            lives--;
            livesEl.innerText = '❤️'.repeat(lives);
        }

        if (lives <= 0) {
            alert("Game Over!");
            window.location.href = 'dashboard.html';
        } else {
            currentQ++;
            loadQuestion();
        }
    }

    // 4. Force Start
    loadQuestion();
});
