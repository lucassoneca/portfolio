import type { ThemeConfig, ThemeMode } from '../types/theme';

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  'dark-obsidian': {
    id: 'dark-obsidian',
    name: 'Dark Obsidian',
    accentColor: '#6366f1',
    bgPreview: '#090d16',
    isDark: true,
  },
  'cyber-matrix': {
    id: 'cyber-matrix',
    name: 'Cyber Matrix',
    accentColor: '#10b981',
    bgPreview: '#05130b',
    isDark: true,
  },
  'midnight-neon': {
    id: 'midnight-neon',
    name: 'Midnight Neon',
    accentColor: '#06b6d4',
    bgPreview: '#070f21',
    isDark: true,
  },
  'clean-light': {
    id: 'clean-light',
    name: 'Clean Light',
    accentColor: '#4f46e5',
    bgPreview: '#f8fafc',
    isDark: false,
  },
};
