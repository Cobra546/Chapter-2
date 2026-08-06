/*=================================================
 OUR STORY - CHAPTER TWO
 SCRIPT.JS
 VERSION 3
 PART 1
==================================================*/

/*==========================
Elements
==========================*/

const pages = document.querySelectorAll(".page");

const loadingPage = document.getElementById("loadingPage");
const loveGate = document.getElementById("loveGate");
const heroPage = document.getElementById("heroPage");

const loadingFill = document.getElementById("loadingFill");

const loveInput = document.getElementById("loveInput");
const unlockBtn = document.getElementById("unlockBtn");
const gateMessage = document.getElementById("gateMessage");

const beginJourney =
document.getElementById("beginJourney");

/*==========================
Current Page
==========================*/

let currentPage = "loadingPage";

/*==========================
Positive Words
==========================*/

const positiveWords = [

"love",

"cute",

"handsome",

"beautiful",

"pretty",

"lovely",

"amazing",

"perfect",

"angel",

"princess",

"queen",

"sweet",

"adorable",

"mine",

"soulmate",

"sunshine",

"i love you",

"my love",

"my queen",

"my princess",

"forever together",

"always yours",

"best girlfriend"

];

/*==========================
Show Page
==========================*/

function showPage(id){

pages.forEach(page=>{

page.classList.remove("active");

});

document
.getElementById(id)
.classList.add("active");

currentPage=id;

window.scrollTo({

top:0,

behavior:"auto"

});

}

/*==========================
Loading Animation
==========================*/

let loading = 0;

const loadingInterval =

setInterval(()=>{

loading++;

loadingFill.style.width=

loading+"%";

if(loading>=100){

clearInterval(

loadingInterval

);

setTimeout(()=>{

startWebsite();

},500);

}

},30);

/*==========================
Website Start
==========================*/

function startWebsite(){

const params =

new URLSearchParams(

window.location.search

);

const testMode =

params.get("test");

const page =

params.get("page");

/*==========

TEST MODE

===========*/

if(testMode==="1"){

if(page==="quiz"){

showPage("quizPage");

return;

}

if(page==="memory"){

showPage("memoryWall");

return;

}

if(page==="gift"){

showPage("giftPage");

return;

}

if(page==="future"){

showPage("futurePage");

return;

}

if(page==="ending"){

showPage("postCreditPage");

return;

}

showPage("heroPage");

return;

}

/*==========

NORMAL MODE

===========*/

showPage("loveGate");

}

/*==========================
Unlock Logic
==========================*/

unlockBtn.addEventListener(

"click",

unlockWebsite

);

loveInput.addEventListener(

"keydown",

e=>{

if(e.key==="Enter"){

unlockWebsite();

}

});

function unlockWebsite(){

const value=

loveInput.value

.toLowerCase()

.trim();

if(value.length===0){

gateMessage.innerHTML=

"Say something sweet ❤️";

return;

}

const matched=

positiveWords.some(

word=>

value.includes(word)

);

if(!matched){

gateMessage.innerHTML=

"Only positive words can unlock our story ❤️";

return;

}

gateMessage.innerHTML=

"Unlocked ❤️";

setTimeout(()=>{

showPage("heroPage");

},700);

}

/*==========================
Hero Button
==========================*/


/*=================================================
 VERSION 3
 PART 2
 LOVE LETTER • TYPEWRITER • CAMERA TRANSITION
==================================================*/

/*==========================
Elements
==========================*/

const letterText =
document.getElementById("letterText");

const nextLetterBtn =
document.getElementById("nextLetterBtn");

/*==========================
Letter
==========================*/

const letterMessage = `Dear ❤️,

Thank you for every smile,
every laugh,
every memory
and every moment.

No matter what happens,
I will always be grateful
that you became a part
of my story.

This website is only
a small reminder
that you are special.

I hope every page
makes you smile.

Happy Anniversary ❤️`;

/*==========================
Typewriter
==========================*/

let letterIndex = 0;
let letterFinished = false;

function startLetter(){

letterText.innerHTML = "";

nextLetterBtn.classList.add("hidden");

letterIndex = 0;

letterFinished = false;

typeLetter();

}

function typeLetter(){

if(letterIndex >= letterMessage.length){

letterFinished = true;

nextLetterBtn.classList.remove("hidden");

return;

}

letterText.innerHTML +=

letterMessage.charAt(letterIndex);

letterIndex++;

setTimeout(typeLetter,35);

}

/*==========================
Open Letter
==========================*/

document
.getElementById("beginJourney")
.addEventListener(

"click",

()=>{

showPage("letterPage");

setTimeout(startLetter,300);

});

/*==========================
Continue
==========================*/

nextLetterBtn.addEventListener(

"click",

()=>{

showPage("cameraPage");

/* Camera Part 3 */

});

/*==========================
Replay Protection
==========================*/

function resetLetter(){

letterIndex = 0;

letterFinished = false;

letterText.innerHTML = "";

nextLetterBtn.classList.add(

"hidden"

);

}
