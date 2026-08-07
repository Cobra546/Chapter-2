/* Chapter Two — camera.js | Version 3 */

let cameraStream=null;
let cameraCountdownTimer=null;
let cameraBusy=false;

const cameraEl=()=>document.getElementById("camera");
const canvasEl=()=>document.getElementById("captureCanvas");
const statusEl=()=>document.getElementById("cameraStatus");
const countdownEl=()=>document.getElementById("cameraCountdown");

async function startCamera(){
  const video=cameraEl(), status=statusEl(), count=countdownEl();
  if(!video) return;
  try{
    stopCamera();
    cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:false});
    video.srcObject=cameraStream;
    await video.play();
    if(status) status.textContent="Get ready... 📸";
    await runCameraCountdown();
  }catch(error){
    console.error("Camera error:",error);
    if(status) status.textContent="Camera permission is needed to capture the memory 📸";
    if(count) count.textContent="×";
  }
}

function runCameraCountdown(){
  return new Promise(resolve=>{
    let n=3;
    const count=countdownEl(), status=statusEl();
    if(count) count.textContent=n;
    clearInterval(cameraCountdownTimer);
    cameraCountdownTimer=setInterval(()=>{
      n--;
      if(n>0){
        if(count) count.textContent=n;
      }else{
        clearInterval(cameraCountdownTimer);
        if(count) count.textContent="❤️";
        if(status) status.textContent="Smile! 📸";
        setTimeout(()=>{ captureSelfie(); resolve(); },450);
      }
    },1000);
  });
}

async function captureSelfie(){
  if(cameraBusy) return;
  const video=cameraEl(), canvas=canvasEl(), status=statusEl();
  if(!video || !canvas || !cameraStream) return;
  cameraBusy=true;
  try{
    const size=Math.min(video.videoWidth,video.videoHeight);
    if(!size) throw new Error("Camera video is not ready");
    canvas.width=size; canvas.height=size;
    const ctx=canvas.getContext("2d");
    const sx=(video.videoWidth-size)/2, sy=(video.videoHeight-size)/2;
    ctx.save(); ctx.translate(size,0); ctx.scale(-1,1);
    ctx.drawImage(video,sx,sy,size,size,0,0,size,size); ctx.restore();
    stopCamera();
    const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/jpeg",0.9));
    if(!blob) throw new Error("Could not create image");
    const previewUrl=URL.createObjectURL(blob);
    const selfie=document.getElementById("selfieImage");
    if(selfie) selfie.src=previewUrl;
    if(status) status.textContent="Memory captured! ❤️";
    if(typeof saveSelfie==="function") await saveSelfie(blob);
    if(typeof showLatestSelfie==="function") showLatestSelfie();
    if(typeof showPage==="function") showPage("selfiePage");
  }catch(error){
    console.error("Capture error:",error);
    if(status) status.textContent="Couldn't capture the memory. Please try again.";
  }finally{ cameraBusy=false; }
}

function stopCamera(){
  clearInterval(cameraCountdownTimer);
  cameraCountdownTimer=null;
  if(cameraStream){ cameraStream.getTracks().forEach(track=>track.stop()); cameraStream=null; }
  const video=cameraEl();
  if(video) video.srcObject=null;
}

function openCameraPage(){
  if(typeof showPage==="function") showPage("cameraPage");
  setTimeout(startCamera,250);
}

console.log("📸 camera.js loaded");
