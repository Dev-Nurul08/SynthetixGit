/**
 * GitHub Profile Forge — Style Library (PDF Section 9)
 * 50–60+ visual styles grouped into visual families
 */

export interface StylePreset {
  id: string;
  family: 'Minimal' | 'Developer' | 'Neon' | 'Animated' | 'Gaming' | 'Professional' | 'Nature/Space';
  name: string;
  description: string;
  themeId: string;
  headerStyle: string;
}

export const STYLE_FAMILIES = [
  { id: 'Minimal', label: 'Clean, professional, monochrome' },
  { id: 'Developer', label: 'Terminal, code, matrix, CLI-inspired' },
  { id: 'Neon', label: 'Glow, cyber, synthwave, futuristic' },
  { id: 'Animated', label: 'Particles, waves, moving gradients' },
  { id: 'Gaming', label: 'Arcade, pixel, console, achievement-inspired' },
  { id: 'Professional', label: 'Corporate, recruiter-friendly, elegant' },
  { id: 'Nature/Space', label: 'Cosmic, aurora, ocean, forest, atmospheric' },
];

export const STYLE_PRESETS: StylePreset[] = [
  // Minimal
  { id: 'minimal-slate', family: 'Minimal', name: 'Monochrome Slate', description: 'Clean, compact monochrome treatment for senior engineers', themeId: 'github_dark', headerStyle: 'minimal' },
  { id: 'minimal-nord', family: 'Minimal', name: 'Nordic Snow', description: 'Subtle icy cool tones with compact badges', themeId: 'nord', headerStyle: 'minimal' },

  // Developer
  { id: 'terminal-cli', family: 'Developer', name: 'Terminal Shell', description: 'CLI-inspired green prompt cursor and monospace fonts', themeId: 'dracula', headerStyle: 'terminal-prompt' },
  { id: 'matrix-green', family: 'Developer', name: 'Matrix Code Stream', description: 'Cyber green code rain aesthetic', themeId: 'github_dark', headerStyle: 'cyberpunk-glitch' },

  // Neon
  { id: 'cyber-glitch', family: 'Neon', name: 'Cyberpunk Glitch', description: 'Futuristic geometric sliced neon header banner', themeId: 'tokyonight', headerStyle: 'cyberpunk-glitch' },
  { id: 'synthwave-glow', family: 'Neon', name: 'Synthwave Glow', description: 'Vibrant neon purple and cyan glow aesthetic', themeId: 'catppuccin', headerStyle: 'venom-capsule' },

  // Animated
  { id: 'wave-motion', family: 'Animated', name: 'Smooth Wave Motion', description: 'Animated twinkling capsule header and glowing dividers', themeId: 'github_dark', headerStyle: 'waving-capsule' },

  // Gaming
  { id: 'arcade-snake', family: 'Gaming', name: 'Arcade Snake Runner', description: 'Playable contribution snake banner and trophy cards', themeId: 'github_dark', headerStyle: 'venom-capsule' },

  // Professional
  { id: 'recruiter-ready', family: 'Professional', name: 'Recruiter Showcase', description: 'High-impact resume layout highlighting metrics and experience', themeId: 'github_dark', headerStyle: 'waving-capsule' },

  // Nature/Space
  { id: 'cosmic-aurora', family: 'Nature/Space', name: 'Cosmic Aurora', description: 'Deep space purple and starry background styling', themeId: 'tokyonight', headerStyle: 'venom-capsule' },
];
