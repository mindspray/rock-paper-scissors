'use strict';

function getComputerChoice() {
  let rand = Math.floor(Math.random() * 3);
  return rand === 0 ? 'rock' : rand === 1 ? 'paper' : 'scissors';
}

function playRound(playerChoice, computerChoice  = getComputerChoice()) {
  playerChoice = playerChoice.toLowerCase();
  dom.get("p1").textContent = "Rock, paper, scissors... shoot!";
  dom.get("p2").textContent = `You chose ${playerChoice}. Computer chose: ${computerChoice}`;
  
  dom.get("body").appendChild(dom.get("div1"));
  
  let roundCount = state.get("rounds");
  state.set("rounds", roundCount += 1);

  let outcome;

  if (playerChoice === 'rock' && computerChoice === 'paper') {
    outcome = `Round ${roundCount}/5 lost! Paper beats rock`;
  } else if (playerChoice === 'paper' && computerChoice === 'rock') {
    outcome = `Round ${roundCount}/5 won! Paper beats rock`;
  } else if (playerChoice === 'scissors' && computerChoice === 'rock') {
    outcome = `Round ${roundCount}/5 lost! Rock beats scissors`;
  } else if (playerChoice === 'rock' && computerChoice === 'scissors') {
    outcome = `Round ${roundCount}/5 won! Rock beats scissors`;
  } else if (playerChoice === 'scissors' && computerChoice === 'paper') {
    outcome = `Round ${roundCount}/5 won! Scissors beats paper`;
  } else if (playerChoice === 'paper' && computerChoice === 'scissors') {
    outcome = `Round ${roundCount}/5 lost! Scissors beats paper`;
  } else {
    outcome = `Round ${roundCount}/5 is a tie!`;
  }
  
  playGame(outcome);
}

function playGame(outcome, roundNum = state.get("rounds")) {
  let score = state.get("score");
  let running = !!roundNum;
  dom.get("p3").textContent = `${outcome}`;
  if (roundNum < 5) {
    if (outcome.includes("win")){
      state.set("score", score + 1);
    } else if (outcome.includes("lose")){
      state.set("score", score - 1);
    }
    dom.get("p4").textContent = "";
  } else {
    if (score > 0) {
      dom.get("p4").textContent = "You win!!";
    } else if (score < 0) {
      dom.get("p4").textContent = "You lose.";
    } else {
      dom.get("p4").textContent = "It's a tie! Go again?";
    }
    score = 0;
    state.set("rounds", 0);
  }
}

function createElement(element, className = "") {
  const el = document.createElement(element);
  if (className) el.classList.add(className);
  return el;
}

function init() {
  const [buttonArray, elArray] = [[], []];
  const rps = ["Rock", "Paper", "Scissors"];
  const elemsAndQtys = [["button", 3], ["div", 1], ["p", 4]];
  const body = document.querySelector("body");

  //Create elements.
  for(let i = 0; i < elemsAndQtys.length; i++) {
    for(let j = 0; j < elemsAndQtys[i][1]; j++) {
      elArray.push(createElement(`${elemsAndQtys[i][0]}`, `${elemsAndQtys[i][0] + (j+1)}`));
      if(elemsAndQtys[i][0] === "button") {
        buttonArray.push(elArray[j]);
        buttonArray[j].textContent = rps[j];
        buttonArray[j].addEventListener("click", (e) => playRound(e.target.textContent));
      } else if (elemsAndQtys[i][0] === "div") {
        body.appendChild(elArray.find(e => e.tagName === "DIV"));
      } else if (elemsAndQtys[i][0] === "p") {
        let divEl = elArray.find(e => e.tagName === "DIV");
        divEl.appendChild(elArray[(i+1) + (j+1)]);
      }
    }
  }

  // Append 3 buttons to body
  for (let i = 0; i < buttonArray.length; i++) {
    body.appendChild(buttonArray[i]);
  }
}

init();

const dom = {
  _vars: {
    body: document.querySelector("body"),
    div1: document.querySelector(".div1"),
    p1: document.querySelector(".p1"),
    p2: document.querySelector(".p2"),
    p3: document.querySelector(".p3"),
    p4: document.querySelector(".p4"),
  },

  get(name) {
    return this._vars[name];
  },
  set(name, value) {
    this._vars[name] = value;
  }
}

const state = {
  _vars: {
    rounds: 0,
    score: 0,
  },
  get (name) {
    return this._vars[name];
  },
  set (name, value) {
    this._vars[name] = value;
  }
}