"use strict";

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
  const playerChoice = prompt(
    "rock, paper or scissors ? choose wisely."
  ).toLowerCase();
  return playerChoice;
};

const logGameResult = (result, playerSelection, computerSelection) => {
  console.log(`
  ${result}! ${playerSelection} against ${computerSelection}.
  your score: ${scores.player}
  computer score: ${scores.computer}
  `);
};

const playRound = (playerSelection, computerSelection) => {
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
