// ===============================
// ArhamNest Sanskrit Quest v1.0
// Part 1
// ===============================

let currentQuestion = 0;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval;

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const progressBar = document.getElementById("progressBar");
const timerEl = document.getElementById("timer");

const resultEl = document.getElementById("result");

document.getElementById("startBtn").onclick = startQuest;
document.getElementById("nextBtn").onclick = nextQuestion;

function startQuest(){

    homeScreen.style.display="none";
    quizScreen.style.display="block";

    currentQuestion=0;
    score=0;
    lives=3;

    loadQuestion();

}

function loadQuestion(){

    clearInterval(timerInterval);

    if(currentQuestion>=questions.length){

        finishQuiz();
        return;

    }

    timer=30;

    startTimer();

    updateHeader();

    progressBar.style.width=
    ((currentQuestion)/questions.length*100)+"%";

    const q=questions[currentQuestion];

    questionEl.innerHTML=q.question;

    optionsEl.innerHTML="";

    resultEl.innerHTML="";

    q.options.forEach((option,index)=>{

        const btn=document.createElement("button");

        btn.className="option";

        btn.innerHTML=option;

        btn.onclick=()=>checkAnswer(index);

        optionsEl.appendChild(btn);

    });

}

function startTimer(){

    timerEl.innerHTML="⏳ "+timer;

    timerInterval=setInterval(()=>{

        timer--;

        timerEl.innerHTML="⏳ "+timer;

        if(timer<=0){

            clearInterval(timerInterval);

            lives--;

            nextQuestion();

        }

    },1000);

}

function updateHeader(){

    scoreEl.innerHTML="⭐ "+score+" XP";

    livesEl.innerHTML="❤️".repeat(lives);

}

function checkAnswer(index){

    // Part 2
    // We'll build this next

}

function nextQuestion(){

    currentQuestion++;

    if(lives<=0){

        finishQuiz();
        return;

    }

    loadQuestion();

}

function finishQuiz(){

    clearInterval(timerInterval);

    alert(
        "🏆 Quiz Finished\n\n"+
        "Score : "+score+
        "\nLives : "+lives
    );

    location.reload();

}
