"use strict";

function getPlayerSelection() {
  let playerSelection = prompt("Rock, paper, scissors...", "").toLowerCase();

  if (
    playerSelection == "rock" ||
    playerSelection == "paper" ||
    playerSelection == "scissors"
  ) {
		return playerSelection;
	}
	console.log("Choose a valid option");
	return getPlayerSelection();
}

function getComputerChoice() {
  let rand = Math.random();
  return rand < 0.33
    ? "rock"
    : rand >= 0.33 && rand < 0.66
    ? "paper"
    : "scissors";
}

function playRound(
  playerSelection = getPlayerSelection(),
  computerSelection = getComputerChoice()
) {
  // if (
  //   playerSelection !== "rock" &&
  //   playerSelection !== "paper" &&
  //   playerSelection !== "scissors"
  // ) {
  //   console.log("Choose a valid option");
  //   playRound();
  // } else {
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
  // }
}

function game() {
  let rounds = [];
  let score = 0;
  for (let i = 0; i < 5; i++) {
    rounds[i] = playRound();
    if (rounds[i].includes("win")) {
      score++;
    } else if (rounds[i].includes("lose")) {
      score--;
    }
  }
  console.log(`The score is: ${score}`);
  if (score > 0) {
    console.log("You win the game!");
  } else if (score < 0) {
    console.log("You lost the game");
  } else {
    console.log("It was a tie! A rematch is in order");
  }
}

// console.log(playRound(getPlayerSelection(), getComputerChoice()));

game();
