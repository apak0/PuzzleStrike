import React from 'react';
import { Block } from './Block';

interface BoardRowProps {
  row: number[];
  rowIndex: number;
  isCompleted?: boolean;
}

export const BoardRow: React.FC<BoardRowProps> = ({ row, rowIndex, isCompleted }) => {
  return (
    <div className="flex">
      {row.map((cell, i) => (
        <Block 
          key={i} 
          value={cell} 
          className={isCompleted ? 'opacity-0' : ''}
        />
      ))}
    </div>
  );
};