/*=================================================
 QUIZ.JS
 VERSION 3
 PART 1
=================================================*/

/*=========================
Elements
=========================*/

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

/*=========================
Quiz Data
=========================*/

const quizData = [

{

question:"Who is the cutest? ❤️",

options:[
"You",
"Me",
"Both",
"Nobody"
],

correct:[
"You",
"Me",
"Both"
],

response:"Correct ❤️ We are both cute!"

},

{

question:"Who loves more? 💕",

options:[
"You",
"Me",
"Both",
"Equal"
],

correct:[
"Both",
"Equal"
],

response:"Exactly! Love isn't a competition ❤️"

},

{

question:"What should we always do?",

options:[
"Stay together",
"Fight",
"Ignore",
"Forget"
],

correct:[
"Stay together"
],

response:"Forever together ❤️"

},

{

question:"What is most important?",

options:[
"Trust",
"Money",
"Luck",
"Nothing"
],

correct:[
"Trust"
],

response:"Trust makes love stronger ❤️"

},

{

question:"Our story is...",

options:[
"Beautiful",
"Boring",
"Average",
"Finished"
],

correct:[
"Beautiful"
],

response:"The best story ever ❤️"

},

{

question:"Who makes me smile?",

options:[
"You",
"Nobody",
"My phone",
"Everyone"
],

correct:[
"You"
],

response:"Always you ❤️"

},

{

question:"Our future will be...",

options:[
"Bright",
"Dark",
"Unknown",
"Bad"
],

correct:[
"Bright"
],

response:"In Sha Allah ❤️"

},

{

question:"Will you stay forever?",

options:[
"Yes ❤️",
"Always ❤️",
"Never",
"Maybe"
],

correct:[
"Yes ❤️",
"Always ❤️"
],

response:"Chapter Three awaits ❤️"

}

];

/*=========================
Variables
=========================*/

let currentQuestion = 0;

let score = 0;

/*=========================
Load Question
=========================*/

function loadQuestion(){

const q = quizData[currentQuestion];

questionNumber.textContent =
`Question ${currentQuestion + 1} / ${quizData.length}`;

quizQuestion.textContent =
q.question;

quizResponse.textContent = "";

quizOptions.innerHTML = "";

progressFill.style.width =
`${((currentQuestion) / quizData.length) * 100}%`;

}
/*=================================================
 QUIZ.JS
 VERSION 3
 PART 2
=================================================*/

/*=========================
Create Options
=========================*/

function renderOptions(){

const q = quizData[currentQuestion];

q.options.forEach(option=>{

const button = document.createElement("button");

button.className = "quizOption";

button.textContent = option;

button.addEventListener(

"click",

()=>checkAnswer(option,button)

);

quizOptions.appendChild(button);

});

}

/*=========================
Check Answer
=========================*/

function checkAnswer(answer,button){

const q = quizData[currentQuestion];

const buttons =

document.querySelectorAll(".quizOption");

/* Disable all buttons */

buttons.forEach(btn=>{

btn.disabled = true;

});

/* Correct */

if(q.correct.includes(answer)){

score++;

button.classList.add("correct");

quizResponse.innerHTML =

q.response;

}

/* Wrong */

else{

button.classList.add("wrong");

quizResponse.innerHTML =

"Oops 😅 Try remembering our story ❤️";

/* Highlight correct answer */

buttons.forEach(btn=>{

if(q.correct.includes(btn.textContent)){

btn.classList.add("correct");

}

});

}

/* Progress */

progressFill.style.width =

`${((currentQuestion+1)

/quizData.length)*100}%`;

/* Next Question */

setTimeout(()=>{

nextQuestion();

},1500);

}

/*=========================
Start Quiz
=========================*/

function startQuiz(){

currentQuestion = 0;

score = 0;

loadQuestion();

renderOptions();

}
/*=================================================
 QUIZ.JS
 VERSION 3
 PART 3
=================================================*/

/*=========================
Next Question
=========================*/

function nextQuestion(){

currentQuestion++;

if(currentQuestion >= quizData.length){

finishQuiz();

return;

}

loadQuestion();

renderOptions();

}

/*=========================
Finish Quiz
=========================*/

function finishQuiz(){

quizQuestion.innerHTML =

"🎉 Quiz Complete!";

quizOptions.innerHTML = "";

quizResponse.innerHTML =

`You scored ${score} / ${quizData.length} ❤️`;

progressFill.style.width = "100%";

/* Open Stars Page */

setTimeout(()=>{

showPage("starsPage");

/* Start stars if available */

if(typeof startStars === "function"){

startStars();

}

},1800);

}

/*=========================
Reset Quiz
=========================*/

function resetQuiz(){

currentQuestion = 0;

score = 0;

progressFill.style.width = "0%";

quizResponse.innerHTML = "";

quizOptions.innerHTML = "";

}

/*=========================
Replay Support
=========================*/

document
.getElementById("replayBtn")
?.addEventListener("click",()=>{

resetQuiz();

startQuiz();

showPage("quizPage");

});

/*=========================
Auto Start
=========================*/

/* Call this from script.js
   when you reach quizPage:

   startQuiz();

*/
