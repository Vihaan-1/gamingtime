document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const turnDisplay = document.getElementById('turnDisplay');
    const statusDisplay = document.getElementById('statusDisplay');
    const pieces = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };

    let board = [
        'rnbqkbnr',
        'pppppppp',
        '        ',
        '        ',
        '        ',
        '        ',
        'PPPPPPPP',
        'RNBQKBNR'
    ];

    let selectedPiece = null;
    let turn = 'white'; // white starts

    function createBoard() {
        chessboard.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
                square.dataset.row = row;
                square.dataset.col = col;

                const piece = board[row][col];
                if (piece !== ' ') {
                    const pieceElement = document.createElement('span');
                    pieceElement.classList.add('piece');
                    pieceElement.innerHTML = pieces[piece];
                    pieceElement.dataset.color = piece === piece.toUpperCase() ? 'white' : 'black';
                    square.appendChild(pieceElement);
                }

                chessboard.appendChild(square);
            }
        }
        updateTurnDisplay();
    }

    function handleSquareClick(e) {
        const square = e.target.closest('.square');
        if (!square) return;

        const piece = square.querySelector('.piece');
        if (selectedPiece) {
            if (piece && piece.dataset.color === turn) {
                selectedPiece = piece;
            } else {
                const fromSquare = selectedPiece.parentElement;
                const toSquare = square;

                toSquare.innerHTML = '';
                toSquare.appendChild(selectedPiece);

                const fromRow = fromSquare.dataset.row;
                const fromCol = fromSquare.dataset.col;
                const toRow = toSquare.dataset.row;
                const toCol = toSquare.dataset.col;

                board[toRow][toCol] = board[fromRow][fromCol];
                board[fromRow][fromCol] = ' ';

                selectedPiece = null;
                turn = turn === 'white' ? 'black' : 'white';
                updateTurnDisplay();

                if (checkForCheckmate()) {
                    statusDisplay.innerText = `${turn === 'white' ? 'Black' : 'White'} wins by checkmate!`;
                    chessboard.removeEventListener('click', handleSquareClick);
                }
            }
        } else if (piece && piece.dataset.color === turn) {
            selectedPiece = piece;
        }
    }

    function updateTurnDisplay() {
        turnDisplay.innerText = `Turn: ${turn.charAt(0).toUpperCase() + turn.slice(1)}`;
    }

    function checkForCheckmate() {
        // Simplified check for checkmate by looking for the king's presence
        let kingWhite = false;
        let kingBlack = false;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (board[row][col] === 'K') kingWhite = true;
                if (board[row][col] === 'k') kingBlack = true;
            }
        }

        return !kingWhite || !kingBlack;
    }

    chessboard.addEventListener('click', handleSquareClick);

    createBoard();
});
