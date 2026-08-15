import React from 'react';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'outline';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  pulse = false,
  className = '',
}) => {
  return (
    <span className={`badge-custom badge-${variant} badge-${size} ${className}`}>
      {pulse && <span className="badge-pulse-dot" />}
      {icon && <span className="badge-icon">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
