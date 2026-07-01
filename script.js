document.addEventListener('DOMContentLoaded', () => {
    // 1. Get the topic ID from the URL (e.g., '?topic=1')
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = urlParams.get('topic');

    // 2. Validate data loading
    if (typeof allQuestions === 'undefined') {
        document.getElementById('question').innerText = "Error: Data file not found.";
        return;
    }

    // 3. Extract the correct chapter
    const questions = allQuestions[chapterId];

    // 4. Validate chapter exists
    if (!questions || questions.length === 0) {
        document.getElementById('question').innerText = "Topic not found. Please return to dashboard.";
        return;
    }

    // 5. Initialize State
    let currentQ = 0;
    let score = 0;
    let lives = 3;

    // 6. Define load function
    function loadQuestion() {
        const qData = questions[currentQ];
        document.getElementById('question').innerText = qData.question;
        const optionsEl = document.getElementById('options');
        optionsEl.innerHTML = '';

        qData.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.className = 'option';
            btn.onclick = () => handleAnswer(index);
            optionsEl.appendChild(btn);
        });
    }

    function handleAnswer(index) {
        if (index === questions[currentQ].answer) {
            score += 10;
            document.getElementById('score').innerText = `⭐ Score: ${score}`;
        } else {
            lives--;
            document.getElementById('lives').innerText = '❤️'.repeat(lives);
            if (lives <= 0) {
                alert("Game Over!");
                window.location.href = 'dashboard.html';
                return;
            }
        }
        
        currentQ++;
        if (currentQ < questions.length) {
            loadQuestion();
        } else {
            alert("Quiz Finished! Final Score: " + score);
            window.location.href = 'dashboard.html';
        }
    }

    // Start!
    loadQuestion();
});
