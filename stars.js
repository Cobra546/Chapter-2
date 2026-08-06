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
