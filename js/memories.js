/* Chapter Two — cloud memory gallery + timeline */

const MEMORY_API_URL = "https://bhtyestavehwaymfozxw.supabase.co/rest/v1/memories";
const MEMORY_API_KEY = "sb_publishable_VpUhQZY8bczeIYv-oo8mLQ_YHPTjm7r";

const STORY_TIMELINE = [
  {
    date: "11 February 2025",
    title: "First Talk",
    text: "The first little moment that became the beginning of a much bigger story. ❤️",
    icon: "💬"
  },
  {
    date: "27 May",
    title: "Our Anniversary",
    text: "A milestone worth remembering — another page added to our story. 🌹",
    icon: "❤️"
  },
  {
    date: "2 June",
    title: "A Birthday Memory",
    text: "A day made for celebrating a very special person. 🎂✨",
    icon: "🎂"
  },
  {
    date: "Chapter Two",
    title: "Where We Are Now",
    text: "More memories, more little moments, and another chapter waiting to be written. 📖❤️",
    icon: "🌙"
  }
];

function memoryHeaders() {
  return {
    apikey: MEMORY_API_KEY,
    Authorization: `Bearer ${MEMORY_API_KEY}`
  };
}

async function loadCloudMemories() {
  const grid = document.getElementById("cloudMemoriesGrid");
  const empty = document.getElementById("cloudMemoriesEmpty");
  if (!grid) return;

  try {
    const response = await fetch(
      MEMORY_API_URL +
      "?select=id,image_url,created_at&order=created_at.desc",
      { headers: memoryHeaders() }
    );

    if (!response.ok) throw new Error(await response.text());

    const memories = await response.json();
    const latest = typeof getLatestSelfie === "function" ? getLatestSelfie() : localStorage.getItem("latestSelfie");

    grid.innerHTML = "";

    // Show the most recently captured selfie first.
    if (latest) {
      const currentCard = document.createElement("button");
      currentCard.type = "button";
      currentCard.className = "cloudMemoryCard";
      currentCard.innerHTML = `
        <img src="${latest}" alt="Current Captured Memory">
        <span>Current Memory ❤️</span>
      `;
      currentCard.addEventListener("click", () => openMemoryLightbox(latest));
      grid.appendChild(currentCard);
    }

    const olderMemories = memories.filter(memory => memory.image_url !== latest);

    if (!latest && !olderMemories.length) {
      if (empty) empty.classList.remove("hidden");
      return;
    }

    if (empty) empty.classList.add("hidden");

    olderMemories.forEach((memory, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "cloudMemoryCard";
      card.innerHTML = `
        <img src="${memory.image_url}" alt="Memory ${olderMemories.length - index}" loading="lazy">
        <span>Memory ${olderMemories.length - index} ❤️</span>
      `;
      card.addEventListener("click", () => openMemoryLightbox(memory.image_url));
      grid.appendChild(card);
    });
  } catch (error) {
    console.error("[Memories] Gallery load failed:", error);
    if (empty) {
      empty.textContent = "Memories are taking a little longer to load... ❤️";
      empty.classList.remove("hidden");
    }
  }
}
function openMemoryLightbox(url) {
  let overlay = document.getElementById("memoryLightbox");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "memoryLightbox";
    overlay.innerHTML = `
      <button type="button" id="memoryLightboxClose" aria-label="Close">✕</button>
      <img id="memoryLightboxImage" alt="Memory">
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", event => {
      if (event.target === overlay || event.target.id === "memoryLightboxClose") {
        overlay.classList.remove("show");
      }
    });
  }

  const image = document.getElementById("memoryLightboxImage");
  if (image) image.src = url;
  overlay.classList.add("show");
}

function renderStoryTimeline() {
  const timeline = document.getElementById("storyTimeline");
  if (!timeline) return;

  timeline.innerHTML = STORY_TIMELINE.map((item, index) => `
    <article class="timelineItem">
      <div class="timelineDot">${item.icon}</div>
      <div class="timelineCard">
        <span class="timelineDate">${item.date}</span>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
      </div>
    </article>
  `).join("");
}

window.addEventListener("DOMContentLoaded", () => {
  loadCloudMemories();
  renderStoryTimeline();
});
