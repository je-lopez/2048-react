function generateRandomNum(getNextNum = false)  {
  // if getNextNum is true,
  //   generate a 2 or 4 (the next number to be added to board)
  if (getNextNum) {
    return Math.random() < .8 ? 2 : 4;
  }

  // generate either an x or y coordinate (0-3)
  return Math.floor(Math.random() * 4);
};

// finds an empty box on the board
//   if exists, return coordinates
//   otherwise, throw error
function findEmptyBox(board) {
  let timesRun = 1;
  let x = generateRandomNum();
  let y = generateRandomNum();

  // should only run 7 times max after the if check was added
  // TODO: verify before changing 16, and make it a constant
  while (board[x][y] !== 0 && timesRun < 16) {
    // instead of generating 2 new coordinates each time, check if an empty
    // exists inside the given row. If yes, search for a new box only, not row
    if (board[x].includes(0)) {
      y = generateRandomNum();
    } else {
      x = generateRandomNum();
    }

    timesRun++;
  }

  if (timesRun >= 16) {
    return [null, null, false];
  }

  return [x, y, true];
};

const addNumber = (board, nums = 1) => {
  const nextBoard = board.slice();
  let nextNum;

  for (let i = 0; i < nums; i++) {
    let [x, y, found] = findEmptyBox(nextBoard);

    if (found) {
      nextNum = generateRandomNum(true);
      nextBoard[x][y] = nextNum;
    }
  }

  return nextBoard;
};

const rotate = (board, direction) => {
  let rotatedBoard = board.slice();

  // no need to rotate when user clicks left, since move()
  // calculates from left to right
  if (direction === 'ArrowLeft') {
    return board;
  }

  // switch() {}

};

// 2 2
// 2 4
// 2 2 2
// 2 4 2
// 2 4 2 2
// 2 2 2 2
export const move = (board, direction) => {
  let rotatedBoard = rotate(board, direction);

  addNumber(board.map(row => {
    let nextRow = [];
    let filteredRow = row.filter(num => num !== 0);
    
    while (filteredRow.length > 0) {
      if (filteredRow.length === 1) {
        nextRow.push(filteredRow.shift());
      } else if (filteredRow[0] === filteredRow[1]) {
        nextRow.push(filteredRow.shift() * 2);
        filteredRow.shift();
      } else {
        nextRow.push(filteredRow.shift());
      }
    }

    while (nextRow.length < 4) {
      nextRow.push(0);
    }

    return nextRow;
  }))
};

export const initializeBoard = () => addNumber([[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]], 2);
