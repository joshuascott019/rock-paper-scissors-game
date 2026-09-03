// DOM elements
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorsBtn = document.getElementById('scissors');
const resultDisplay = document.getElementById('result');
const computerChoiceDisplay = document.getElementById('computers-choice');
const playerChoiceDisplay = document.getElementById('players-choice');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resetBtn = document.getElementById('reset');

// Variables
const choices = ['rock', 'paper', 'scissors'];
const winningConditions = [
  ['rock', 'scissors'],
  ['scissors', 'paper'],
  ['paper', 'rock'],
];

let playerScoreCount = 0;
let computerScoreCount = 0;
let playerHistory = [];

// Functions
function getComputerChoice() {
  if (playerHistory.length === 3) {
    const streak = streakCounter(playerHistory);
    if (streak && Math.random() < 0.8) {
      return streak;
    }
  }
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function streakCounter(playerHistory) {
  if (
    playerHistory[0] === playerHistory[1] &&
    playerHistory[1] === playerHistory[2]
  ) {
    if (playerHistory[0] === 'rock') {
      return 'paper';
    } else if (playerHistory[0] === 'paper') {
      return 'scissors';
    } else if (playerHistory[0] === 'scissors') {
      return 'rock';
    } else {
      return;
    }
  }
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  }
  for (let i = 0; i < winningConditions.length; i++) {
    if (
      winningConditions[i][0] === playerChoice &&
      winningConditions[i][1] === computerChoice
    ) {
      return 'player';
    }
  }
  return 'computer';
}

function updateChoices(playerChoice, computerChoice) {
  playerChoiceDisplay.classList.remove(
    'rock-icon',
    'paper-icon',
    'scissors-icon',
  );
  computerChoiceDisplay.classList.remove(
    'rock-icon',
    'paper-icon',
    'scissors-icon',
  );

  playerChoiceDisplay.classList.add(`${playerChoice}-icon`);
  computerChoiceDisplay.classList.add(`${computerChoice}-icon`);
}
function updatePlayerHistory(playerChoice) {
  if (playerHistory.length > 2) {
    playerHistory.shift();
  }
  playerHistory.push(playerChoice);
}

function updateScore(result) {
  if (result === 'player') {
    playerScoreCount++;
  } else if (result === 'computer') {
    computerScoreCount++;
  }
  playerScoreDisplay.textContent = playerScoreCount;
  computerScoreDisplay.textContent = computerScoreCount;
}

function updateResult(result) {
  if (result === 'player') {
    resultDisplay.textContent = 'You win!';
  } else if (result === 'computer') {
    resultDisplay.textContent = 'You lose!';
  } else {
    resultDisplay.textContent = 'Tie!';
  }
}

// Event listeners
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const playerChoice = btn.id;

    updatePlayerHistory(playerChoice);

    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    updateScore(result);
    updateChoices(playerChoice, computerChoice);
    updateResult(result);

    console.log(playerHistory);
  });
});

resetBtn.addEventListener('click', () => {
  playerHistory = [];
  playerScoreCount = 0;
  computerScoreCount = 0;

  playerScoreDisplay.textContent = playerScoreCount;
  computerScoreDisplay.textContent = computerScoreCount;
  resultDisplay.textContent = '';

  playerChoiceDisplay.classList.remove(
    'rock-icon',
    'paper-icon',
    'scissors-icon',
  );
  computerChoiceDisplay.classList.remove(
    'rock-icon',
    'paper-icon',
    'scissors-icon',
  );
});
