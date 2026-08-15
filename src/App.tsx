import React, { useState, useEffect } from 'react';
import { I18nProvider } from './core/i18n';
import { ThemeProvider } from './core/theme/ThemeContext';
import { CyberBackground } from './shared/components/CyberBackground';
import { Navbar } from './shared/components/Navbar';
import { Footer } from './shared/components/Footer';
import { HeroSection } from './features/hero/HeroSection';
import { AboutSection } from './features/about/AboutSection';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { SkillsMatrix } from './features/skills/SkillsMatrix';
import { ExperienceTimeline } from './features/experience/ExperienceTimeline';
import { ContactSection } from './features/contact/ContactSection';
import { Terminal } from './features/terminal/Terminal';

const MainLayout: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Global Keyboard Shortcut for Terminal (Backtick ` or Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '`' &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-container">
      {/* Background Interactive Particles & Grid */}
      <CyberBackground />

      {/* Top Navbar */}
      <Navbar onToggleTerminal={() => setIsTerminalOpen((prev) => !prev)} />

      {/* Main Page Content */}
      <main className="content-wrapper">
        <HeroSection onOpenTerminal={() => setIsTerminalOpen(true)} />
        <AboutSection />
        <ProjectsSection />
        <SkillsMatrix />
        <ExperienceTimeline />
        <ContactSection />
      </main>

      {/* Engineering Footer */}
      <Footer />

      {/* Interactive Developer CLI Terminal */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <MainLayout />
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
