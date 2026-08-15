import React, { useState, useEffect } from 'react';
import { useI18n } from '../../core/i18n';
import { useTheme } from '../../core/theme/ThemeContext';
import { Terminal, Globe, Palette, Menu, X, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import './Navbar.css';

interface NavbarProps {
  onToggleTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleTerminal }) => {
  const { t, language, toggleLanguage } = useI18n();
  const { theme, setTheme, availableThemes } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#skills', label: t.nav.skills },
    { href: '#experience', label: t.nav.experience },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <a href="#" className="navbar-brand">
          <span className="brand-bracket">[</span>
          <span className="brand-name">LBC</span>
          <span className="brand-dot">.</span>
          <span className="brand-title">DEV</span>
          <span className="brand-bracket">]</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Terminal Launcher */}
          <button
            className="control-btn terminal-trigger"
            onClick={onToggleTerminal}
            title={t.hero.openTerminal}
            aria-label="Abrir Terminal CLI"
          >
            <Terminal size={17} />
            <span className="terminal-label">CLI</span>
            <kbd className="kbd-shortcut">`</kbd>
          </button>

          {/* Language Switcher */}
          <button
            className="control-btn"
            onClick={toggleLanguage}
            title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            aria-label="Mudar idioma"
          >
            <Globe size={16} />
            <span className="lang-text">{language.toUpperCase()}</span>
          </button>

          {/* Theme Selector */}
          <div className="theme-selector-wrapper">
            <button
              className="control-btn"
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              title="Alterar Tema"
              aria-label="Selecionar tema"
            >
              <Palette size={16} />
            </button>

            {isThemeMenuOpen && (
              <div className="theme-dropdown glass-panel-elevated animate-scale-up">
                <div className="theme-dropdown-title">Themes</div>
                {availableThemes.map((item) => (
                  <button
                    key={item.id}
                    className={`theme-option ${theme === item.id ? 'active' : ''}`}
                    onClick={() => {
                      setTheme(item.id);
                      setIsThemeMenuOpen(false);
                    }}
                  >
                    <span className="theme-dot" style={{ backgroundColor: item.accentColor }} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <a href="#contact" className="hire-me-link">
            <Button variant="primary" size="sm" icon={<Send size={14} />}>
              {t.nav.hireMe}
            </Button>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer glass-panel-elevated animate-fade-in">
          <div className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-controls-row">
              <button
                className="control-btn"
                onClick={() => {
                  onToggleTerminal();
                  setIsMobileMenuOpen(false);
                }}
              >
                <Terminal size={16} />
                <span>CLI Terminal</span>
              </button>
              <button className="control-btn" onClick={toggleLanguage}>
                <Globe size={16} />
                <span>{language === 'pt' ? 'English' : 'Português'}</span>
              </button>
            </div>
            {/* Theme switcher in mobile drawer */}
            <div className="mobile-theme-row">
              <span className="mobile-theme-title">Tema Visual:</span>
              <div className="mobile-theme-dots">
                {availableThemes.map((item) => (
                  <button
                    key={item.id}
                    className={`mobile-theme-dot-btn ${theme === item.id ? 'active' : ''}`}
                    onClick={() => setTheme(item.id)}
                    title={item.name}
                  >
                    <span className="theme-dot" style={{ backgroundColor: item.accentColor }} />
                    <span>{item.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
