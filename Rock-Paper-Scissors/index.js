"use strict";

// UI
const typeEls = document.querySelectorAll(".type");
const startButtonEl = document.getElementById("start-btn");
const landingContentEl = document.querySelector(".landing-content");
const gameContentEl = document.querySelector(".game-content");
const typeTexts = [
  "machines are threatening to take over the world ...",
  "unless you can defeat them in a game of rock paper scissors (5 Rounds)",
];
let charCounter = 0;
const typeEffect = (element, text) => {
  if (charCounter < text.length) {
    element.textContent += text.charAt(charCounter);
    charCounter++;
    setTimeout(() => typeEffect(element, text), 70);
  } else {
    charCounter = 0;
    setTimeout(() => element.classList.add("fade-out"), 1000);
  }
};
typeEls[0].addEventListener("transitionend", (e) => {
  if (e.propertyName === "opacity") {
    typeEls[0].classList.add("dnone");
    typeEffect(typeEls[1], typeTexts[1]);
  }
});
typeEls[1].addEventListener("transitionend", (e) => {
  startButtonEl.classList.remove("hidden");
  startButtonEl.classList.add("btn-fade-in");
  typeEls[1].classList.add("dnone");
});
typeEffect(typeEls[0], typeTexts[0]);

startButtonEl.addEventListener("click", () => {
  actionSound.play();
  landingContentEl.classList.add("fade-out");
  landingContentEl.addEventListener("transitionend", (e) => {
    console.log(e);
    if (e.propertyName === "opacity") {
      gameContentEl.classList.remove("transparent");
      gameContentEl.classList.add("fade-in");
    }
  });
});

// LOGIC
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const [playerRockEl, playerPaperEl, playerScissorsEl] =
  document.querySelectorAll("#player-options > .option");
const [computerRockEl, computerPaperEl, computerScissorsEl] =
  document.querySelectorAll("#computer-options > .option");
const modalEl = document.getElementById("modal");
const resEl = document.getElementById("game-res");
const playerResEl = document.getElementById("player-res");
const computerResEl = document.getElementById("computer-res");
const playAgainBtnEl = document.getElementById("playagain");
const winSound = document.getElementById("win-sound");
const loseSound = document.getElementById("lose-sound");
const actionSound = document.getElementById("action-sound");
const scores = {
  player: 0,
  computer: 0,
};

const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.trunc(Math.random() * 3);
  return choices[randomNumber];
};

const showGameResult = (result, playerChoiceCard, computerChoiceCard) => {
  playerScoreEl.textContent = `Score: ${scores.player}`;
  computerScoreEl.textContent = `Score: ${scores.computer}`;
  playerChoiceCard.classList.add("player-color");
  computerChoiceCard.classList.add("computer-color");
};

const resetCards = () => {
  playerRockEl.classList.remove("player-color");
  playerPaperEl.classList.remove("player-color");
  playerScissorsEl.classList.remove("player-color");
  computerRockEl.classList.remove("computer-color");
  computerPaperEl.classList.remove("computer-color");
  computerScissorsEl.classList.remove("computer-color");
};

const playRound = (playerChoice, computerChoice) => {
  actionSound.play();
  resetCards();
  switch (playerChoice + "-" + computerChoice) {
    case "rock-rock":
      showGameResult("Draw", playerRockEl, computerRockEl);
      break;
    case "rock-paper":
      scores.computer++;
      showGameResult("Lose", playerRockEl, computerPaperEl);
      break;
    case "rock-scissors":
      scores.player++;
      showGameResult("Won", playerRockEl, computerScissorsEl);
      break;
    case "paper-rock":
      scores.player++;
      showGameResult("Won", playerPaperEl, computerRockEl);
      break;
    case "paper-paper":
      showGameResult("Draw", playerPaperEl, computerPaperEl);
      break;
    case "paper-scissors":
      scores.computer++;
      showGameResult("Lose", playerPaperEl, computerScissorsEl);
      break;
    case "scissors-rock":
      scores.computer++;
      showGameResult("Lose", playerScissorsEl, computerRockEl);
      break;
    case "scissors-paper":
      scores.player++;
      showGameResult("Won", playerScissorsEl, computerPaperEl);
      break;
    case "scissors-scissors":
      showGameResult("Draw", playerScissorsEl, computerScissorsEl);
      break;
  }
};

const playGame = (playerChoice) => {
  playRound(playerChoice, getComputerChoice());
  if (scores.player > 4 || scores.computer > 4) {
    playerResEl.textContent = `Your Score: ${scores.player}`;
    computerResEl.textContent = `Computer Score: ${scores.computer}`;
    if (scores.player > 4) {
      resEl.textContent = "You Won!";
      winSound.play();
    } else {
      resEl.textContent = "You Lost!";
      loseSound.play();
    }
    modalEl.classList.add("fade-in");
  }
};

const ResetGame = () => {
  modalEl.classList.remove("fade-in");
  playerScoreEl.textContent = "Score: 0";
  computerScoreEl.textContent = "Score: 0";
  scores.player = 0;
  scores.computer = 0;
  resetCards();
};

playerRockEl.addEventListener("click", () => playGame("rock"));
playerPaperEl.addEventListener("click", () => playGame("paper"));
playerScissorsEl.addEventListener("click", () => playGame("scissors"));
playAgainBtnEl.addEventListener("click", () => {
  actionSound.play();
  ResetGame();
});
