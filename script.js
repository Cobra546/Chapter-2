/* ==========================================
OUR STORY — CHAPTER TWO ❤️
SCRIPT.JS PART 1
========================================== */

// ==========================
// ELEMENTS
// ==========================

const loadingScreen = document.getElementById("loadingScreen");

const loveGate = document.getElementById("loveGate");

const website = document.getElementById("website");

const loveInput = document.getElementById("loveInput");

const openBtn = document.getElementById("openBtn");

const meterBar = document.getElementById("meterBar");

const meterText = document.getElementById("meterText");

const typingStatus = document.getElementById("typingStatus");

const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

// ==========================
// LOADING SCREEN
// ==========================

window.addEventListener("load",()=>{

setTimeout(()=>{

loadingScreen.style.display="none";

loveGate.classList.remove("hidden");

},2500);

});

// ==========================
// LOVE METER
// ==========================

loveInput.addEventListener("input",()=>{

const text=loveInput.value.trim();

let percent=Math.min(text.length*5,100);

meterBar.style.width=percent+"%";

meterText.innerHTML=`Love Meter ❤️ ${percent}%`;

if(text.length===0){

typingStatus.innerHTML="🥺 Waiting for something sweet...";

}

else if(percent<30){

typingStatus.innerHTML="😊 Keep typing...";

}

else if(percent<70){

typingStatus.innerHTML="🥹 That's really sweet...";

}

else{

typingStatus.innerHTML="❤️ Perfect... Now open our story.";

}

});

// ==========================
// OPEN WEBSITE
// ==========================

openBtn.addEventListener("click",()=>{

const text=loveInput.value.trim().toLowerCase();

if(text.length<10){

alert("Please write something sweeter ❤️");

return;

}

loveGate.style.display="none";

website.classList.remove("hidden");

// Music

bgMusic.play().catch(()=>{});

// Timer

if(typeof startRelationshipTimer==="function"){

startRelationshipTimer();

}

// Typewriter

if(typeof startTypewriter==="function"){

startTypewriter();

}

// Slideshow

if(typeof startMemoryAnimation==="function"){

startMemoryAnimation();

}

});

// ==========================
// MUSIC BUTTON
// ==========================

let playing=true;

musicBtn.addEventListener("click",()=>{

if(playing){

bgMusic.pause();

musicBtn.innerHTML="🔇";

}else{

bgMusic.play();

musicBtn.innerHTML="🎵";

}

playing=!playing;

});

// ==========================
// AUTO PLAY FIX
// ==========================

document.body.addEventListener("click",()=>{

bgMusic.play().catch(()=>{});

},{once:true});
/* ==========================================
SCRIPT.JS PART 2
========================================== */

// ==========================
// TYPEWRITER LETTER
// ==========================

const letterText = `

Happy 2nd Anniversary ❤️

Thank you for staying.

Thank you for understanding me.

Thank you for accepting every version of me.

These two years gave me memories
I'll always cherish.

No matter where life takes us...

I'll always choose you.

Every.

Single.

Time.

❤️

`;

let letterIndex = 0;

function startTypewriter(){

const target = document.getElementById("typewriter");

target.innerHTML = "";

letterIndex = 0;

function type(){

if(letterIndex < letterText.length){

target.innerHTML += letterText.charAt(letterIndex);

letterIndex++;

setTimeout(type,45);

}

}

type();

}

// ==========================
// RELATIONSHIP TIMER
// ==========================

// 27 MAY 2025
// 7:39 PM PKT

const relationshipDate = new Date("2025-05-27T19:39:00+05:00");

function startRelationshipTimer(){

updateRelationshipTimer();

setInterval(updateRelationshipTimer,1000);

}

function updateRelationshipTimer(){

const now = new Date();

const diff = now - relationshipDate;

const days = Math.floor(diff / (1000*60*60*24));

const hours = Math.floor((diff/(1000*60*60))%24);

const minutes = Math.floor((diff/(1000*60))%60);

const seconds = Math.floor((diff/1000)%60);

document.getElementById("days").innerHTML = days;

document.getElementById("hours").innerHTML =
String(hours).padStart(2,"0");

document.getElementById("minutes").innerHTML =
String(minutes).padStart(2,"0");

document.getElementById("seconds").innerHTML =
String(seconds).padStart(2,"0");

}

// ==========================
// MEMORY ANIMATION
// ==========================

function startMemoryAnimation(){

const photos = document.querySelectorAll(".memory");

photos.forEach((photo,index)=>{

setTimeout(()=>{

photo.style.opacity="1";

photo.style.transform="scale(1)";

},index*300);

});

}

// ==========================
// SCROLL FADE EFFECT
// ==========================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll(
".letterSection,.timerSection,.memorySection,.timelineSection,.giftSection,.quizSection,.constellationSection,.finalLetter,.endingContent"
).forEach(section=>{

section.classList.add("fadeUp");

observer.observe(section);

});

// ==========================
// IMAGE POP EFFECT
// ==========================

document.querySelectorAll(".memory").forEach(img=>{

img.style.opacity="0";

img.style.transform="scale(.8)";

img.style.transition=".8s";

});
/* ==========================================
SCRIPT.JS PART 3
========================================== */

// ==========================
// GIFT BOXES
// ==========================

const giftPopup=document.getElementById("giftPopup");
const giftTitle=document.getElementById("giftTitle");
const giftContent=document.getElementById("giftContent");
const closeGift=document.getElementById("closeGift");

const gifts={

1:{
title:"💌 Love Letter",
content:`
My Love ❤️

Thank you for these beautiful two years.

Thank you for every smile,
every laugh,
every memory.

I'll always choose you.

Forever.

❤️
`
},

2:{
title:"🎵 Our Song",
content:`
Press the music button 🎵

Close your eyes...

And remember every beautiful moment.

❤️
`
},

3:{
title:"🎤 Voice Note",
content:`
Your voice note will play here.

(Add voice.mp3 later.)

❤️
`
},

4:{
title:"📜 Future Letter",
content:`
Open on 27 May 2027 ❤️

Dear Future Us...

I hope we're still making memories.

I hope we're still smiling together.

And I hope...

we're still choosing each other.

Forever.

♾️
`
},

5:{
title:"💍 Forever Promise",
content:`
I promise...

To stay.

To understand.

To support.

To love you.

Today.

Tomorrow.

Always.

❤️
`
}

};

document.querySelectorAll(".giftBox").forEach(box=>{

box.addEventListener("click",()=>{

const id=box.dataset.gift;

giftTitle.innerHTML=gifts[id].title;

giftContent.innerHTML=
gifts[id].content.replace(/\n/g,"<br>");

giftPopup.classList.remove("hidden");

});

});

closeGift.onclick=()=>{

giftPopup.classList.add("hidden");

};

giftPopup.onclick=(e)=>{

if(e.target===giftPopup){

giftPopup.classList.add("hidden");

}

};

// ==========================
// COUPLE QUIZ
// ==========================

const quiz=[

{

question:"When did our story begin? ❤️",

answers:[
"27 May 2025",
"1 January 2025",
"14 February 2025",
"10 June 2025"
],

correct:0

},

{

question:"Which anniversary is this?",

answers:[
"First",
"Second",
"Third",
"Fourth"
],

correct:1

},

{

question:"Who means the world to me? ❤️",

answers:[
"You ❤️",
"My Phone 😂",
"My Pillow 😴",
"My Laptop 💻"
],

correct:0

},

{

question:"What comes after 'To Be Continued...'?",

answers:[
"Replay Our Story ❤️",
"The End",
"Exit",
"Nothing"
],

correct:0

},

{

question:"Our love is...",

answers:[
"Forever ❤️",
"Temporary",
"Random",
"I Don't Know"
],

correct:0

}

];

let currentQuestion=0;

let score=0;

const question=document.getElementById("question");
const answers=document.getElementById("answers");
const scoreText=document.getElementById("score");

function loadQuestion(){

const q=quiz[currentQuestion];

question.innerHTML=q.question;

answers.innerHTML="";

q.answers.forEach((answer,index)=>{

const btn=document.createElement("button");

btn.className="answerBtn";

btn.innerHTML=answer;

btn.onclick=()=>checkAnswer(index);

answers.appendChild(btn);

});

}

function checkAnswer(index){

if(index===quiz[currentQuestion].correct){

score++;

}

currentQuestion++;

scoreText.innerHTML=
`Score ❤️ ${score} / ${quiz.length}`;

if(currentQuestion<quiz.length){

loadQuestion();

}else{

question.innerHTML=
`🎉 Quiz Complete!<br><br>You know our story beautifully. ❤️`;

answers.innerHTML="";

}

}

loadQuestion();
/* ==========================================
SCRIPT.JS PART 4
========================================== */

// ==========================
// MEMORY CONSTELLATION
// ==========================

const memories={

1:{
title:"🌸 The Beginning",
text:"The day our story began. ❤️"
},

2:{
title:"💬 First Conversation",
text:"One message changed everything."
},

3:{
title:"❤️ First 'I Love You'",
text:"Three words I'll never forget."
},

4:{
title:"📞 Favourite Call",
text:"Hours felt like minutes."
},

5:{
title:"🥹 Tough Times",
text:"No matter what happened... we stayed."
},

6:{
title:"😊 Favourite Smile",
text:"Your smile still makes my day."
},

7:{
title:"💍 Second Anniversary",
text:"730+ beautiful days together."
},

8:{
title:"♾️ Forever",
text:"Our story has no ending."
}

};

const memoryPopup=document.getElementById("memoryPopup");
const memoryTitle=document.getElementById("memoryTitle");
const memoryText=document.getElementById("memoryText");
const closeMemory=document.getElementById("closeMemory");

document.querySelectorAll(".star").forEach(star=>{

star.addEventListener("click",()=>{

const id=star.dataset.memory;

memoryPopup.classList.remove("hidden");

if(id==="future"){

memoryTitle.innerHTML="🌠 Future";

typeFutureMessage();

return;

}

memoryTitle.innerHTML=memories[id].title;

memoryText.innerHTML=memories[id].text;

});

});

closeMemory.onclick=()=>{

memoryPopup.classList.add("hidden");

};

memoryPopup.onclick=(e)=>{

if(e.target===memoryPopup){

memoryPopup.classList.add("hidden");

}

};

// ==========================
// FUTURE STAR
// ==========================

function typeFutureMessage(){

const lines=[

"This page is empty...",

"",

"Because our best memories",

"haven't happened yet.",

"",

"Maybe...",

"Our first selfie. 📸",

"Our first hug. ❤️",

"More adventures.",

"More dreams.",

"",

"Let's fill this page together.",

"❤️"

];

memoryText.innerHTML="";

let i=0;

function type(){

if(i<lines.length){

memoryText.innerHTML+=lines[i]+"<br>";

i++;

setTimeout(type,700);

}

}

type();

}

// ==========================
// FINAL LETTER
// ==========================

const endingMessage=`

Thank you...

For every smile.

For every laugh.

For every memory.

For every moment.

If I had to choose again...

I'd still choose you.

Every.

Single.

Time.

❤️

`;

let endingIndex=0;

function startEndingLetter(){

const target=document.getElementById("endingLetter");

target.innerHTML="";

endingIndex=0;

function type(){

if(endingIndex<endingMessage.length){

target.innerHTML+=endingMessage.charAt(endingIndex);

endingIndex++;

setTimeout(type,45);

}

}

type();

}

// ==========================
// FIREWORKS
// ==========================

function fireworks(){

for(let i=0;i<35;i++){

const spark=document.createElement("div");

spark.style.position="fixed";

spark.style.left="50%";

spark.style.top="50%";

spark.style.width="8px";

spark.style.height="8px";

spark.style.borderRadius="50%";

spark.style.background=`hsl(${Math.random()*360},100%,70%)`;

spark.style.pointerEvents="none";

spark.style.zIndex="999999";

const x=(Math.random()-0.5)*800;

const y=(Math.random()-0.5)*800;

spark.animate([

{

transform:"translate(0,0) scale(1)",

opacity:1

},

{

transform:`translate(${x}px,${y}px) scale(0)`,

opacity:0

}

],{

duration:1800,

easing:"ease-out"

});

document.body.appendChild(spark);

setTimeout(()=>{

spark.remove();

},1800);

}

}

// ==========================
// ROSE PETALS
// ==========================

setInterval(()=>{

const rose=document.createElement("div");

rose.innerHTML="🌹";

rose.style.position="fixed";

rose.style.left=Math.random()*100+"vw";

rose.style.top="-50px";

rose.style.fontSize=(20+Math.random()*20)+"px";

rose.style.pointerEvents="none";

rose.style.zIndex="999";

rose.animate([

{

transform:"translateY(0) rotate(0deg)",

opacity:1

},

{

transform:`translateY(${window.innerHeight+100}px) rotate(${360+Math.random()*360}deg)`,

opacity:0

}

],{

duration:7000,

easing:"linear"

});

document.body.appendChild(rose);

setTimeout(()=>{

rose.remove();

},7000);

},900);

// Start ending animation automatically
setTimeout(()=>{
startEndingLetter();
fireworks();
},5000);
/* ==========================================
SCRIPT.JS PART 5
FINAL ENDING ❤️
========================================== */

// ==========================
// REPLAY OUR STORY
// ==========================

const replayBtn = document.getElementById("replayStory");

if(replayBtn){

replayBtn.addEventListener("click",showFinalScene);

}

function showFinalScene(){

const overlay=document.createElement("div");

overlay.id="finalOverlay";

overlay.innerHTML=`

<div id="finalText"></div>

`;

document.body.appendChild(overlay);

const text=document.getElementById("finalText");

const lines=[

"Wait...",

"I forgot to tell you one last thing...",

"I still fall in love with you...",

"Every single day. ❤️",

"Happy 2nd Anniversary ❤️",

"See you in Chapter Three... ♾️"

];

let index=0;

function nextLine(){

if(index>=lines.length){

setTimeout(()=>{

location.reload();

},2500);

return;

}

text.style.opacity="0";

setTimeout(()=>{

text.innerHTML=lines[index];

text.style.opacity="1";

index++;

setTimeout(nextLine,2300);

},500);

}

nextLine();

}

// ==========================
// HEART RAIN
// ==========================

setInterval(()=>{

const heart=document.createElement("div");

heart.innerHTML="❤️";

heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.top="-50px";

heart.style.fontSize=(18+Math.random()*22)+"px";

heart.style.pointerEvents="none";

heart.style.zIndex="99999";

heart.animate([

{

transform:"translateY(0) rotate(0deg)",

opacity:1

},

{

transform:`translateY(${window.innerHeight+100}px) rotate(360deg)`,

opacity:0

}

],{

duration:5000,

easing:"linear"

});

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},5000);

},500);

// ==========================
// FINAL OVERLAY STYLE
// ==========================

const style=document.createElement("style");

style.innerHTML=`

#finalOverlay{

position:fixed;

inset:0;

background:#000;

display:flex;

justify-content:center;

align-items:center;

z-index:9999999;

animation:fadeIn 1s;

}

#finalText{

font-family:'Great Vibes',cursive;

font-size:55px;

color:white;

text-align:center;

padding:30px;

line-height:1.7;

opacity:0;

transition:1s;

text-shadow:

0 0 20px hotpink,

0 0 45px deeppink;

}

@media(max-width:768px){

#finalText{

font-size:34px;

padding:20px;

}

}

`;

document.head.appendChild(style);

console.log("❤️ Our Story — Chapter Two Loaded Successfully ❤️");
