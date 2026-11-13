function make(tag, value, className) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  return element;
}

function makeAlbumArrow(label, direction) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `album-arrow album-arrow-${direction}`;
  button.setAttribute("aria-label", label);
  button.title = label;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", direction === "prev" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7");
  svg.append(path);
  button.append(svg);
  return button;
}

function picture(work) {
  const image = document.createElement("img");
  image.dataset.src = work.src;
  image.alt = work.alt;
  image.decoding = "async";
  return image;
}

function showArticle(container, item) {
  container.replaceChildren(
    make("h3", item.title),
    make("p", item.body, "body")
  );
}

document.querySelector("[data-class]").textContent = newspaper.className;
document.querySelector("#letter-content").append(
  ...newspaper.letter.map((line, index) => {
    const paragraph = make("p", line);
    const icon = make("span", ["💌", "📖", "💗", "🌷", "✨"][index], "letter-icon");
    icon.setAttribute("aria-hidden", "true");
    paragraph.prepend(icon);
    return paragraph;
  })
);

const page = document.querySelector("#book-page");
const previous = document.querySelector("#book-prev");
const next = document.querySelector("#book-next");
const count = document.querySelector("#book-count");
let pageIndex = 0;

function showPage(direction) {
  const item = newspaper.literature[pageIndex];
  page.dataset.corners = pageIndex % 2 === 0 ? "original" : "mirrored";
  showArticle(page, item);
  page.prepend(make("p", item.kind, "label"));
  if (direction) {
    const edge = make("span", "", "page-turn");
    edge.dataset.direction = direction;
    edge.setAttribute("aria-hidden", "true");
    edge.addEventListener("animationend", () => edge.remove(), { once: true });
    page.append(edge);
  }
  count.textContent = (pageIndex + 1) + " / " + newspaper.literature.length;
  previous.disabled = pageIndex === 0;
  next.disabled = pageIndex === newspaper.literature.length - 1;
}

previous.addEventListener("click", () => {
  pageIndex -= 1;
  showPage("previous");
  if (previous.disabled) next.focus();
});
next.addEventListener("click", () => {
  pageIndex += 1;
  showPage("next");
  if (next.disabled) previous.focus();
});
showPage();

const dialog = document.querySelector("#viewer");
let activeAlbum = null;
let albumIndex = 0;
let albumTimer = null;
function openViewer(title, ...content) {
  activeAlbum = null;
  clearInterval(albumTimer);
  dialog.classList.remove("is-album");
  dialog.classList.toggle("is-card", title === newspaper.card.title);
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#dialog-content").replaceChildren(...content);
  for (const image of document.querySelectorAll("#dialog-content img[data-src]")) image.src = image.dataset.src;
  dialog.showModal();
}

function preloadNextAlbumImage() {
  if (!activeAlbum || activeAlbum.length < 2) return;
  const nextWork = activeAlbum[(albumIndex + 1) % activeAlbum.length];
  if (!nextWork.src) return;
  const nextImage = new Image();
  nextImage.src = nextWork.src;
}

function renderAlbumSlide() {
  const work = activeAlbum[albumIndex];
  const content = document.querySelector("#dialog-content");
  const slide = make("div", "", "album-slide");
  const media = make("div", "", "album-media is-loading");
  const status = make("span", "Đang tải ảnh…", "image-status");
  status.setAttribute("role", "status");
  const image = picture(work);
  image.alt = work.alt || work.title;
  image.loading = "eager";
  image.addEventListener("load", () => {
    media.classList.remove("is-loading", "is-error");
    status.hidden = true;
  }, { once: true });
  image.addEventListener("error", () => {
    media.classList.remove("is-loading");
    media.classList.add("is-error");
    status.textContent = "Ảnh chưa tải được";
  }, { once: true });
  const prev = makeAlbumArrow("Xem ảnh trước", "prev");
  const next = makeAlbumArrow("Xem ảnh tiếp theo", "next");
  prev.addEventListener("click", () => showAlbumItem(albumIndex - 1));
  next.addEventListener("click", () => showAlbumItem(albumIndex + 1));
  media.append(image, status, prev, next);
  image.src = work.src;
  if (image.complete && image.naturalWidth > 0) {
    media.classList.remove("is-loading");
    status.hidden = true;
  }
  slide.append(media);
  const caption = make("p", work.author ? `${work.title} · ${work.author}` : work.title, "album-caption");
  slide.append(caption);
  const controls = make("div", "", "album-controls");
  const play = make("button", albumTimer ? "⏸ Tạm dừng" : "▶ Tự chạy", "button album-play");
  const position = make("span", `${albumIndex + 1} / ${activeAlbum.length}`, "album-position");
  play.type = "button";
  play.setAttribute("aria-label", albumTimer ? "Tạm dừng trình chiếu" : "Tự động trình chiếu ảnh");
  play.setAttribute("aria-pressed", String(Boolean(albumTimer)));
  play.addEventListener("click", () => {
    if (albumTimer) {
      clearInterval(albumTimer);
      albumTimer = null;
    } else {
      albumTimer = setInterval(() => showAlbumItem(albumIndex + 1), 3500);
    }
    renderAlbumSlide();
  });
  controls.append(position, play);
  content.replaceChildren(slide, controls);
  preloadNextAlbumImage();
}

function showAlbumItem(index) {
  albumIndex = (index + activeAlbum.length) % activeAlbum.length;
  renderAlbumSlide();
}

function openAlbum(works, index) {
  activeAlbum = works;
  albumIndex = index;
  clearInterval(albumTimer);
  albumTimer = null;
  dialog.classList.remove("is-card");
  dialog.classList.add("is-album");
  document.querySelector("#dialog-title").textContent = "Album ảnh · Khu vườn tri ân";
  renderAlbumSlide();
  dialog.showModal();
}

dialog.addEventListener("close", () => {
  clearInterval(albumTimer);
  albumTimer = null;
  activeAlbum = null;
  dialog.classList.remove("is-album");
  dialog.classList.remove("is-card");
});
dialog.addEventListener("keydown", event => {
  if (!activeAlbum) return;
  if (event.key === "ArrowLeft") showAlbumItem(albumIndex - 1);
  if (event.key === "ArrowRight") showAlbumItem(albumIndex + 1);
});

function renderGallery(container, works) {
  works.forEach((work, index) => {
    const button = make("button", "", "art-card");
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    const caption = make("strong", work.author ? `${work.title} · ${work.author}` : work.title);
    if (work.src) {
      const media = make("span", "", "art-card-media is-loading");
      const status = make("span", "Ảnh sẽ tải khi đến gần", "image-status");
      status.setAttribute("role", "status");
      const thumbnail = picture(work);
      thumbnail.alt = "";
      thumbnail.loading = "lazy";
      thumbnail.addEventListener("load", () => {
        media.classList.remove("is-loading", "is-error");
        status.hidden = true;
      }, { once: true });
      thumbnail.addEventListener("error", () => {
        media.classList.remove("is-loading");
        media.classList.add("is-error");
        status.textContent = "Ảnh chưa tải được";
      }, { once: true });
      media.append(thumbnail, status);
      button.append(media);
      thumbnailObserver.observe(thumbnail);
    }
    button.append(caption);
    if (work.body) button.append(make("span", work.body, "writing-snippet body"));
    button.addEventListener("click", () => openAlbum(works, index));
    container.append(button);
  });
}

const thumbnailObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    const image = entry.target;
    const media = image.parentElement;
    media.querySelector(".image-status").textContent = "Đang tải ảnh…";
    image.loading = "eager";
    image.fetchPriority = "low";
    image.src = image.dataset.src;
    thumbnailObserver.unobserve(image);
  }
}, { rootMargin: "450px 0px", threshold: 0.01 });

renderGallery(document.querySelector("#gallery"), newspaper.exhibitionArt);
renderGallery(document.querySelector("#writing-gallery"), newspaper.exhibitionWriting);
renderGallery(document.querySelector("#making-gallery"), newspaper.makingPhotos);
renderGallery(document.querySelector("#school-gallery"), newspaper.schoolPhotos);
renderGallery(document.querySelector("#flower-arranging-gallery"), newspaper.flowerArrangingPhotos);

const memories = document.querySelector("#memories");
for (const memory of newspaper.memories) {
  const article = make("article", "", "memory");
  showArticle(article, memory);
  const icon = make("span", memory.icon + " ");
  icon.setAttribute("aria-hidden", "true");
  article.querySelector("h3").prepend(icon);
  memories.append(article);
}

function setupTabs(tablist) {
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  function activate(tab, moveFocus = false) {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
    }
    if (moveFocus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", event => {
      let targetIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") targetIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") targetIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") targetIndex = 0;
      else if (event.key === "End") targetIndex = tabs.length - 1;
      else return;
      event.preventDefault();
      activate(tabs[targetIndex], true);
    });
  });
}
document.querySelectorAll('[role="tablist"]').forEach(setupTabs);
document.querySelector("#wishes").append(
  ...newspaper.wishes.map(wish => make("li", wish))
);

const flowers = document.querySelector("#flowers");
const flowerStory = document.querySelector("#flower-story");
const flowerButtons = newspaper.goodDeeds.map(deed => {
  const button = make("button", "", "flower");
  button.type = "button";
  button.setAttribute("aria-controls", "flower-story");
  const icon = make("span", "", "flower-icon");
  icon.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 5; index += 1) {
    const petal = make("span", "", "flower-petal");
    petal.style.setProperty("--angle", (index * 72) + "deg");
    icon.append(petal);
  }
  button.append(icon, deed.title);
  button.addEventListener("click", () => showFlower(button, deed));
  return button;
});

function showFlower(selected, deed) {
  for (const button of flowerButtons) {
    button.setAttribute("aria-pressed", String(button === selected));
  }
  const copy = make("div", "", "flower-story-copy");
  showArticle(copy, deed);
  const image = document.createElement("img");
  image.className = "flower-story-image";
  image.alt = "";
  image.width = 720;
  image.height = 480;
  image.decoding = "async";
  image.loading = "lazy";
  image.src = deed.image;
  flowerStory.replaceChildren(copy, image);
}
flowers.append(...flowerButtons);
showFlower(flowerButtons[0], newspaper.goodDeeds[0]);

const card = document.querySelector("#open-card");
card.setAttribute("aria-haspopup", "dialog");
card.addEventListener("click", () => {
  const envelope = card.querySelector(".envelope").cloneNode(true);
  envelope.classList.add("card-envelope");
  const portrait = make("div", "", "card-portrait");
  portrait.append(picture(newspaper.card));
  openViewer(newspaper.card.title, envelope, portrait, make("p", newspaper.card.body, "body"));
});


const backTop = document.querySelector(".back-top");
const music = document.querySelector("#background-music");
const musicToggle = document.querySelector(".music-toggle");
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.setAttribute("aria-pressed", "true");
      musicToggle.setAttribute("aria-label", "Tắt nhạc nền");
      musicToggle.title = "Tắt nhạc nền";
      musicToggle.querySelector(".music-label").textContent = "Đang phát";
    } catch {
      musicToggle.setAttribute("aria-label", "Không phát được nhạc nền");
      musicToggle.title = "Không phát được nhạc nền";
    }
  } else {
    music.pause();
    musicToggle.setAttribute("aria-pressed", "false");
    musicToggle.setAttribute("aria-label", "Phát nhạc nền");
    musicToggle.title = "Phát nhạc nền";
    musicToggle.querySelector(".music-label").textContent = "Bật nhạc";
  }
});
function updateBackTop() {
  backTop.hidden = window.scrollY < 400;
}
window.addEventListener("scroll", updateBackTop, { passive: true });
updateBackTop();

const sectionObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add("in-view");
    sectionObserver.unobserve(entry.target);
  }
}, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
const scrollIllustrations = document.querySelectorAll(
  ".section-title, .letter, .book, .art-card, .memory, .notes li, .flower, .flower-story, .postcard"
);
scrollIllustrations.forEach(element => sectionObserver.observe(element));

const toc = document.querySelector(".toc");
new ResizeObserver(() => {
  document.documentElement.style.setProperty("--toc-height", toc.offsetHeight + "px");
}).observe(toc);

toc.addEventListener("click", event => {
  const link = event.target.closest("a[href^='#']");
  if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

  const section = document.getElementById(link.hash.slice(1));
  if (!section) return;

  for (const element of scrollIllustrations) {
    if (!section.contains(element)) continue;
    element.classList.remove("in-view");
    sectionObserver.unobserve(element);
    sectionObserver.observe(element);
  }
});
