/* Chapter Two — supabase.js | Version 3 */

const SUPABASE_URL="https://bhtyestavehwaymfozxw.supabase.co";
/* Add your Supabase publishable/anon key here to enable cloud uploads. Never put a service-role/secret key here. */
const SUPABASE_ANON_KEY=window.SUPABASE_ANON_KEY||"";
const BUCKET_NAME="selfies";

let supabaseClient=null;

if(window.supabase && SUPABASE_ANON_KEY){
  try{ supabaseClient=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY); }
  catch(error){ console.error("Supabase initialization failed:",error); }
}else{
  console.warn("Supabase upload is disabled until the publishable/anon key is added. Local selfie fallback is enabled.");
}

function blobToDataURL(blob){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=reject;
    reader.readAsDataURL(blob);
  });
}

async function uploadSelfieToSupabase(imageBlob){
  if(!supabaseClient) return null;
  try{
    const fileName=`selfie_${Date.now()}.jpg`;
    const {data,error}=await supabaseClient.storage.from(BUCKET_NAME).upload(fileName,imageBlob,{contentType:"image/jpeg",upsert:false});
    if(error) throw error;
    const {data:publicData}=supabaseClient.storage.from(BUCKET_NAME).getPublicUrl(data.path);
    return publicData.publicUrl;
  }catch(error){
    console.error("Supabase upload failed:",error);
    return null;
  }
}

async function saveSelfie(imageBlob){
  if(!imageBlob) return false;
  let url=await uploadSelfieToSupabase(imageBlob);
  if(!url){
    try{ url=await blobToDataURL(imageBlob); }
    catch(error){ console.error("Local selfie fallback failed:",error); return false; }
  }
  localStorage.setItem("latestSelfie",url);
  showLatestSelfie();
  return true;
}

function getLatestSelfie(){ return localStorage.getItem("latestSelfie"); }

function showLatestSelfie(){
  const url=getLatestSelfie();
  if(!url) return;
  const selfie=document.getElementById("selfieImage");
  const future=document.getElementById("futureSelfie");
  if(selfie) selfie.src=url;
  if(future) future.src=url;
}

window.addEventListener("DOMContentLoaded",showLatestSelfie);
console.log("☁️ supabase.js loaded");
