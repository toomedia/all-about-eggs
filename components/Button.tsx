import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-[#f6e79e] 
        hover:bg-[#f4e285]
        text-gray-900 
        font-semibold 
        px-8 
        py-4 
        rounded-2xl 
        transition-all 
        duration-300 
        transform 
        hover:scale-105 
        shadow-lg 
        hover:shadow-xl
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        flex items-center justify-center
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </button>
  );
};

export default Button;
