"use strict";

// UI
const typeEls = document.querySelectorAll(".type");
const startButtonEl = document.getElementById("start-btn");
const landingContentEl = document.querySelector(".landing-content");
const gameContentEl = document.querySelector(".game-content");
const typeTexts = [
  "machines are threatening to take over the world ...",
  "unless you can defeat them in a game of rock paper scissors.",
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

const scores = {
  player: 0,
  computer: 0,
};

const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomNumber = Math.trunc(Math.random() * 3);
  return choices[randomNumber];
};

const getPlayerChoice = () => {
  // const playerChoice = prompt(
  //   "rock, paper or scissors ? choose wisely."
  // ).toLowerCase();
  const playerChoice = "rock";
  if (
    playerChoice !== "rock" &&
    playerChoice !== "paper" &&
    playerChoice !== "scissors"
  ) {
    console.log("Wrong Input. try again.");
    return getPlayerChoice();
  } else {
    return playerChoice;
  }
};

const logGameResult = (result, playerSelection, computerSelection) => {
  console.log(`
  ${result}! ${playerSelection} against ${computerSelection}.
  your score: ${scores.player}
  computer score: ${scores.computer}
  `);
};

const playRound = (playerSelection, computerSelection) => {
  console.log(playerSelection, computerSelection);
  switch (playerSelection + "-" + computerSelection) {
    case "rock-rock":
      logGameResult("Draw", playerSelection, computerSelection);
      break;
    case "rock-paper":
      scores.computer++;
      logGameResult("Lose", playerSelection, computerSelection);
      break;
    case "rock-scissors":
      scores.player++;
      logGameResult("Won", playerSelection, computerSelection);
      break;
    case "paper-rock":
      scores.player++;
      logGameResult("Won", playerSelection, computerSelection);
      break;
    case "paper-paper":
      logGameResult("Draw", playerSelection, computerSelection);
      break;
    case "paper-scissors":
      scores.computer++;
      logGameResult("Lose", playerSelection, computerSelection);
      break;
    case "scissors-rock":
      scores.computer++;
      logGameResult("Lose", playerSelection, computerSelection);
      break;
    case "scissors-paper":
      scores.player++;
      logGameResult("Won", playerSelection, computerSelection);
      break;
    case "scissors-scissors":
      logGameResult("Draw", playerSelection, computerSelection);
      break;
  }
};

const playGame = () => {
  for (let i = 0; i < 5; i++) {
    playRound(getPlayerChoice(), getComputerChoice());
  }
  if (scores.player > scores.computer)
    console.log(`YOU WON! ${scores.player}-${scores.computer}`);
  else console.log(`YOU LOSE! ${scores.player}-${scores.computer}`);
};
playGame();
