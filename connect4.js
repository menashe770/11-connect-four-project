/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

// makes matrix of specified height x width (7x6)
function makeBoard() {
  for (i = 0; i < HEIGHT; i++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

// makeHtmlBoard: make HTML table and row of column tops.
function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board');

  // make a clickable area in top row
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');
  top.addEventListener('click', handleClick);
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement('td');
    headCell.setAttribute('id', x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // create html board that will display the pieces
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement('tr');
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

// findSpotForCol: given column x, return top empty y (null if filled)
// to find where in the table does the new piece need to go
function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

// placeInTable: update DOM to place piece into HTML table of board
function placeInTable(y, x) {
  const piece = document.createElement('div');
  piece.classList.add('piece', 'p' + currPlayer);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

// endGame: announce game end
function endGame(msg) {
  alert(msg);
}

// handleClick: handle click of column top to play piece
function handleClick(evt) {

  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // to place piece in correct slot
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins \n Reload page to play again`);
  }

  // check for tie
  if (board.every((row) => row.every((cell) => cell))) {
    return endGame(`It's a tie \n Reload page to play again`);
  }

  // switch players
  if (currPlayer === 1) {
    currPlayer = 2;
  } else {
    currPlayer = 1;
  }
}

// checkForWin: check board cell-by-cell for "does a win start here?"
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3]
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x]
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3]
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3]
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();

function testTest(x, y) {
  return x + y;
}