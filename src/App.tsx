import React, { useState, useEffect } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { GameBoard } from "./components/GameBoard";
import { useTetris } from "./hooks/useTetris";
import { useKeyboardControls } from "./hooks/useKeyboardControls";

const App: React.FC = () => {
  const [gameState, setGameState] = useState<"intro" | "playing">("intro");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showInitialCountdown, setShowInitialCountdown] = useState(true);

  const { 
    board, 
    score, 
    currentPiece, 
    position, 
    controls, 
    restart, 
    gameOver,
    completedLines,
    onAnimationComplete
  } = useTetris(difficulty, isGameStarted);

  const wrappedControls = {
    moveLeft: () => controls.moveLeft(isGameStarted),
    moveRight: () => controls.moveRight(isGameStarted),
    moveDown: () => controls.moveDown(isGameStarted),
    hardDrop: () => controls.hardDrop(isGameStarted),
    rotate: () => controls.rotate(isGameStarted)
  };

  useKeyboardControls(wrappedControls);

  useEffect(() => {
    if (gameOver) {
      setIsGameStarted(false);
    }
  }, [gameOver]);

  const handleStart = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    setGameState("playing");
    setIsGameStarted(false); // Reset game started state for countdown
    setShowInitialCountdown(true); // Show countdown only on first start
  };

  const handleRefresh = () => {
    restart();
    setIsGameStarted(true); // Immediately start the game on refresh
    setShowInitialCountdown(false); // Don't show countdown on restart
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {gameState === "intro" ? (
        <div className="animate-slide-in">
          <IntroScreen onStart={handleStart} />
        </div>
      ) : (
        <div className="animate-slide-in">
          <GameBoard
            board={board}
            score={score}
            currentPiece={currentPiece}
            position={position}
            controls={wrappedControls}
            onRefresh={handleRefresh}
            setIsGameStarted={setIsGameStarted}
            showCountdown={showInitialCountdown}
            completedLines={completedLines}
            onAnimationComplete={onAnimationComplete}
          />
        </div>
      )}
    </div>
  );
};

export default App;
