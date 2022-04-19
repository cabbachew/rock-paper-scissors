function computerPlay() {
    const moves = ['Rock', 'Paper', 'Scissors'];
    let computerSelection =  moves[Math.floor(Math.random() * moves.length)];
    return computerSelection;
}

function playerPlay() {
    // Prompt user for move  
    let playerInput = prompt("What's your move?");
    let playerSelection = playerInput.toLowerCase();
    playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1);
    // Restrict user to valid moves
    while (playerSelection !== 'Rock' && playerSelection !== 'Paper' && playerSelection !== 'Scissors') {
        playerInput = prompt("Your move must be Rock, Paper, or Scissors");
        playerSelection = playerInput.toLowerCase();
        playerSelection = playerSelection[0].toUpperCase() + playerSelection.slice(1);
    }   
    return playerSelection;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerPlay();
    computerSelection = computerPlay();
    let pointGoesTo;

    if (playerSelection === computerSelection) {
        pointGoesTo = 
        console.log("It's a tie!");
    } else if (playerSelection === 'Rock') {
        switch (computerSelection) {
            case 'Paper':
                pointGoesTo = "computer";
                console.log("You lose! Paper beats Rock.");
                break;
            case 'Scissors':
                pointGoesTo = "player";
                console.log("You win! Rock beats Scissors.");
                break;
        }
    } else if (playerSelection === 'Paper') {
        switch (computerSelection) {
            case 'Rock':
                pointGoesTo = "player";
                console.log("You win! Paper beats Rock.");
                break;
            case 'Scissors':
                pointGoesTo = "computer";
                console.log("You lose! Scissors beat Paper.");
                break;
        }
    } else if (playerSelection === 'Scissors') {
        switch (computerSelection) {
            case 'Rock':
                pointGoesTo = "computer";
                console.log("You lose! Rock beats Scissors.");
                break;
            case 'Paper':
                pointGoesTo = "player";
                console.log("You win! Scissors beat Paper.");
                break;
        }
    }
    return pointGoesTo;
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