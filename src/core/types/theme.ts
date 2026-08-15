export type ThemeMode = 'dark-obsidian' | 'cyber-matrix' | 'midnight-neon' | 'clean-light';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  accentColor: string;
  bgPreview: string;
  isDark: boolean;
}
