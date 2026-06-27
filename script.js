// ====================================
// ArhamNest Sanskrit Quest v1.0
// Part 1
// ====================================

let currentQuestion = 0;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval = null;

const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");
const finishScreen = document.getElementById("finishScreen");

const studentName = document.getElementById("studentName");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const finalScore = document.getElementById("finalScore");

document.getElementById("startBtn").addEventListener("click", startQuest);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);

function startQuest(){

    if(studentName.value.trim()===""){
        alert("Please enter your name.");
        return;
    }

    homeScreen.style.display="none";
    finishScreen.style.display="none";
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

    updateHeader();

    startTimer();

    progressBar.style.width =
    ((currentQuestion+1)/questions.length*100)+"%";

    const q=questions[currentQuestion];

    questionEl.innerHTML=q.question;

    resultEl.innerHTML="";

    optionsEl.innerHTML="";

    q.options.forEach((option,index)=>{

        const btn=document.createElement("button");

        btn.className="option";

        btn.textContent=option;

        btn.onclick=()=>checkAnswer(index);

        optionsEl.appendChild(btn);

    });

}

function startTimer(){

    timerEl.textContent="⏳ "+timer;

    timerInterval=setInterval(()=>{

        timer--;

        timerEl.textContent="⏳ "+timer;

        if(timer<=0){

            clearInterval(timerInterval);

            lives--;

            updateHeader();

            nextQuestion();

        }

    },1000);

}

function updateHeader(){

    scoreEl.textContent="⭐ "+score+" XP";

    livesEl.textContent="❤️".repeat(lives);

}

function nextQuestion(){

    currentQuestion++;

    if(lives<=0){

        finishQuiz();

        return;

    }

    loadQuestion();

}

// Part 2 starts here...
function checkAnswer(index){

    clearInterval(timerInterval);

    const q = questions[currentQuestion];

    const buttons = document.querySelectorAll(".option");

    buttons.forEach((btn,i)=>{

        btn.disabled = true;

        if(i===q.answer){
            btn.style.background="#4CAF50";
        }

        if(i===index && index!==q.answer){
            btn.style.background="#F44336";
        }

    });

    if(index===q.answer){

        score += 10;

        resultEl.innerHTML="✅ Correct! +10 XP";
        resultEl.style.color="green";

    }else{

        lives--;

        score=Math.max(0,score-5);

        resultEl.innerHTML=
        "❌ Wrong! Correct Answer: <b>"+q.options[q.answer]+"</b>";

        resultEl.style.color="red";

    }

    updateHeader();

    setTimeout(()=>{

        currentQuestion++;

        if(currentQuestion>=questions.length || lives<=0){

            finishQuiz();

        }else{

            loadQuestion();

        }

    },2000);

}
function finishQuiz(){

    clearInterval(timerInterval);

    quizScreen.style.display="none";
    finishScreen.style.display="block";

    let percentage=Math.round((score/(questions.length*10))*100);

    let medal="🥉 Bronze";

    if(percentage>=90){
        medal="🥇 Gold";
    }else if(percentage>=70){
        medal="🥈 Silver";
    }

    finalScore.innerHTML=`
        <h2>🎉 Congratulations!</h2>
        <h3>${studentName.value}</h3>
        <p>⭐ XP: ${score}</p>
        <p>📊 Score: ${percentage}%</p>
        <h1>${medal}</h1>
    `;

}
}


    

function checkAnswer(index){

    // Part 2
    // Next message

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

    quizScreen.style.display="none";

    finishScreen.style.display="block";

    let medal="🥉 Bronze";

    if(score>=80){
        medal="🥇 Gold";
    }else if(score>=50){
        medal="🥈 Silver";
    }

    finalScore.innerHTML=
    "Student : <b>"+studentName.value+"</b><br><br>"+
    "XP : "+score+"<br><br>"+
    medal;

}
