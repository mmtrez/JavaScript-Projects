"use strict";
const keys = document.querySelectorAll(".key");

function playOnClick() {
  const key = this.getAttribute("data-key");
  const audio = document.querySelector(`audio[data-key="${key}"]`);
  if (audio) {
    this.classList.toggle("playing");
    audio.currentTime = 0; // to replay the audio
    audio.play();
  }
}
const playOnKey = (e) => {
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);
  if (audio) {
    const key = document.querySelector(`.key[data-key="${e.key}"]`);
    key.classList.toggle("playing");
    audio.currentTime = 0; // to replay the audio
    audio.play();
  }
};
function removeClass(e) {
  if (e.propertyName === "transform") {
    this.classList.remove("playing");
  }
}
window.addEventListener("keydown", playOnKey);
keys.forEach((key) => {
  key.addEventListener("click", playOnClick);
  key.addEventListener("transitionend", removeClass);
});
