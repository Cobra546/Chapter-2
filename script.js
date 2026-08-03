/* ==========================================
OUR STORY — CHAPTER TWO ❤️
SCRIPT.JS PART 1
========================================== */

// ==========================================
// ELEMENTS
// ==========================================

const loadingScreen=document.getElementById("loadingScreen");

const loveGate=document.getElementById("loveGate");

const website=document.getElementById("website");

const loveInput=document.getElementById("loveInput");

const openBtn=document.getElementById("openBtn");

const meterBar=document.getElementById("meterBar");

const meterText=document.getElementById("meterText");

const typingStatus=document.getElementById("typingStatus");

const bgMusic=document.getElementById("bgMusic");

const musicBtn=document.getElementById("musicBtn");

const pages=document.querySelectorAll(".page");

// ==========================================
// LOADING
// ==========================================

window.addEventListener("load",()=>{

setTimeout(()=>{

loadingScreen.style.display="none";

loveGate.classList.remove("hidden");

},2500);

});

// ==========================================
// WORD LIST
// ==========================================

const goodWords=[

"love",

"beautiful",

"cute",

"pretty",

"kind",

"sweet",

"amazing",

"best",

"forever",

"happy",

"angel",

"perfect",

"adorable",

"miss",

"care",

"thank",

"smile"

];

const badWords=[

"hate",

"idiot",

"stupid",

"ugly",

"annoying",

"worst",

"die",

"bad",

"leave",

"boring",

"shut",

"loser",

"fake"

];

// ==========================================
// LOVE CHECK
// ==========================================

loveInput.addEventListener("input",()=>{

const text=loveInput.value.toLowerCase().trim();

let score=0;

goodWords.forEach(word=>{

if(text.includes(word)) score+=12;

});

badWords.forEach(word=>{

if(text.includes(word)) score-=30;

});

score=Math.max(0,Math.min(score,100));

meterBar.style.width=score+"%";

meterText.innerHTML=`Love Meter ❤️ ${score}%`;

if(score>=60){

typingStatus.innerHTML="🥹 That's beautiful...";

openBtn.disabled=false;

openBtn.style.opacity="1";

}

else{

typingStatus.innerHTML="💔 Say something sweeter...";

openBtn.disabled=true;

openBtn.style.opacity=".5";

}

});

// Disable initially

openBtn.disabled=true;

openBtn.style.opacity=".5";

// ==========================================
// OPEN WEBSITE
// ==========================================

openBtn.addEventListener("click",()=>{

loveGate.classList.add("hidden");

website.classList.remove("hidden");

pages.forEach(page=>page.classList.add("hidden"));

document.querySelector(".heroPage").classList.remove("hidden");

bgMusic.play().catch(()=>{});

});

// ==========================================
// MUSIC
// ==========================================

let playing=true;

musicBtn.onclick=()=>{

if(playing){

bgMusic.pause();

musicBtn.innerHTML="🔇";

}else{

bgMusic.play();

musicBtn.innerHTML="🎵";

}

playing=!playing;

};

// ==========================================
// PAGE CHANGE
// ==========================================

function showPage(className){

pages.forEach(page=>{

page.classList.add("hidden");

});

document.querySelector(className).classList.remove("hidden");

window.scrollTo({

top:0,

behavior:"smooth"

});

}
/* ==========================================
SCRIPT.JS PART 2
========================================== */

// ==========================================
// PAGE ELEMENTS
// ==========================================

const startJourney=document.getElementById("startJourney");

const nextToGallery=document.getElementById("nextToGallery");

const typewriter=document.getElementById("typewriter");

// ==========================================
// HERO -> LETTER
// ==========================================

startJourney.addEventListener("click",()=>{

showPage(".letterPage");

startTypewriter();

});

// ==========================================
// LETTER
// ==========================================

const letter=`My Love ❤️

Happy 2nd Anniversary.

Two years...

Countless memories.

Thank you for staying.

Thank you for understanding me.

Thank you for every smile.

Every laugh.

Every moment.

You make my life brighter every single day.

No matter what happens...

I'll always choose you.

Forever.

❤️`;

let index=0;

function startTypewriter(){

typewriter.innerHTML="";

index=0;

type();

}

function type(){

if(index<letter.length){

typewriter.innerHTML+=letter.charAt(index);

index++;

setTimeout(type,45);

}

}

// ==========================================
// RELATIONSHIP TIMER
// ==========================================

// HTML mein timerBox hona chahiye
// <div class="timerBox">
// <div class="timeCard"><h1 id="days">0</h1><span>Days</span></div>
// <div class="timeCard"><h1 id="hours">0</h1><span>Hours</span></div>
// <div class="timeCard"><h1 id="minutes">0</h1><span>Minutes</span></div>
// <div class="timeCard"><h1 id="seconds">0</h1><span>Seconds</span></div>
// </div>

const anniversaryDate=new Date("2024-05-27T00:00:00");

function updateTimer(){

const now=new Date();

const diff=now-anniversaryDate;

const days=Math.floor(diff/86400000);

const hours=Math.floor((diff%86400000)/3600000);

const minutes=Math.floor((diff%3600000)/60000);

const seconds=Math.floor((diff%60000)/1000);

const d=document.getElementById("days");
const h=document.getElementById("hours");
const m=document.getElementById("minutes");
const s=document.getElementById("seconds");

if(d) d.innerHTML=days;
if(h) h.innerHTML=hours;
if(m) m.innerHTML=minutes;
if(s) s.innerHTML=seconds;

}

setInterval(updateTimer,1000);

updateTimer();

// ==========================================
// LETTER -> GALLERY
// ==========================================

nextToGallery.addEventListener("click",()=>{

showPage(".galleryPage");

// Part 3 mein ye function banega
if(typeof startPolaroids==="function"){

startPolaroids();

}

});
/* ==========================================
SCRIPT.JS PART 3
========================================== */

// ==========================================
// POLAROID ANIMATION
// ==========================================

const polaroids=document.querySelectorAll(".polaroid");

const positions=[

{top:"40px",left:"40px",rotate:"-10deg"},
{top:"80px",left:"320px",rotate:"8deg"},
{top:"70px",left:"620px",rotate:"-6deg"},
{top:"300px",left:"120px",rotate:"7deg"},
{top:"280px",left:"450px",rotate:"-8deg"},
{top:"290px",left:"760px",rotate:"10deg"},
{top:"480px",left:"250px",rotate:"-5deg"},
{top:"470px",left:"620px",rotate:"6deg"}

];

function startPolaroids(){

polaroids.forEach((photo,index)=>{

setTimeout(()=>{

photo.style.opacity="1";

photo.style.top=positions[index].top;

photo.style.left=positions[index].left;

photo.style.transform=`translateY(0) rotate(${positions[index].rotate})`;

},index*900);

});

// Auto Quiz

setTimeout(()=>{

showPage(".quizPage");

loadQuestion();

},11000);

}

// ==========================================
// QUIZ
// ==========================================

const quiz=[

{

question:"What's our special day? ❤️",

answers:[

"Anniversary",

"Birthday",

"Holiday",

"Monday"

],

correct:0

},

{

question:"What should we always choose?",

answers:[

"Arguments",

"Each Other",

"Nothing",

"Sleep"

],

correct:1

},

{

question:"One word for our story?",

answers:[

"Forever",

"Temporary",

"Unknown",

"Random"

],

correct:0

},

{

question:"What's my favourite thing?",

answers:[

"Your Smile",

"Homework",

"Traffic",

"Rain"

],

correct:0

},

{

question:"How many years together?",

answers:[

"1",

"2",

"5",

"10"

],

correct:1

}

];

let currentQuestion=0;

let score=0;

const question=document.getElementById("question");

const answers=document.getElementById("answers");

const scoreText=document.getElementById("score");

const progress=document.getElementById("progressBar");

// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion(){

answers.innerHTML="";

progress.style.width=((currentQuestion)/quiz.length*100)+"%";

question.innerHTML=quiz[currentQuestion].question;

quiz[currentQuestion].answers.forEach((answer,index)=>{

const btn=document.createElement("button");

btn.className="answerBtn";

btn.innerHTML=answer;

btn.onclick=()=>checkAnswer(btn,index);

answers.appendChild(btn);

});

}

// ==========================================
// CHECK
// ==========================================
/* ==========================================
SCRIPT.JS PART 4
========================================== */

// ==========================================
// MEMORY DATA
// ==========================================

const memories={

1:{
title:"🌸 The Beginning",
text:"The day our story started. ❤️"
},

2:{
title:"💬 First Conversation",
text:"One message changed everything."
},

3:{
title:"😂 Our Funniest Moment",
text:"We laughed so much that day."
},

4:{
title:"❤️ Favourite Memory",
text:"Every memory with you feels special."
},

5:{
title:"🤍 Tough Times",
text:"No matter what happened, we stayed."
},

6:{
title:"🌹 Little Things",
text:"The smallest moments became the biggest memories."
},

7:{
title:"🥹 Today",
text:"Two years later... and I'd still choose you."
},

future:{
title:"🌠 Future Star",
text:`This page is empty...

Because our best memories
haven't happened yet.

Maybe...

📸 Our first selfie.

❤️ Our first hug.

🌍 More adventures.

✨ More dreams.

Let's fill this page together. ❤️`
}

};

// ==========================================
// POPUP
// ==========================================

const popup=document.getElementById("memoryPopup");
const popupTitle=document.getElementById("memoryTitle");
const popupText=document.getElementById("memoryText");
const closeMemory=document.getElementById("closeMemory");

let openedStars=0;

const totalStars=8;

// ==========================================
// START CONSTELLATION
// ==========================================

function startConstellation(){

document.querySelectorAll(".memoryStar")

.forEach(star=>{

star.addEventListener("click",()=>{

const id=star.dataset.memory;

popup.classList.remove("hidden");

popupTitle.innerHTML=memories[id].title;

popupText.innerHTML=

memories[id].text.replace(/\n/g,"<br>");

if(!star.classList.contains("done")){

star.classList.add("done");

openedStars++;

}

if(openedStars===totalStars){

setTimeout(()=>{

popup.classList.add("hidden");

showPage(".endingPage");

startEnding();

},2000);

}

});

});

}

// ==========================================
// CLOSE POPUP
// ==========================================

closeMemory.onclick=()=>{

popup.classList.add("hidden");

};

popup.onclick=(e)=>{

if(e.target===popup){

popup.classList.add("hidden");

}

};

// ==========================================
// ENDING LETTER
// ==========================================

const endingText=`Thank you...

For every smile.

For every laugh.

For every memory.

For staying.

For believing in us.

If I had to choose again...

I'd still choose you.

Every.

Single.

Time.

❤️`;

const endingLetter=document.getElementById("endingLetter");

let letterIndex=0;

function startEnding(){

endingLetter.innerHTML="";

letterIndex=0;

typeEnding();

}

function typeEnding(){

if(letterIndex<endingText.length){

endingLetter.innerHTML+=endingText.charAt(letterIndex);

letterIndex++;

setTimeout(typeEnding,45);

}else{

setTimeout(()=>{

document

.getElementById("replayStory")

.classList.add("show");

},7000);

}

}

// ==========================================
// REPLAY
// ==========================================

document

.getElementById("replayStory")

.onclick=()=>{

location.reload();

};
/* ==========================================
SCRIPT.JS PART 5
CINEMATIC ENDING ❤️
========================================== */

// ==========================================
// HEART RAIN
// ==========================================

function heartRain(){

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.top="-50px";

heart.style.fontSize=(20+Math.random()*18)+"px";

heart.style.pointerEvents="none";

heart.style.zIndex="99999";

heart.animate([

{transform:"translateY(0)",opacity:1},

{transform:`translateY(${window.innerHeight+100}px) rotate(360deg)`,opacity:0}

],{

duration:5000,

easing:"linear"

});

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),5000);

}

setInterval(heartRain,450);

// ==========================================
// ROSE PETALS
// ==========================================

function rosePetal(){

const rose=document.createElement("div");

rose.innerHTML="🌹";

rose.style.position="fixed";

rose.style.left=Math.random()*100+"vw";

rose.style.top="-40px";

rose.style.fontSize="24px";

rose.style.pointerEvents="none";

rose.style.zIndex="99998";

rose.animate([

{transform:"translateY(0)",opacity:1},

{transform:`translateY(${window.innerHeight+80}px) rotate(720deg)`,opacity:0}

],{

duration:7000,

easing:"linear"

});

document.body.appendChild(rose);

setTimeout(()=>rose.remove(),7000);

}

setInterval(rosePetal,900);

// ==========================================
// FIREWORKS
// ==========================================

function fireworks(){

for(let i=0;i<40;i++){

const spark=document.createElement("div");

spark.style.position="fixed";

spark.style.left="50%";

spark.style.top="50%";

spark.style.width="8px";

spark.style.height="8px";

spark.style.borderRadius="50%";

spark.style.background=`hsl(${Math.random()*360},100%,65%)`;

spark.style.pointerEvents="none";

spark.style.zIndex="999999";

const x=(Math.random()-0.5)*900;

const y=(Math.random()-0.5)*900;

spark.animate([

{transform:"translate(0,0)",opacity:1},

{transform:`translate(${x}px,${y}px) scale(0)`,opacity:0}

],{

duration:1800,

easing:"ease-out"

});

document.body.appendChild(spark);

setTimeout(()=>spark.remove(),1800);

}

}

// Fireworks after ending letter
setTimeout(fireworks,3000);

// ==========================================
// FINAL CINEMATIC SCREEN
// ==========================================

const replay=document.getElementById("replayStory");

replay.addEventListener("click",()=>{

const overlay=document.createElement("div");

overlay.style.position="fixed";

overlay.style.inset="0";

overlay.style.background="#000";

overlay.style.display="flex";

overlay.style.justifyContent="center";

overlay.style.alignItems="center";

overlay.style.flexDirection="column";

overlay.style.zIndex="99999999";

overlay.innerHTML=`

<h1 id="movieText"
style="
font-size:42px;
text-align:center;
padding:25px;
line-height:1.8;
font-family:'Great Vibes',cursive;
color:white;">
</h1>

`;

document.body.appendChild(overlay);

const text=document.getElementById("movieText");

const lines=[

"Wait...",

"I forgot to tell you one last thing...",

"I still fall in love with you...",

"Every single day. ❤️",

"Happy 2nd Anniversary ❤️",

"See you in Chapter Three... ♾️"

];

let i=0;

function next(){

if(i>=lines.length){

setTimeout(()=>{

location.reload();

},2500);

return;

}

text.style.opacity="0";

setTimeout(()=>{

text.innerHTML=lines[i];

text.style.opacity="1";

i++;

setTimeout(next,2300);

},500);

}

next();

});

console.log("❤️ Our Story — Chapter Two Loaded Successfully ❤️");
