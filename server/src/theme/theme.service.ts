import { Injectable } from '@nestjs/common';

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  headerStyle: string;
  badgeTheme: string;
  statsTheme: string;
  trophyTheme: string;
}

@Injectable()
export class ThemeService {
  private readonly themes: ThemeConfig[] = [
    {
      id: 'github_dark',
      name: 'GitHub Dark',
      description: 'Classic GitHub dark mode — clean and professional.',
      palette: { primary: '#58a6ff', secondary: '#3fb950', accent: '#f78166', background: '#0d1117', text: '#c9d1d9' },
      headerStyle: 'waving-capsule',
      badgeTheme: 'flat-square',
      statsTheme: 'github_dark',
      trophyTheme: 'darkhub',
    },
    {
      id: 'tokyonight',
      name: 'Tokyo Night',
      description: 'Vibrant neon blues and purples inspired by Tokyo Night vim theme.',
      palette: { primary: '#7aa2f7', secondary: '#9ece6a', accent: '#f7768e', background: '#1a1b26', text: '#c0caf5' },
      headerStyle: 'cyberpunk-glitch',
      badgeTheme: 'for-the-badge',
      statsTheme: 'tokyonight',
      trophyTheme: 'tokyonight',
    },
    {
      id: 'dracula',
      name: 'Dracula',
      description: 'Classic Dracula theme — dark with vibrant purple accents.',
      palette: { primary: '#bd93f9', secondary: '#50fa7b', accent: '#ff79c6', background: '#282a36', text: '#f8f8f2' },
      headerStyle: 'terminal-prompt',
      badgeTheme: 'flat',
      statsTheme: 'dracula',
      trophyTheme: 'dracula',
    },
    {
      id: 'nord',
      name: 'Nord',
      description: 'Arctic-inspired cool blues — elegant and minimal.',
      palette: { primary: '#88c0d0', secondary: '#a3be8c', accent: '#bf616a', background: '#2e3440', text: '#d8dee9' },
      headerStyle: 'minimal',
      badgeTheme: 'flat-square',
      statsTheme: 'nord',
      trophyTheme: 'nord',
    },
    {
      id: 'catppuccin',
      name: 'Catppuccin Mocha',
      description: 'Warm pastel tones — soft and easy on the eyes.',
      palette: { primary: '#89b4fa', secondary: '#a6e3a1', accent: '#f38ba8', background: '#1e1e2e', text: '#cdd6f4' },
      headerStyle: 'venom-capsule',
      badgeTheme: 'for-the-badge',
      statsTheme: 'catppuccin_mocha',
      trophyTheme: 'catppuccin',
    },
    {
      id: 'monokai',
      name: 'Monokai Pro',
      description: 'The iconic Monokai palette — timeless for developers.',
      palette: { primary: '#66d9e8', secondary: '#a9dc76', accent: '#ff6188', background: '#2d2a2e', text: '#fcfcfa' },
      headerStyle: 'terminal-prompt',
      badgeTheme: 'flat',
      statsTheme: 'monokai',
      trophyTheme: 'monokai',
    },
    {
      id: 'gruvbox',
      name: 'Gruvbox Dark',
      description: 'Warm retro tones — cozy and distraction-free.',
      palette: { primary: '#83a598', secondary: '#b8bb26', accent: '#fb4934', background: '#282828', text: '#ebdbb2' },
      headerStyle: 'minimal',
      badgeTheme: 'flat-square',
      statsTheme: 'gruvbox',
      trophyTheme: 'gruvbox',
    },
    {
      id: 'solarized_dark',
      name: 'Solarized Dark',
      description: 'Precise tonal relationships for low-contrast reading.',
      palette: { primary: '#268bd2', secondary: '#859900', accent: '#dc322f', background: '#002b36', text: '#839496' },
      headerStyle: 'minimal',
      badgeTheme: 'flat',
      statsTheme: 'solarized-dark',
      trophyTheme: 'flat',
    },
  ];

  findAll(): ThemeConfig[] {
    return this.themes;
  }

  findById(id: string): ThemeConfig | undefined {
    const normalized = id.toLowerCase().replace(/[-_]/g, '');
    return this.themes.find(
      (t) => t.id === id || t.id.toLowerCase().replace(/[-_]/g, '') === normalized
    );
  }
}
