import React, { type HTMLAttributes } from 'react';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'elevated' | 'glow';
  hoverEffect?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  hoverEffect = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`card-custom card-${variant} ${hoverEffect ? 'card-hoverable' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
