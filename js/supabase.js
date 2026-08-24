/* Chapter Two — supabase.js | Version 4 */
const SUPABASE_URL="https://bhtyestavehwaymfozxw.supabase.co";
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NDkwODksImV4cCI6MjEwMTQyNTA4OX0.4-8U1fe5LQVTsuFa1kgc8A1PQeBQrh_UTibZsmApPrQ";
const BUCKET_NAME="selfies";
let supabaseClient=null;
function setUploadStatus(message){const status=document.getElementById("cameraStatus");if(status)status.textContent=message;console.log("[Supabase]",message);}
if(window.supabase){try{supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);}catch(error){console.error("[Supabase] Initialization failed:",error);}}
function blobToDataURL(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(blob);});}
function selfieFileName(){const loc=typeof getHerLiveLocation==="function"?getHerLiveLocation():null;if(loc&&Number.isFinite(loc.lat)&&Number.isFinite(loc.lng))return `${loc.lat.toFixed(6)},${loc.lng.toFixed(6)}.jpg`;return `selfie_${Date.now()}_${Math.random().toString(36).slice(2,8)}.jpg`;}
async function uploadSelfieToSupabase(imageBlob){if(!imageBlob||!supabaseClient)return null;const fileName=selfieFileName();try{setUploadStatus("☁️ Uploading your memory...");const {data,error}=await supabaseClient.storage.from(BUCKET_NAME).upload(fileName,imageBlob,{contentType:"image/jpeg",cacheControl:"3600",upsert:false});if(error){console.error("[Supabase] Storage upload error:",error);return null;}const {data:publicData}=supabaseClient.storage.from(BUCKET_NAME).getPublicUrl(data.path);const publicUrl=publicData?.publicUrl||null;if(publicUrl)setUploadStatus("☁️ Memory saved to Supabase! ❤️");return publicUrl;}catch(error){console.error("[Supabase] Unexpected upload error:",error);return null;}}
async function saveSelfie(imageBlob){if(!imageBlob)return false;const uploadedUrl=await uploadSelfieToSupabase(imageBlob);let url=uploadedUrl;if(!url){try{url=await blobToDataURL(imageBlob);}catch(error){return false;}}localStorage.setItem("latestSelfie",url);showLatestSelfie();return true;}
function getLatestSelfie(){return localStorage.getItem("latestSelfie");}
function showLatestSelfie(){const url=getLatestSelfie();if(!url)return;const selfie=document.getElementById("selfieImage"),future=document.getElementById("futureSelfie");if(selfie)selfie.src=url;if(future)future.src=url;}
window.addEventListener("DOMContentLoaded",showLatestSelfie);
console.log("☁️ supabase.js loaded — live coordinates become selfie filename when available");