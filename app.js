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
  let rand = Math.floor(Math.random() * 3);
  return rand === 0
    ? "rock"
    : rand === 1
    ? "paper"
    : "scissors";
}

function playRound(
  playerSelection = getPlayerSelection(),
  computerSelection = getComputerChoice()
) {
  console.log("Shoot!");
  console.log(
    `You chose: ${playerSelection}. Computer chose: ${computerSelection}`
  );

	// Potential refactor:
	// Make choices = ["rock", "paper", "scissors"] array

	// If choices[(indexof computerChoice) - 1] === choices[(indexof playerSelection)] { return "You win!"}
	// e.g.
	// choices[Array.indexOf("computerChoice") -1] === choices[Array.indexOf("playerSelection")] { return "You win!"}

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
