import React from 'react';

interface BlockProps {
  value: number;
  className?: string;
}

const colors = [
  'bg-transparent',
  'bg-purple-500',
  'bg-pink-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500'
];

export const Block: React.FC<BlockProps> = ({ value, className = '' }) => {
  const baseClasses = 'w-[30px] h-[30px] border border-gray-800 transition-all duration-200';
  const colorClass = colors[value] || colors[0];
  const gradientClass = value !== 0 ? 'bg-gradient-to-br from-white/20 to-transparent' : '';
  
  return (
    <div className={`${baseClasses} ${colorClass} ${gradientClass} ${className}`}>
      {value !== 0 && (
        <div className="w-full h-full relative">
          {/* Shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
          {/* Inner shadow */}
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-black/30 via-transparent to-transparent" />
        </div>
      )}
    </div>
  );
};
