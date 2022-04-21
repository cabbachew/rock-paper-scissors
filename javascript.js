const MOVES = ["rock", "paper", "scissors"];

function computerMove() {
    return randomElement(MOVES);
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function playerMove() {
    // Prompt user for move
    let playerInput = prompt("What's your move?");
    let playerSelection = playerInput.toLowerCase();
    // Restrict user to valid moves
    while (!MOVES.includes(playerSelection)) {
        playerInput = prompt("Your move must be Rock, Paper, or Scissors");
        playerSelection = playerInput.toLowerCase();
    }   
    return playerSelection;
}

// function capitalize(string) {
//     let tempString = string.toLowerCase();
//     return tempString[0].toUpperCase() + tempString.slice(1);
// }

function roundResult(moveOne, moveTwo) {
    if (moveOne === moveTwo) {
        return "tie";
    }
    if ((moveOne === "rock" && moveTwo === "scissors") ||
        (moveOne === "paper" && moveTwo === "rock") ||
        (moveOne === "scissors" && moveTwo === "paper")) {
        return "player";
    }
    return "computer";
}

function playRound() {
    const playerSelection = playerMove();
    const computerSelection = computerMove();
    const result = roundResult(playerSelection, computerSelection);

    switch (result) {
        case "tie":
            console.log("It's a tie!");
            break;
        case "player":
            console.log(`You win! ${playerSelection} beats ${computerSelection}.`);
            break;
        case "computer":
            console.log(`You lose! ${computerSelection} beats ${playerSelection}.`);
            break;
    }

    return result;

    // let pointGoesTo;

    // if (playerSelection === computerSelection) {
    //     pointGoesTo = 
    //     console.log("It's a tie!");
    // } else if (playerSelection === 'rock') {
    //     switch (computerSelection) {
    //         case 'paper':
    //             pointGoesTo = "computer";
    //             console.log("You lose! Paper beats Rock.");
    //             break;
    //         case 'scissors':
    //             pointGoesTo = "player";
    //             console.log("You win! Rock beats Scissors.");
    //             break;
    //     }
    // } else if (playerSelection === 'paper') {
    //     switch (computerSelection) {
    //         case 'rock':
    //             pointGoesTo = "player";
    //             console.log("You win! Paper beats Rock.");
    //             break;
    //         case 'scissors':
    //             pointGoesTo = "computer";
    //             console.log("You lose! Scissors beat Paper.");
    //             break;
    //     }
    // } else if (playerSelection === 'scissors') {
    //     switch (computerSelection) {
    //         case 'rock':
    //             pointGoesTo = "computer";
    //             console.log("You lose! Rock beats Scissors.");
    //             break;
    //         case 'paper':
    //             pointGoesTo = "player";
    //             console.log("You win! Scissors beat Paper.");
    //             break;
    //     }
    // }
    // return pointGoesTo;
}

function game() {
    const scores = {
        "player": 0,
        "computer": 0
    }
    for (let i = 0; i < 5; i++) {
        let roundWonBy = playRound();
        if (roundWonBy === "player") {
            scores.player++;
        } else if (roundWonBy === "computer") {
            scores.computer++;
        }
        console.log("**SCORE** <Player: " + scores.player + "> <Computer: " + scores.computer + ">");
    }
    if (scores.player > scores.computer){
        console.log("You win!");
    } else {
        console.log("The computer wins!");
    }
}