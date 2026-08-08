/* Chapter Two — quiz.js | Version 3 */

const quizData=[
 {question:"Who is the cutest? ❤️",options:["You","Me","Both","Nobody"],response:"Correct ❤️ Every option is correct!"},
 {question:"Who loves more? 💕",options:["You","Me","Both","Equal"],response:"Exactly! Every answer is right ❤️"},
 {question:"What should we always do?",options:["Stay together","Fight","Ignore","Forget"],response:"Yes ❤️ Every choice is part of our story!"},
 {question:"What is most important?",options:["Trust","Money","Luck","Nothing"],response:"Exactly ❤️ Every answer is correct!"},
 {question:"Our story is...",options:["Beautiful","Boring","Average","Finished"],response:"Of course ❤️ Every answer is right!"},
 {question:"Who makes me smile?",options:["You","Nobody","My phone","Everyone"],response:"Yes ❤️ Every option is correct!"},
 {question:"Our future will be...",options:["Bright","Dark","Unknown","Bad"],response:"Exactly ❤️ Every answer is accepted!"},
 {question:"Will you stay forever?",options:["Yes ❤️","Always ❤️","Never","Maybe"],response:"Chapter Three awaits ❤️ Every answer is accepted!"}
];

let currentQuestion=0;
function quizEls(){return{number:document.getElementById("questionNumber"),progress:document.getElementById("progressFill"),question:document.getElementById("quizQuestion"),options:document.getElementById("quizOptions"),response:document.getElementById("quizResponse")};}
function loadQuestion(){
 const e=quizEls(),q=quizData[currentQuestion];if(!q)return;
 e.number.textContent=`Question ${currentQuestion+1} / ${quizData.length}`;
 e.question.textContent=q.question;e.response.textContent="";e.options.innerHTML="";e.progress.style.width=`${(currentQuestion/quizData.length)*100}%`;
 q.options.forEach(option=>{const b=document.createElement("button");b.className="quizOption";b.type="button";b.textContent=option;b.addEventListener("click",()=>checkAnswer(b));e.options.appendChild(b);});
}
function checkAnswer(button){
 const e=quizEls(),q=quizData[currentQuestion];
 document.querySelectorAll(".quizOption").forEach(b=>b.disabled=true);
 button.classList.add("correct");
 e.response.textContent=q.response;
 e.progress.style.width=`${((currentQuestion+1)/quizData.length)*100}%`;
 setTimeout(nextQuestion,1200);
}
function nextQuestion(){currentQuestion++;if(currentQuestion>=quizData.length){finishQuiz();return;}loadQuestion();}
function startQuiz(){currentQuestion=0;loadQuestion();}
function finishQuiz(){
 const e=quizEls();e.question.textContent="🎉 Quiz Complete!";e.options.innerHTML="";e.progress.style.width="100%";e.response.textContent="You got every question right ❤️ 8 / 8";
 setTimeout(()=>{if(typeof showPage==="function")showPage("starsPage");if(typeof startStars==="function")startStars();},1800);
}
function resetQuiz(){currentQuestion=0;const e=quizEls();e.progress.style.width="0%";e.question.textContent="";e.options.innerHTML="";e.response.textContent="";}
console.log("❤️ quiz.js loaded — all answers accepted");
