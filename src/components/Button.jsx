import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
