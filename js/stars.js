/* Chapter Two — stars.js | Version 3 */

const TOTAL_STARS=10;
let collectedStars=0;
let futureIndex=0;
let finalIndex=0;

const starMemories=[
  "Some memories are small moments that stay in our hearts forever. ❤️",
  "The best memories are the ones we never planned. ✨",
  "One smile can turn an ordinary moment into a beautiful memory. 🌙",
  "Every chapter of our story has something worth remembering. 💕",
  "Some moments become memories before we even realize it. 📸",
  "Time passes, but beautiful memories stay. 🌌",
  "This little star holds another piece of our story. ⭐",
  "The moments we treasure most are often the simplest ones. ❤️",
  "Another memory unlocked... and many more are waiting. ✨",
  "You found the last star. Our next memory is waiting ahead. 🌠"
];

function startStars(){
  const bg=document.getElementById("starBackground"), btn=document.getElementById("starsContinue");
  if(!bg) return;
  bg.innerHTML="";
  collectedStars=0;
  if(btn) btn.classList.add("hidden");

  const content=document.querySelector("#starsPage .starsContent");
  if(content){
    content.style.opacity="1";
    content.style.transform="none";
    content.style.pointerEvents="";
  }

  setTimeout(hideStarsIntro,1500);

  for(let i=0;i<TOTAL_STARS;i++){
    const star=document.createElement("button");
    star.type="button";
    star.className="star clickableMemoryStar";
    star.setAttribute("aria-label",`Memory star ${i+1}`);
    star.dataset.index=i;
    star.style.left=(8+Math.random()*84)+"%";
    star.style.top=(10+Math.random()*76)+"%";
    star.style.animationDelay=(Math.random()*1.8)+"s";
    star.addEventListener("click",()=>collectStar(star),{once:true});
    bg.appendChild(star);
  }
}

function hideStarsIntro(){
  const content=document.querySelector("#starsPage .starsContent");
  if(!content) return;
  content.style.transition="opacity .4s ease, transform .4s ease";
  content.style.opacity="0";
  content.style.transform="translateY(-8px)";
  content.style.pointerEvents="none";
}

function showMemoryPopup(index){
  let popup=document.getElementById("memoryStarPopup");

  if(!popup){
    popup=document.createElement("div");
    popup.id="memoryStarPopup";
    popup.innerHTML=`
      <div class="memoryPopupCard">
        <div class="memoryPopupIcon">⭐</div>
        <p id="memoryPopupText"></p>
        <button type="button" id="memoryPopupClose">Continue ❤️</button>
      </div>
    `;
    document.body.appendChild(popup);

    popup.addEventListener("click",event=>{
      if(event.target===popup) closeMemoryPopup();
    });
    document.getElementById("memoryPopupClose").addEventListener("click",closeMemoryPopup);
  }

  const text=document.getElementById("memoryPopupText");
  if(text) text.textContent=starMemories[index]||starMemories[0];
  popup.classList.add("show");
}

function closeMemoryPopup(){
  const popup=document.getElementById("memoryStarPopup");
  if(popup) popup.classList.remove("show");
}

function collectStar(star){
  if(star.dataset.collected) return;
  star.dataset.collected="1";
  collectedStars++;

  showMemoryPopup(Number(star.dataset.index));

  star.classList.add("starCollected");
  setTimeout(()=>star.remove(),450);

  if(collectedStars>=TOTAL_STARS){
    const btn=document.getElementById("starsContinue");
    if(btn) btn.classList.remove("hidden");
    celebrateStars();
  }
}

function celebrateStars(){
  createHeartRain();
  createRosePetals();
  const flash=document.getElementById("flashEffect");
  if(flash){
    flash.style.opacity="1";
    setTimeout(()=>flash.style.opacity="0",300);
  }
}

function createHeartRain(){
  const c=document.getElementById("heartRain"); if(!c) return;
  c.innerHTML="";
  for(let i=0;i<18;i++){
    const el=document.createElement("div");
    el.className="heart";
    el.textContent="❤️";
    el.style.left=Math.random()*100+"%";
    el.style.animationDelay=Math.random()*2+"s";
    c.appendChild(el);
  }
}

function createRosePetals(){
  const c=document.getElementById("rosePetals"); if(!c) return;
  c.innerHTML="";
  for(let i=0;i<12;i++){
    const el=document.createElement("div");
    el.className="petal";
    el.textContent="🌹";
    el.style.left=Math.random()*100+"%";
    el.style.animationDelay=Math.random()*2+"s";
    c.appendChild(el);
  }
}

function startFutureStory(){
  const box=document.getElementById("futureTypewriter"), next=document.getElementById("futureNext"), img=document.getElementById("futureSelfie");
  if(!box) return;
  futureIndex=0;
  box.textContent="";
  if(next) next.classList.add("hidden");
  if(img) img.style.display="none";
  typeFutureMessage();
}

const futureMessage=`Maybe one day, we will look back at this chapter and smile at how far we've come. ❤️\n\nFor now, let's keep creating memories worth remembering.\n\nOur story isn't ending here...\nIt's only getting better. 🌠❤️`;

function typeFutureMessage(){
  const box=document.getElementById("futureTypewriter");
  if(!box) return;
  if(futureIndex>=futureMessage.length){ showFutureSelfie(); return; }
  box.textContent+=futureMessage.charAt(futureIndex++);
  setTimeout(typeFutureMessage,35);
}

function showFutureSelfie(){
  const img=document.getElementById("futureSelfie"), next=document.getElementById("futureNext");
  const saved=typeof getLatestSelfie==="function"?getLatestSelfie():localStorage.getItem("latestSelfie");
  if(img && saved){ img.src=saved; img.style.display="block"; }
  if(next) next.classList.remove("hidden");
}

function startFinalLetter(){
  const box=document.getElementById("finalLetterText"), btn=document.getElementById("sealChapterBtn");
  if(!box) return;
  finalIndex=0;
  box.textContent="";
  if(btn) btn.classList.add("hidden");
  typeFinalLetter();
}

const finalMessage=`Two chapters, countless memories, and so many moments still waiting for us. ❤️\n\nThank you for being part of my story.\n\nThis chapter ends... but our story continues. ❤️`;

function typeFinalLetter(){
  const box=document.getElementById("finalLetterText"); if(!box) return;
  if(finalIndex>=finalMessage.length){
    const btn=document.getElementById("sealChapterBtn");
    if(btn) btn.classList.remove("hidden");
    return;
  }
  box.textContent+=finalMessage.charAt(finalIndex++);
  setTimeout(typeFinalLetter,35);
}

function resetStars(){
  collectedStars=0;
  futureIndex=0;
  finalIndex=0;
  const ids=["starBackground","futureTypewriter","finalLetterText","heartRain","rosePetals","fireworks","flashEffect"];
  ids.forEach(id=>{const e=document.getElementById(id); if(e) e.innerHTML="";});
  closeMemoryPopup();
  const b=document.getElementById("starsContinue"); if(b) b.classList.add("hidden");
  const n=document.getElementById("futureNext"); if(n) n.classList.add("hidden");
  const s=document.getElementById("sealChapterBtn"); if(s) s.classList.add("hidden");
  const content=document.querySelector("#starsPage .starsContent");
  if(content){ content.style.opacity="1"; content.style.transform="none"; content.style.pointerEvents=""; }
}

function createFireworks(){
  const c=document.getElementById("fireworks"); if(!c) return;
  c.innerHTML="";
  for(let i=0;i<14;i++){
    const e=document.createElement("div");
    e.className="firework";
    e.style.left=(15+Math.random()*70)+"%";
    e.style.top=(10+Math.random()*60)+"%";
    c.appendChild(e);
  }
}

function startSealSequence(){
  createFireworks();
  createHeartRain();
  setTimeout(()=>{ if(typeof showPage==="function") showPage("giftPage"); },3000);
}

const starsContinue=document.getElementById("starsContinue");
if(starsContinue) starsContinue.addEventListener("click",()=>{ showPage("futurePage"); startFutureStory(); });
const futureNext=document.getElementById("futureNext");
if(futureNext) futureNext.addEventListener("click",()=>{ showPage("finalLetterPage"); startFinalLetter(); });
const sealBtn=document.getElementById("sealChapterBtn");
if(sealBtn) sealBtn.addEventListener("click",()=>{ showPage("sealPage"); startSealSequence(); });
const giftBox=document.getElementById("giftBox");
if(giftBox) giftBox.addEventListener("click",()=>{ const items=document.getElementById("giftItems"); giftBox.style.transform="scale(1.15)"; if(items) items.classList.remove("hidden"); setTimeout(()=>showPage("continuePage"),2500); });
const continuePage=document.getElementById("continuePage");
if(continuePage) continuePage.addEventListener("click",()=>showPage("replayPage"));

console.log("🌌 stars.js loaded");
