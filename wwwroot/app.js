function make(tag, value, className) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value;
  return element;
}

function picture(work) {
  const image = document.createElement("img");
  image.src = work.src;
  image.alt = work.alt;
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
  ...newspaper.letter.map(line => make("p", line))
);

const page = document.querySelector("#book-page");
const previous = document.querySelector("#book-prev");
const next = document.querySelector("#book-next");
const count = document.querySelector("#book-count");
let pageIndex = 0;

function showPage(direction) {
  const item = newspaper.literature[pageIndex];
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
function openViewer(title, ...content) {
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#dialog-content").replaceChildren(...content);
  dialog.showModal();
}

const gallery = document.querySelector("#gallery");
for (const work of newspaper.art) {
  const button = make("button", "", "art-card");
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  const thumbnail = picture(work);
  thumbnail.alt = "";
  thumbnail.loading = "lazy";
  button.append(thumbnail, make("strong", work.title));
  button.addEventListener("click", () => openViewer(work.title, picture(work)));
  gallery.append(button);
}

const memories = document.querySelector("#memories");
for (const memory of newspaper.memories) {
  const article = make("article", "", "memory");
  showArticle(article, memory);
  memories.append(article);
}
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
  showArticle(flowerStory, deed);
}
flowers.append(...flowerButtons);
showFlower(flowerButtons[0], newspaper.goodDeeds[0]);

const card = document.querySelector("#open-card");
card.setAttribute("aria-haspopup", "dialog");
card.addEventListener("click", () => {
  const envelope = card.querySelector(".envelope").cloneNode(true);
  envelope.classList.add("card-envelope");
  openViewer(newspaper.card.title, envelope, picture(newspaper.card), make("p", newspaper.card.body, "body"));
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
