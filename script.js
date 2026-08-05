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
