function computerPlay() {
    const moves = ['Rock', 'Paper', 'Scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
}