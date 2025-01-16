import React, { useEffect, useState } from 'react';

interface LineCompleteAnimationProps {
  rowIndex: number;
  onComplete: () => void;
}

export const LineCompleteAnimation: React.FC<LineCompleteAnimationProps> = ({ rowIndex, onComplete }) => {
  const [phase, setPhase] = useState(0);
  const totalPhases = 6; // Number of flashes before disappearing

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase(prev => {
        if (prev >= totalPhases - 1) {
          clearInterval(timer);
          onComplete();
          return prev;
        }
        return prev + 1;
      });
    }, 100); // Flash every 100ms

    return () => clearInterval(timer);
  }, [onComplete]);

  // Create 10 blocks for the row (BOARD_WIDTH = 10)
  const blocks = Array(10).fill(0);

  return (
    <div 
      className="absolute left-0 right-0 flex"
      style={{
        top: `${rowIndex * 30}px`,
        height: '30px'
      }}
    >
      {blocks.map((_, index) => (
        <div
          key={index}
          className={`w-[30px] h-[30px] border border-gray-800
            ${phase % 2 === 0 
              ? 'bg-white animate-pulse' 
              : 'bg-transparent'
            }
            ${phase === totalPhases - 1 
              ? 'scale-0 opacity-0' 
              : 'scale-100 opacity-100'
            }
            transition-all duration-100`}
        >
          <div className={`
            w-full h-full 
            ${phase % 2 === 0 ? 'animate-sparkle' : ''}
          `}>
            {phase % 2 === 0 && (
              <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-50" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
