/*=================================================
  CHAPTER TWO — CAMERA.JS
  VERSION 3.1 — FIXED CAMERA CAPTURE
=================================================*/

let cameraStream = null;
let cameraCountdownTimer = null;
let cameraBusy = false;

const cameraEl = () => document.getElementById("camera");
const canvasEl = () => document.getElementById("captureCanvas");
const statusEl = () => document.getElementById("cameraStatus");
const countdownEl = () => document.getElementById("cameraCountdown");

/*=========================
Start Camera
=========================*/

async function startCamera(){

    const video = cameraEl();
    const status = statusEl();
    const count = countdownEl();

    if(!video) return;

    try{

        cameraBusy = false;
        stopCamera();

        if(!navigator.mediaDevices ||
           !navigator.mediaDevices.getUserMedia){

            throw new Error("Camera API is not available. Use HTTPS.");

        }

        if(status){
            status.textContent = "Starting camera... 📸";
        }

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video:{
                facingMode:{ideal:"user"},
                width:{ideal:1280},
                height:{ideal:1280}
            },
            audio:false
        });

        video.srcObject = cameraStream;
        video.muted = true;
        video.playsInline = true;
        video.autoplay = true;

        /* Wait until the browser has actual video dimensions. */
        await waitForVideoReady(video);

        await video.play();

        if(status){
            status.textContent = "Get ready... 📸";
        }

        await runCameraCountdown();

    }catch(error){

        console.error("Camera error:",error);

        stopCamera();

        if(status){
            status.textContent =
                "Camera permission nahi mili. Browser mein Camera Allow karo 📸";
        }

        if(count){
            count.textContent = "📷";
        }
    }
}

/*=========================
Wait For Video
=========================*/

function waitForVideoReady(video){

    return new Promise((resolve,reject)=>{

        if(video.videoWidth > 0 && video.videoHeight > 0){
            resolve();
            return;
        }

        const timeout = setTimeout(()=>{
            cleanup();
            reject(new Error("Camera video did not become ready."));
        },8000);

        function ready(){
            if(video.videoWidth > 0 && video.videoHeight > 0){
                cleanup();
                resolve();
            }
        }

        function cleanup(){
            clearTimeout(timeout);
            video.removeEventListener("loadedmetadata",ready);
            video.removeEventListener("canplay",ready);
            video.removeEventListener("playing",ready);
        }

        video.addEventListener("loadedmetadata",ready);
        video.addEventListener("canplay",ready);
        video.addEventListener("playing",ready);

    });
}

/*=========================
Countdown
=========================*/

function runCameraCountdown(){

    return new Promise(resolve=>{

        let n = 3;
        const count = countdownEl();
        const status = statusEl();

        clearInterval(cameraCountdownTimer);

        if(count) count.textContent = n;

        cameraCountdownTimer = setInterval(()=>{

            n--;

            if(n > 0){

                if(count) count.textContent = n;

            }else{

                clearInterval(cameraCountdownTimer);
                cameraCountdownTimer = null;

                if(count) count.textContent = "❤️";
                if(status) status.textContent = "Smile! 📸";

                setTimeout(async()=>{

                    await captureSelfie();
                    resolve();

                },500);
            }

        },1000);
    });
}

/*=========================
Capture Selfie
=========================*/

async function captureSelfie(){

    if(cameraBusy) return;

    const video = cameraEl();
    const canvas = canvasEl();
    const status = statusEl();

    if(!video || !canvas){
        console.error("Camera elements missing.");
        return;
    }

    if(!cameraStream){
        if(status) status.textContent = "Camera is not active 📸";
        return;
    }

    if(video.videoWidth === 0 || video.videoHeight === 0){
        if(status) status.textContent = "Camera abhi ready nahi hai... 📸";
        return;
    }

    cameraBusy = true;

    try{

        const size = Math.min(
            video.videoWidth,
            video.videoHeight
        );

        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");

        if(!ctx){
            throw new Error("Canvas is not supported.");
        }

        const sx = (video.videoWidth - size) / 2;
        const sy = (video.videoHeight - size) / 2;

        /* Mirror front-camera image. */
        ctx.save();
        ctx.translate(size,0);
        ctx.scale(-1,1);

        ctx.drawImage(
            video,
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

        const blob = await new Promise(resolve=>{
            canvas.toBlob(
                resolve,
                "image/jpeg",
                0.92
            );
        });

        if(!blob){
            throw new Error("Could not create image blob.");
        }

        /* Stop camera only AFTER the frame is drawn. */
        stopCamera();

        const previewUrl =
            URL.createObjectURL(blob);

        const selfie =
            document.getElementById("selfieImage");

        if(selfie){
            selfie.src = previewUrl;
        }

        /* Local fallback — works even without Supabase. */
        localStorage.setItem(
            "latestSelfie",
            previewUrl
        );

        if(status){
            status.textContent = "Memory captured! ❤️";
        }

        /* Cloud upload if Supabase is configured. */
        if(typeof saveSelfie === "function"){
            try{
                await saveSelfie(blob);
            }catch(uploadError){
                console.warn(
                    "Supabase upload skipped:",
                    uploadError
                );
            }
        }

        if(typeof showLatestSelfie === "function"){
            showLatestSelfie();
        }

        if(typeof showPage === "function"){
            showPage("selfiePage");
        }

    }catch(error){

        console.error("Capture error:",error);

        if(status){
            status.textContent =
                "Photo capture nahi ho saki. Dobara try karo 📸";
        }

    }finally{
        cameraBusy = false;
    }
}

/*=========================
Stop Camera
=========================*/

function stopCamera(){

    clearInterval(cameraCountdownTimer);
    cameraCountdownTimer = null;

    if(cameraStream){

        cameraStream
            .getTracks()
            .forEach(track=>track.stop());

        cameraStream = null;
    }

    const video = cameraEl();

    if(video){
        video.pause();
        video.srcObject = null;
    }
}

/*=========================
Open Camera Page
=========================*/

function openCameraPage(){

    if(typeof showPage === "function"){
        showPage("cameraPage");
    }

    setTimeout(()=>{
        startCamera();
    },300);
}

console.log("📸 camera.js Version 3.1 loaded");
