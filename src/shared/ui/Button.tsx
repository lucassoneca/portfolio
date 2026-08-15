import React, { type ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cyber' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <button
      className={`btn-custom btn-${variant} btn-${size} ${isLoading ? 'btn-loading' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="btn-spinner" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span className="btn-content">{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
};
