/*=====================================
OUR STORY — CHAPTER TWO
camera.js
PART 1
=====================================*/

// Elements

const camera =
document.getElementById("camera");

const canvas =
document.getElementById("captureCanvas");

const selfieImage =
document.getElementById("selfieImage");

const countdown =
document.getElementById("cameraCountdown");

const cameraStatus =
document.getElementById("cameraStatus");

let stream = null;

/*=====================================
Start Camera
=====================================*/

async function startCamera(){

    countdown.innerHTML = "3";
    countdown.style.display = "block";

    cameraStatus.innerHTML =
    "Opening Camera... 📸";

    try{

        stream =
        await navigator.mediaDevices
        .getUserMedia({

            video:{
                facingMode:"user"
            },

            audio:false

        });

        camera.srcObject = stream;

        cameraStatus.innerHTML =
        "Smile 😊";

        startCountdown();

    }

    catch(error){

        cameraStatus.innerHTML =
        "Camera permission denied ❌";

        console.error(error);

    }

}

/*=====================================
Countdown
=====================================*/

function startCountdown(){

    let time = 3;

    countdown.innerHTML = time;

    const timer = setInterval(()=>{

        time--;

        countdown.innerHTML = time;

        if(time<=0){

            clearInterval(timer);

            countdown.innerHTML = "📸";

            setTimeout(()=>{

                capturePhoto();

            },600);

        }

    },1000);

}

/*=====================================
Capture Photo
=====================================*/

function capturePhoto(){

    const ctx =
    canvas.getContext("2d");

    canvas.width =
    camera.videoWidth;

    canvas.height =
    camera.videoHeight;

    ctx.drawImage(

        camera,

        0,

        0,

        canvas.width,

        canvas.height

    );

    const image =
    canvas.toDataURL("image/png");

    selfieImage.src = image;

    stopCamera();

    setTimeout(()=>{

        showPage("selfiePage");

    },500);

}

/*=====================================
Stop Camera
=====================================*/

function stopCamera(){

    if(stream){

        stream.getTracks().forEach(track=>{

            track.stop();

        });

    }

}
/*=====================================
OUR STORY — CHAPTER TWO
camera.js
PART 2
=====================================*/

/*=====================================
Camera Flash
=====================================*/

function cameraFlash(){

    const flash =
    document.getElementById("flashEffect");

    flash.classList.add("flash");

    setTimeout(()=>{

        flash.classList.remove("flash");

    },400);

}

/*=====================================
Capture Photo
(Override Previous Function)
=====================================*/

function capturePhoto(){

    cameraFlash();

    const ctx =
    canvas.getContext("2d");

    canvas.width =
    camera.videoWidth;

    canvas.height =
    camera.videoHeight;

    ctx.drawImage(
        camera,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const image =
    canvas.toDataURL("image/png");

    // Show on Selfie Page
    selfieImage.src = image;

    // Save for Future Star
    const futureImage =
    document.getElementById("futureSelfie");

    if(futureImage){

        futureImage.src = image;

    }

    // Save Locally
    localStorage.setItem(
        "chapterTwoSelfie",
        image
    );

    stopCamera();

    showPage("selfiePage");

    startSelfieTimer();

}

/*=====================================
Selfie Timer
=====================================*/

function startSelfieTimer(){

    setTimeout(()=>{

        showMemoryWall();

    },5000);

}

/*=====================================
Memory Wall
=====================================*/

function showMemoryWall(){

    showPage("memoryWall");

    const videos =
    document.querySelectorAll(
        ".memoryVideo"
    );

    videos.forEach(video=>{

        video.play().catch(()=>{});

    });

    setTimeout(()=>{

        if(typeof startQuiz==="function"){

            showPage("quizPage");

            startQuiz();

        }

    },12000);

}

/*=====================================
Restore Saved Selfie
=====================================*/

window.addEventListener("load",()=>{

    const saved =
    localStorage.getItem(
        "chapterTwoSelfie"
    );

    if(saved){

        selfieImage.src = saved;

        const futureImage =
        document.getElementById(
            "futureSelfie"
        );

        if(futureImage){

            futureImage.src = saved;

        }

    }

});
