import React from 'react';
import { BoardCell } from './BoardCell';

interface BoardRowProps {
  row: number[];
  rowIndex: number;
}

export const BoardRow: React.FC<BoardRowProps> = ({ row, rowIndex }) => (
  <div key={rowIndex} className="flex">
    {row.map((cell, j) => (
      <BoardCell key={`${rowIndex}-${j}`} value={cell} />
    ))}
  </div>
);