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
