document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the topic from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get('topic');
    
    // Check if chapter exists, if not, redirect to dashboard
    if (!allQuestions[chapterId]) {
        window.location.href = 'dashboard.html';
        return;
    }

    const questions = allQuestions[chapterId];

    // 2. Setup Variables
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

    // 3. Timer Logic
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

    // 4. Load Question
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
        
        // Update Progress Bar
        const progress = ((currentQ) / questions.length) * 100;
        progressBar.style.width = progress + '%';

        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.className = 'option'; // Matches your CSS
            btn.onclick = () => handleAnswer(index);
            optionsEl.appendChild(btn);
        });

        startTimer();
    }

    // 5. Answer Handler
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
            window.location.href = 'dashboard.html';
        } else {
            currentQ++;
            loadQuestion();
        }
    }

    // Initialize Quiz
    loadQuestion();
});
