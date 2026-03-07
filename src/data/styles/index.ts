/*
  SynthetixGit – Design System
  --------------------------------
  This file defines the core visual tokens (colours, font families, spacing)
  used throughout the application. The palette uses light, real colours –
  no neon, no gradients – to achieve a premium yet friendly look.
*/

// Primary colour palette (bright, real colours)
export const COLORS = {
  primary: "#4FA8A8",   // soft teal
  secondary: "#FF6F61", // warm coral
  accent: "#6A8D92",    // slate blue‑gray
  background: "#F7F5F2", // light ivory / off‑white
  surface: "#FFFFFF",   // pure white for cards
  textPrimary: "#1F2937", // dark gray for body text
  textSecondary: "#4B5563", // medium gray for secondary text
};

// Font stack – using Google Font Inter (loaded in layout.tsx)
export const FONTS = {
  body: "var(--font-inter)",
  mono: "var(--font-jetbrains)",
};

// Spacing scale (8‑point grid)
export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

// Utility classes – exported for use in CSS modules or tailwind‑like utilities
export const UTILITIES = {
  borderRadius: "0.8rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "all 0.2s ease-in-out",
};

// Export a consolidated theme object
export const THEME = {
  colors: COLORS,
  fonts: FONTS,
  spacing: SPACING,
  utilities: UTILITIES,
};

// Example usage in a component (TSX):
// <div style={{
//   backgroundColor: COLORS.surface,
//   color: COLORS.textPrimary,
//   padding: SPACING.md,
//   borderRadius: UTILITIES.borderRadius,
//   boxShadow: UTILITIES.boxShadow,
// }}>
//   …
// </div>


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
