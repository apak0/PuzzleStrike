import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ControlButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  className?: string;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ 
  icon: Icon, 
  label, 
  className = '',
  ...props 
}) => (
  <button
    {...props}
    className={`p-4 rounded-full bg-purple-500/20 border-2 border-purple-500/50 
      active:bg-purple-500/40 hover:bg-purple-500/30 transition-colors duration-150
      text-white  ${className}`}
    aria-label={label}
  >
    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
  </button>
);