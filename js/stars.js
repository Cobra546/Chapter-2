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

function installConstellationStyles(){
  if(document.getElementById("constellationFixStyles")) return;
  const style=document.createElement("style");
  style.id="constellationFixStyles";
  style.textContent=`
    #starBackground{z-index:0;pointer-events:none;}
    #starsPage .starsContent{position:relative;z-index:2;}
    #starsContinue{position:relative;z-index:3;}
    .clickableMemoryStar{
      position:absolute!important;
      width:28px!important;
      height:28px!important;
      padding:0!important;
      border:0!important;
      outline:0!important;
      background:transparent!important;
      cursor:pointer!important;
      pointer-events:auto!important;
      filter:drop-shadow(0 0 5px rgba(255,255,255,.95)) drop-shadow(0 0 13px rgba(255,130,178,.9));
      animation:memoryStarPulse 1.7s ease-in-out infinite;
      transform:rotate(45deg);
    }
    .clickableMemoryStar::before,
    .clickableMemoryStar::after{
      content:"";
      position:absolute;
      left:50%;top:50%;
      width:15px;height:15px;
      transform:translate(-50%,-50%);
      background:#fff;
      border-radius:2px;
    }
    .clickableMemoryStar::after{transform:translate(-50%,-50%) rotate(45deg);}
    .clickableMemoryStar:hover{filter:drop-shadow(0 0 8px #fff) drop-shadow(0 0 20px rgba(255,130,178,1));}
    .starCollected{animation:memoryStarCollect .45s ease forwards!important;}
    @keyframes memoryStarPulse{0%,100%{opacity:.7;scale:.82}50%{opacity:1;scale:1.12}}
    @keyframes memoryStarCollect{to{opacity:0;scale:2.4;rotate:180deg}}
    #memoryStarPopup{
      position:fixed;inset:0;z-index:9999;
      display:flex;align-items:center;justify-content:center;
      padding:22px;background:rgba(0,0,0,.58);
      backdrop-filter:blur(8px);
      opacity:0;visibility:hidden;pointer-events:none;
      transition:opacity .3s ease,visibility .3s ease;
    }
    #memoryStarPopup.show{opacity:1;visibility:visible;pointer-events:auto;}
    .memoryPopupCard{
      width:min(92vw,390px);padding:28px 24px;text-align:center;
      border:1px solid rgba(255,255,255,.18);border-radius:26px;
      background:rgba(18,19,29,.94);box-shadow:0 25px 70px rgba(0,0,0,.55);
      transform:translateY(18px) scale(.96);transition:transform .3s ease;
    }
    #memoryStarPopup.show .memoryPopupCard{transform:translateY(0) scale(1);}
    .memoryPopupIcon{font-size:44px;margin-bottom:12px;}
    #memoryPopupText{color:#f5f5f5;font-size:16px;line-height:1.8;margin:0 0 22px;}
    #memoryPopupClose{
      border:0;border-radius:999px;padding:13px 26px;background:#ff4d8d;
      color:#fff;font:600 15px Poppins,sans-serif;cursor:pointer;
    }
  `;
  document.head.appendChild(style);
}

function startStars(){
  const bg=document.getElementById("starBackground"), btn=document.getElementById("starsContinue");
  if(!bg) return;
  installConstellationStyles();
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
    popup.innerHTML=`<div class="memoryPopupCard"><div class="memoryPopupIcon">⭐</div><p id="memoryPopupText"></p><button type="button" id="memoryPopupClose">Continue ❤️</button></div>`;
    document.body.appendChild(popup);
    popup.addEventListener("click",event=>{if(event.target===popup) closeMemoryPopup();});
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
  createHeartRain();createRosePetals();
  const flash=document.getElementById("flashEffect");
  if(flash){flash.style.opacity="1";setTimeout(()=>flash.style.opacity="0",300);}
}

function createHeartRain(){
  const c=document.getElementById("heartRain");if(!c)return;c.innerHTML="";
  for(let i=0;i<18;i++){const el=document.createElement("div");el.className="heart";el.textContent="❤️";el.style.left=Math.random()*100+"%";el.style.animationDelay=Math.random()*2+"s";c.appendChild(el);}
}
function createRosePetals(){
  const c=document.getElementById("rosePetals");if(!c)return;c.innerHTML="";
  for(let i=0;i<12;i++){const el=document.createElement("div");el.className="petal";el.textContent="🌹";el.style.left=Math.random()*100+"%";el.style.animationDelay=Math.random()*2+"s";c.appendChild(el);}
}

function startFutureStory(){
  const box=document.getElementById("futureTypewriter"),next=document.getElementById("futureNext"),img=document.getElementById("futureSelfie");
  if(!box)return;futureIndex=0;box.textContent="";if(next)next.classList.add("hidden");if(img)img.style.display="none";typeFutureMessage();
}
const futureMessage=`Maybe one day, we will look back at this chapter and smile at how far we've come. ❤️\n\nFor now, let's keep creating memories worth remembering.\n\nOur story isn't ending here...\nIt's only getting better. 🌠❤️`;
function typeFutureMessage(){const box=document.getElementById("futureTypewriter");if(!box)return;if(futureIndex>=futureMessage.length){showFutureSelfie();return;}box.textContent+=futureMessage.charAt(futureIndex++);setTimeout(typeFutureMessage,35);}
function showFutureSelfie(){const img=document.getElementById("futureSelfie"),next=document.getElementById("futureNext");const saved=typeof getLatestSelfie==="function"?getLatestSelfie():localStorage.getItem("latestSelfie");if(img&&saved){img.src=saved;img.style.display="block";}if(next)next.classList.remove("hidden");}

function startFinalLetter(){const box=document.getElementById("finalLetterText"),btn=document.getElementById("sealChapterBtn");if(!box)return;finalIndex=0;box.textContent="";if(btn)btn.classList.add("hidden");typeFinalLetter();}
const finalMessage=`Two chapters, countless memories, and so many moments still waiting for us. ❤️\n\nThank you for being part of my story.\n\nThis chapter ends... but our story continues. ❤️`;
function typeFinalLetter(){const box=document.getElementById("finalLetterText");if(!box)return;if(finalIndex>=finalMessage.length){const btn=document.getElementById("sealChapterBtn");if(btn)btn.classList.remove("hidden");return;}box.textContent+=finalMessage.charAt(finalIndex++);setTimeout(typeFinalLetter,35);}

function resetStars(){
  collectedStars=0;futureIndex=0;finalIndex=0;
  const ids=["starBackground","futureTypewriter","finalLetterText","heartRain","rosePetals","fireworks","flashEffect"];
  ids.forEach(id=>{const e=document.getElementById(id);if(e)e.innerHTML="";});
  closeMemoryPopup();
  const b=document.getElementById("starsContinue");if(b)b.classList.add("hidden");
  const n=document.getElementById("futureNext");if(n)n.classList.add("hidden");
  const s=document.getElementById("sealChapterBtn");if(s)s.classList.add("hidden");
  const content=document.querySelector("#starsPage .starsContent");
  if(content){content.style.opacity="1";content.style.transform="none";content.style.pointerEvents="";}
}

function createFireworks(){const c=document.getElementById("fireworks");if(!c)return;c.innerHTML="";for(let i=0;i<14;i++){const e=document.createElement("div");e.className="firework";e.style.left=(15+Math.random()*70)+"%";e.style.top=(10+Math.random()*60)+"%";c.appendChild(e);}}
function startSealSequence(){createFireworks();createHeartRain();setTimeout(()=>{if(typeof showPage==="function")showPage("giftPage");},3000);}

const starsContinue=document.getElementById("starsContinue");
if(starsContinue)starsContinue.addEventListener("click",()=>{showPage("futurePage");startFutureStory();});
const futureNext=document.getElementById("futureNext");
if(futureNext)futureNext.addEventListener("click",()=>{showPage("finalLetterPage");startFinalLetter();});
const sealBtn=document.getElementById("sealChapterBtn");
if(sealBtn)sealBtn.addEventListener("click",()=>{showPage("sealPage");startSealSequence();});
const giftBox=document.getElementById("giftBox");
if(giftBox)giftBox.addEventListener("click",()=>{const items=document.getElementById("giftItems");giftBox.style.transform="scale(1.15)";if(items)items.classList.remove("hidden");setTimeout(()=>showPage("continuePage"),2500);});
const continuePage=document.getElementById("continuePage");
if(continuePage)continuePage.addEventListener("click",()=>showPage("replayPage"));

console.log("🌌 stars.js loaded");
