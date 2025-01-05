export const getLowestValidPosition = (
  board: number[][],
  piece: number[][],
  currentX: number,
  currentY: number
): number => {
  let lowestY = currentY;
  
  while (isValidPosition(board, piece, currentX, lowestY + 1)) {
    lowestY++;
  }
  
  return lowestY;
};

const isValidPosition = (
  board: number[][],
  piece: number[][],
  x: number,
  y: number
): boolean => {
  for (let row = 0; row < piece.length; row++) {
    for (let col = 0; col < piece[row].length; col++) {
      if (piece[row][col] !== 0) {
        const newY = y + row;
        const newX = x + col;
        
        if (
          newY >= board.length ||
          newX < 0 ||
          newX >= board[0].length ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return false;
        }
      }
    }
  }
  return true;
};