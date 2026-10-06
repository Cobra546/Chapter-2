/* Chapter Two — Cloudinary selfie uploader + memory gallery manifest */
const CLOUDINARY_CLOUD_NAME = "wirn44nt";
const CLOUDINARY_UPLOAD_PRESET = "Our Story";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

const MEMORIES_SUPABASE_URL = "https://bhtyestavehwaymfozxw.supabase.co";
const MEMORIES_SUPABASE_KEY = "sb_publishable_VpUhQZY8bczeIYv-oo8mLQ_YHPTjm7r";

function setUploadStatus(message) {
  const status = document.getElementById("cameraStatus");
  if (status) status.textContent = message;
  console.log("[Cloudinary]", message);
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
    return `${Number(loc.lat).toFixed(6)}_${Number(loc.lng).toFixed(6)}`;
  }
  return `selfie_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

async function uploadSelfieToCloudinary(imageBlob, location) {
  if (!imageBlob) {
    console.error("[Cloudinary] No image available");
    return null;
  }

  const base = selfieBaseName(location);

  try {
    setUploadStatus("☁️ Uploading your memory...");

    for (let i = 0; i < 1000; i++) {
      const publicId = i === 0 ? base : `${base}-${i}`;
      const formData = new FormData();

      formData.append("file", imageBlob, `${publicId}.jpg`);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", "chapter-two/selfies");

      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData
      });

      let result = {};
      try {
        result = await response.json();
      } catch (_) {}

      if (response.ok && result.secure_url) {
        setUploadStatus("☁️ Memory saved to Cloudinary! ❤️");
        return {
          url: result.secure_url,
          publicId: result.public_id || `chapter-two/selfies/${publicId}`
        };
      }

      const errorText = String(result?.error?.message || "").toLowerCase();
      const conflict =
        response.status === 409 ||
        errorText.includes("already exists") ||
        errorText.includes("duplicate") ||
        errorText.includes("public id");

      if (!conflict) {
        console.error("[Cloudinary] Upload error:", result);
        setUploadStatus(`⚠️ Cloud upload failed: ${result?.error?.message || "unknown error"}`);
        return null;
      }
    }
  } catch (error) {
    console.error("[Cloudinary] Unexpected upload error:", error);
    setUploadStatus(`⚠️ Cloud upload failed: ${error.message || "unknown error"}`);
  }

  return null;
}

async function saveMemoryRecord(imageUrl, publicId, location) {
  if (!imageUrl) return false;

  try {
    const response = await fetch(`${MEMORIES_SUPABASE_URL}/rest/v1/memories`, {
      method: "POST",
      headers: {
        apikey: MEMORIES_SUPABASE_KEY,
        Authorization: `Bearer ${MEMORIES_SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify({
        image_url: imageUrl,
        created_at: new Date().toISOString()
      })
    });

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

  const uploaded = await uploadSelfieToCloudinary(imageBlob, location);
  let url = uploaded?.url || null;

  if (uploaded?.url) {
    await saveMemoryRecord(uploaded.url, uploaded.publicId, location);
  }

  if (!url) {
    try {
      url = await blobToDataURL(imageBlob);
    } catch (error) {
      console.error("[Cloudinary] Local fallback failed:", error);
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
  const wall = document.getElementById("memoryWallSelfie");

  if (selfie) selfie.src = url;
  if (future) future.src = url;
  if (wall) wall.src = url;
}

window.addEventListener("DOMContentLoaded", showLatestSelfie);

console.log("☁️ Cloudinary uploader + memories manifest loaded");
