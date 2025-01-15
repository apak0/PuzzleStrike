import { useState, useEffect, useCallback } from 'react';
import { createEmptyBoard, isValidMove, getRandomTetromino, rotateMatrix } from '../utils/gameUtils';
import { getLowestValidPosition } from '../utils/dropUtils';
import { useGameState } from './useGameState';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

export const useTetris = (difficulty: string, isGameStarted: boolean) => {
  const { state, setState, resetGame } = useGameState();
  const [currentPiece, setCurrentPiece] = useState(getRandomTetromino());
  const [position, setPosition] = useState({ 
    x: Math.floor((BOARD_WIDTH - currentPiece.shape[0].length) / 2), 
    y: 0
  });
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getDropSpeed = useCallback(() => {
    switch (difficulty) {
      case 'easy': return 750;
      case 'medium': return 500;
      case 'hard': return 200;
      default: return 750;
    }
  }, [difficulty]);

  const moveLeft = useCallback((isActive: boolean) => {
    if (!isActive || isAnimating) return;
    if (isValidMove(state.board, currentPiece.shape, position.x - 1, position.y)) {
      setPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [state.board, currentPiece.shape, position, isAnimating]);

  const moveRight = useCallback((isActive: boolean) => {
    if (!isActive || isAnimating) return;
    if (isValidMove(state.board, currentPiece.shape, position.x + 1, position.y)) {
      setPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [state.board, currentPiece.shape, position, isAnimating]);

  const moveDown = useCallback((isActive: boolean) => {
    if (!isActive || isAnimating) return false;

    if (isValidMove(state.board, currentPiece.shape, position.x, position.y + 1)) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
      return true;
    }
    return false;
  }, [state.board, currentPiece.shape, position, isAnimating]);

  const hardDrop = useCallback((isActive: boolean) => {
    if (!isActive || isAnimating) return;
    const lowestY = getLowestValidPosition(state.board, currentPiece.shape, position.x, position.y);
    setPosition(prev => ({ ...prev, y: lowestY }));
  }, [state.board, currentPiece.shape, position, isAnimating]);

  const rotate = useCallback((isActive: boolean) => {
    if (!isActive || isAnimating) return;
    const rotated = rotateMatrix(currentPiece.shape);
    if (isValidMove(state.board, rotated, position.x, position.y)) {
      setCurrentPiece(prev => ({ ...prev, shape: rotated }));
    }
  }, [state.board, currentPiece, position, isAnimating]);

  const resetPosition = useCallback(() => {
    const newPiece = getRandomTetromino();
    setCurrentPiece(newPiece);
    setPosition({
      x: Math.floor((BOARD_WIDTH - newPiece.shape[0].length) / 2),
      y: 0
    });
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    setCompletedLines([]);
    
    // Update the board after animation
    const newBoard = state.board.filter((_, index) => !completedLines.includes(index));
    const emptyRows = Array(completedLines.length).fill(0).map(() => Array(BOARD_WIDTH).fill(0));
    setState(prev => ({
      ...prev,
      board: [...emptyRows, ...newBoard],
      score: prev.score + (completedLines.length * 100)
    }));
    
    resetPosition();
  }, [completedLines, state.board, setState, resetPosition]);

  const restart = useCallback(() => {
    resetGame();
    resetPosition();
    setCompletedLines([]);
    setIsAnimating(false);
  }, [resetGame, resetPosition]);

  useEffect(() => {
    if (!isGameStarted || isAnimating) {
      return;
    }

    const gameLoop = setInterval(() => {
      const moveResult = moveDown(true);
      if (!moveResult) {
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

        // Find completed lines
        const newCompletedLines = newBoard.reduce((acc, row, i) => {
          if (row.every(cell => cell !== 0)) {
            acc.push(i);
          }
          return acc;
        }, [] as number[]);

        if (newCompletedLines.length > 0) {
          setCompletedLines(newCompletedLines);
          setIsAnimating(true);
          setState(prev => ({
            ...prev,
            board: newBoard
          }));
        } else {
          setState(prev => ({
            ...prev,
            board: newBoard
          }));
          resetPosition();
        }
      }
    }, getDropSpeed());

    return () => clearInterval(gameLoop);
  }, [isGameStarted, moveDown, state.board, currentPiece, position, setState, resetPosition, getDropSpeed, isAnimating]);

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
    completedLines,
    onAnimationComplete: handleAnimationComplete
  };
};