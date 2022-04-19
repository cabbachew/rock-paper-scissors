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

    let playerScore = 0;
    let computerScore = 0;
    if (playerSelection === computerSelection) {
        console.log("It's a tie!");
    } else if (playerSelection === 'Rock') {
        switch (computerSelection) {
            case 'Paper':
                computerScore++;
                console.log("You lose! Paper beats Rock.");
                break;
            case 'Scissors':
                playerScore++;
                console.log("You win! Rock beats Scissors.");
                break;
        }
    } else if (playerSelection === 'Paper') {
        switch (computerSelection) {
            case 'Rock':
                playerScore++;
                console.log("You win! Paper beats Rock.");
                break;
            case 'Scissors':
                computerScore++;
                console.log("You lose! Scissors beat Paper.");
                break;
        }
    } else if (playerSelection === 'Scissors') {
        switch (computerSelection) {
            case 'Rock':
                computerScore++;
                console.log("You lose! Rock beats Scissors.");
                break;
            case 'Paper':
                playerScore++;
                console.log("You win! Scissors beat Paper.");
                break;
        }
    }
    return "<Player Score :" + playerScore + "> < Computer Score: " + computerScore + ">";
}

