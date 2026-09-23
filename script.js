// Set this to the number of numbered JPGs in /images to preview them in sequence.
// Example: 8 will cycle through images/1.jpg ... images/8.jpg.
const FRAME_COUNT = 3;
const FRAME_DELAY_MS = 1100;

const heroImage = document.querySelector("#hero-image");
const frameCounter = document.querySelector("#frame-counter");
const frameNumber = frameCounter.querySelector("span");
let currentFrame = 1;

function revealImage() {
  heroImage.classList.add("is-loaded");
}

function hideMissingImage() {
  heroImage.remove();
}

if (heroImage.complete) {
  heroImage.naturalWidth ? revealImage() : hideMissingImage();
} else {
  heroImage.addEventListener("load", revealImage, { once: true });
  heroImage.addEventListener("error", hideMissingImage, { once: true });
}

if (FRAME_COUNT > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  frameCounter.hidden = false;

  window.setInterval(() => {
    currentFrame = currentFrame === FRAME_COUNT ? 1 : currentFrame + 1;
    const nextImage = new Image();
    nextImage.src = `images/${currentFrame}.jpg`;
    nextImage.onload = () => {
      heroImage.src = nextImage.src;
      frameNumber.textContent = String(currentFrame).padStart(2, "0");
    };
  }, FRAME_DELAY_MS);
}
