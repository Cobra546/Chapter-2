/*=================================================
 OUR STORY - CHAPTER TWO
 SCRIPT.JS
 VERSION 3 - CLEAN + TEST MODE
=================================================*/

/*==========================
Elements
==========================*/

const pages = document.querySelectorAll(".page");

const loadingFill = document.getElementById("loadingFill");
const loveInput = document.getElementById("loveInput");
const unlockBtn = document.getElementById("unlockBtn");
const gateMessage = document.getElementById("gateMessage");
const beginJourney = document.getElementById("beginJourney");
const letterText = document.getElementById("letterText");
const nextLetterBtn = document.getElementById("nextLetterBtn");
const selfiePage = document.getElementById("selfiePage");
const memoryWall = document.getElementById("memoryWall");
const replayButton = document.getElementById("replayBtn");
const restartButton = document.getElementById("restartBtn");
const cameraStatus = document.getElementById("cameraStatus");

let currentPage = "loadingPage";
let letterIndex = 0;
let letterFinished = false;

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
    pages.forEach(page => page.classList.remove("active"));

    const target = document.getElementById(id);

    if(!target){
        console.error("Page not found:", id);
        return;
    }

    target.classList.add("active");
    currentPage = id;

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
}

/*==========================
Loading Animation
==========================*/

let loading = 0;

const loadingInterval = setInterval(() => {
    loading++;

    if(loadingFill){
        loadingFill.style.width = loading + "%";
    }

    if(loading >= 100){
        clearInterval(loadingInterval);

        setTimeout(() => {
            startWebsite();
        }, 500);
    }
}, 30);

/*==========================
Website Start + TEST MODE
==========================*/

function startWebsite(){

    const params = new URLSearchParams(window.location.search);
    const testMode = params.get("test");
    const page = params.get("page");

    /*=====================================
      TEST MODE

      Examples:
      ?test=1
      ?test=1&page=quiz
      ?test=1&page=memory
      ?test=1&page=gift
      ?test=1&page=future
      ?test=1&page=ending
      ?test=1&page=hero
    =====================================*/

    if(testMode === "1"){

        console.log("🧪 TEST MODE ON");

        switch(page){

            case "quiz":
                showPage("quizPage");
                if(typeof startQuiz === "function"){
                    startQuiz();
                }
                return;

            case "memory":
                showPage("memoryWall");
                return;

            case "gift":
                showPage("giftPage");
                return;

            case "future":
                showPage("futurePage");
                if(typeof startFutureStory === "function"){
                    startFutureStory();
                }
                return;

            case "ending":
                showPage("postCreditPage");
                return;

            case "camera":
                showPage("cameraPage");
                if(typeof openCameraPage === "function"){
                    openCameraPage();
                }
                return;

            case "hero":
                showPage("heroPage");
                return;

            default:
                showPage("heroPage");
                return;
        }
    }

    /* NORMAL MODE */
    showPage("loveGate");
}

/*==========================
Unlock Logic
==========================*/

if(unlockBtn){
    unlockBtn.addEventListener("click", unlockWebsite);
}

if(loveInput){
    loveInput.addEventListener("keydown", event => {
        if(event.key === "Enter"){
            unlockWebsite();
        }
    });
}

function unlockWebsite(){

    const value = loveInput.value.toLowerCase().trim();

    if(value.length === 0){
        gateMessage.textContent = "Say something sweet ❤️";
        return;
    }

    const matched = positiveWords.some(word => value.includes(word));

    if(!matched){
        gateMessage.textContent =
            "Only positive words can unlock our story ❤️";
        return;
    }

    gateMessage.textContent = "Unlocked ❤️";

    setTimeout(() => {
        showPage("heroPage");
    }, 700);
}

/*==========================
Hero → Letter
==========================*/

if(beginJourney){
    beginJourney.addEventListener("click", () => {
        showPage("letterPage");
        startLetter();
    });
}

/*==========================
Love Letter
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

function startLetter(){
    letterText.textContent = "";
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

    letterText.textContent += letterMessage.charAt(letterIndex);
    letterIndex++;

    setTimeout(typeLetter, 35);
}

/*==========================
Letter → Camera
==========================*/

if(nextLetterBtn){
    nextLetterBtn.addEventListener("click", () => {
        if(typeof openCameraPage === "function"){
            openCameraPage();
        }else{
            showPage("cameraPage");
        }
    });
}

function resetLetter(){
    letterIndex = 0;
    letterFinished = false;

    if(letterText){
        letterText.textContent = "";
    }

    if(nextLetterBtn){
        nextLetterBtn.classList.add("hidden");
    }
}

/*==========================
Selfie → Memory Wall
==========================*/

if(selfiePage){
    selfiePage.addEventListener("click", () => {
        showPage("memoryWall");
    });
}

/*==========================
Memory Wall → Quiz
==========================*/

if(memoryWall){

    let wallTimer = null;

    function startMemoryWall(){
        clearTimeout(wallTimer);

        wallTimer = setTimeout(() => {
            showPage("quizPage");

            if(typeof startQuiz === "function"){
                startQuiz();
            }
        }, 7000);
    }

    memoryWall.addEventListener("click", () => {
        clearTimeout(wallTimer);
        showPage("quizPage");

        if(typeof startQuiz === "function"){
            startQuiz();
        }
    });

    const observer = new MutationObserver(() => {
        if(memoryWall.classList.contains("active")){
            startMemoryWall();
        }
    });

    observer.observe(memoryWall, {
        attributes: true,
        attributeFilter: ["class"]
    });
}

/*==========================
Replay
==========================*/

if(replayButton){
    replayButton.addEventListener("click", () => {
        resetStory();
        showPage("heroPage");
    });
}

/*==========================
Restart
==========================*/

if(restartButton){
    restartButton.addEventListener("click", () => {
        resetStory();
        showPage("loveGate");
    });
}

/*==========================
Reset Story
==========================*/

function resetStory(){

    if(typeof stopCamera === "function"){
        stopCamera();
    }

    if(typeof resetQuiz === "function"){
        resetQuiz();
    }

    if(typeof resetStars === "function"){
        resetStars();
    }

    resetLetter();
    clearEffects();

    if(cameraStatus){
        cameraStatus.textContent = "Smile... 😊";
    }
}

/*==========================
Clear Effects
==========================*/

function clearEffects(){
    const effects = [
        "heartRain",
        "rosePetals",
        "fireworks",
        "flashEffect",
        "confetti"
    ];

    effects.forEach(id => {
        const element = document.getElementById(id);

        if(element){
            element.innerHTML = "";
            element.style.opacity = "";
        }
    });
}

/*==========================
Cleanup
==========================*/

document.addEventListener("visibilitychange", () => {
    if(document.hidden && typeof stopCamera === "function"){
        stopCamera();
    }
});

window.addEventListener("beforeunload", () => {
    if(typeof stopCamera === "function"){
        stopCamera();
    }
});

window.addEventListener("error", event => {
    console.error("Website Error:", event.error || event.message);
});

console.log("❤️ Our Story — Chapter Two | Version 3 loaded.");
