import { useCallback, useEffect, useRef } from 'react';

interface UseLongPressProps {
  onPress: () => void;
  onLongPress: () => void;
  interval?: number;
}

export const useLongPress = ({ onPress, onLongPress, interval = 50 }: UseLongPressProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const intervalRef = useRef<NodeJS.Timer>();

  const start = useCallback(() => {
    onPress();
    timeoutRef.current = setTimeout(() => {
      onLongPress();
      intervalRef.current = setInterval(onLongPress, interval);
    }, 200);
  }, [onPress, onLongPress, interval]);

  const stop = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
};