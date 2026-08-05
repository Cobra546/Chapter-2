/*=====================================
OUR STORY — CHAPTER TWO
stars.js
PART 1
=====================================*/

const starBackground =
document.getElementById("starBackground");

const starsContinue =
document.getElementById("starsContinue");

const memories=[

"❤️ The day we met.",
"🥹 Our first smile.",
"🌙 Late night talks.",
"🎵 Our favorite songs.",
"📸 Beautiful memories.",
"🌹 Every little moment.",
"✨ Every laugh together.",
"💖 Forever starts with us."

];

let unlockedStars=0;
const totalStars=8;

/*=====================================
Start Stars
=====================================*/

function startStars(){

    unlockedStars=0;

    starsContinue.classList.add("hidden");

    starBackground.innerHTML="";

    createStars();

}

/*=====================================
Create Stars
=====================================*/

function createStars(){

    for(let i=0;i<totalStars;i++){

        const star=
        document.createElement("div");

        star.className="star";

        star.style.left=
        Math.random()*90+"%";

        star.style.top=
        Math.random()*80+"%";

        star.dataset.index=i;

        star.onclick=()=>{

            openMemory(star);

        };

        starBackground.appendChild(star);

    }

}

/*=====================================
Open Memory
=====================================*/

function openMemory(star){

    if(star.classList.contains("opened")) return;

    star.classList.add("opened");

    const index=
    Number(star.dataset.index);

    alert(memories[index]);

    star.style.background="#ff4d6d";
    star.style.boxShadow=
    "0 0 30px #ff4d6d";

    unlockedStars++;

    if(unlockedStars===totalStars){

        starsContinue.classList.remove("hidden");

    }

}
/*=====================================
OUR STORY — CHAPTER TWO
stars.js
PART 2
=====================================*/

// Continue Button

starsContinue.addEventListener("click",()=>{

    showPage("futurePage");

    startFutureMessage();

});

/*=====================================
Future Typewriter
=====================================*/

const futureTypewriter =
document.getElementById("futureTypewriter");

const futureNext =
document.getElementById("futureNext");

const futureMessage = `

Dear Love ❤️

No one knows what tomorrow
will bring...

But if you're with me,

every tomorrow becomes
my favorite day.

I want more adventures,
more photos,
more laughs,
more memories,
and many more chapters
with you.

This is not the end...

It's only the beginning
of forever. ❤️

`;

let futureIndex = 0;

function startFutureMessage(){

    futureTypewriter.innerHTML = "";

    futureIndex = 0;

    futureNext.style.display = "none";

    typeFuture();

}

function typeFuture(){

    if(futureIndex <
