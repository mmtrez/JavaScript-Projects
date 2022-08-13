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
