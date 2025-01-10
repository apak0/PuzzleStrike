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

export const isValidMove = (board: number[][], shape: number[][], newX: number, newY: number) => {
  return shape.every((row, y) => {
    return row.every((value, x) => {
      if (value === 0) return true;
      const boardY = newY + y;
      const boardX = newX + x;
      
      // Board'un üstündeyken sadece x ekseni kontrolü
      if (boardY < 0) return boardX >= 0 && boardX < board[0].length;
      
      return (
        boardY < board.length &&
        boardX >= 0 &&
        boardX < board[0].length &&
        board[boardY][boardX] === 0
      );
    });
  });
};

export const getRandomTetromino = () => {
  const pieces = Object.keys(TETROMINOES);
  const randomPiece = pieces[Math.floor(Math.random() * pieces.length)] as keyof typeof TETROMINOES;
  return TETROMINOES[randomPiece];
};