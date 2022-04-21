const MOVES = ["rock", "paper", "scissors"];

function game() {
    const scores = {
        "player": 0,
        "computer": 0
    }
    while (scores.player < 3 && scores.computer < 3) {
        let roundWonBy = playRound();
        if (roundWonBy === "player") {
            scores.player++;
        } else if (roundWonBy === "computer") {
            scores.computer++;
        }
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
    const playerSelection = playerMove();
    const computerSelection = computerMove();
    const result = roundResult(playerSelection, computerSelection);
    // Smelly
    logResult(playerSelection, computerSelection, result);
    return result;
}

function computerMove() {
    return randomElement(MOVES);
}

function playerMove() {
    // Prompt user for move
    let playerInput = prompt("What's your move?");
    let playerSelection = playerInput.toLowerCase();
    // Restrict user to valid moves
    while (!MOVES.includes(playerSelection)) {
        playerInput = prompt("Your move must be rock, paper, or scissors");
        playerSelection = playerInput.toLowerCase();
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

function logResult(playerSelection, computerSelection, result) {
    switch (result) {
        case "tie":
            console.log("It's a tie!");
            break;
        case "player":
            console.log(`You win! ${capitalize(playerSelection)} beats ${computerSelection}.`);
            break;
        case "computer":
            console.log(`You lose! ${capitalize(computerSelection)} beats ${playerSelection}.`);
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