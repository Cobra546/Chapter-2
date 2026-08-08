/* Chapter Two — location & distance */

const MY_LOCATION={lat:24.989972,lng:67.057583};
const HER_FALLBACK_LOCATION={lat:24.96215102611671,lng:67.05567540257583};

function distanceKm(a,b){
  const R=6371,toRad=v=>v*Math.PI/180;
  const dLat=toRad(b.lat-a.lat),dLng=toRad(b.lng-a.lng);
  const x=Math.sin(dLat/2)**2+Math.cos(toRad(a.lat))*Math.cos(toRad(b.lat))*Math.sin(dLng/2)**2;
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}

function renderLocationScene(herLocation,live=false){
  let page=document.getElementById("locationPage");
  if(!page){
    page=document.createElement("section");page.id="locationPage";page.className="page locationPage";
    page.innerHTML=`<div class="locationCard"><div class="locationIcon">📍</div><h2>Where We Are</h2><div class="locationDots"><div class="locationPerson">❤️<span>You</span></div><div class="distanceLine"><strong id="locationDistance">0 km</strong><span>apart</span></div><div class="locationPerson">🌹<span>Her</span></div></div><p id="locationMode"></p><button id="locationContinue">Continue ❤️</button></div>`;
    document.body.appendChild(page);
    document.getElementById("locationContinue").addEventListener("click",()=>{if(typeof showPage==="function")showPage("quizPage");});
  }
  const km=distanceKm(MY_LOCATION,herLocation),distance=document.getElementById("locationDistance"),mode=document.getElementById("locationMode");
  if(distance)distance.textContent=km<1?`${Math.round(km*1000)} m`:`${km.toFixed(1)} km`;
  if(mode)mode.textContent=live?"📍 Her current location":"📍 Using saved location";
  if(typeof showPage==="function")showPage("locationPage");
}

function requestHerLocation(){
  if(!navigator.geolocation){renderLocationScene(HER_FALLBACK_LOCATION,false);return;}
  navigator.geolocation.getCurrentPosition(
    p=>renderLocationScene({lat:p.coords.latitude,lng:p.coords.longitude},true),
    ()=>renderLocationScene(HER_FALLBACK_LOCATION,false),
    {enableHighAccuracy:true,timeout:10000,maximumAge:0}
  );
}
function startLocationScene(){requestHerLocation();}
console.log("📍 location.js loaded");
