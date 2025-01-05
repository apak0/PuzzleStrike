import React from 'react';
import { COLORS } from '../../constants/colors';

interface BoardCellProps {
  value: number;
}

export const BoardCell: React.FC<BoardCellProps> = ({ value }) => (
  <div
    className={`w-7 h-7 sm:w-8 sm:h-8 border border-gray-800/50 ${COLORS[value]} 
      ${value > 0 ? 'shadow-lg shadow-current/50' : ''}`}
  />
);