import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ThemeMode, ThemeConfig } from '../types/theme';
import { THEMES } from './themes';

interface ThemeContextType {
  theme: ThemeMode;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeMode) => void;
  availableThemes: ThemeConfig[];
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    if (saved && THEMES[saved]) {
      return saved;
    }
    return 'dark-obsidian';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    const keys = Object.keys(THEMES) as ThemeMode[];
    const currentIndex = keys.indexOf(theme);
    const nextTheme = keys[(currentIndex + 1) % keys.length];
    setTheme(nextTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    Object.keys(THEMES).forEach((t) => {
      root.classList.remove(`theme-${t}`);
    });
    root.classList.add(`theme-${theme}`);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    themeConfig: THEMES[theme],
    setTheme,
    availableThemes: Object.values(THEMES),
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
