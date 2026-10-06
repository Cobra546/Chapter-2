(() => {
  let code = "";

  function todayCode() {
    const d = new Date();
    return String(d.getMonth() + 1).padStart(2, "0") +
           String(d.getDate()).padStart(2, "0");
  }

  function display() {
    const el = document.getElementById("passcodeDisplay");
    if (el) el.textContent = code || "••••";
  }

  function clear() {
    code = "";
    display();
    const msg = document.getElementById("gateMessage");
    if (msg) msg.textContent = "";
  }

  document.addEventListener("click", event => {
    const key = event.target.closest(".heartKey");
    const unlock = event.target.closest("#unlockBtn");
    const hint = event.target.closest("#hintBtn");

    if (!key && !unlock && !hint) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (hint) {
      document.getElementById("hintPopup")?.classList.remove("hidden");
      return;
    }

    if (key) {
      const value = key.dataset.key;
      if (value === "delete") {
        code = code.slice(0, -1);
      } else if (code.length < 4) {
        code += value;
      }
      display();

      if (code.length === 4) {
        setTimeout(() => unlock(), 180);
      }
      return;
    }

    unlock();
  }, true);

  function unlock() {
    const msg = document.getElementById("gateMessage");

    if (code !== todayCode()) {
      if (msg) msg.textContent = "Wrong passcode 😭❤️";
      clear();
      return;
    }

    if (msg) msg.textContent = "Unlocked ❤️";
    setTimeout(() => {
      if (typeof showPage === "function") showPage("heroPage");
    }, 450);
  }

  console.log("📅 Today's date passcode enabled");
})();