import { useEffect, useCallback } from 'react';

interface GameControls {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
}

export const useGameControls = (controls: GameControls) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        controls.moveLeft();
        break;
      case 'ArrowRight':
        controls.moveRight();
        break;
      case 'ArrowDown':
        controls.moveDown();
        break;
      case ' ': // Spacebar
      case 'ArrowUp': // Keep arrow up as alternative
        controls.rotate();
        event.preventDefault(); // Prevent page scrolling
        break;
    }
  }, [controls]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};