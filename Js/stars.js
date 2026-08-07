/*=================================================
 STARS.JS
 VERSION 3
 PART 1
=================================================*/

/*=========================
Elements
=========================*/

const starBackground =
document.getElementById("starBackground");

const starsContinue =
document.getElementById("starsContinue");

/*=========================
Settings
=========================*/

const TOTAL_STARS = 10;

let collectedStars = 0;

/*=========================
Start Stars
=========================*/

function startStars(){

starBackground.innerHTML = "";

collectedStars = 0;

starsContinue.classList.add("hidden");

createStars();

}

/*=========================
Create Stars
=========================*/

function createStars(){

for(let i=0;i<TOTAL_STARS;i++){

const star = document.createElement("div");

star.className = "star";

star.style.left =
Math.random()*90 + "%";

star.style.top =
Math.random()*90 + "%";

star.style.animationDelay =
(Math.random()*2) + "s";

star.dataset.clicked = "false";

star.addEventListener(

"click",

()=>collectStar(star)

);

starBackground.appendChild(star);

}

}

/*=========================
Collect Star
=========================*/

function collectStar(star){

if(star.dataset.clicked==="true"){

return;

}

star.dataset.clicked = "true";

collectedStars++;

star.style.transform =
"scale(2)";

star.style.opacity = "0";

setTimeout(()=>{

star.remove();

},300);

checkStars();

}

/*=========================
Check Progress
=========================*/

function checkStars(){

if(collectedStars>=TOTAL_STARS){

starsContinue.classList.remove("hidden");

}

}
/*=================================================
 STARS.JS
 VERSION 3
 PART 2
=================================================*/

/*=========================
Continue Button
=========================*/

starsContinue.addEventListener(

"click",

openFuturePage

);

/*=========================
Open Future Page
=========================*/

function openFuturePage(){

showPage("futurePage");

startFutureStory();

}

/*=========================
Celebration Effects
=========================*/

function celebrateStars(){

createHeartRain();

createRosePetals();

flashScreen();

}

/*=========================
Flash Effect
=========================*/

function flashScreen(){

const flash =

document.getElementById("flashEffect");

flash.style.opacity = "1";

setTimeout(()=>{

flash.style.opacity = "0";

},300);

}

/*=========================
After All Stars
=========================*/

const oldCheckStars = checkStars;

checkStars = function(){

oldCheckStars();

if(collectedStars >= TOTAL_STARS){

celebrateStars();

}

};

/*=========================
Heart Rain
=========================*/

function createHeartRain(){

const container =

document.getElementById("heartRain");

container.innerHTML = "";

for(let i=0;i<25;i++){

const heart =

document.createElement("div");

heart.className = "heart";

heart.innerHTML = "❤️";

heart.style.left =

Math.random()*100 + "%";

heart.style.animationDuration =

(4 + Math.random()*3) + "s";

heart.style.animationDelay =

(Math.random()*2) + "s";

container.appendChild(heart);

}

}

/*=========================
Rose Petals
=========================*/

function createRosePetals(){

const container =

document.getElementById("rosePetals");

container.innerHTML = "";

for(let i=0;i<20;i++){

const petal =

document.createElement("div");

petal.className = "petal";

petal.innerHTML = "🌹";

petal.style.left =

Math.random()*100 + "%";

petal.style.animationDuration =

(5 + Math.random()*2) + "s";

petal.style.animationDelay =

(Math.random()*2) + "s";

container.appendChild(petal);

}

}
/*=================================================
 STARS.JS
 VERSION 3
 PART 3
 FUTURE STAR • FINAL LETTER • SEAL • GIFT
=================================================*/

/*=========================
Future Star
=========================*/

const futureTypewriter =
document.getElementById("futureTypewriter");

const futureSelfie =
document.getElementById("futureSelfie");

const futureNext =
document.getElementById("futureNext");

const futureMessage = `Maybe one day,
we will look back at this chapter
and smile at how far we've come. ❤️

But for now,
let's keep creating memories
worth remembering.

Our story isn't ending here...

It's only getting better. 🌠❤️`;

let futureIndex = 0;


/*=========================
Start Future Story
=========================*/

function startFutureStory(){

futureIndex = 0;

futureTypewriter.textContent = "";

futureNext.classList.add("hidden");

futureSelfie.style.display = "none";

typeFutureMessage();

}


/*=========================
Future Typewriter
=========================*/

function typeFutureMessage(){

if(futureIndex >= futureMessage.length){

showFutureSelfie();

return;

}

futureTypewriter.textContent +=
futureMessage.charAt(futureIndex);

futureIndex++;

setTimeout(
typeFutureMessage,
35
);

}


/*=========================
Show Selfie
=========================*/

function showFutureSelfie(){

/*
  If a selfie was captured,
  camera.js / supabase.js can
  place its URL here.
*/

const savedSelfie =
localStorage.getItem("latestSelfie");

if(savedSelfie){

futureSelfie.src = savedSelfie;

futureSelfie.style.display =
"block";

}

futureNext.classList.remove("hidden");

}


/*=========================
Future Continue
=========================*/

futureNext.addEventListener(

"click",

()=>{

showPage("finalLetterPage");

startFinalLetter();

}

);


/*=========================
Final Letter
=========================*/

const finalLetterText =
document.getElementById("finalLetterText");

const sealChapterBtn =
document.getElementById("sealChapterBtn");

const finalMessage = `Two chapters,
countless memories,
and so many moments
still waiting for us. ❤️

Thank you for being
part of my story.

Whatever comes next,
I hope we keep adding
beautiful memories
to these pages.

This chapter ends...

but our story continues. ❤️`;

let finalIndex = 0;


/*=========================
Start Final Letter
=========================*/

function startFinalLetter(){

finalIndex = 0;

finalLetterText.textContent = "";

sealChapterBtn.classList.add("hidden");

typeFinalLetter();

}


/*=========================
Final Typewriter
=========================*/

function typeFinalLetter(){

if(finalIndex >= finalMessage.length){

sealChapterBtn.classList.remove("hidden");

return;

}

finalLetterText.textContent +=
finalMessage.charAt(finalIndex);

finalIndex++;

setTimeout(
typeFinalLetter,
35
);

}


/*=========================
Seal Chapter
=========================*/

sealChapterBtn.addEventListener(

"click",

()=>{

showPage("sealPage");

startSealSequence();

}

);


/*=========================
Seal Sequence
=========================*/

function startSealSequence(){

setTimeout(()=>{

createFireworks();

createHeartRain();

},500);

setTimeout(()=>{

showPage("giftPage");

},3500);

}


/*=========================
Fireworks
=========================*/

function createFireworks(){

const container =
document.getElementById("fireworks");

container.innerHTML = "";

for(let i=0;i<18;i++){

const firework =
document.createElement("div");

firework.className =
"firework";

firework.style.left =
(20 + Math.random()*60) + "%";

firework.style.top =
(15 + Math.random()*50) + "%";

firework.style.animationDelay =
(Math.random()*1) + "s";

container.appendChild(firework);

}

}


/*=========================
Gift Box
=========================*/

const giftBox =
document.getElementById("giftBox");

const giftItems =
document.getElementById("giftItems");

giftBox.addEventListener(

"click",

()=>{

giftBox.style.transform =
"scale(1.15) rotate(5deg)";

setTimeout(()=>{

giftItems.classList.remove("hidden");

},400);

setTimeout(()=>{

showPage("continuePage");

},2500);

}

);


/*=========================
Continue Page
=========================*/

const continuePage =
document.getElementById("continuePage");

if(continuePage){

continuePage.addEventListener(

"click",

()=>{

showPage("replayPage");

}

);

}


/*=========================
Replay
=========================*/

const replayBtn =
document.getElementById("replayBtn");

if(replayBtn){

replayBtn.addEventListener(

"click",

()=>{

resetStars();

showPage("heroPage");

}

);

}


/*=========================
Reset Stars
=========================*/

function resetStars(){

starBackground.innerHTML = "";

collectedStars = 0;

starsContinue.classList.add("hidden");

futureTypewriter.textContent = "";

futureSelfie.style.display =
"none";

finalLetterText.textContent = "";

sealChapterBtn.classList.add("hidden");

giftItems.classList.add("hidden");

giftBox.style.transform =
"scale(1)";

}
