import React, { useState, useEffect } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { GameBoard } from "./components/GameBoard";
import { useTetris } from "./hooks/useTetris";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useTouchControls } from "./hooks/useTouchControls";

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
    moveLeft: () => controls.moveLeft(isGameStarted && !gameOver),
    moveRight: () => controls.moveRight(isGameStarted && !gameOver),
    moveDown: () => controls.moveDown(isGameStarted && !gameOver),
    hardDrop: () => controls.hardDrop(isGameStarted && !gameOver),
    rotate: () => controls.rotate(isGameStarted && !gameOver)
  };

  // Use both keyboard and touch controls
  useKeyboardControls(wrappedControls);
  useTouchControls(wrappedControls);

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

  const handleHome = () => {
    restart(); // Reset the game state
    setGameState("intro"); // Go back to intro screen
    setIsGameStarted(false);
    setShowInitialCountdown(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 touch-none">
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
            onHome={handleHome}
            setIsGameStarted={setIsGameStarted}
            showCountdown={showInitialCountdown}
            completedLines={completedLines}
            onAnimationComplete={onAnimationComplete}
            gameOver={gameOver}
          />
        </div>
      )}
    </div>
  );
};

export default App;
