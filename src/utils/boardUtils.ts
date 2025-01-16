export const createDisplayBoard = (
  board: number[][],
  currentPiece: { shape: number[][], color: number },
  position: { x: number, y: number }
) => {
  const displayBoard = board.map(row => [...row]);
  
  currentPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        const boardY = y + position.y;
        const boardX = x + position.x;
        if (boardY >= 0 && boardY < board.length && boardX >= 0 && boardX < board[0].length) {
          displayBoard[boardY][boardX] = currentPiece.color;
        }
      }
    });
  });

  return displayBoard;
};

export const canMove = (
  board: number[][],
  shape: number[][],
  position: { x: number; y: number }
): boolean => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const boardY = y + position.y;
        const boardX = x + position.x;

        if (
          boardY >= board.length ||
          boardX < 0 ||
          boardX >= board[0].length ||
          (boardY >= 0 && board[boardY][boardX] > 0)
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const isColliding = (
  board: number[][],
  shape: number[][],
  position: { x: number; y: number }
): boolean => {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x] !== 0) {
        const boardY = y + position.y;
        const boardX = x + position.x;

        if (
          boardY >= board.length ||
          boardX < 0 ||
          boardX >= board[0].length ||
          (boardY >= 0 && board[boardY][boardX] > 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};