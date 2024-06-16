document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const scoreDisplay = document.querySelector('.score');
    let squares = [];
    let score = 0;

    // Create Board
    function createBoard() {
        for (let i = 0; i < 16; i++) {
            let square = document.createElement('div');
            square.classList.add('grid-cell');
            gridContainer.appendChild(square);
            squares.push(square);
        }
        generateNumber();
        generateNumber();
    }
    createBoard();

    // Generate a number
    function generateNumber() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == '') {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver();
        } else generateNumber();
    }

    // Swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // Swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];
            }
        }
    }

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 4].innerHTML;
            let totalThree = squares[i + 8].innerHTML;
            let totalFour = squares[i + 12].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + 4].innerHTML = newColumn[1];
            squares[i + 8].innerHTML = newColumn[2];
            squares[i + 12].innerHTML = newColumn[3];
        }
    }

    // Swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 4].innerHTML;
            let totalThree = squares[i + 8].innerHTML;
            let totalFour = squares[i + 12].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + 4].innerHTML = newColumn[1];
            squares[i + 8].innerHTML = newColumn[2];
            squares[i + 12].innerHTML = newColumn[3];
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 4].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // Assign keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generateNumber();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generateNumber();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generateNumber();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generateNumber();
    }

    // Check for win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                alert('You WIN!');
                document.removeEventListener('keyup', control);
            }
        }
    }

    // Check for game over
    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') {
                zeros++;
            }
        }
        if (zeros === 0) {
            alert('Game Over');
            document.removeEventListener('keyup', control);
        }
    }
});
