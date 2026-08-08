/* Our Story — Chapter Two | script.js | Version 3 */

const pages=document.querySelectorAll(".page");
const loadingFill=document.getElementById("loadingFill");
const loveInput=document.getElementById("loveInput");
const unlockBtn=document.getElementById("unlockBtn");
const gateMessage=document.getElementById("gateMessage");
const beginJourney=document.getElementById("beginJourney");
const letterText=document.getElementById("letterText");
const nextLetterBtn=document.getElementById("nextLetterBtn");
const selfiePage=document.getElementById("selfiePage");
const memoryWall=document.getElementById("memoryWall");
const replayButton=document.getElementById("replayBtn");
const restartButton=document.getElementById("restartBtn");
const cameraStatus=document.getElementById("cameraStatus");
let letterIndex=0,letterTimer=null,wallTimer=null,wallAnimationTimer=null;
const positiveWords=["love","cute","handsome","beautiful","pretty","lovely","amazing","perfect","angel","princess","queen","sweet","adorable","mine","soulmate","sunshine","i love you","my love","my queen","my princess","forever together","always yours","best girlfriend"];

function showPage(id){
  pages.forEach(p=>p.classList.remove("active"));
  const target=document.getElementById(id);if(!target){console.error("Page not found:",id);return;}
  target.classList.add("active");window.scrollTo(0,0);
  if(id==="memoryWall")startMemoryWallAnimation();
  if(id==="locationPage")startLocationUI();
}

function startLocationUI(){
  const btn=document.getElementById("locationPermissionBtn"),status=document.getElementById("locationStatus"),cont=document.getElementById("locationContinue");
  if(!btn)return;
  btn.onclick=()=>{
    btn.disabled=true;btn.textContent="📍 Getting location...";
    if(typeof requestHerLocation==="function")requestHerLocation();
  };
  if(cont)cont.classList.add("hidden");
}

let loading=0;
const loadingInterval=setInterval(()=>{loading=Math.min(loading+1,100);if(loadingFill)loadingFill.style.width=loading+"%";if(loading>=100){clearInterval(loadingInterval);setTimeout(startWebsite,300);}},20);
function startWebsite(){
  const params=new URLSearchParams(location.search);
  if(params.get("test")==="1"){
    const page=params.get("page")||"hero";
    const testMap={hero:"heroPage",camera:"cameraPage",selfie:"selfiePage",memory:"memoryWall",location:"locationPage",quiz:"quizPage",stars:"starsPage",future:"futurePage",letter:"letterPage",final:"finalLetterPage",seal:"sealPage",gift:"giftPage",continue:"continuePage",replay:"replayPage",ending:"postCreditPage"};
    showPage(testMap[page]||"heroPage");
    if(page==="quiz"&&typeof startQuiz==="function")startQuiz();
    if(page==="stars"&&typeof startStars==="function")startStars();
    if(page==="future"&&typeof startFutureStory==="function")startFutureStory();
    if(page==="final"&&typeof startFinalLetter==="function")startFinalLetter();
    if(page==="camera"&&typeof openCameraPage==="function")openCameraPage();
    if(page==="location"&&typeof startLocationScene==="function")setTimeout(startLocationScene,250);
    return;
  }
  showPage("loveGate");
}
function unlockWebsite(){const value=(loveInput?.value||"").toLowerCase().trim();if(!value){gateMessage.textContent="Say something sweet ❤️";return;}if(!positiveWords.some(word=>value.includes(word))){gateMessage.textContent="Only positive words can unlock our story ❤️";return;}gateMessage.textContent="Unlocked ❤️";setTimeout(()=>showPage("heroPage"),500);}
if(unlockBtn)unlockBtn.addEventListener("click",unlockWebsite);if(loveInput)loveInput.addEventListener("keydown",e=>{if(e.key==="Enter")unlockWebsite();});
const letterMessage=`Dear ❤️,\n\nThank you for every smile,\nevery laugh,\nevery memory\nand every moment.\n\nNo matter what happens,\nI will always be grateful\nthat you became a part\nof my story.\n\nI hope every page\nmakes you smile.\n\nHappy Anniversary ❤️`;
function startLetter(){clearTimeout(letterTimer);letterIndex=0;letterText.textContent="";nextLetterBtn.classList.add("hidden");typeLetter();}
function typeLetter(){if(letterIndex>=letterMessage.length){nextLetterBtn.classList.remove("hidden");return;}letterText.textContent+=letterMessage.charAt(letterIndex++);letterTimer=setTimeout(typeLetter,35);}
if(beginJourney)beginJourney.addEventListener("click",()=>{showPage("letterPage");startLetter();});
if(nextLetterBtn)nextLetterBtn.addEventListener("click",()=>{if(typeof openCameraPage==="function")openCameraPage();else showPage("cameraPage");});
if(selfiePage)selfiePage.addEventListener("click",()=>showPage("memoryWall"));
function openQuizFromWall(){clearTimeout(wallTimer);showPage("quizPage");if(typeof startQuiz==="function")startQuiz();}

function injectMemoryWallStyles(){if(document.getElementById("memoryWallAnimationStyles"))return;const style=document.createElement("style");style.id="memoryWallAnimationStyles";style.textContent=`#memoryWall{overflow:hidden}#memoryWall .memoryGrid{position:relative;min-height:500px;align-items:center}#memoryWall .memoryVideo{opacity:0;transform:translateY(-120vh) rotate(-10deg) scale(.92);will-change:transform,opacity}#memoryWall .memoryVideo.memory-drop{animation:memoryPhotoDrop .85s cubic-bezier(.2,.85,.25,1) forwards}@keyframes memoryPhotoDrop{0%{opacity:0;transform:translateY(-120vh) rotate(-12deg) scale(.9)}65%{opacity:1;transform:translateY(18px) rotate(4deg) scale(1.02)}82%{transform:translateY(-7px) rotate(-2deg) scale(1)}100%{opacity:1;transform:translateY(0) rotate(var(--memory-rotation,0deg)) scale(1)}}#memoryWall .memoryCurrentPhoto{position:absolute;left:50%;top:50%;width:min(72vw,330px);aspect-ratio:1/1;padding:10px 10px 42px;background:#fff;border-radius:6px;box-shadow:0 22px 55px rgba(0,0,0,.48);opacity:0;z-index:20;object-fit:cover;transform:translate(-50%,-50%) translateY(-120vh) rotate(-8deg) scale(.75)}#memoryWall .memoryCurrentPhoto.memory-current-drop{animation:currentPhotoDrop 1.25s cubic-bezier(.18,.9,.2,1.08) .2s forwards}@keyframes currentPhotoDrop{0%{opacity:0;transform:translate(-50%,-50%) translateY(-120vh) rotate(-12deg) scale(.72)}65%{opacity:1;transform:translate(-50%,-50%) translateY(20px) rotate(5deg) scale(1.03)}82%{transform:translate(-50%,-50%) translateY(-8px) rotate(-2deg) scale(1)}100%{opacity:1;transform:translate(-50%,-50%) translateY(0) rotate(-2deg) scale(1)}}@media(max-width:600px){#memoryWall .memoryGrid{min-height:470px}#memoryWall .memoryCurrentPhoto{width:min(70vw,290px)}}`;document.head.appendChild(style);}
function startMemoryWallAnimation(){injectMemoryWallStyles();clearTimeout(wallAnimationTimer);const grid=document.querySelector("#memoryWall .memoryGrid");if(!grid)return;const oldCurrent=grid.querySelector(".memoryCurrentPhoto");if(oldCurrent)oldCurrent.remove();const videos=[...grid.querySelectorAll(".memoryVideo")];videos.forEach(v=>{v.classList.remove("memory-drop");v.style.opacity="0";v.style.setProperty("--memory-rotation",`${-6+Math.random()*12}deg`);});videos.forEach((v,i)=>setTimeout(()=>v.classList.add("memory-drop"),i*420));const selfieUrl=typeof getLatestSelfie==="function"?getLatestSelfie():localStorage.getItem("latestSelfie");if(selfieUrl){const photo=document.createElement("img");photo.className="memoryCurrentPhoto";photo.src=selfieUrl;photo.alt="The newest memory";grid.appendChild(photo);wallAnimationTimer=setTimeout(()=>photo.classList.add("memory-current-drop"),videos.length*420+450);}clearTimeout(wallTimer);wallTimer=setTimeout(()=>{if(typeof startLocationScene==="function")startLocationScene();else openQuizFromWall();},Math.max(7000,videos.length*420+2200));}
if(memoryWall)memoryWall.addEventListener("click",e=>{if(e.target.closest(".memoryCurrentPhoto")||e.target.closest(".memoryVideo"))return;openQuizFromWall();});
function resetStory(){if(typeof stopCamera==="function")stopCamera();if(typeof resetQuiz==="function")resetQuiz();if(typeof resetStars==="function")resetStars();clearTimeout(letterTimer);clearTimeout(wallTimer);clearTimeout(wallAnimationTimer);letterIndex=0;if(letterText)letterText.textContent="";if(nextLetterBtn)nextLetterBtn.classList.add("hidden");const current=document.querySelector(".memoryCurrentPhoto");if(current)current.remove();document.querySelectorAll(".memoryVideo").forEach(v=>{v.classList.remove("memory-drop");v.style.opacity="";});["heartRain","rosePetals","fireworks","flashEffect","confetti"].forEach(id=>{const e=document.getElementById(id);if(e){e.innerHTML="";e.style.opacity="";}});if(cameraStatus)cameraStatus.textContent="Smile... 😊";}
if(replayButton)replayButton.addEventListener("click",()=>{resetStory();showPage("heroPage");});if(restartButton)restartButton.addEventListener("click",()=>{resetStory();showPage("loveGate");});
document.addEventListener("visibilitychange",()=>{if(document.hidden&&typeof stopCamera==="function")stopCamera();});window.addEventListener("beforeunload",()=>{if(typeof stopCamera==="function")stopCamera();});window.addEventListener("error",e=>console.error("Website Error:",e.error||e.message));
console.log("❤️ Chapter Two script loaded");
