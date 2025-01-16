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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Setup keyboard controls - always active on desktop
  useKeyboardControls(!isMobile || controlType === 'arrows' ? wrappedControls : {
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

  const handleDifficultySelect = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    setSelectedDifficulty(selectedDifficulty);
    if (isMobile) {
      setGameState("control-select");
    } else {
      setGameState("playing");
      setControlType("arrows");
    }
  };

  const handleControlSelect = (type: "arrows" | "touch") => {
    setControlType(type);
    setGameState("playing");
  };

  const handleRestart = () => {
    restart();
    setIsGameStarted(false);
    setShowInitialCountdown(true);
    if (isMobile) {
      setGameState("control-select");
    } else {
      setGameState("playing");
    }
  };

  const handleHome = () => {
    restart();
    setIsGameStarted(false);
    setShowInitialCountdown(true);
    setGameState("intro");
    setSelectedDifficulty(null);
    setControlType(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {gameState === "intro" && (
        <IntroScreen
          onStart={handleDifficultySelect}
          selectedDifficulty={selectedDifficulty}
        />
      )}
      {gameState === "control-select" && isMobile && (
        <ControlSelect onSelect={handleControlSelect} />
      )}
      {gameState === "playing" && (
        <GameBoard
          board={board}
          score={score}
          currentPiece={currentPiece}
          position={position}
          controls={wrappedControls}
          onRefresh={handleRestart}
          onHome={handleHome}
          setIsGameStarted={setIsGameStarted}
          showCountdown={showInitialCountdown}
          completedLines={completedLines}
          onAnimationComplete={onAnimationComplete}
          gameOver={gameOver}
          controlType={controlType}
        />
      )}
    </div>
  );
};

export default App;
