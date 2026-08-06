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
