document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const pieces = {
        'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
        'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };

    const initialBoard = [
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

                const piece = initialBoard[row][col];
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

                selectedPiece = null;
                turn = turn === 'white' ? 'black' : 'white';
            }
        } else if (piece && piece.dataset.color === turn) {
            selectedPiece = piece;
        }
    }

    chessboard.addEventListener('click', handleSquareClick);

    createBoard();
});
