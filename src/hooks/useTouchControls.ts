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
  const moveThreshold = 30;
  const swipeThreshold = 50;
  const moveDelay = 100;

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Don't handle touch events if we're clicking a button or game is over
      if (e.target instanceof Element) {
        const isButton = e.target.closest('button');
        const isGameOver = e.target.closest('.game-over-overlay');
        if (isButton || isGameOver) return;
      }

      const gameBoard = document.querySelector('.relative.border-2.border-purple-500\\/50');
      const touch = e.touches[0];
      const rect = gameBoard?.getBoundingClientRect();
      
      if (!rect || !isWithinRect(touch.clientX, touch.clientY, rect)) return;
      
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      };
      hasMoved.current = false;
      e.preventDefault();
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Don't handle touch events if we're clicking a button or game is over
      if (e.target instanceof Element) {
        const isButton = e.target.closest('button');
        const isGameOver = e.target.closest('.game-over-overlay');
        if (isButton || isGameOver) return;
      }

      if (!touchStartRef.current) return;

      const gameBoard = document.querySelector('.relative.border-2.border-purple-500\\/50');
      const touch = e.touches[0];
      const rect = gameBoard?.getBoundingClientRect();
      
      if (!rect || !isWithinRect(touch.clientX, touch.clientY, rect)) return;

      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const currentTime = Date.now();

      if (Math.abs(deltaX) > moveThreshold || Math.abs(deltaY) > moveThreshold) {
        hasMoved.current = true;
      }

      if (currentTime - lastMoveTimeRef.current < moveDelay) return;

      // Horizontal movement
      if (Math.abs(deltaX) > moveThreshold) {
        if (deltaX > 0) {
          controls.moveRight();
        } else {
          controls.moveLeft();
        }
        touchStartRef.current.x = touch.clientX;
        lastMoveTimeRef.current = currentTime;
      }

      // Downward movement (soft drop)
      if (deltaY > moveThreshold) {
        controls.moveDown();
        touchStartRef.current.y = touch.clientY;
        lastMoveTimeRef.current = currentTime;
      }

      // Hard drop on quick downward swipe
      if (deltaY > swipeThreshold * 2) {
        controls.hardDrop();
        touchStartRef.current = null;
        hasMoved.current = false;
        return;
      }

      e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Don't handle touch events if we're clicking a button or game is over
      if (e.target instanceof Element) {
        const isButton = e.target.closest('button');
        const isGameOver = e.target.closest('.game-over-overlay');
        if (isButton || isGameOver) return;
      }

      if (!touchStartRef.current) return;

      const gameBoard = document.querySelector('.relative.border-2.border-purple-500\\/50');
      const touch = e.changedTouches[0];
      const rect = gameBoard?.getBoundingClientRect();
      
      if (!rect || !isWithinRect(touch.clientX, touch.clientY, rect)) return;

      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      // Only rotate if there was no significant movement
      if (!hasMoved.current && Math.abs(deltaX) < moveThreshold && Math.abs(deltaY) < moveThreshold) {
        controls.rotate();
      }

      touchStartRef.current = null;
      hasMoved.current = false;
    };

    // Helper function to check if touch is within game board
    const isWithinRect = (x: number, y: number, rect: DOMRect) => {
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [controls]);
};
