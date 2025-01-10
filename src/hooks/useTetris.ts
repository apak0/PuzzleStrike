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
  const [isGameStarted, setIsGameStarted] = useState(false);

  const getDropSpeed = useCallback(() => {
    switch (difficulty) {
      case 'easy': return 1000;
      case 'medium': return 750;
      case 'hard': return 500;
      default: return 750;
    }
  }, [difficulty]);

  const moveLeft = useCallback(() => {
    if (!isGameStarted) return;
    if (isValidMove(state.board, currentPiece.shape, position.x - 1, position.y)) {
      setPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [state.board, currentPiece.shape, position, isGameStarted]);

  const moveRight = useCallback(() => {
    if (!isGameStarted) return;
    if (isValidMove(state.board, currentPiece.shape, position.x + 1, position.y)) {
      setPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [state.board, currentPiece.shape, position, isGameStarted]);

  const moveDown = useCallback(() => {
    if (!isGameStarted) return false;

    if (isValidMove(state.board, currentPiece.shape, position.x, position.y + 1)) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
      return true;
    }
    return false;
  }, [state.board, currentPiece.shape, position, isGameStarted]);

  const hardDrop = useCallback(() => {
    const lowestY = getLowestValidPosition(state.board, currentPiece.shape, position.x, position.y);
    setPosition(prev => ({ ...prev, y: lowestY }));
  }, [state.board, currentPiece.shape, position]);

  const rotate = useCallback(() => {
    if (!isGameStarted) return;
    const rotated = rotateMatrix(currentPiece.shape);
    if (isValidMove(state.board, rotated, position.x, position.y)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotated }));
    }
  }, [state.board, currentPiece, position, isGameStarted]);

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

  const isValidPosition = useCallback((piece: typeof currentPiece, pos: typeof position) => {
    return piece.shape.every((row, dy) => {
      return row.every((value, dx) => {
        if (value === 0) return true;
        const newY = pos.y + dy;
        const newX = pos.x + dx;
        return (
          newX >= 0 &&
          newX < BOARD_WIDTH &&
          newY < BOARD_HEIGHT &&
          (newY < 0 || state.board[newY][newX] === 0)
        );
      });
    });
  }, [state.board]);

  const getDisplayBoard = useCallback(() => {
    const displayBoard = state.board.map(row => [...row]);
    
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          const boardY = y + position.y;
          const boardX = x + position.x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            displayBoard[boardY][boardX] = currentPiece.color;
          }
        }
      });
    });

    return displayBoard;
  }, [state.board, currentPiece, position]);

  useEffect(() => {
    if (!isGameStarted) {
      setPosition({
        x: Math.floor((BOARD_WIDTH - currentPiece.shape[0].length) / 2),
        y: 0
      });
      return () => {};
    }

    console.log('Game started, setting up interval');

    const gameLoop = setInterval(() => {
      console.log('Game loop tick');
      if (!moveDown()) {
        const newBoard = state.board.map(row => [...row]);
        
        let canPlacePiece = false;
        currentPiece.shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              const boardY = y + position.y;
              const boardX = x + position.x;
              
              if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
                newBoard[boardY][boardX] = currentPiece.color;
                canPlacePiece = true;
              }
            }
          });
        });

        if (!canPlacePiece || position.y <= 0) {
          setState(prev => ({ ...prev, gameOver: true }));
          return;
        }

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

    return () => {
      console.log('Clearing interval');
      clearInterval(gameLoop);
    };
  }, [
    state,
    currentPiece,
    position,
    moveDown,
    resetPosition,
    isGameStarted,
    getDropSpeed
  ]);

  return {
    board: getDisplayBoard(),
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
    restart,
    isGameStarted,
    setIsGameStarted
  };
};