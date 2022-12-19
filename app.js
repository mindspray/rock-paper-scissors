"use strict";

function getPlayerSelection() {
  let playerSelection = prompt("Rock, paper, scissors...", "").toLowerCase();

  return playerSelection;
}

function getComputerChoice() {
  let rand = Math.random();
  return rand < 0.33
    ? "rock"
    : rand >= 0.33 && rand < 0.66
    ? "paper"
    : "scissors";
}

function playRound(playerSelection, computerSelection) {
  if (
    playerSelection !== "rock" &&
    playerSelection !== "paper" &&
    playerSelection !== "scissors"
  ) {
    console.log("Choose a valid option");
    playerSelection = getPlayerSelection();
  } else {
    console.log("Shoot!");
    console.log(
      `You chose: ${playerSelection}. Computer chose: ${computerSelection}`
    );

    // non-tie possibiliities
    // rock v paper | paper
    // rock v scissors | rock
    // paper v scissors | scissors
    // paper v rock | paper | dupe
    // scissors v rock | rock | dupe
    // scissors v paper | scissors | dupe
    if (playerSelection === "rock" && computerSelection === "paper") {
      return "You lose! Paper beats rock";
    } else if (playerSelection === "paper" && computerSelection === "rock") {
      return "You win! Paper beats rock";
    } else if (playerSelection === "scissors" && computerSelection === "rock") {
      return "You lose! Rock beats scissors";
    } else if (playerSelection === "rock" && computerSelection === "scissors") {
      return "You win! Rock beats scissors";
    } else if (playerSelection === "scissors" && computerSelection === "paper") {
      return "You win! Scissors beats paper";
    } else if (playerSelection === "paper" && computerSelection === "scissors") {
      return "You lose! Scissors beats paper";
    } else {
      return "It's a tie! Go again";
    }
  }
}

console.log(playRound(getPlayerSelection(), getComputerChoice()));
