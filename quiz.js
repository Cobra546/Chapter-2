/*=====================================
OUR STORY — CHAPTER TWO
quiz.js
PART 1
=====================================*/

// Elements

const questionNumber =
document.getElementById("questionNumber");

const progressFill =
document.getElementById("progressFill");

const quizQuestion =
document.getElementById("quizQuestion");

const quizOptions =
document.getElementById("quizOptions");

const quizResponse =
document.getElementById("quizResponse");

// Quiz Data

const quiz = [

{
question:"Where did our story begin? ❤️",
options:[
"The First Chat",
"The Moon",
"The Market",
"The School"
],
correct:0
},

{
question:"Who is the cutest? 🥺",
options:[
"You ❤️",
"Me",
"Both",
"No One"
],
correct:0
},

{
question:"Who says 'I love you' more? 💕",
options:[
"You",
"Me",
"Both",
"No One"
],
correct:2
},

{
question:"What is the strongest thing between us? ❤️",
options:[
"Love",
"Luck",
"Distance",
"Time"
],
correct:0
},

{
question:"Our dream together? 🌎",
options:[
"Travel",
"Forever",
"Both",
"Nothing"
],
correct:2
},

{
question:"Who makes every day special? ✨",
options:[
"You ❤️",
"Me",
"Both",
"Coffee"
],
correct:2
},

{
question:"What should never end? 💞",
options:[
"Our Story",
"Our Memories",
"Our Love",
"All of These"
],
correct:3
},

{
question:"Ready for Chapter Three? ❤️",
options:[
"Always ❤️",
"Maybe",
"No",
"Later"
],
correct:0
}

];

let currentQuestion = 0;
let score = 0;

/*=====================================
Start Quiz
=====================================*/

function startQuiz(){

currentQuestion = 0;
score = 0;

loadQuestion();

}

/*=====================================
Load Question
=====================================*/

function loadQuestion(){

quizResponse.innerHTML = "";

questionNumber.innerHTML =
`Question ${currentQuestion+1} / ${quiz.length}`;

progressFill.style.width =
`${((currentQuestion)/quiz.length)*100}%`;

quizQuestion.innerHTML =
quiz[currentQuestion].question;

quizOptions.innerHTML = "";

quiz[currentQuestion].options.forEach(

(option,index)=>{

const button =
document.createElement("button");

button.innerHTML = option;

button.onclick = ()=>{

checkAnswer(index);

};

quizOptions.appendChild(button);

});

}
/*=====================================
OUR STORY — CHAPTER TWO
quiz.js
PART 2
=====================================*/

/*=====================================
Check Answer
=====================================*/

function checkAnswer(selected){

    const correct =
    quiz[currentQuestion].correct;

    const buttons =
    quizOptions.querySelectorAll("button");

    buttons.forEach(btn=>{

        btn.disabled = true;

    });

    if(selected === correct){

        score++;

        quizResponse.innerHTML =
        "💚 Correct! You're amazing ❤️";

        quizResponse.style.color =
        "#7dffae";

        buttons[selected].style.background =
        "#27ae60";

    }

    else{

        quizResponse.innerHTML =
        "❤️ Aww... I'll still choose you every time.";

        quizResponse.style.color =
        "#ffb3c6";

        buttons[selected].style.background =
        "#e74c3c";

        buttons[correct].style.background =
        "#27ae60";

    }

    setTimeout(()=>{

        currentQuestion++;

        if(currentQuestion < quiz.length){

            loadQuestion();

        }

        else{

            finishQuiz();

        }

    },1800);

}

/*=====================================
Finish Quiz
=====================================*/

function finishQuiz(){

    progressFill.style.width = "100%";

    quizQuestion.innerHTML =
    "🎉 Quiz Completed!";

    quizOptions.innerHTML = "";

    let message = "";

    if(score === quiz.length){

        message =
        `Perfect! ❤️\n\nYou scored ${score}/${quiz.length}.\nYou're officially the Queen of Our Story 👑`;

        createConfetti();

    }

    else if(score >= 6){

        message =
        `Amazing! 💕\n\nYou scored ${score}/${quiz.length}.\nLet's continue our journey.`;

    }

    else{

        message =
        `You scored ${score}/${quiz.length} ❤️\n\nNo worries...\nLove is always the right answer.`;

    }

    quizResponse.innerHTML = message;

    setTimeout(()=>{

        showPage("starsPage");

        if(typeof startStars === "function"){

            startStars();

        }

    },3500);

}

/*=====================================
Simple Confetti
=====================================*/

function createConfetti(){

    const container =
    document.getElementById("confetti");

    if(!container) return;

    for(let i=0;i<40;i++){

        const piece =
        document.createElement("div");

        piece.innerHTML =
        Math.random()>0.5 ? "🎉" : "❤️";

        piece.style.position = "absolute";
        piece.style.left = Math.random()*100+"%";
        piece.style.top = "-10%";
        piece.style.fontSize =
        (18+Math.random()*18)+"px";

        piece.style.animation =
        `heartFall ${3+Math.random()*2}s linear forwards`;

        container.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },5000);

    }

}
