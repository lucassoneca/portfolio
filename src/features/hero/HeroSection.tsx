import React from 'react';
import { useI18n } from '../../core/i18n';
import { profileData } from '../../data/profileData';
import { Terminal, User, ArrowRight, MessageSquare, Server, Layout, Shield, GraduationCap } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { Card } from '../../shared/ui/Card';
import './HeroSection.css';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const { t } = useI18n();

  return (
    <section id="hero" className="hero-section">
      <div className="section-container hero-container">
        {/* Education & Domain Badge */}
        <div className="hero-badge-container animate-fade-in">
          <Badge variant="cyan" size="md" icon={<GraduationCap size={15} />}>
            Análise e Desenvolvimento de Sistemas (ADS)
          </Badge>
        </div>

        {/* Main Headline */}
        <div className="hero-text-content">
          <p className="hero-greeting animate-fade-in">
            {t.hero.greeting} <span className="highlight-name">{profileData.name}</span>
          </p>
          <h1 className="hero-headline text-gradient animate-fade-in">
            {t.hero.headline}
          </h1>
          <p className="hero-subheadline animate-fade-in">
            {profileData.age} anos • {t.hero.subheadline}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="hero-cta-group animate-fade-in">
          <a href="#projects">
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
              {t.hero.viewProjects}
            </Button>
          </a>

          <a href="#about">
            <Button variant="secondary" size="lg" icon={<User size={18} />}>
              {t.hero.aboutMe}
            </Button>
          </a>

          <Button variant="cyber" size="lg" icon={<Terminal size={18} />} onClick={onOpenTerminal}>
            {t.hero.openTerminal}
          </Button>

          <a href="#contact">
            <Button variant="outline" size="lg" icon={<MessageSquare size={18} />}>
              {t.nav.contact}
            </Button>
          </a>
        </div>

        {/* Interactive Stats Grid */}
        <div className="hero-stats-grid">
          {profileData.stats.map((stat) => (
            <Card key={stat.id} variant="glass" className="stat-card">
              <div className="stat-value text-gradient">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              {stat.sublabel && <div className="stat-sublabel">{stat.sublabel}</div>}
            </Card>
          ))}
        </div>

        {/* Engineering Philosophy Pillars */}
        <div className="hero-pillars">
          <div className="pillar-item">
            <Server size={16} className="pillar-icon" />
            <span>APIs RESTful, Java / Spring & Node.js</span>
          </div>
          <div className="pillar-item">
            <Layout size={16} className="pillar-icon" />
            <span>Sites & Landing Pages Modernas</span>
          </div>
          <div className="pillar-item">
            <Shield size={16} className="pillar-icon" />
            <span>Clean Code, SOLID & Bancos SQL</span>
          </div>
        </div>
      </div>
    </section>
  );
};
