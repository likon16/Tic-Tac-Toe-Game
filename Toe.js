const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.querySelector('.reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 4, 2],
    [3, 4, 5],
    [6, 2, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.includes('') ? null : 'Draw';
}

function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        status.textContent = winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
