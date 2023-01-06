'use strict';

function getComputerChoice() {
  let rand = Math.floor(Math.random() * 3);
  return rand === 0 ? 'rock' : rand === 1 ? 'paper' : 'scissors';
}

function playRound(playerChoice, computerChoice = getComputerChoice()) {
  playerChoice = playerChoice.toLowerCase();
  dom.get("p1").textContent = "Rock, paper, scissors... shoot!";
  dom.get("p2").textContent = `You chose ${playerChoice}. Computer chose: ${computerChoice}`;
  
  let playerScore = state.get("playerScore");
  let cpuScore = state.get("cpuScore");
  let roundCount = state.get("rounds");
  state.set("rounds", roundCount += 1);

  function outcomeMessage(result = "") {
    if (result.includes("win")) {
      state.set("playerScore", playerScore += 1);
      result = "won";
    } else if (result.includes("loss")) {
      state.set("cpuScore", cpuScore += 1);
      result = "lost";
    } else {
      return `Round ${roundCount} is a tie.  Player: ${playerScore} - CPU: ${cpuScore}`;
    }
    return `Round ${roundCount}/5 ${result}! ${playerChoice[0].toUpperCase() + playerChoice.slice(1)} beats ${computerChoice}. Player: ${playerScore} - CPU: ${cpuScore}`;
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
  
  playGame(outcome);
}

function playGame(outcome, roundNum = state.get("rounds")) {
  let [totalScore, playerScore, cpuScore] = [state.get("totalScore"), state.get("playerScore"), state.get("cpuScore")];
  if (outcome.indexOf("won") >= 0){
    state.set("totalScore", totalScore += 1);
  } else if (outcome.indexOf("lost") >= 0){
    state.set("totalScore", totalScore -= 1);
  }
  dom.get("p3").textContent = `${outcome}`;
  dom.get("p4").textContent = "";
  if (roundNum === 5){
    if (totalScore > 0) {
      dom.get("p4").textContent = "You win!!";
    } else if (totalScore < 0) {
      dom.get("p4").textContent = "You lose.";
    } else {
      dom.get("p4").textContent = "It's a tie! Go again?";
    }
    totalScore = 0;
    state.set("rounds", 0);
  }
}

function createElement(element, className = "") {
  const el = document.createElement(element);
  if (className) el.classList.add(className);
  return el;
}

function init() {
  const [elArray] = [[], []];
  const rps = ["Rock", "Paper", "Scissors"];
  const elemsAndQtys = [["div", 3], ["p", 4], ["button", 3]];
  const container = document.querySelector(".container");

  //Create elements
  for(let i = 0; i < elemsAndQtys.length; i++) {
    for(let j = 0; j < elemsAndQtys[i][1]; j++) {
      elArray.push(createElement(`${elemsAndQtys[i][0]}`, `${elemsAndQtys[i][0] + (j+1)}`));
    }
  }

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

  console.log(elArray);
  // container.appendChild(document.querySelector(".div1"));
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
  _vars: {},
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