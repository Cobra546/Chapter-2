/* Chapter Two — Cloudinary selfie uploader */
const CLOUDINARY_CLOUD_NAME = "wirn44nt";
const CLOUDINARY_UPLOAD_PRESET = "Chapter 2";
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

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
      formData.append("public_id", publicId);
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
        return result.secure_url;
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

async function saveSelfie(imageBlob, location) {
  if (!imageBlob) return false;

  const uploadedUrl = await uploadSelfieToCloudinary(imageBlob, location);
  let url = uploadedUrl;

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

console.log("☁️ Cloudinary uploader loaded — Chapter Two selfie storage ready");
