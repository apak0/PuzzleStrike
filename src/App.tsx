import React, { useState, useEffect } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { GameBoard } from "./components/GameBoard";
import { useTetris } from "./hooks/useTetris";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useTouchControls } from "./hooks/useTouchControls";
import { ControlSelect } from "./components/ControlSelect/ControlSelect";

type GameState = "intro" | "control-select" | "playing";
type ControlType = "arrows" | "touch" | null;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("intro");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showInitialCountdown, setShowInitialCountdown] = useState(true);
  const [controlType, setControlType] = useState<ControlType>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

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

  // Setup keyboard controls
  useKeyboardControls(controlType === 'arrows' ? wrappedControls : {
    moveLeft: () => {},
    moveRight: () => {},
    moveDown: () => {},
    hardDrop: () => {},
    rotate: () => {}
  });

  // Setup touch controls
  useTouchControls(controlType === 'touch' ? wrappedControls : {
    moveLeft: () => {},
    moveRight: () => {},
    moveDown: () => {},
    hardDrop: () => {},
    rotate: () => {}
  });

  useEffect(() => {
    if (gameOver) {
      setIsGameStarted(false);
    }
  }, [gameOver]);

  const handleStart = (selectedDifficulty: string) => {
    setSelectedDifficulty(selectedDifficulty);
    setGameState("control-select");
  };

  const handleControlSelect = (type: 'arrows' | 'touch') => {
    setControlType(type);
    setDifficulty(selectedDifficulty!);
    setGameState("playing");
    setIsGameStarted(false);
    setShowInitialCountdown(true);
  };

  const handleRefresh = () => {
    restart();
    setIsGameStarted(true);
    setShowInitialCountdown(false);
  };

  const handleHome = () => {
    restart();
    setGameState("intro");
    setIsGameStarted(false);
    setShowInitialCountdown(true);
    setControlType(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 touch-none">
      {gameState === "intro" ? (
        <div className="animate-slide-in">
          <IntroScreen onStart={handleStart} />
        </div>
      ) : gameState === "control-select" ? (
        <div className="animate-slide-in">
          <ControlSelect onSelect={handleControlSelect} />
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
            controlType={controlType!}
          />
        </div>
      )}
    </div>
  );
};

export default App;
