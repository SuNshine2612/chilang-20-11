(() => {
  const garden = document.querySelector("#vuon-tri-an");
  const bed = garden.querySelector(".tribute-bed");
  const count = garden.querySelector(".tribute-count");
  const plant = garden.querySelector(".tribute-plant");
  const theme = garden.querySelector(".tribute-theme");
  const water = garden.querySelector(".tribute-water");
  const waterMessage = garden.querySelector(".tribute-water-message");
  const number = count.querySelector("strong");
  const storageKey = "chilang:tribute-plants";
  let total = 0;

  try {
    const saved = Number(localStorage.getItem(storageKey));
    if (Number.isSafeInteger(saved) && saved >= 0) total = saved;
  } catch {
    // Planting still works for the current visit when storage is unavailable.
  }

  const blooms = ["#fa9eb8", "#ffd477", "#bfacfa", "#ffa483"];
  const plantingPattern = [0, 0, 2, 1, 3, 3, 2, 0, 1, 1, 3, 2, 2, 0, 3, 1, 0];
  const heights = [1.55, 2.1, 1.8, 2.25, 1.7, 1.95];

  function addSprout(index, fresh = false) {
    const sprout = document.createElement("span");
    sprout.className = fresh ? "tribute-sprout is-fresh" : "tribute-sprout";
    sprout.style.setProperty("--bloom", blooms[plantingPattern[index % plantingPattern.length]]);
    sprout.style.setProperty("--delay", -(index % 7) * .4 + "s");
    sprout.style.setProperty("--stem", heights[index % heights.length] + "rem");
    sprout.style.setProperty("--leaf-angle", index % 3 === 0 ? "48deg" : "22deg");
    sprout.append(document.createElement("i"));
    if (fresh) {
      sprout.addEventListener("animationend", event => {
        if (event.animationName === "tribute-grow") sprout.classList.remove("is-fresh");
      });
    }
    bed.append(sprout);
  }

  function showCount() {
    number.textContent = total.toLocaleString("vi-VN");
    const empty = total === 0;
    garden.dataset.empty = String(empty);
    count.hidden = empty;
    water.hidden = empty;
    garden.querySelector(".tribute-empty").hidden = !empty;
    plant.textContent = empty ? "🌱 Gieo hạt đầu tiên" : "🌱 Gieo một cây";
  }

  for (let index = 0; index < total; index++) addSprout(index);
  showCount();

  plant.addEventListener("click", () => {
    if (total >= Number.MAX_SAFE_INTEGER) return;
    addSprout(total, true);
    total += 1;
    showCount();
    try {
      localStorage.setItem(storageKey, String(total));
    } catch {
      // Keep the garden visible for the rest of the visit.
    }
  });

  water.addEventListener("click", () => {
    const candidates = Array.from(bed.children);
    const watered = [];
    while (candidates.length && watered.length < 5) {
      const index = Math.floor(Math.random() * candidates.length);
      const [sprout] = candidates.splice(index, 1);
      sprout.classList.add("is-watered");
      watered.push(sprout);
    }
    water.disabled = true;
    waterMessage.textContent = "💧 Cảm ơn bạn đã tưới mát những mầm xanh!";
    window.setTimeout(() => {
      for (const sprout of watered) sprout.classList.remove("is-watered");
      water.disabled = false;
      waterMessage.textContent = "";
    }, 2200);
  });

  function setNight(night) {
    garden.dataset.sky = night ? "night" : "day";
    theme.setAttribute("aria-pressed", String(night));
    theme.textContent = night ? "☀️ Cảnh ngày" : "🌙 Cảnh đêm";
  }

  const hour = Number(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", hourCycle: "h23"
  }).format(new Date()));
  setNight(hour < 6 || hour >= 18);
  theme.addEventListener("click", () => setNight(garden.dataset.sky !== "night"));
})();
