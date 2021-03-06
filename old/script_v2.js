class Game {
  constructor(bestOf = 5) {
    this.scores = {
      player: 0,
      computer: 0,
    };
    this.bestOf = bestOf;
  }

  get winningScore() {
    return Math.ceil(this.bestOf / 2);
  }

  play() {
    while (this.gameNotOver()) {
      this.runRound();
    }
    this.declareGameWinner();
  }

  gameNotOver() {
    return (
      this.scores.player < this.winningScore &&
      this.scores.computer < this.winningScore
    );
  }

  runRound() {
    const round = new Round();
    this.updateScore(round.result);
    round.declareWinner();
    this.declareScore();
  }

  updateScore(roundResult) {
    if (roundResult === "player") {
      this.scores.player++;
    } else if (roundResult === "computer") {
      this.scores.computer++;
    }
  }

  declareScore() {
    const scoreType = this.gameNotOver() ? "CURRENT" : "FINAL";
    console.log(
      `**${scoreType} SCORE** <Player: ${this.scores.player}> <Computer: ${this.scores.computer}>`
    );
  }

  declareGameWinner() {
    if (this.scores.player > this.scores.computer) {
      console.log("You win the game!");
    } else {
      console.log("The computer wins the game!");
    }
  }
}

class Round {
  constructor() {
    this.MOVES = ["rock", "paper", "scissors", "gun"];
    this.COMPUTER_MOVES = ["rock", "paper", "scissors"];
    this.computerMove = this.getComputerMove();
    this.playerMove = this.getPlayerMove();
  }

  get result() {
    return this.getResult();
  }

  getComputerMove() {
    return randomElement(this.COMPUTER_MOVES);
  }

  getPlayerMove() {
    // Prompt user for move
    let playerSelection = prompt("What's your move?").toLowerCase();
    // Restrict user to valid moves
    while (!this.MOVES.includes(playerSelection)) {
      playerSelection = prompt(
        "Your move must be rock, paper, or scissors"
      ).toLowerCase();
    }
    return playerSelection;
  }

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

  declareWinner() {
    switch (this.result) {
      case "tie":
        console.log("It's a tie!");
        break;
      case "player":
        console.log(
          `You win! ${capitalize(this.playerMove)} beats ${this.computerMove}.`
        );
        break;
      case "computer":
        console.log(
          `You lose! ${capitalize(this.computerMove)} beats ${this.playerMove}.`
        );
        break;
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

function playGame() {
  let newGame = new Game();
  newGame.play();
}
