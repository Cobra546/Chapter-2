/*=================================================
 CAMERA.JS
 VERSION 3
 PART 1
==================================================*/

let cameraStream = null;

const camera =
document.getElementById("camera");

const canvas =
document.getElementById("captureCanvas");

const countdown =
document.getElementById("cameraCountdown");

const statusText =
document.getElementById("cameraStatus");

/*=================================
Start Camera
=================================*/

async function startCamera(){

try{

cameraStream =
await navigator.mediaDevices.getUserMedia({

video:{
facingMode:"user",
width:{ideal:1080},
height:{ideal:1080}
},

audio:false

});

camera.srcObject =
cameraStream;

await camera.play();

statusText.innerHTML =
"Smile... 📸";

setTimeout(()=>{

startCountdown();

},1000);

}

catch(error){

console.error(error);

statusText.innerHTML =
"❌ Camera permission denied.";

}

}

/*=================================
Countdown
=================================*/

function startCountdown(){

let time = 3;

countdown.style.display =
"flex";

countdown.innerHTML = time;

const timer = setInterval(()=>{

time--;

if(time>0){

countdown.innerHTML = time;

return;

}

clearInterval(timer);

countdown.innerHTML =
"📸";

setTimeout(()=>{

countdown.style.display =
"none";

/* Capture in Part 2 */

captureSelfie();

},700);

},1000);

}

/*=================================
Stop Camera
=================================*/

function stopCamera(){

if(!cameraStream) return;

cameraStream
.getTracks()
.forEach(track=>track.stop());

camera.srcObject = null;

cameraStream = null;

}
/*=================================================
 CAMERA.JS
 VERSION 3
 PART 2
 CAPTURE • PREVIEW • SUPABASE UPLOAD
=================================================*/

/*=========================
Capture Selfie
=========================*/

async function captureSelfie(){

    if(!camera){

        console.error("❌ Camera element not found.");

        return;

    }

    if(!cameraStream){

        console.error("❌ Camera is not active.");

        return;

    }

    try{

        /* Canvas size = square */

        const size =
            Math.min(
                camera.videoWidth,
                camera.videoHeight
            );

        canvas.width = size;
        canvas.height = size;

        /* Center crop */

        const sx =
            (camera.videoWidth - size) / 2;

        const sy =
            (camera.videoHeight - size) / 2;

        const ctx =
            canvas.getContext("2d");

        /*
         * Mirror the selfie so it looks
         * natural like a front camera.
         */

        ctx.save();

        ctx.translate(size, 0);
        ctx.scale(-1, 1);

        ctx.drawImage(
            camera,
            sx,
            sy,
            size,
            size,
            0,
            0,
            size,
            size
        );

        ctx.restore();

        /* Convert canvas to JPEG */

        canvas.toBlob(
            async (blob)=>{

                if(!blob){

                    statusText.textContent =
                        "❌ Couldn't capture photo.";

                    return;

                }

                /* Stop camera */

                stopCamera();

                /* Show selfie */

                const imageUrl =
                    URL.createObjectURL(blob);

                const selfieImage =
                    document.getElementById(
                        "selfieImage"
                    );

                if(selfieImage){

                    selfieImage.src =
                        imageUrl;

                }

                statusText.textContent =
                    "Memory captured! ❤️";

                /* Open selfie page */

                showPage("selfiePage");

                /*
                 * Upload to Supabase
                 */

                if(
                    typeof saveSelfie ===
                    "function"
                ){

                    const uploaded =
                        await saveSelfie(blob);

                    if(uploaded){

                        showLatestSelfie();

                    }

                }

            },
            "image/jpeg",
            0.90
        );

    }

    catch(error){

        console.error(
            "❌ Capture error:",
            error
        );

        statusText.textContent =
            "❌ Something went wrong.";

        stopCamera();

    }

}


/*=========================
Start Camera Page
=========================*/

function openCameraPage(){

    showPage("cameraPage");

    statusText.textContent =
        "Starting camera... 📸";

    startCamera();

}


/*=========================
When Letter Continues
=========================*/

if(nextLetterBtn){

    nextLetterBtn.addEventListener(
        "click",
        ()=>{

            openCameraPage();

        }
    );

}
