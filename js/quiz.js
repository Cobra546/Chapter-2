/* Chapter Two — quiz.js | Version 3 */

const quizData = [
  { question:"Who is the cutest? ❤️", options:["You","Me","Both","Nobody"], correct:["You","Me","Both"], response:"Correct ❤️ We are both cute!" },
  { question:"Who loves more? 💕", options:["You","Me","Both","Equal"], correct:["Both","Equal"], response:"Exactly! Love isn't a competition ❤️" },
  { question:"What should we always do?", options:["Stay together","Fight","Ignore","Forget"], correct:["Stay together"], response:"Forever together ❤️" },
  { question:"What is most important?", options:["Trust","Money","Luck","Nothing"], correct:["Trust"], response:"Trust makes love stronger ❤️" },
  { question:"Our story is...", options:["Beautiful","Boring","Average","Finished"], correct:["Beautiful"], response:"The best story ever ❤️" },
  { question:"Who makes me smile?", options:["You","Nobody","My phone","Everyone"], correct:["You"], response:"Always you ❤️" },
  { question:"Our future will be...", options:["Bright","Dark","Unknown","Bad"], correct:["Bright"], response:"In Sha Allah ❤️" },
  { question:"Will you stay forever?", options:["Yes ❤️","Always ❤️","Never","Maybe"], correct:["Yes ❤️","Always ❤️"], response:"Chapter Three awaits ❤️" }
];

let currentQuestion = 0;
let score = 0;

function quizEls(){
  return {
    number:document.getElementById("questionNumber"),
    progress:document.getElementById("progressFill"),
    question:document.getElementById("quizQuestion"),
    options:document.getElementById("quizOptions"),
    response:document.getElementById("quizResponse")
  };
}

function loadQuestion(){
  const e=quizEls(), q=quizData[currentQuestion];
  if(!q) return;
  e.number.textContent=`Question ${currentQuestion+1} / ${quizData.length}`;
  e.question.textContent=q.question;
  e.response.textContent="";
  e.options.innerHTML="";
  e.progress.style.width=`${(currentQuestion/quizData.length)*100}%`;
  q.options.forEach(option=>{
    const button=document.createElement("button");
    button.className="quizOption";
    button.type="button";
    button.textContent=option;
    button.addEventListener("click",()=>checkAnswer(option,button));
    e.options.appendChild(button);
  });
}

function checkAnswer(answer,button){
  const q=quizData[currentQuestion], e=quizEls();
  document.querySelectorAll(".quizOption").forEach(b=>b.disabled=true);
  if(q.correct.includes(answer)){
    score++;
    button.classList.add("correct");
    e.response.textContent=q.response;
  }else{
    button.classList.add("wrong");
    e.response.textContent="Oops 😅 Remember our story ❤️";
    document.querySelectorAll(".quizOption").forEach(b=>{
      if(q.correct.includes(b.textContent)) b.classList.add("correct");
    });
  }
  e.progress.style.width=`${((currentQuestion+1)/quizData.length)*100}%`;
  setTimeout(nextQuestion,1200);
}

function nextQuestion(){
  currentQuestion++;
  if(currentQuestion>=quizData.length){ finishQuiz(); return; }
  loadQuestion();
}

function startQuiz(){
  currentQuestion=0;
  score=0;
  loadQuestion();
}

function finishQuiz(){
  const e=quizEls();
  e.question.textContent="🎉 Quiz Complete!";
  e.options.innerHTML="";
  e.progress.style.width="100%";
  e.response.textContent=`You scored ${score} / ${quizData.length} ❤️`;
  setTimeout(()=>{
    if(typeof showPage==="function") showPage("starsPage");
    if(typeof startStars==="function") startStars();
  },1800);
}

function resetQuiz(){
  currentQuestion=0;
  score=0;
  const e=quizEls();
  e.progress.style.width="0%";
  e.question.textContent="";
  e.options.innerHTML="";
  e.response.textContent="";
}

console.log("❤️ quiz.js loaded");
