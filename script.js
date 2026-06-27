let currentQuestion = 0;
let score = 0;
let lives = 3;

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const progressBar = document.getElementById("progressBar");
const messageEl = document.getElementById("message");

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

    if(currentQuestion>=questions.length){
        alert("🎉 Congratulations!\nYour Score : "+score);
        location.reload();
        return;
    }

    scoreEl.innerHTML="⭐ "+score+" XP";
    livesEl.innerHTML="❤️".repeat(lives);

    progressBar.style.width=
    ((currentQuestion)/questions.length*100)+"%";

    const q=questions[currentQuestion];

    questionEl.innerHTML=q.question;

    optionsEl.innerHTML="";

    messageEl.innerHTML="";

    q.options.forEach((option,index)=>{

        const btn=document.createElement("button");

        btn.className="option";

        btn.innerHTML=option;

        btn.onclick=()=>checkAnswer(index);

        optionsEl.appendChild(btn);

    });

}

function checkAnswer(index){

    const q=questions[currentQuestion];

    if(index===q.answer){

        score+=10;

        messageEl.innerHTML="✅ Correct! +10 XP";
        messageEl.style.color="green";

    }else{

        lives--;

        score=Math.max(0,score-5);

        messageEl.innerHTML=
        "❌ Wrong! Correct Answer: "+q.options[q.answer];

        messageEl.style.color="red";

        if(lives===0){

            alert("💀 Game Over");

            location.reload();

            return;

        }

    }

}

function nextQuestion(){

    currentQuestion++;

    loadQuestion();

}
