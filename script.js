let currentQuestion = 0;
let score = 0;
let lives = 3;

function startGame() {
    currentQuestion = 0;
    score = 0;
    lives = 3;
    loadQuestion();
}

function loadQuestion() {

    if (lives <= 0) {
        document.getElementById("quiz").innerHTML =
        "<h2>😢 Game Over</h2><h3>Score: "+score+"</h3>";
        return;
    }

    if (currentQuestion >= questions.length) {
        document.getElementById("quiz").innerHTML =
        "<h2>🎉 अभिनन्दनम्!</h2><h3>Your Score: "+score+"</h3>";
        return;
    }

    const q = questions[currentQuestion];

    document.getElementById("score").innerHTML =
        "⭐ Score : " + score;

    document.getElementById("lives").innerHTML =
        "❤️".repeat(lives);

    document.getElementById("question").innerHTML =
        q.question;

    const options = document.getElementById("options");
    options.innerHTML = "";

    q.options.forEach((option,index)=>{
        const btn=document.createElement("button");
        btn.innerHTML=option;
        btn.onclick=()=>checkAnswer(index);
        options.appendChild(btn);
    });

}

function checkAnswer(selected){

    if(selected===questions[currentQuestion].answer){

        score+=10;
        alert("✅ Correct!");

    }else{

        lives--;
        score=Math.max(0,score-5);
        alert("❌ Wrong!");

    }

    currentQuestion++;

    loadQuestion();

}

window.onload=startGame;
