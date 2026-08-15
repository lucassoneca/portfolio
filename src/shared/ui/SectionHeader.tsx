import React from 'react';
import { Badge } from './Badge';
import './SectionHeader.css';

export interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  subtitle,
  align = 'center',
  className = '',
}) => {
  return (
    <div className={`section-header align-${align} ${className}`}>
      {badge && (
        <div className="section-badge-wrapper">
          <Badge variant="accent" size="md" icon={badgeIcon}>
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="section-title text-gradient">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
};
