const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
    };

    const updateBoard = (index, value) => {
        if (index >= 0 && index < board.length) {
            board[index] = value;
        }
    };

    return {
        getBoard,
        resetBoard,
        updateBoard
    };
})();

const DisplayController = (() => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.querySelector('h1');
    const playAgainButton = document.querySelector('button');

    const updateCell = (index, value) => {
        cells[index].textContent = value;
    };

    const updateStatus = (message) => {
        statusText.textContent = message;
    };

    const clearBoard = () => {
        cells.forEach(cell => cell.textContent = '');
    };

    const addCellClickListener = (listener) => {
        cells.forEach(cell => cell.addEventListener('click', listener));
    };

    const addPlayAgainListener = (listener) => {
        playAgainButton.addEventListener('click', listener);
    };

    return {
        updateCell,
        updateStatus,
        clearBoard,
        addCellClickListener,
        addPlayAgainListener
    };
})();

const GameController = (() => {
    let currentPlayer = 'X';
    let gameActive = true;
    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (event) => {
        const cellClicked = event.target;
        const cellClickedIndex = Array.from(document.querySelectorAll('.cell')).indexOf(cellClicked);

        if (GameBoard.getBoard()[cellClickedIndex] !== '' || !gameActive) {
            return;
        }

        GameBoard.updateBoard(cellClickedIndex, currentPlayer);
        DisplayController.updateCell(cellClickedIndex, currentPlayer);

        if (checkWin()) {
            DisplayController.updateStatus(`Player ${currentPlayer} wins!`);
            gameActive = false;
            return;
        }

        if (!GameBoard.getBoard().includes('')) {
            DisplayController.updateStatus(`It's a draw!`);
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        DisplayController.updateStatus(`Player ${currentPlayer} to move.`);
    };

    const checkWin = () => {
        for (let i = 0; i < winningPositions.length; i++) {
            const [a, b, c] = winningPositions[i];
            if (GameBoard.getBoard()[a] && GameBoard.getBoard()[a] === GameBoard.getBoard()[b] && GameBoard.getBoard()[a] === GameBoard.getBoard()[c]) {
                return true;
            }
        }
        return false;
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        GameBoard.resetBoard();
        DisplayController.clearBoard();
        DisplayController.updateStatus('Player 1 to move');
    };

    const init = () => {
        DisplayController.addCellClickListener(handleCellClick);
        DisplayController.addPlayAgainListener(resetGame);
        updateFooterDate();
    };


    const updateFooterDate = () => {
        const currentDateElement = document.getElementById('current-date');
        const currentDate = new Date();
        currentDateElement.textContent = currentDate.toLocaleDateString();
    };

    return {
        init
    };
})();

document.addEventListener('DOMContentLoaded', GameController.init);
