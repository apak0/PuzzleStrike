import React, { useState, useEffect } from "react";
import { Container } from "./Layout/Container";
import { BoardRow } from "./Board/BoardRow";
import { GameHeader } from "./GameHeader/GameHeader";
import { GameControls } from "./GameControls/GameControls";
import { createDisplayBoard } from "../utils/boardUtils";
import { Countdown } from "./Countdown/Countdown";

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
  setIsGameStarted: (started: boolean) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  score,
  currentPiece,
  position,
  controls,
  onRefresh,
  setIsGameStarted,
}) => {
  const [countdown, setCountdown] = useState(3);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const displayBoard = createDisplayBoard(board, currentPiece, position);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      const timer = setTimeout(() => {
        setIsCountdownComplete(true);
        setIsGameStarted(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown, setIsGameStarted]);

  return (
    <Container className="flex flex-col items-center min-h-screen py-2 sm:py-8">
      <GameHeader score={score} onRefresh={onRefresh} />
      <div className="relative flex items-center justify-center mb-5">
        <div className="scale-90 sm:scale-100">
          <div className="relative border-2 border-purple-500/50 rounded-lg p-0.5 sm:p-1 bg-gray-900/90 shadow-lg shadow-purple-500/20">
            <div className="grid grid-cols-1 gap-0">
              {displayBoard.map((row, i) => (
                <BoardRow key={i} row={row} rowIndex={i} />
              ))}
            </div>
            {!isCountdownComplete && <Countdown count={countdown} />}
          </div>
        </div>
      </div>
      <GameControls {...controls} />
    </Container>
  );
};
