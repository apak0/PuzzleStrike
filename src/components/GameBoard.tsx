import React from 'react';
import { Container } from './Layout/Container';
import { BoardRow } from './Board/BoardRow';
import { GameHeader } from './GameHeader/GameHeader';
import { GameControls } from './GameControls/GameControls';
import { createDisplayBoard } from '../utils/boardUtils';

interface GameBoardProps {
  board: number[][];
  score: number;
  currentPiece: {
    shape: number[][];
    color: number;
  };
  position: {
    x: number;
    y: number;
  };
  controls: {
    moveLeft: () => void;
    moveRight: () => void;
    moveDown: () => void;
    hardDrop: () => void;
    rotate: () => void;
  };
  onRefresh: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  score,
  currentPiece,
  position,
  controls,
  onRefresh
}) => {
  const displayBoard = createDisplayBoard(board, currentPiece, position);

  return (
    <Container className="flex flex-col items-center min-h-screen py-2 sm:py-8">
      <GameHeader score={score} onRefresh={onRefresh} />
      <div className="relative flex items-center justify-center mb-5">
        <div className="scale-90 sm:scale-100">
          <div className="border-2 border-purple-500/50 rounded-lg p-0.5 sm:p-1 bg-gray-900/90 shadow-lg shadow-purple-500/20">
            <div className="grid grid-cols-1 gap-0">
              {displayBoard.map((row, i) => (
                <BoardRow key={i} row={row} rowIndex={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <GameControls {...controls} />
    </Container>
  );
};