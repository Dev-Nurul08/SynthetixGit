'use client';

import type { ThemeId } from '@/lib/template-engine';

interface ThemeSwitcherProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

const THEMES: { id: ThemeId; name: string; color: string }[] = [
  { id: 'github_dark', name: 'GitHub Dark', color: '#0d1117' },
  { id: 'tokyonight', name: 'Tokyo Night', color: '#1a1b26' },
  { id: 'dark', name: 'Obsidian', color: '#0a0a0f' },
  { id: 'nord', name: 'Nordic', color: '#2e3440' },
  { id: 'dracula', name: 'Dracula', color: '#282a36' },
  { id: 'radical', name: 'Radical', color: '#141321' },
];

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          type="button"
          onClick={() => onThemeChange(theme.id)}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
            currentTheme === theme.id
              ? 'bg-blue-500/15 border-blue-500/50 text-blue-300'
              : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.06] text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/20" style={{ background: theme.color }} />
          <span className="truncate">{theme.name}</span>
        </button>
      ))}
    </div>
  );
}
