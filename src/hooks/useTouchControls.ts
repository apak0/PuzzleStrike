import { useEffect, useRef } from 'react';

interface TouchControls {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  hardDrop: () => void;
}

export const useTouchControls = (controls: TouchControls) => {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastMoveTimeRef = useRef<number>(0);
  const hasMoved = useRef<boolean>(false);
  const moveThreshold = 30; // Minimum distance in pixels to trigger a move
  const swipeThreshold = 50; // Minimum distance in pixels to trigger a swipe
  const moveDelay = 100; // Minimum time between moves in milliseconds

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
      hasMoved.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const currentTime = Date.now();

      // If there's significant movement, mark that we've moved
      if (Math.abs(deltaX) > moveThreshold || Math.abs(deltaY) > moveThreshold) {
        hasMoved.current = true;
      }

      // Only process move if enough time has passed since last move
      if (currentTime - lastMoveTimeRef.current < moveDelay) return;

      // Horizontal movement
      if (Math.abs(deltaX) > moveThreshold) {
        if (deltaX > 0) {
          controls.moveRight();
        } else {
          controls.moveLeft();
        }
        // Update the start position for continuous movement
        touchStartRef.current.x = touch.clientX;
        lastMoveTimeRef.current = currentTime;
      }

      // Downward movement (soft drop)
      if (deltaY > moveThreshold) {
        controls.moveDown();
        touchStartRef.current.y = touch.clientY;
        lastMoveTimeRef.current = currentTime;
      }

      // Prevent default scrolling
      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Only rotate if there was no significant movement
      if (!hasMoved.current && Math.abs(deltaX) < moveThreshold && Math.abs(deltaY) < moveThreshold) {
        controls.rotate();
      }
      // Hard drop on quick downward swipe
      else if (deltaY > swipeThreshold && Math.abs(deltaX) < moveThreshold) {
        controls.hardDrop();
      }

      touchStartRef.current = null;
      hasMoved.current = false;
    };

    // Add touch event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [controls]);
};
