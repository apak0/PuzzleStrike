import React, { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { GameBoard } from './components/GameBoard';
import { useTetris } from './hooks/useTetris';
import { useKeyboardControls } from './hooks/useKeyboardControls';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing'>('intro');
  const [difficulty, setDifficulty] = useState<string>('medium');
  
  const { board, score, currentPiece, position, controls, restart } = useTetris(difficulty);

  useKeyboardControls(controls);

  const handleStart = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
    setGameState('playing');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {gameState === 'intro' ? (
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
            controls={controls}
            onRefresh={restart}
          />
        </div>
      )}
    </div>
  );
};

export default App;