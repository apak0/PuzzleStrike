import React from 'react';
import { Container } from '../Layout/Container';
import { BoardRow } from './BoardRow';
import { ScoreDisplay } from '../Score/ScoreDisplay';
import { GameControls } from '../GameControls/GameControls';
import { createDisplayBoard } from '../../utils/boardUtils';

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
    rotate: () => void;
  };
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  score,
  currentPiece,
  position,
  controls
}) => {
  const displayBoard = createDisplayBoard(board, currentPiece, position);

  return (
    <Container className="flex flex-col items-center justify-center  py-8">
      <ScoreDisplay score={score} />
      <div className="border-2 border-purple-500/50 rounded-lg p-1 bg-gray-900/90 shadow-lg shadow-purple-500/20">
        <div className="grid grid-cols-1 gap-0 scale-75 sm:scale-90 md:scale-100">
          {displayBoard.map((row, i) => (
            <BoardRow key={i} row={row} rowIndex={i} />
          ))}
        </div>
      </div>
      <GameControls
        onMoveLeft={controls.moveLeft}
        onMoveRight={controls.moveRight}
        onMoveDown={controls.moveDown}
        onRotate={controls.rotate}
      />
    </Container>
  );
};