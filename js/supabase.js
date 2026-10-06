/* Chapter Two — Supabase Storage selfie uploader + memory gallery manifest */
const MEMORIES_SUPABASE_URL = "https://bhtyestavehwaymfozxw.supabase.co";
const MEMORIES_SUPABASE_KEY = "sb_publishable_VpUhQZY8bczeIYv-oo8mLQ_YHPTjm7r";
const SELFIES_BUCKET = "selfies";

function setUploadStatus(message) {
  const status = document.getElementById("cameraStatus");
  if (status) status.textContent = message;
  console.log("[Supabase Storage]", message);
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function selfieBaseName(location) {
  const loc = location || (typeof getHerLiveLocation === "function" ? getHerLiveLocation() : null);
  if (loc && Number.isFinite(Number(loc.lat)) && Number.isFinite(Number(loc.lng))) {
    return Number(loc.lat).toFixed(6) + "_" + Number(loc.lng).toFixed(6);
  }
  return "selfie_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8);
}

async function uploadSelfieToStorage(imageBlob, location) {
  if (!imageBlob) return null;

  const base = selfieBaseName(location);

  try {
    setUploadStatus("☁️ Saving your memory...");

    for (let i = 0; i < 1000; i++) {
      const fileName = i === 0 ? base + ".jpg" : base + "-" + i + ".jpg";
      const path = "chapter-two/" + fileName;

      const response = await fetch(
        MEMORIES_SUPABASE_URL + "/storage/v1/object/" + SELFIES_BUCKET + "/" + path,
        {
          method: "POST",
          headers: {
            apikey: MEMORIES_SUPABASE_KEY,
            Authorization: "Bearer " + MEMORIES_SUPABASE_KEY,
            "Content-Type": "image/jpeg",
            "x-upsert": "false"
          },
          body: imageBlob
        }
      );

      if (response.ok) {
        const url =
          MEMORIES_SUPABASE_URL +
          "/storage/v1/object/public/" +
          SELFIES_BUCKET +
          "/" +
          path;

        setUploadStatus("☁️ Memory saved! ❤️");
        return { url: url, publicId: path };
      }

      const errorText = (await response.text()).toLowerCase();
      const conflict =
        response.status === 409 ||
        errorText.includes("already exists") ||
        errorText.includes("duplicate");

      if (!conflict) {
        console.error("[Supabase Storage] Upload error:", errorText);
        setUploadStatus("⚠️ Memory could not be saved.");
        return null;
      }
    }
  } catch (error) {
    console.error("[Supabase Storage] Upload error:", error);
    setUploadStatus("⚠️ Memory could not be saved.");
  }

  return null;
}

async function saveMemoryRecord(imageUrl, publicId, location) {
  if (!imageUrl) return false;

  try {
    const response = await fetch(
      MEMORIES_SUPABASE_URL + "/rest/v1/memories",
      {
        method: "POST",
        headers: {
          apikey: MEMORIES_SUPABASE_KEY,
          Authorization: "Bearer " + MEMORIES_SUPABASE_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          image_url: imageUrl,
          created_at: new Date().toISOString()
        })
      }
    );

    if (!response.ok) {
      console.error("[Memories] Manifest save failed:", await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Memories] Manifest save error:", error);
    return false;
  }
}

async function saveSelfie(imageBlob, location) {
  if (!imageBlob) return false;

  const uploaded = await uploadSelfieToStorage(imageBlob, location);
  let url = uploaded && uploaded.url ? uploaded.url : null;

  if (uploaded && uploaded.url) {
    await saveMemoryRecord(uploaded.url, uploaded.publicId, location);
  }

  if (!url) {
    try {
      url = await blobToDataURL(imageBlob);
    } catch (error) {
      console.error("[Supabase Storage] Local fallback failed:", error);
      return false;
    }
  }

  localStorage.setItem("latestSelfie", url);
  showLatestSelfie();
  return true;
}

function getLatestSelfie() {
  return localStorage.getItem("latestSelfie");
}

function showLatestSelfie() {
  const url = getLatestSelfie();
  if (!url) return;

  const selfie = document.getElementById("selfieImage");
  const future = document.getElementById("futureSelfie");

  if (selfie) selfie.src = url;
  if (future) future.src = url;
}

window.addEventListener("DOMContentLoaded", showLatestSelfie);

console.log("☁️ Supabase Storage selfie uploader + memories manifest loaded");
