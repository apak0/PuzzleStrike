import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold rounded-lg transition-all duration-300 transform hover:scale-105';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white hover:from-blue-400 hover:via-indigo-400 hover:to-violet-400 shadow-lg shadow-indigo-500/50',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-3 text-xl',
    lg: 'px-12 py-4 text-2xl'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};