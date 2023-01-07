'use strict';

function getComputerChoice() {
  const rand = Math.floor(Math.random() * 3);
  return (rand) === 0 ? 'rock' : rand === 1 ? 'paper' : 'scissors';
}

function playRound(playerChoice, computerChoice = getComputerChoice()) {
  playerChoice = playerChoice.toLowerCase();
  dom.get("p1").textContent = "Rock, paper, scissors... shoot!";
  dom.get("p2").textContent = `You chose ${playerChoice}. Computer chose: ${computerChoice}`;
  
  let [playerScore, cpuScore] = [state.get("playerScore"), state.get("cpuScore")];
  let roundCount = state.get("rounds");
  state.set("rounds", roundCount += 1);

  document.querySelector(".roundCount").textContent = roundCount;
  
  
  function outcomeMessage(result = "") {
    if (result.includes("win")) {
      state.set("playerScore", playerScore += 1);
      result = "won";
      return `Round ${roundCount}/5 ${result}! ${playerChoice[0].toUpperCase() + playerChoice.slice(1)} beats ${computerChoice}.`;
    } else if (result.includes("loss")) {
      state.set("cpuScore", cpuScore += 1);
      result = "lost";
      return `Round ${roundCount}/5 ${result}! ${computerChoice[0].toUpperCase() + computerChoice.slice(1)} beats ${playerChoice}.`;
    } else {
      return `Round ${roundCount} is a tie.`;
    }
  }
  let outcome;
  
  if (playerChoice === 'rock' && computerChoice === 'paper') {
    outcome = outcomeMessage("loss");
  } else if (playerChoice === 'paper' && computerChoice === 'rock') {
    outcome = outcomeMessage("win");
  } else if (playerChoice === 'scissors' && computerChoice === 'rock') {
    outcome = outcomeMessage("loss");
  } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
    outcome = outcomeMessage("win");
  } else if (playerChoice === 'scissors' && computerChoice === 'paper') {
    outcome = outcomeMessage("win");
  } else if (playerChoice === 'paper' && computerChoice === 'scissors') {
    outcome = outcomeMessage("loss");
  } else {
    outcome = outcomeMessage();
  }
  document.querySelector(".pScore").textContent = playerScore;
  document.querySelector(".cScore").textContent = cpuScore;
  console.log(`playerScore: ${playerScore} cpuScore: ${cpuScore}`);
  playGame(outcome);
  // document.querySelector(".cScore").textContent = cpuScore;
}

function playGame(outcome, roundNum = state.get("rounds")) {
  let totalScore = state.get("totalScore");
  if (outcome.indexOf("won") >= 0){
    state.set("totalScore", totalScore += 1);
  } else if (outcome.indexOf("lost") >= 0){
    state.set("totalScore", totalScore -= 1);
  }
  dom.get("p3").textContent = `${outcome}`;
  dom.get("p4").textContent = "";
  console.log(`totalScore: ${totalScore}`);
  if (roundNum < 5) {
    dom.get("p4").style.display = "none";
  }
  if (roundNum === 5){
    console.log(roundNum);
    console.log(totalScore);
    dom.get("p4").style.display = "initial";
    if (totalScore > 0) {
      dom.get("p4").textContent = "You win!!";
    } else if (totalScore < 0) {
      dom.get("p4").textContent = "You lose.";
    } else {
      dom.get("p4").textContent = "It's a tie! Go again?";
    }
    // totalScore = 0;
    state.set("totalScore", 0);
    state.set("rounds", 0);
    state.set("playerScore", 0);
    state.set("cpuScore", 0);
  }
}

function createElement(element, className = "") {
  const el = document.createElement(element);
  if (className) el.classList.add(className);
  return el;
}

function init() {
  const elArray = [];
  const rps = ["Rock", "Paper", "Scissors"];
  const elemsAndQtys = [["div", 3], ["p", 4], ["button", 3]];
  const container = document.querySelector(".container");

  //Create elements
  for (let i = 0; i < elemsAndQtys.length; i++) {
    for (let j = 0; j < elemsAndQtys[i][1]; j++) {
      elArray.push(createElement(`${elemsAndQtys[i][0]}`, `${elemsAndQtys[i][0] + (j+1)}`));
    }
  }

  /* Right now the elements are initially being set to element# in the -Create elements- section. Not sure if it would be preferrable to set them right away to msgDiv and btnDiv, etc. */

  // Append elements
  let buttonCount = 0;
  elArray.forEach(element => {
    if (element.tagName === "DIV") {
      container.appendChild(element);
    } else if (element.tagName === "P") {
      // Maybe change to messageDiv
      document.querySelector(".div2").appendChild(element);
    } else if (element.tagName === "BUTTON") {
      // Maybe change to buttonDiv
      element.textContent = rps[buttonCount];
      ++buttonCount;
      element.addEventListener("click", e => playRound(e.target.textContent));
      document.querySelector(".div3").appendChild(element);
    }
    }
  )

  // Put msgDiv and btnDiv in gameDiv
  document.querySelector(".div1").append(document.querySelector(".div2"), document.querySelector(".div3"));

  // Set dom proprties to querySelected elements
  elArray.forEach(element => dom._vars[element.className] = document.querySelector(`.${element.className}`));

  // Set friendlier name for div classes
  dom.get("div1").className = "gameDiv";
  dom.get("div2").className = "msgdiv";
  dom.get("div3").className = "btnDiv";

  console.log(dom);
}

const dom = {
  _vars: {

  },
  get(name) {
    return this._vars[name];
  },
};

init();

const state = {
  _vars: {
    rounds: 0,
    totalScore: 0,
    playerScore: 0,
    cpuScore: 0,
  },
  get (name) {
    return this._vars[name];
  },
  set (name, value) {
    this._vars[name] = value;
  }
}