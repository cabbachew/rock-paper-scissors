const MOVES = ["rock", "paper", "scissors"];

// Revisit for refactoring
function game() {
    const scores = {
        "player": 0,
        "computer": 0
    }
    while (scores.player < 3 && scores.computer < 3) {
        let round = playRound();
        if (round.result === "player") {
            scores.player++;
        } else if (round.result === "computer") {
            scores.computer++;
        }
        logResult(round);
        console.log("**CURRENT SCORE** <Player: " + scores.player + "> <Computer: " + scores.computer + ">");
    }
    if (scores.player > scores.computer){
        console.log("You win!");
    } else {
        console.log("The computer wins!");
    }
    console.log("**FINAL SCORE** <Player: " + scores.player + "> <Computer: " + scores.computer + ">");
}

function playRound() {
    const round = {
        playerMove: playerMove(),
        computerMove: computerMove()
    }
    round["result"] = roundResult(round.playerMove, round.computerMove);
    return round;
}

function computerMove() {
    return randomElement(MOVES);
}

function playerMove() {
    // Prompt user for move
    let playerSelection = prompt("What's your move?").toLowerCase();
    // Restrict user to valid moves
    while (!MOVES.includes(playerSelection)) {
        playerSelection = prompt("Your move must be rock, paper, or scissors").toLowerCase();
    }   
    return playerSelection;
}

function roundResult(playerMove, computerMove) {
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

function logResult({ playerMove, computerMove, result }) {
    switch (result) {
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

// Helpers
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function capitalize(string) {
    let tempString = string.toLowerCase();
    return tempString[0].toUpperCase() + tempString.slice(1);
}