const MOVES = ["rock", "paper", "scissors"];

function game() {
    const scores = {
        "player": 0,
        "computer": 0,
    }
    while (gameNotOver(scores)) {
        runRound(scores);
    }
    declareGameWinner(scores);
    declareFinalScore(scores);
}

function runRound(scores) {
    let computerMove = getComputerMove();
    let playerMove = getPlayerMove();
    let roundResult = getRoundResult(computerMove, playerMove);
    updateScore(scores, roundResult);
    declareRoundWinner({ playerMove, computerMove, roundResult });
    declareScore(scores)
}

function getRoundResult(playerMove, computerMove) {
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

function updateScore(scores, roundResult) {
    if (roundResult === "player") {
        scores.player++;
    } else if (roundResult === "computer") {
        scores.computer++;
    }
}

function declareRoundWinner({ playerMove, computerMove, roundResult }) {
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

function getComputerMove() {
    return randomElement(MOVES);
}

function getPlayerMove() {
    // Prompt user for move
    let playerSelection = prompt("What's your move?").toLowerCase();
    // Restrict user to valid moves
    while (!MOVES.includes(playerSelection)) {
        playerSelection = prompt("Your move must be rock, paper, or scissors").toLowerCase();
    }   
    return playerSelection;
}

// Helpers
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function capitalize(string) {
    let tempString = string.toLowerCase();
    return tempString[0].toUpperCase() + tempString.slice(1);
}

function gameNotOver(scores) {
    return (scores.player < 3 && scores.computer < 3);
}

function declareScore(scores, final = false) {
    const scoreType = final ? "FINAL" : "CURRENT";
    console.log(`**${scoreType} SCORE** <Player: ${scores.player}> <Computer: ${scores.computer}>`);
}

function declareGameWinner(scores) {
    if (scores.player > scores.computer) {
        console.log("You win!");
    } else {
        console.log("The computer wins!");
    }
}

function declareFinalScore(scores) {
    declareScore(scores, true);
}
