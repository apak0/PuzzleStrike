import { useEffect } from 'react';

interface UseKeyboardControlsProps {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
}

export const useKeyboardControls = ({
  moveLeft,
  moveRight,
  moveDown,
  rotate,
}: UseKeyboardControlsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
        case 'Space':
          event.preventDefault(); // Prevent page scrolling
          rotate();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, moveDown, rotate]);
};