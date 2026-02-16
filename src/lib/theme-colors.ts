/**
 * SynthetixGit — Per-Template Theme Color Configuration
 * Each of the 15 templates maps to a unique set of colors for
 * capsule-render, github-readme-stats, streak-stats, activity-graph,
 * trophies, profile-summary-cards, and section dividers.
 *
 * This fixes the issue where all 15 templates produced visually identical output.
 */

import type { TemplateId } from './template-engine';

export interface ThemeColorConfig {
  /** capsule-render parameters */
  capsule: {
    type: 'venom' | 'waving' | 'slice' | 'cylinder' | 'soft' | 'rect' | 'shark' | 'egg';
    color: string;          // gradient or hex
    customColorList?: string;
    textColor: string;
    descColor: string;
    font: string;
    descFont: string;
    animation: string;
  };
  /** github-readme-stats theme name */
  statsTheme: string;
  /** Custom stat card overrides (when theme doesn't match) */
  statsOverrides: {
    titleColor: string;
    iconColor: string;
    bgColor: string;
    textColor: string;
    borderColor: string;
  };
  /** github-readme-streak-stats colors */
  streak: {
    ring: string;
    fire: string;
    currStreakLabel: string;
    sideLabels: string;
    dates: string;
    background: string;
    stroke: string;
  };
  /** github-readme-activity-graph colors */
  activityGraph: {
    bgColor: string;
    color: string;
    line: string;
    point: string;
    areaColor: string;
  };
  /** github-profile-trophy theme */
  trophyTheme: string;
  /** profile-summary-cards theme */
  summaryTheme: string;
  /** Typing SVG color */
  typingSvgColor: string;
  typingSvgFont: string;
  /** Section divider default style */
  dividerStyle: string;
  /** Footer capsule colors */
  footerCapsule: {
    type: string;
    color: string;
    customColorList?: string;
    fontColor: string;
  };
  /** Badge style */
  badgeStyle: 'for-the-badge' | 'flat-square' | 'flat' | 'plastic';
}

export const THEME_COLOR_CONFIGS: Record<TemplateId, ThemeColorConfig> = {
  'beast-mode-neon': {
    capsule: {
      type: 'venom',
      color: 'gradient',
      customColorList: '1,2,4,5,40',
      textColor: 'FF4500',
      descColor: '00FF7F',
      font: 'Fira Code',
      descFont: 'Roboto',
      animation: 'twinkling',
    },
    statsTheme: 'radical',
    statsOverrides: { titleColor: 'FF4500', iconColor: '00FF7F', bgColor: '0d1117', textColor: 'ffffff', borderColor: '8A2387' },
    streak: { ring: '00FFFF', fire: 'FF4500', currStreakLabel: '8A2BE2', sideLabels: '00FF7F', dates: '8A2BE2', background: '0d1117', stroke: '0000' },
    activityGraph: { bgColor: '0d1117', color: '8A2387', line: '2575fc', point: '8A2387', areaColor: '2575fc' },
    trophyTheme: 'radical',
    summaryTheme: 'github_dark',
    typingSvgColor: '00FFFF',
    typingSvgFont: 'Orbitron',
    dividerStyle: 'rainbow-gradient',
    footerCapsule: { type: 'waving', color: 'gradient', customColorList: '1,2,4,5,40', fontColor: 'fff' },
    badgeStyle: 'for-the-badge',
  },

  'cyberpunk-glitch': {
    capsule: {
      type: 'slice',
      color: 'gradient',
      customColorList: '0,2,4,6,30',
      textColor: '00FFFF',
      descColor: '39D353',
      font: 'Orbitron',
      descFont: 'Fira Code',
      animation: 'fadeIn',
    },
    statsTheme: 'radical',
    statsOverrides: { titleColor: '00FFFF', iconColor: 'FF00FF', bgColor: '0a0a0a', textColor: '00ff41', borderColor: 'FF00FF' },
    streak: { ring: 'FF00FF', fire: '00FFFF', currStreakLabel: '39D353', sideLabels: 'FF00FF', dates: '00FFFF', background: '0a0a0a', stroke: 'FF00FF' },
    activityGraph: { bgColor: '0a0a0a', color: '00FFFF', line: 'FF00FF', point: '00FFFF', areaColor: 'FF00FF' },
    trophyTheme: 'matrix',
    summaryTheme: 'radical',
    typingSvgColor: 'FF00FF',
    typingSvgFont: 'Orbitron',
    dividerStyle: 'neon-laser-shimmer',
    footerCapsule: { type: 'slice', color: 'gradient', customColorList: '0,2,4,6,30', fontColor: '00FFFF' },
    badgeStyle: 'flat-square',
  },

  'dracula-dark': {
    capsule: {
      type: 'waving',
      color: 'gradient',
      customColorList: '12,14,16,18,20',
      textColor: 'BD93F9',
      descColor: 'FF79C6',
      font: 'Fira Code',
      descFont: 'Roboto',
      animation: 'twinkling',
    },
    statsTheme: 'dracula',
    statsOverrides: { titleColor: 'BD93F9', iconColor: 'FF79C6', bgColor: '282a36', textColor: 'f8f8f2', borderColor: '6272a4' },
    streak: { ring: 'FF79C6', fire: 'FFB86C', currStreakLabel: 'BD93F9', sideLabels: '8BE9FD', dates: '6272a4', background: '282a36', stroke: '6272a4' },
    activityGraph: { bgColor: '282a36', color: 'BD93F9', line: 'FF79C6', point: 'FFB86C', areaColor: 'BD93F9' },
    trophyTheme: 'dracula',
    summaryTheme: 'dracula',
    typingSvgColor: 'BD93F9',
    typingSvgFont: 'Fira Code',
    dividerStyle: 'curved-wave',
    footerCapsule: { type: 'waving', color: 'gradient', customColorList: '12,14,16,18,20', fontColor: 'f8f8f2' },
    badgeStyle: 'for-the-badge',
  },

  'nord-frost': {
    capsule: {
      type: 'soft',
      color: '0:2E3440,100:4C566A',
      textColor: '88C0D0',
      descColor: 'D8DEE9',
      font: 'Roboto',
      descFont: 'Roboto',
      animation: 'fadeIn',
    },
    statsTheme: 'nord',
    statsOverrides: { titleColor: '88C0D0', iconColor: '81A1C1', bgColor: '2E3440', textColor: 'D8DEE9', borderColor: '4C566A' },
    streak: { ring: '88C0D0', fire: 'BF616A', currStreakLabel: '81A1C1', sideLabels: 'A3BE8C', dates: '4C566A', background: '2E3440', stroke: '4C566A' },
    activityGraph: { bgColor: '2E3440', color: '88C0D0', line: '81A1C1', point: 'A3BE8C', areaColor: '5E81AC' },
    trophyTheme: 'nord',
    summaryTheme: 'nord_dark',
    typingSvgColor: '88C0D0',
    typingSvgFont: 'Roboto',
    dividerStyle: 'curved-wave',
    footerCapsule: { type: 'soft', color: '0:2E3440,100:4C566A', fontColor: 'D8DEE9' },
    badgeStyle: 'flat-square',
  },

  'minimal-monochrome': {
    capsule: {
      type: 'rect',
      color: '0:000000,100:1a1a1a',
      textColor: 'FFFFFF',
      descColor: 'AAAAAA',
      font: 'Roboto',
      descFont: 'Roboto',
      animation: 'fadeIn',
    },
    statsTheme: 'dark',
    statsOverrides: { titleColor: 'ffffff', iconColor: 'aaaaaa', bgColor: '000000', textColor: 'dddddd', borderColor: '333333' },
    streak: { ring: 'ffffff', fire: 'aaaaaa', currStreakLabel: 'ffffff', sideLabels: 'aaaaaa', dates: '666666', background: '000000', stroke: '333333' },
    activityGraph: { bgColor: '000000', color: 'ffffff', line: 'aaaaaa', point: 'ffffff', areaColor: '333333' },
    trophyTheme: 'darkhub',
    summaryTheme: 'github_dark',
    typingSvgColor: 'FFFFFF',
    typingSvgFont: 'Inter',
    dividerStyle: 'markdown-line',
    footerCapsule: { type: 'rect', color: '0:000000,100:1a1a1a', fontColor: 'ffffff' },
    badgeStyle: 'flat',
  },

  'retro-terminal': {
    capsule: {
      type: 'cylinder',
      color: '0:0d1117,100:161b22',
      textColor: '38EF7D',
      descColor: '00FFFF',
      font: 'Fira Code',
      descFont: 'Fira Code',
      animation: 'fadeIn',
    },
    statsTheme: 'chartreuse-dark',
    statsOverrides: { titleColor: '38EF7D', iconColor: '00ff41', bgColor: '0d1117', textColor: '00ff41', borderColor: '003300' },
    streak: { ring: '38EF7D', fire: '00ff41', currStreakLabel: '00FFFF', sideLabels: '38EF7D', dates: '006600', background: '0d1117', stroke: '003300' },
    activityGraph: { bgColor: '0d1117', color: '38EF7D', line: '00ff41', point: '38EF7D', areaColor: '003300' },
    trophyTheme: 'matrix',
    summaryTheme: 'github_dark',
    typingSvgColor: '00ff41',
    typingSvgFont: 'Fira Code',
    dividerStyle: 'retro-dashed-terminal',
    footerCapsule: { type: 'cylinder', color: '0:0d1117,100:161b22', fontColor: '38EF7D' },
    badgeStyle: 'flat-square',
  },

  'sunset-gradient': {
    capsule: {
      type: 'waving',
      color: 'gradient',
      customColorList: '24,26,28,30,32',
      textColor: 'FFD700',
      descColor: 'FFFFFF',
      font: 'Poppins',
      descFont: 'Roboto',
      animation: 'twinkling',
    },
    statsTheme: 'sunset-gradient',
    statsOverrides: { titleColor: 'FF6B35', iconColor: 'F7931E', bgColor: '1a0533', textColor: 'FFD1DC', borderColor: 'FF6B6B' },
    streak: { ring: 'FF6B35', fire: 'FF4500', currStreakLabel: 'FFD700', sideLabels: 'FF6B6B', dates: 'F7931E', background: '1a0533', stroke: '0000' },
    activityGraph: { bgColor: '1a0533', color: 'FF6B35', line: 'FF4500', point: 'FFD700', areaColor: 'FF6B6B' },
    trophyTheme: 'juicyfresh',
    summaryTheme: 'solarized_dark',
    typingSvgColor: 'FF6B35',
    typingSvgFont: 'Poppins',
    dividerStyle: 'rainbow-gradient',
    footerCapsule: { type: 'waving', color: 'gradient', customColorList: '24,26,28,30,32', fontColor: 'FFD700' },
    badgeStyle: 'for-the-badge',
  },

  'glassmorphism': {
    capsule: {
      type: 'soft',
      color: 'gradient',
      customColorList: '6,8,10,12,14',
      textColor: 'FFFFFF',
      descColor: 'E2E8F0',
      font: 'Poppins',
      descFont: 'Roboto',
      animation: 'fadeIn',
    },
    statsTheme: 'transparent',
    statsOverrides: { titleColor: 'A78BFA', iconColor: '818CF8', bgColor: '1e1b4b', textColor: 'E2E8F0', borderColor: '4338CA' },
    streak: { ring: 'A78BFA', fire: 'F472B6', currStreakLabel: '818CF8', sideLabels: 'A78BFA', dates: '6366f1', background: '1e1b4b', stroke: '4338CA' },
    activityGraph: { bgColor: '1e1b4b', color: 'A78BFA', line: '818CF8', point: 'F472B6', areaColor: '4338CA' },
    trophyTheme: 'onestar',
    summaryTheme: 'tokyonight',
    typingSvgColor: 'A78BFA',
    typingSvgFont: 'Poppins',
    dividerStyle: 'particle-sparkle',
    footerCapsule: { type: 'soft', color: 'gradient', customColorList: '6,8,10,12,14', fontColor: 'FFFFFF' },
    badgeStyle: 'for-the-badge',
  },

  'tokyo-night': {
    capsule: {
      type: 'waving',
      color: 'gradient',
      customColorList: '2,4,6,8,10',
      textColor: '7AA2F7',
      descColor: 'A9B1D6',
      font: 'JetBrains Mono',
      descFont: 'Roboto',
      animation: 'twinkling',
    },
    statsTheme: 'tokyonight',
    statsOverrides: { titleColor: '7AA2F7', iconColor: 'BB9AF7', bgColor: '1a1b26', textColor: 'A9B1D6', borderColor: '414868' },
    streak: { ring: '7AA2F7', fire: 'FF9E64', currStreakLabel: 'BB9AF7', sideLabels: '7DCFFF', dates: '414868', background: '1a1b26', stroke: '414868' },
    activityGraph: { bgColor: '1a1b26', color: '7AA2F7', line: 'BB9AF7', point: '7DCFFF', areaColor: '414868' },
    trophyTheme: 'tokyonight',
    summaryTheme: 'tokyonight',
    typingSvgColor: '7AA2F7',
    typingSvgFont: 'JetBrains Mono',
    dividerStyle: 'neon-laser-shimmer',
    footerCapsule: { type: 'waving', color: 'gradient', customColorList: '2,4,6,8,10', fontColor: 'A9B1D6' },
    badgeStyle: 'for-the-badge',
  },

  'catppuccin-mocha': {
    capsule: {
      type: 'soft',
      color: 'gradient',
      customColorList: '14,16,18,20,22',
      textColor: 'CBA6F7',
      descColor: 'BAC2DE',
      font: 'Poppins',
      descFont: 'Roboto',
      animation: 'fadeIn',
    },
    statsTheme: 'catppuccin_mocha',
    statsOverrides: { titleColor: 'CBA6F7', iconColor: 'F5C2E7', bgColor: '1E1E2E', textColor: 'CDD6F4', borderColor: '45475A' },
    streak: { ring: 'CBA6F7', fire: 'FAB387', currStreakLabel: 'F5C2E7', sideLabels: 'A6E3A1', dates: '45475A', background: '1E1E2E', stroke: '45475A' },
    activityGraph: { bgColor: '1E1E2E', color: 'CBA6F7', line: 'F5C2E7', point: 'FAB387', areaColor: '45475A' },
    trophyTheme: 'monokai',
    summaryTheme: 'catppuccin_mocha',
    typingSvgColor: 'CBA6F7',
    typingSvgFont: 'Poppins',
    dividerStyle: 'curved-wave',
    footerCapsule: { type: 'soft', color: 'gradient', customColorList: '14,16,18,20,22', fontColor: 'CDD6F4' },
    badgeStyle: 'for-the-badge',
  },

  'solarized-dark': {
    capsule: {
      type: 'cylinder',
      color: '0:002B36,100:073642',
      textColor: '2AA198',
      descColor: '93A1A1',
      font: 'Fira Code',
      descFont: 'Roboto',
      animation: 'fadeIn',
    },
    statsTheme: 'solarized-dark',
    statsOverrides: { titleColor: '2AA198', iconColor: 'B58900', bgColor: '002B36', textColor: '839496', borderColor: '073642' },
    streak: { ring: '2AA198', fire: 'CB4B16', currStreakLabel: 'B58900', sideLabels: '268BD2', dates: '586E75', background: '002B36', stroke: '073642' },
    activityGraph: { bgColor: '002B36', color: '2AA198', line: '268BD2', point: 'B58900', areaColor: '073642' },
    trophyTheme: 'gruvbox',
    summaryTheme: 'solarized_dark',
    typingSvgColor: '2AA198',
    typingSvgFont: 'Fira Code',
    dividerStyle: 'retro-dashed-terminal',
    footerCapsule: { type: 'cylinder', color: '0:002B36,100:073642', fontColor: '93A1A1' },
    badgeStyle: 'flat-square',
  },

  'matrix-green': {
    capsule: {
      type: 'cylinder',
      color: '0:000000,100:003300',
      textColor: '00FF41',
      descColor: '39D353',
      font: 'Fira Code',
      descFont: 'Fira Code',
      animation: 'twinkling',
    },
    statsTheme: 'chartreuse-dark',
    statsOverrides: { titleColor: '00FF41', iconColor: '39D353', bgColor: '000000', textColor: '00ff41', borderColor: '003300' },
    streak: { ring: '39D353', fire: '00FF41', currStreakLabel: '26a641', sideLabels: '00FF41', dates: '003300', background: '000000', stroke: '003300' },
    activityGraph: { bgColor: '000000', color: '00FF41', line: '39D353', point: '00FF41', areaColor: '003300' },
    trophyTheme: 'matrix',
    summaryTheme: 'github_dark',
    typingSvgColor: '00FF41',
    typingSvgFont: 'Fira Code',
    dividerStyle: 'cyber-circuit',
    footerCapsule: { type: 'cylinder', color: '0:000000,100:003300', fontColor: '00FF41' },
    badgeStyle: 'flat-square',
  },

  'clean-corporate': {
    capsule: {
      type: 'waving',
      color: 'gradient',
      customColorList: '0,1,2,3,4',
      textColor: 'FFFFFF',
      descColor: 'E2E8F0',
      font: 'Inter',
      descFont: 'Roboto',
      animation: 'fadeIn',
    },
    statsTheme: 'default',
    statsOverrides: { titleColor: '2563EB', iconColor: '3B82F6', bgColor: 'ffffff', textColor: '1F2937', borderColor: 'E5E7EB' },
    streak: { ring: '2563EB', fire: 'EF4444', currStreakLabel: '3B82F6', sideLabels: '10B981', dates: '6B7280', background: 'ffffff', stroke: 'E5E7EB' },
    activityGraph: { bgColor: 'ffffff', color: '2563EB', line: '3B82F6', point: '2563EB', areaColor: 'DBEAFE' },
    trophyTheme: 'flat',
    summaryTheme: 'default',
    typingSvgColor: '2563EB',
    typingSvgFont: 'Inter',
    dividerStyle: 'markdown-line',
    footerCapsule: { type: 'waving', color: 'gradient', customColorList: '0,1,2,3,4', fontColor: 'FFFFFF' },
    badgeStyle: 'for-the-badge',
  },

  'acid-tech': {
    capsule: {
      type: 'shark',
      color: 'gradient',
      customColorList: '0,3,6,9,12',
      textColor: 'ADFF2F',
      descColor: 'E040FB',
      font: 'Orbitron',
      descFont: 'Fira Code',
      animation: 'twinkling',
    },
    statsTheme: 'merko',
    statsOverrides: { titleColor: 'ADFF2F', iconColor: 'E040FB', bgColor: '0a0a0a', textColor: 'ADFF2F', borderColor: '7B1FA2' },
    streak: { ring: 'ADFF2F', fire: 'E040FB', currStreakLabel: '76FF03', sideLabels: 'ADFF2F', dates: '7B1FA2', background: '0a0a0a', stroke: '7B1FA2' },
    activityGraph: { bgColor: '0a0a0a', color: 'ADFF2F', line: 'E040FB', point: 'ADFF2F', areaColor: '7B1FA2' },
    trophyTheme: 'radical',
    summaryTheme: 'radical',
    typingSvgColor: 'ADFF2F',
    typingSvgFont: 'Orbitron',
    dividerStyle: 'neon-laser-shimmer',
    footerCapsule: { type: 'shark', color: 'gradient', customColorList: '0,3,6,9,12', fontColor: 'ADFF2F' },
    badgeStyle: 'flat-square',
  },

  'synthwave-84': {
    capsule: {
      type: 'waving',
      color: 'gradient',
      customColorList: '20,22,24,26,28',
      textColor: 'FF6AD5',
      descColor: '72F1B8',
      font: 'Orbitron',
      descFont: 'Roboto',
      animation: 'twinkling',
    },
    statsTheme: 'synthwave',
    statsOverrides: { titleColor: 'FF6AD5', iconColor: '72F1B8', bgColor: '2b213a', textColor: 'e2e9ec', borderColor: '7B3F8C' },
    streak: { ring: 'FF6AD5', fire: 'FED766', currStreakLabel: '72F1B8', sideLabels: 'FF6AD5', dates: '7B3F8C', background: '2b213a', stroke: '7B3F8C' },
    activityGraph: { bgColor: '2b213a', color: 'FF6AD5', line: '72F1B8', point: 'FED766', areaColor: '7B3F8C' },
    trophyTheme: 'discord',
    summaryTheme: 'monokai',
    typingSvgColor: 'FF6AD5',
    typingSvgFont: 'Orbitron',
    dividerStyle: 'soundwave-eq',
    footerCapsule: { type: 'waving', color: 'gradient', customColorList: '20,22,24,26,28', fontColor: '72F1B8' },
    badgeStyle: 'for-the-badge',
  },
};

/**
 * Get theme color config for a template, with fallback to beast-mode-neon
 */
export function getThemeColors(templateId: TemplateId): ThemeColorConfig {
  return THEME_COLOR_CONFIGS[templateId] || THEME_COLOR_CONFIGS['beast-mode-neon'];
}
