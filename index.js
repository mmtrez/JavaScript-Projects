"use strict";

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

const playRound = (playerSelection, computerSelection) => {
  switch (playerSelection + "-" + computerSelection) {
    case "rock-rock":
      console.log("Draw! Rock against Rock");
      break;
    case "rock-paper":
      console.log("You Lose! Paper beats Rock.");
      break;
    case "rock-scissors":
      console.log("You Won! Rock beats Scissors.");
      break;
    case "paper-rock":
      console.log("You Won! Paper beats Rock.");
      break;
    case "paper-paper":
      console.log("Draw! Paper against paper");
      break;
    case "paper-scissors":
      console.log("You Lose! Scissors beats Paper.");
      break;
    case "scissors-rock":
      console.log("You Lose! Rock beats Scissors.");
      break;
    case "scissors-paper":
      console.log("You Won! Scissors beats Paper.");
      break;
    case "scissors-scissors":
      console.log("Draw! Scissors against Scissors.");
      break;
  }
};

playRound(getPlayerChoice(), getComputerChoice());
