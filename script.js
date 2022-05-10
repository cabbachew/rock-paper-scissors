class Game {
  constructor(bestOf = 5) {
    this.scores = {
      player: 0,
      computer: 0,
    };
    this.bestOf = bestOf;
  }

  get winningScore() {
    return Math.floor(this.bestOf / 2) + 1;
  }

  gameNotOver() {
    return (
      this.scores.player < this.winningScore &&
      this.scores.computer < this.winningScore
    );
  }

  updateScore(roundResult) {
    if (roundResult === "player") {
      this.scores.player++;
    } else if (roundResult === "computer") {
      this.scores.computer++;
    }
  }
}

class Round {
  constructor() {
    this.MOVES = ["rock", "paper", "scissors", "gun"];
    this.COMPUTER_MOVES = ["rock", "paper", "scissors"];
    this.computerMove = this.getComputerMove();
    // this.playerMove = this.getPlayerMove();
  }

  get result() {
    return this.getResult();
  }

  getComputerMove() {
    return randomElement(this.COMPUTER_MOVES);
  }

  // getPlayerMove() {
  //   // Prompt user for move
  //   let playerSelection = prompt("What's your move?").toLowerCase();
  //   // Restrict user to valid moves
  //   while (!this.MOVES.includes(playerSelection)) {
  //     playerSelection = prompt(
  //       "Your move must be rock, paper, or scissors"
  //     ).toLowerCase();
  //   }
  //   return playerSelection;
  // }

  getResult() {
    if (this.playerMove === this.computerMove) {
      return "tie";
    }
    if (
      this.playerMove === "gun" ||
      (this.playerMove === "rock" && this.computerMove === "scissors") ||
      (this.playerMove === "paper" && this.computerMove === "rock") ||
      (this.playerMove === "scissors" && this.computerMove === "paper")
    ) {
      return "player";
    }
    return "computer";
  }

  declareRoundWinner() {
    switch (this.result) {
      case "tie":
        return "It's a tie!";
      case "player":
        return `You win. ${capitalize(this.playerMove)} beats ${
          this.computerMove
        }.`;
      case "computer":
        return `You lose. ${capitalize(this.computerMove)} beats ${
          this.playerMove
        }.`;
    }
  }
}

// Helpers
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function capitalize(string) {
  let tempString = string.toLowerCase();
  return tempString[0].toUpperCase() + tempString.slice(1);
}

// DOM Manipulation
const playerMoves = document.querySelectorAll(".playerMoves");
const roundDisplay = document.querySelector(".roundDisplay");
const playerChoice = document.querySelector("#playerChoice");
const computerChoice = document.querySelector("#computerChoice");
const roundResult = document.querySelector("#roundResult");
const playerScore = document.querySelector("#playerScore");
const computerScore = document.querySelector("#computerScore");
const scoreStatus = document.getElementById("scoreStatus");

let game = new Game();

// Let user choose player name
const typedName = document.querySelector("#typedName");
const playerName = document.querySelector(".playerName");

typedName.addEventListener("input", (e) => {
  if (e.target.value == "") {
    playerName.textContent = "Player";
  } else {
    playerName.textContent = e.target.value;
  }
});

// Take user input for winning condition
const bestOf = document.getElementById("bestOf");
bestOf.addEventListener("input", updateBestOf);
function updateBestOf(e) {
  game.bestOf = e.target.value;
}

bestOf.addEventListener("focusout", validateBestOf);
bestOf.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    validateBestOf();
  }
});

function validateBestOf() {
  if (bestOf.value < 1 || bestOf.value > 99) {
    bestOf.value = 5;
    playerMoves.forEach((item) => (item.disabled = true));
    swal({
      text: "Must be a number between 1-99",
      button: "OK",
      closeOnClickOutside: false,
    }).then((value) => {
      resetGame();
    });
  } else {
    playerMoves.forEach((item) => (item.disabled = false));
  }
}

// Take user input for move
const typedMove = document.getElementById("typedMove");
const submitMove = document.getElementById("submitMove");

typedMove.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    playMove();
  }
});

// When Go button is clicked
submitMove.addEventListener("click", playMove);
function playMove() {
  const round = new Round();
  if (!round.MOVES.includes(typedMove.value.toLowerCase())) {
    swal({
      text: "You must play a valid move",
      button: "Try Again",
      closeOnClickOutside: false,
    }).then((value) => {
      typedMove.value = "";
      typedMove.focus();
    });
  } else {
    roundDisplay.classList.remove("isHidden");
    round.playerMove = typedMove.value.toLowerCase();
    playerChoice.textContent = capitalize(typedMove.value);
    computerChoice.textContent = capitalize(round.computerMove);
    game.updateScore(round.getResult());
    roundResult.textContent = round.declareRoundWinner();
    displayScores(game);
    bestOf.disabled = true;
  }
}

// Play a round by clicking a move button
playerMoves.forEach((item) => {
  item.addEventListener("click", () => {
    roundDisplay.classList.remove("isHidden");
    playerChoice.textContent = item.textContent;
    const round = new Round();
    round.playerMove = item.textContent.toLowerCase();
    computerChoice.textContent = capitalize(round.computerMove);
    game.updateScore(round.getResult());
    roundResult.textContent = round.declareRoundWinner();
    displayScores(game);
    bestOf.disabled = true;
  });
});

// Resetting game
const reset = document.querySelector("#reset");

reset.addEventListener("click", resetGame);

function resetGame() {
  game = new Game();
  resetRoundDisplay();
  displayScores(game);
  // Enable buttons
  playerMoves.forEach((item) => (item.disabled = false));
  bestOf.disabled = false;
  submitMove.disabled = false;
  typedMove.value = "";
  typedMove.disabled = false;
}

// DOM Helpers
function displayScores(game) {
  playerScore.textContent = game.scores.player;
  computerScore.textContent = game.scores.computer;
  scoreStatus.textContent = game.gameNotOver() ? "Current" : "Final";

  if (!game.gameNotOver()) {
    playerMoves.forEach((item) => (item.disabled = true));
    submitMove.disabled = true;
    typedMove.disabled = true;
    if (game.scores.player > game.scores.computer) {
      swal({
        title: "Congratulations!",
        text: "You win the game.",
        buttons: {
          reset: { text: "Play Again", value: "reset" },
          cancel: "Close",
        },
        closeOnClickOutside: false,
      }).then((value) => {
        if (value == "reset") {
          resetGame();
        }
      });
    } else {
      swal({
        title: "Game Over!",
        text: "The computer wins the game.",
        buttons: {
          reset: { text: "Play Again", value: "reset" },
          cancel: "Close",
        },
        closeOnClickOutside: false,
      }).then((value) => {
        if (value == "reset") {
          resetGame();
        }
      });
    }
  }
}

function resetRoundDisplay() {
  roundDisplay.classList.add("isHidden");
  playerChoice.textContent = "";
  computerChoice.textContent = "";
  roundResult.textContent = "";
}
