class Game {
    constructor() {
        this.scores = {
            "player": 0,
            "computer": 0,
        }
        this.MOVES = ["rock", "paper", "scissors"];
    }

    play() {
        while (this.gameNotOver()) {
            this.runRound();
        }
        this.declareGameWinner();
        this.declareScore();
    }

    gameNotOver() {
        return (this.scores.player < 3 && this.scores.computer < 3);
    }
    
    runRound() {
        let computerMove = this.getComputerMove();
        let playerMove = this.getPlayerMove();
        let roundResult = this.getRoundResult(computerMove, playerMove);
        this.updateScore(roundResult);
        this.declareRoundWinner({ playerMove, computerMove, roundResult });
        this.declareScore();
    }

    getComputerMove() {
        return randomElement(this.MOVES);
    }
    
    getPlayerMove() {
        // Prompt user for move
        let playerSelection = prompt("What's your move?").toLowerCase();
        // Restrict user to valid moves
        while (!this.MOVES.includes(playerSelection)) {
            playerSelection = prompt("Your move must be rock, paper, or scissors").toLowerCase();
        }   
        return playerSelection;
    }

    getRoundResult(playerMove, computerMove) {
        if (playerMove === computerMove) {
            return "tie";
        }
        if ((playerMove === "rock" && computerMove === "scissors") ||
            (playerMove === "paper" && computerMove === "rock") ||
            (playerMove === "scissors" && computerMove === "paper")) {
            return "player";
        }
        return "computer";
    }

    updateScore(roundResult) {
        if (roundResult === "player") {
            this.scores.player++;
        } else if (roundResult === "computer") {
            this.scores.computer++;
        }
    }

    declareRoundWinner({ playerMove, computerMove, roundResult }) {
        switch (roundResult) {
            case "tie":
                console.log("It's a tie!");
                break;
            case "player":
                console.log(`You win! ${capitalize(playerMove)} beats ${computerMove}.`);
                break;
            case "computer":
                console.log(`You lose! ${capitalize(computerMove)} beats ${playerMove}.`);
                break;
        }
    }

    declareScore() {
        const scoreType = this.gameNotOver() ? "CURRENT" : "FINAL";
        console.log(`**${scoreType} SCORE** <Player: ${this.scores.player}> <Computer: ${this.scores.computer}>`);
    }
    
    declareGameWinner() {
        if (this.scores.player > this.scores.computer) {
            console.log("You win!");
        } else {
            console.log("The computer wins!");
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
    let newGame = new Game;
    newGame.play();
}
