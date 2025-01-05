import { TETROMINOES } from '../constants/tetrominos';

export const createEmptyBoard = (height: number, width: number): number[][] =>
  Array.from({ length: height }, () => Array(width).fill(0));

export const rotateMatrix = (matrix: number[][]): number[][] => {
  const N = matrix.length;
  const rotated = matrix.map((row, i) =>
    row.map((_, j) => matrix[N - 1 - j][i])
  );
  return rotated;
};

export const isValidMove = (
  board: number[][],
  piece: number[][],
  offsetX: number,
  offsetY: number
): boolean => {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < piece[y].length; x++) {
      if (piece[y][x] !== 0) {
        const newX = x + offsetX;
        const newY = y + offsetY;
        
        if (
          newX < 0 ||
          newX >= board[0].length ||
          newY >= board.length ||
          (newY >= 0 && board[newY][newX] !== 0)
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const getRandomTetromino = () => {
  const pieces = Object.keys(TETROMINOES);
  const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOES;
  return TETROMINOES[randomPiece];
};