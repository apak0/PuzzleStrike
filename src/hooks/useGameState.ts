import { useState, useCallback } from 'react';
import { createEmptyBoard } from '../utils/gameUtils';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

interface GameState {
  board: number[][];
  score: number;
  gameOver: boolean;
}

const initialState: GameState = {
  board: createEmptyBoard(BOARD_HEIGHT, BOARD_WIDTH),
  score: 0,
  gameOver: false
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(initialState);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    state,
    setState,
    resetGame
  };
};