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

let letterIndex=0;
let letterTimer=null;

const positiveWords=["love","cute","handsome","beautiful","pretty","lovely","amazing","perfect","angel","princess","queen","sweet","adorable","mine","soulmate","sunshine","i love you","my love","my queen","my princess","forever together","always yours","best girlfriend"];

function showPage(id){
  pages.forEach(p=>p.classList.remove("active"));
  const target=document.getElementById(id);
  if(!target){console.error("Page not found:",id);return;}
  target.classList.add("active");
  window.scrollTo(0,0);
}

let loading=0;
const loadingInterval=setInterval(()=>{
  loading=Math.min(loading+1,100);
  if(loadingFill) loadingFill.style.width=loading+"%";
  if(loading>=100){clearInterval(loadingInterval);setTimeout(startWebsite,300);}
},20);

function startWebsite(){
  const params=new URLSearchParams(location.search);
  if(params.get("test")==="1"){
    const page=params.get("page")||"hero";
    const testMap={
      hero:"heroPage",camera:"cameraPage",selfie:"selfiePage",memory:"memoryWall",
      quiz:"quizPage",stars:"starsPage",future:"futurePage",letter:"letterPage",
      final:"finalLetterPage",seal:"sealPage",gift:"giftPage",continue:"continuePage",
      replay:"replayPage",ending:"postCreditPage"
    };
    const target=testMap[page]||"heroPage";
    showPage(target);
    if(page==="quiz" && typeof startQuiz==="function") startQuiz();
    if(page==="stars" && typeof startStars==="function") startStars();
    if(page==="future" && typeof startFutureStory==="function") startFutureStory();
    if(page==="final" && typeof startFinalLetter==="function") startFinalLetter();
    if(page==="camera" && typeof openCameraPage==="function") openCameraPage();
    return;
  }
  showPage("loveGate");
}

function unlockWebsite(){
  const value=(loveInput?.value||"").toLowerCase().trim();
  if(!value){gateMessage.textContent="Say something sweet ❤️";return;}
  if(!positiveWords.some(word=>value.includes(word))){gateMessage.textContent="Only positive words can unlock our story ❤️";return;}
  gateMessage.textContent="Unlocked ❤️";
  setTimeout(()=>showPage("heroPage"),500);
}
if(unlockBtn) unlockBtn.addEventListener("click",unlockWebsite);
if(loveInput) loveInput.addEventListener("keydown",e=>{if(e.key==="Enter") unlockWebsite();});

const letterMessage=`Dear ❤️,

Thank you for every smile,
every laugh,
every memory
and every moment.

No matter what happens,
I will always be grateful
that you became a part
of my story.

I hope every page
makes you smile.

Happy Anniversary ❤️`;

function startLetter(){
  clearTimeout(letterTimer); letterIndex=0;
  letterText.textContent=""; nextLetterBtn.classList.add("hidden"); typeLetter();
}
function typeLetter(){
  if(letterIndex>=letterMessage.length){nextLetterBtn.classList.remove("hidden");return;}
  letterText.textContent+=letterMessage.charAt(letterIndex++);
  letterTimer=setTimeout(typeLetter,35);
}
if(beginJourney) beginJourney.addEventListener("click",()=>{showPage("letterPage");startLetter();});
if(nextLetterBtn) nextLetterBtn.addEventListener("click",()=>{if(typeof openCameraPage==="function") openCameraPage(); else showPage("cameraPage");});

if(selfiePage) selfiePage.addEventListener("click",()=>showPage("memoryWall"));

let wallTimer=null;
function startMemoryWallTimer(){
  clearTimeout(wallTimer);
  wallTimer=setTimeout(()=>openQuizFromWall(),7000);
}
function openQuizFromWall(){
  clearTimeout(wallTimer); showPage("quizPage");
  if(typeof startQuiz==="function") startQuiz();
}
if(memoryWall){
  memoryWall.addEventListener("click",openQuizFromWall);
  new MutationObserver(()=>{if(memoryWall.classList.contains("active")) startMemoryWallTimer();}).observe(memoryWall,{attributes:true,attributeFilter:["class"]});
}

function resetStory(){
  if(typeof stopCamera==="function") stopCamera();
  if(typeof resetQuiz==="function") resetQuiz();
  if(typeof resetStars==="function") resetStars();
  clearTimeout(letterTimer); letterIndex=0;
  if(letterText) letterText.textContent="";
  if(nextLetterBtn) nextLetterBtn.classList.add("hidden");
  ["heartRain","rosePetals","fireworks","flashEffect","confetti"].forEach(id=>{const e=document.getElementById(id);if(e){e.innerHTML="";e.style.opacity="";}});
  if(cameraStatus) cameraStatus.textContent="Smile... 😊";
}
if(replayButton) replayButton.addEventListener("click",()=>{resetStory();showPage("heroPage");});
if(restartButton) restartButton.addEventListener("click",()=>{resetStory();showPage("loveGate");});

document.addEventListener("visibilitychange",()=>{if(document.hidden&&typeof stopCamera==="function") stopCamera();});
window.addEventListener("beforeunload",()=>{if(typeof stopCamera==="function") stopCamera();});
window.addEventListener("error",e=>console.error("Website Error:",e.error||e.message));
console.log("❤️ Chapter Two script loaded");
