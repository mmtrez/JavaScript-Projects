"use strict";
const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", (e) => {
    if (e.propertyName === "transform") {
      key.classList.remove("playing");
    }
  });
});
window.addEventListener("keydown", (e) => {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  if (audio) {
    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    key.classList.add("playing");
    audio.currentTime = 0; // to replay the audio
    audio.play();
  }
});
