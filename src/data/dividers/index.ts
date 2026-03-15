/**
 * GitHub Profile Forge — Dividers Library (PDF Section 7 & 10)
 */

export interface DividerItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  markdownSnippet: (themeColor?: string) => string;
}

export const DIVIDERS_LIBRARY: DividerItem[] = [
  {
    id: 'minimal-line',
    name: 'Minimal Line',
    icon: '➖',
    description: 'Clean standard markdown horizontal ruler',
    markdownSnippet: () => '---\n',
  },
  {
    id: 'capsule-glow',
    name: 'Glow Capsule Divider',
    icon: '✨',
    description: 'Animated glowing SVG divider block',
    markdownSnippet: (color = '0a0d12') =>
      `<div align="center">\n  <img src="https://capsule-render.vercel.app/api?type=waving&color=${color}&height=100&section=header" width="100%" />\n</div>\n`,
  },
  {
    id: 'accent-bar',
    name: 'Accent Bar',
    icon: '🔷',
    description: 'Sleek SVG accent line divider',
    markdownSnippet: () =>
      `<div align="center">\n  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%" />\n</div>\n`,
  },
  {
    id: 'dotted-border',
    name: 'Dotted Border',
    icon: '💬',
    description: 'Minimalist dotted line separator',
    markdownSnippet: () => `<div align="center">--------------------------------------------------</div>\n`,
  },
  {
    id: 'snake-wave',
    name: 'Snake Wave',
    icon: '🐍',
    description: 'Contribution green wave divider',
    markdownSnippet: () =>
      `<div align="center">\n  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%" />\n</div>\n`,
  },
];
