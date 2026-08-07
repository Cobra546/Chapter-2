/* Chapter Two — supabase.js | Version 3 */

const SUPABASE_URL="https://bhtyestavehwaymfozxw.supabase.co";
/* This is the public anon key, intended for browser use. Never use a service-role key here. */
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodHllc3RhdmVod2F5bWZvenh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NDkwODksImV4cCI6MjEwMTQyNTA4OX0.4-8U1fe5LQVTsuFa1kgc8A1PQeBQrh_UTibZsmApPrQ";
const BUCKET_NAME="selfies";

let supabaseClient=null;

function setUploadStatus(message){
  const status=document.getElementById("cameraStatus");
  if(status) status.textContent=message;
  console.log("[Supabase]",message);
}

if(!window.supabase){
  console.error("[Supabase] CDN library is missing.");
}else{
  try{
    supabaseClient=window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
    console.log("☁️ Supabase client initialized.");
  }catch(error){
    console.error("[Supabase] Initialization failed:",error);
  }
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
  if(!imageBlob){
    setUploadStatus("❌ No selfie data to upload.");
    return null;
  }

  if(!supabaseClient){
    setUploadStatus("⚠️ Supabase client is not ready.");
    return null;
  }

  const fileName=`selfie_${Date.now()}_${Math.random().toString(36).slice(2,8)}.jpg`;

  try{
    setUploadStatus("☁️ Uploading your memory...");

    const {data,error}=await supabaseClient.storage
      .from(BUCKET_NAME)
      .upload(fileName,imageBlob,{
        contentType:"image/jpeg",
        cacheControl:"3600",
        upsert:false
      });

    if(error){
      console.error("[Supabase] Storage upload error:",error);
      setUploadStatus(`❌ Upload failed: ${error.message||"Storage error"}`);
      return null;
    }

    if(!data?.path){
      setUploadStatus("❌ Upload returned no file path.");
      return null;
    }

    const {data:publicData}=supabaseClient.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    const publicUrl=publicData?.publicUrl||null;

    if(!publicUrl){
      setUploadStatus("⚠️ Uploaded, but no public image URL was returned.");
      return null;
    }

    console.log("✅ Selfie uploaded:",data.path);
    setUploadStatus("☁️ Memory saved to Supabase! ❤️");
    return publicUrl;

  }catch(error){
    console.error("[Supabase] Unexpected upload error:",error);
    setUploadStatus(`❌ Upload error: ${error.message||"Unknown error"}`);
    return null;
  }
}

async function saveSelfie(imageBlob){
  if(!imageBlob) return false;

  const uploadedUrl=await uploadSelfieToSupabase(imageBlob);
  let url=uploadedUrl;

  /* Keep the site usable if Supabase is temporarily unavailable. */
  if(!url){
    try{
      url=await blobToDataURL(imageBlob);
      setUploadStatus("📱 Memory saved locally; cloud upload failed.");
    }catch(error){
      console.error("[Supabase] Local fallback failed:",error);
      setUploadStatus("❌ Could not save the selfie.");
      return false;
    }
  }

  localStorage.setItem("latestSelfie",url);
  showLatestSelfie();
  return true;
}

function getLatestSelfie(){
  return localStorage.getItem("latestSelfie");
}

function showLatestSelfie(){
  const url=getLatestSelfie();
  if(!url) return;

  const selfie=document.getElementById("selfieImage");
  const future=document.getElementById("futureSelfie");

  if(selfie) selfie.src=url;
  if(future) future.src=url;
}

window.addEventListener("DOMContentLoaded",showLatestSelfie);

console.log("☁️ supabase.js loaded — bucket:",BUCKET_NAME);
