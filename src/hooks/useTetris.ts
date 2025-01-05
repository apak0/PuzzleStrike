import { useState, useEffect, useCallback } from 'react';
import { createEmptyBoard, isValidMove, getRandomTetromino, rotateMatrix } from '../utils/gameUtils';
import { getLowestValidPosition } from '../utils/dropUtils';
import { useGameState } from './useGameState';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export const useTetris = (difficulty: string) => {
  const { state, setState, resetGame } = useGameState();
  const [currentPiece, setCurrentPiece] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ 
    x: Math.floor((BOARD_WIDTH - currentPiece.shape[0].length) / 2), 
    y: 0 
  });

  const moveLeft = useCallback(() => {
    if (isValidMove(state.board, currentPiece.shape, position.x - 1, position.y)) {
      setPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [state.board, currentPiece.shape, position]);

  const moveRight = useCallback(() => {
    if (isValidMove(state.board, currentPiece.shape, position.x + 1, position.y)) {
      setPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [state.board, currentPiece.shape, position]);

  const moveDown = useCallback(() => {
    if (isValidMove(state.board, currentPiece.shape, position.x, position.y + 1)) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
      return true;
    }
    return false;
  }, [state.board, currentPiece.shape, position]);

  const hardDrop = useCallback(() => {
    const lowestY = getLowestValidPosition(state.board, currentPiece.shape, position.x, position.y);
    setPosition(prev => ({ ...prev, y: lowestY }));
  }, [state.board, currentPiece.shape, position]);

  const rotate = useCallback(() => {
    const rotated = rotateMatrix(currentPiece.shape);
    if (isValidMove(state.board, rotated, position.x, position.y)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotated }));
    }
  }, [state.board, currentPiece, position]);

  const resetPosition = useCallback(() => {
    const newPiece = getRandomTetromino();
    setCurrentPiece(newPiece);
    setPosition({
      x: Math.floor((BOARD_WIDTH - newPiece.shape[0].length) / 2),
      y: 0
    });
  }, []);

  const restart = useCallback(() => {
    resetGame();
    resetPosition();
  }, [resetGame, resetPosition]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!moveDown()) {
        // Lock the piece in place
        const newBoard = state.board.map(row => [...row]);
        let canPlacePiece = true;

        currentPiece.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              const boardY = y + position.y;
              const boardX = x + position.x;
              
              if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                newBoard[boardY][boardX] = currentPiece.color;
              } else {
                canPlacePiece = false;
              }
            }
          });
        });

        if (!canPlacePiece) {
          setState(prev => ({ ...prev, gameOver: true }));
          return;
        }

        // Check for completed lines
        let newScore = state.score;
        const completedLines = newBoard.reduce((acc, row, i) => {
          if (row.every(cell => cell !== 0)) {
            acc.push(i);
          }
          return acc;
        }, [] as number[]);

        if (completedLines.length > 0) {
          completedLines.forEach(line => {
            newBoard.splice(line, 1);
            newBoard.unshift(Array(BOARD_WIDTH).fill(0));
          });
          newScore += completedLines.length * 100;
        }

        setState(prev => ({
          ...prev,
          board: newBoard,
          score: newScore
        }));

        resetPosition();
      }
    }, getDropSpeed());

    return () => clearInterval(gameLoop);
  }, [state, currentPiece, position, moveDown, resetPosition]);

  const getDropSpeed = useCallback(() => {
    switch (difficulty) {
      case 'easy': return 1000;
      case 'medium': return 750;
      case 'hard': return 500;
      default: return 750;
    }
  }, [difficulty]);

  return {
    board: state.board,
    score: state.score,
    gameOver: state.gameOver,
    currentPiece,
    position,
    controls: {
      moveLeft,
      moveRight,
      moveDown,
      hardDrop,
      rotate
    },
    restart
  };
};