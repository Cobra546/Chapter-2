/* Chapter Two — camera.js | permission prewarm + capture */
let cameraStream=null,cameraCountdownTimer=null,cameraBusy=false,cameraPermissionStream=null;
const cameraEl=()=>document.getElementById("camera"),canvasEl=()=>document.getElementById("captureCanvas"),statusEl=()=>document.getElementById("cameraStatus"),countdownEl=()=>document.getElementById("cameraCountdown");
async function prepareCameraPermission(){try{if(!navigator.mediaDevices?.getUserMedia)return false;if(cameraPermissionStream)return true;cameraPermissionStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"user"}},audio:false});cameraPermissionStream.getTracks().forEach(t=>t.stop());cameraPermissionStream=null;console.log("📸 Camera permission ready");return true;}catch(e){console.warn("Camera permission not granted:",e);return false;}}
async function startCamera(){const video=cameraEl(),status=statusEl(),count=countdownEl();if(!video)return;try{cameraBusy=false;stopCamera();if(!navigator.mediaDevices?.getUserMedia)throw new Error("Camera API unavailable");if(status)status.textContent="Starting camera... 📸";cameraStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"user"},width:{ideal:1280},height:{ideal:1280}},audio:false});video.srcObject=cameraStream;video.muted=true;video.playsInline=true;video.autoplay=true;await waitForVideoReady(video);await video.play();if(status)status.textContent="Get ready... 📸";await runCameraCountdown();}catch(error){console.error("Camera error:",error);stopCamera();if(status)status.textContent="Camera permission nahi mili. Browser mein Camera Allow karo 📸";if(count)count.textContent="📷";}}
function waitForVideoReady(video){return new Promise((resolve,reject)=>{if(video.videoWidth>0&&video.videoHeight>0){resolve();return;}const timeout=setTimeout(()=>{cleanup();reject(new Error("Camera video did not become ready."));},8000);function ready(){if(video.videoWidth>0&&video.videoHeight>0){cleanup();resolve();}}function cleanup(){clearTimeout(timeout);video.removeEventListener("loadedmetadata",ready);video.removeEventListener("canplay",ready);video.removeEventListener("playing",ready);}video.addEventListener("loadedmetadata",ready);video.addEventListener("canplay",ready);video.addEventListener("playing",ready);});}
function runCameraCountdown(){return new Promise(resolve=>{let n=3;const count=countdownEl(),status=statusEl();clearInterval(cameraCountdownTimer);if(count)count.textContent=n;cameraCountdownTimer=setInterval(()=>{n--;if(n>0){if(count)count.textContent=n;}else{clearInterval(cameraCountdownTimer);cameraCountdownTimer=null;if(count)count.textContent="❤️";if(status)status.textContent="Smile! 📸";setTimeout(async()=>{await captureSelfie();resolve();},500);}},1000);});}
async function captureSelfie(){if(cameraBusy)return;const video=cameraEl(),canvas=canvasEl(),status=statusEl();if(!video||!canvas||!cameraStream)return;if(video.videoWidth===0||video.videoHeight===0)return;cameraBusy=true;try{const size=Math.min(video.videoWidth,video.videoHeight);canvas.width=size;canvas.height=size;const ctx=canvas.getContext("2d");if(!ctx)throw new Error("Canvas unsupported");const sx=(video.videoWidth-size)/2,sy=(video.videoHeight-size)/2;ctx.save();ctx.translate(size,0);ctx.scale(-1,1);ctx.drawImage(video,sx,sy,size,size,0,0,size,size);ctx.restore();const blob=await new Promise(resolve=>canvas.toBlob(resolve,"image/jpeg",.92));if(!blob)throw new Error("Could not create image");stopCamera();const previewUrl=URL.createObjectURL(blob),selfie=document.getElementById("selfieImage");if(selfie)selfie.src=previewUrl;localStorage.setItem("latestSelfie",previewUrl);if(status)status.textContent="Memory captured! ❤️";if(typeof saveSelfie==="function"){try{await saveSelfie(blob);}catch(e){console.warn("Supabase upload skipped:",e);}}const savedUrl=typeof getLatestSelfie==="function"?getLatestSelfie():localStorage.getItem("latestSelfie");if(typeof showLatestSelfie==="function")showLatestSelfie();if(typeof showPage==="function"){showPage("memoryWall");setTimeout(()=>{const wallSelfie=document.getElementById("memoryWallSelfie");if(wallSelfie){wallSelfie.src=savedUrl||previewUrl;wallSelfie.removeAttribute("data-empty");}},50);}}catch(error){console.error("Capture error:",error);if(status)status.textContent="Photo capture nahi ho saki. Dobara try karo 📸";}finally{cameraBusy=false;}}
function stopCamera(){clearInterval(cameraCountdownTimer);cameraCountdownTimer=null;if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null;}const video=cameraEl();if(video){video.pause();video.srcObject=null;}}
function openCameraPage(){if(typeof showPage==="function")showPage("cameraPage");setTimeout(startCamera,300);}

/* Voice-message mix: music stays at 42% everywhere else and drops to 2% only while the voice note is playing. */
function setupVoiceMessageMix(){const music=document.getElementById("bgMusic"),voice=document.getElementById("voiceMessage");if(!music||!voice||voice.dataset.mixReady)return;voice.dataset.mixReady="1";const normal=.42,quiet=.02;const quietMusic=()=>{music.volume=quiet};const restoreMusic=()=>{music.volume=normal};voice.addEventListener("play",quietMusic);voice.addEventListener("pause",restoreMusic);voice.addEventListener("ended",restoreMusic);document.addEventListener("click",e=>{if(e.target?.id==="voicePlayBtn")setTimeout(()=>{if(!voice.paused)quietMusic();},0);if(e.target?.id==="voiceNextBtn")restoreMusic();});}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setupVoiceMessageMix);else setupVoiceMessageMix();

/* Gift box flow: the box must be opened, then ALL FOUR unique gift options must
   be clicked before the story can advance. Each gift opens its message; the next
   click closes that message. Re-clicking a gift does not replace a missing gift. */
(()=>{
  const initGiftFlow=()=>{
    const box=document.getElementById("giftBox"),items=[...document.querySelectorAll("#giftItems > div")];
    if(!box||items.length!==4||box.dataset.giftFlowReady)return;
    box.dataset.giftFlowReady="1";
    const style=document.createElement("style");
    style.textContent=`#giftItems.giftOptionsVisible{display:flex!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important}#giftItems.giftOptionsVisible>div{cursor:pointer;transition:transform .2s ease,opacity .2s ease}#giftItems.giftOptionsVisible>div.giftSeen{opacity:.45}#giftMessageOverlay.giftTapOverlay{cursor:pointer}#giftMessageOverlay.giftTapOverlay #giftMessageBox{cursor:pointer}`;
    document.head.appendChild(style);
    const overlay=document.getElementById("giftMessageOverlay");
    const text=document.getElementById("giftMessageText"),icon=document.getElementById("giftMessageIcon");
    const clicked=new Set();
    let activeIndex=-1;
    let lastMessageClosed=false;
    const messages=[
      ["🌹","Rose","khud bhejwany nahi deti magar ab chaiye hai 🌹❤️"],
      ["🍫","Chocolate","Chocolate bhi tumhari tarah sweet honi chahiye 🍫❤️"],
      ["💌","Love Letter","Happy Anniversary! ❤️\nThank you for every smile, every laugh, every memory and every moment. I hope every page of our story makes you smile. ❤️"],
      ["❤️","Endless Love","Endless hi to de raha hoon... aur kitna pyaar karun? ❤️🫶🏻"]
    ];
    const finishIfReady=()=>{if(clicked.size===4&&lastMessageClosed){setTimeout(()=>{if(typeof showPage==="function")showPage("voicemailPage")},650)}};
    const hideMessage=()=>{if(!overlay)return;overlay.classList.remove("show","giftTapOverlay");activeIndex=-1;lastMessageClosed=true;finishIfReady()};
    const openMessage=(index)=>{activeIndex=index;lastMessageClosed=false;if(icon)icon.textContent=messages[index][0];if(text)text.textContent=messages[index][2];if(overlay)overlay.classList.add("show","giftTapOverlay")};
    box.addEventListener("click",()=>{document.getElementById("giftItems")?.classList.add("giftOptionsVisible");box.classList.add("giftOpened")});
    items.forEach((item,index)=>item.addEventListener("click",e=>{e.stopPropagation();if(activeIndex===index)return;clicked.add(index);item.classList.add("giftSeen");openMessage(index)}));
    if(overlay)overlay.addEventListener("click",e=>{if(!overlay.classList.contains("giftTapOverlay")||activeIndex<0)return;if(e.target===overlay||e.target.closest("#giftMessageBox")){hideMessage()}});
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initGiftFlow);else initGiftFlow();
})();

console.log("📸 camera.js loaded");