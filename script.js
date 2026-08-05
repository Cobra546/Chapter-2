/*=====================================
OUR STORY — CHAPTER TWO
script.js
PART 1
=====================================*/

// ---------- Pages ----------

const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    document
    .getElementById(id)
    .classList.add("active");

}

// ---------- Loading ----------

const loadingFill =
document.getElementById("loadingFill");

let loading = 0;

const loadingInterval =
setInterval(()=>{

    loading++;

    loadingFill.style.width =
    loading + "%";

    if(loading>=100){

        clearInterval(
        loadingInterval);

        setTimeout(()=>{

            showPage("loveGate");

        },500);

    }

},35);

// ---------- Love Gate ----------

const loveInput =
document.getElementById("loveInput");

const unlockBtn =
document.getElementById("unlockBtn");

const gateMessage =
document.getElementById("gateMessage");

const positiveWords=[

"love",
"cute",
"handsome",
"jaan",
"baby",
"beautiful",
"best",
"sweet",
"mine",
"husband",
"king",
"adorable"

];

unlockBtn.addEventListener("click",()=>{

    const value=
    loveInput.value
    .trim()
    .toLowerCase();

    const passed=
    positiveWords.some(word=>
    value.includes(word));

    if(passed){

        gateMessage.style.color=
        "#7dffae";

        gateMessage.innerHTML=
        "Unlocked ❤️";

        setTimeout(()=>{

            showPage("heroPage");

        },900);

    }

    else{

        gateMessage.style.color=
        "#ff8080";

        gateMessage.innerHTML=
        "Say something sweet ❤️";

    }

});

// Enter key support

loveInput.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        unlockBtn.click();

    }

});

// ---------- Hero ----------

const beginJourney=
document.getElementById(
"beginJourney");

beginJourney.addEventListener(
"click",()=>{

    showPage("letterPage");

    startLetter();

});

// ---------- Letter ----------

const letterText=
document.getElementById(
"letterText");

const nextLetterBtn=
document.getElementById(
"nextLetterBtn");

const letter=`

Dear Love ❤️

Thank you for becoming
the most beautiful part
of my life.

Every smile,
every laugh,
every memory with you
is priceless.

This is only the beginning
of our forever.

Happy Chapter Two ❤️

`;

let letterIndex=0;

function startLetter(){

    letterText.innerHTML="";

    letterIndex=0;

    nextLetterBtn.classList.add(
    "hidden");

    typeLetter();

}

function typeLetter(){

    if(letterIndex<
    letter.length){

        letterText.innerHTML+=
        letter.charAt(letterIndex);

        letterIndex++;

        setTimeout(
        typeLetter,
        35);

    }

    else{

        nextLetterBtn.classList.remove(
        "hidden");

    }

}

// ---------- Next ----------

nextLetterBtn.addEventListener(
"click",()=>{

    showPage("cameraPage");

    if(typeof startCamera==="function"){

        startCamera();

    }

});
/*=====================================
OUR STORY — CHAPTER TWO
script.js
PART 2 (FINAL)
=====================================*/

// Final Letter

const finalLetterText =
document.getElementById("finalLetterText");

const sealChapterBtn =
document.getElementById("sealChapterBtn");

const sealChapter =
`My Love ❤️

Thank you for every smile,
every laugh,
every memory,
and every moment.

If life gives us
a thousand chapters,

I will still choose you
in every single one.

Forever begins with us.

❤️`;

let finalIndex = 0;

function startFinalLetter(){

    finalLetterText.innerHTML = "";
    finalIndex = 0;

    sealChapterBtn.classList.add("hidden");

    typeFinalLetter();

}

function typeFinalLetter(){

    if(finalIndex < sealChapter.length){

        finalLetterText.innerHTML +=
        sealChapter.charAt(finalIndex);

        finalIndex++;

        setTimeout(typeFinalLetter,35);

    }else{

        sealChapterBtn.classList.remove("hidden");

    }

}

// Seal Chapter

sealChapterBtn.addEventListener("click",()=>{

    showPage("sealPage");

    setTimeout(()=>{

        showPage("giftPage");

    },4000);

});

// Gift Box

const giftBox =
document.getElementById("giftBox");

const giftItems =
document.getElementById("giftItems");

giftBox.addEventListener("click",()=>{

    giftItems.classList.remove("hidden");

    setTimeout(()=>{

        showPage("continuePage");

    },4000);

});

// Continue Page

setTimeout(()=>{

    const page =
    document.getElementById("continuePage");

    if(page.classList.contains("active")){

        showPage("replayPage");

    }

},8000);

// Replay

document
.getElementById("replayBtn")
.addEventListener("click",()=>{

    location.reload();

});

// Restart

document
.getElementById("restartBtn")
.addEventListener("click",()=>{

    location.reload();

});

// Credit Scene

const creditText =
document.getElementById("creditText");

const creditMessage = `

Thank you
for reading
Our Story...

Every chapter
with you
is my favorite.

See you in
Chapter Three ❤️

`;

function startCredits(){

    creditText.innerHTML = "";

    let i = 0;

    const timer = setInterval(()=>{

        creditText.innerHTML +=
        creditMessage.charAt(i);

        i++;

        if(i >= creditMessage.length){

            clearInterval(timer);

            document
            .getElementById("restartBtn")
            .classList.remove("hidden");

        }

    },40);

}

// Heart Rain

function createHeartRain(){

    const container =
    document.getElementById("heartRain");

    for(let i=0;i<25;i++){

        const heart =
        document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "❤️";

        heart.style.left =
        Math.random()*100+"%";

        heart.style.fontSize =
        (18+Math.random()*20)+"px";

        heart.style.animationDuration =
        (3+Math.random()*3)+"s";

        container.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },6000);

    }

}

// Rose Petals

function createRosePetals(){

    const container =
    document.getElementById("rosePetals");

    for(let i=0;i<20;i++){

        const petal =
        document.createElement("div");

        petal.className = "petal";

        petal.innerHTML = "🌹";

        petal.style.left =
        Math.random()*100+"%";

        petal.style.fontSize =
        (18+Math.random()*18)+"px";

        petal.style.animationDuration =
        (4+Math.random()*3)+"s";

        container.appendChild(petal);

        setTimeout(()=>{

            petal.remove();

        },7000);

    }

}

// Fireworks

function launchFireworks(){

    createHeartRain();

    createRosePetals();

}

// Auto Ending Effects

document
.getElementById("giftBox")
.addEventListener("click",()=>{

    launchFireworks();

});
