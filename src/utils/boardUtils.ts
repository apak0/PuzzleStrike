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