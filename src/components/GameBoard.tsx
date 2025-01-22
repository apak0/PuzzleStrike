import React, { useState, useEffect } from "react";
import { Container } from "./Layout/Container";
import { BoardRow } from "./Board/BoardRow";
import { GameHeader } from "./GameHeader/GameHeader";
import { GameControls } from "./GameControls/GameControls";
import { createDisplayBoard } from "../utils/boardUtils";
import { Countdown } from "./Countdown/Countdown";
import { LineCompleteAnimation } from "./Animations/LineCompleteAnimation";
import { GameOverOverlay } from "./GameOver/GameOverOverlay";
import { TouchInstructions } from "./TouchInstructions/TouchInstructions";

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
  onHome: () => void;
  setIsGameStarted: (started: boolean) => void;
  showCountdown: boolean;
  completedLines: number[];
  onAnimationComplete: () => void;
  gameOver: boolean;
  controlType: 'arrows' | 'touch';
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  score,
  currentPiece,
  position,
  controls,
  onRefresh,
  onHome,
  setIsGameStarted,
  showCountdown,
  completedLines,
  onAnimationComplete,
  gameOver,
  controlType,
}) => {
  const [countdown, setCountdown] = useState(2);
  const [displayCountdown, setDisplayCountdown] = useState(showCountdown);
  const displayBoard = createDisplayBoard(board, currentPiece, position);

  useEffect(() => {
    if (!showCountdown) {
      setDisplayCountdown(false);
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      const timer = setTimeout(() => {
        setDisplayCountdown(false);
        setIsGameStarted(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [countdown, setIsGameStarted, showCountdown]);

  return (
    <Container className="flex flex-col items-center min-h-screen py-2 sm:py-8">
      <GameHeader score={score} onRefresh={onRefresh} onHome={onHome} />
      <div className="relative flex items-center justify-center mb-5">
        <div className="scale-90 sm:scale-100">
          <div className="relative border-2 border-purple-500/50 rounded-lg p-0.5 sm:p-1 bg-gray-900/90 shadow-lg shadow-purple-500/20">
            <div className="grid grid-cols-1 gap-0">
              {displayBoard.map((row, i) => (
                <BoardRow 
                  key={i} 
                  row={row} 
                  rowIndex={i} 
                  isCompleted={completedLines.includes(i)}
                />
              ))}
            </div>
            {displayCountdown && <Countdown count={countdown} />}
            {completedLines.map((rowIndex) => (
              <LineCompleteAnimation
                key={rowIndex}
                rowIndex={rowIndex}
                onComplete={onAnimationComplete}
              />
            ))}
            {gameOver && (
              <GameOverOverlay
                score={score}
                onRestart={onRefresh}
                onHome={onHome}
              />
            )}
          </div>
        </div>
      </div>
      {controlType === 'arrows' && <GameControls {...controls} />}
      {controlType === 'touch' && <TouchInstructions />}
    </Container>
  );
};
