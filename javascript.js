function computerPlay() {
    const moves = ['Rock', 'Paper', 'Scissors'];
    const computerSelection =  moves[Math.floor(Math.random() * moves.length)];
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