import React, { useEffect, useState } from 'react';

interface BoomAnimationProps {
  rowIndex: number;
  onComplete: () => void;
}

export const BoomAnimation: React.FC<BoomAnimationProps> = ({ rowIndex, onComplete }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStep(prev => prev + 1);
      if (animationStep >= 3) {
        onComplete();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [animationStep, onComplete]);

  return (
    <div 
      className={`absolute left-0 right-0 h-[30px] flex items-center justify-center
        ${animationStep === 0 ? 'scale-0 opacity-0' : 
          animationStep === 1 ? 'scale-100 opacity-100' : 
          animationStep === 2 ? 'scale-150 opacity-50' : 'scale-200 opacity-0'} 
        transition-all duration-100 ease-out`}
      style={{
        top: `${rowIndex * 30}px`,
      }}
    >
      <div className="w-full h-full bg-yellow-500/50 flex items-center justify-center">
        <div className="text-yellow-200 font-bold text-2xl animate-pulse">
          BOOM!
        </div>
      </div>
    </div>
  );
};
