/**
 * SynthetixGit — World-Class Profile Template & Compiler Engine (Phase 2)
 * Supports 15+ rich presets, venom capsule headers, beast mode dashboards,
 * skillicons matrices, LeetCode cards, WakaTime embeds, and interactive widgets.
 *
 * Each template now uses a unique ThemeColorConfig for visually distinct output.
 */

import { BADGE_REGISTRY } from './badge-registry';
import { getThemeColors, type ThemeColorConfig } from './theme-colors';

export type ThemeId =
  | 'github_dark'
  | 'tokyonight'
  | 'dark'
  | 'nord'
  | 'dracula'
  | 'radical'
  | 'cyberpunk'
  | 'synthwave'
  | 'matrix'
  | 'catppuccin'
  | 'solarized';

export type TemplateId =
  | 'beast-mode-neon'
  | 'cyberpunk-glitch'
  | 'dracula-dark'
  | 'nord-frost'
  | 'minimal-monochrome'
  | 'retro-terminal'
  | 'sunset-gradient'
  | 'glassmorphism'
  | 'tokyo-night'
  | 'catppuccin-mocha'
  | 'solarized-dark'
  | 'matrix-green'
  | 'clean-corporate'
  | 'acid-tech'
  | 'synthwave-84';

export const ALL_15_TEMPLATES: { id: TemplateId; name: string; desc: string; icon: string }[] = [
  { id: 'beast-mode-neon', name: 'Beast Mode Neon', desc: 'Capsule venom banner, glowing stats & SkillIcons matrix', icon: '🔥' },
  { id: 'cyberpunk-glitch', name: 'Cyberpunk Glitch', desc: 'Glitch banner, neon matrices, high-intensity graph', icon: '👾' },
  { id: 'dracula-dark', name: 'Dracula Dark', desc: 'Classic Dracula purple/pink gradients & dark cards', icon: '🧛' },
  { id: 'nord-frost', name: 'Nord Frost', desc: 'Nordic icy blue/grey minimalism & crisp typography', icon: '❄️' },
  { id: 'minimal-monochrome', name: 'Minimal Monochrome', desc: 'Black/white ultra-sleek, clean sans typography', icon: '🎯' },
  { id: 'retro-terminal', name: 'Retro Terminal', desc: '8-bit ASCII prompts & green phosphor CRT style', icon: '📟' },
  { id: 'sunset-gradient', name: 'Sunset Gradient', desc: 'Warm orange/pink/purple capsule waves & vibrant badges', icon: '🌅' },
  { id: 'glassmorphism', name: 'Glassmorphism', desc: 'Frosted backdrop cards, blur borders & translucent pills', icon: '💎' },
  { id: 'tokyo-night', name: 'Tokyo Night', desc: 'Deep indigo/cyan aesthetic & neon glow charts', icon: '🌃' },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', desc: 'Pastel lavender/peach/mauve cozy developer palette', icon: '☕' },
  { id: 'solarized-dark', name: 'Solarized Dark', desc: 'Teal/amber balance & terminal-inspired syntax', icon: '☀️' },
  { id: 'matrix-green', name: 'Matrix Green', desc: 'Digital rain vibes, phosphor green glow & hacking stats', icon: '🟩' },
  { id: 'clean-corporate', name: 'Clean Corporate', desc: 'Lead architect enterprise layout with verified metrics', icon: '💼' },
  { id: 'acid-tech', name: 'Acid Tech', desc: 'High-voltage lime & electric purple cyber aesthetic', icon: '⚡' },
  { id: 'synthwave-84', name: 'Synthwave 84', desc: 'Outrun retro grid, neon sunset & 80s chrome badges', icon: '🌴' },
];

export interface ModuleConfig {
  // 1. Capsule / Waving Header
  headerBanner: {
    enabled: boolean;
    headerStyle:
      | 'venom-capsule'
      | 'waving-capsule'
      | 'cartoonish-3d'
      | 'cyberpunk-glitch'
      | 'terminal-prompt'
      | 'handwritten-script'
      | 'minimal';
    title: string;
    subtitle: string;
    typingLines: string[];
    bannerColor: string;
  };

  // Section Divider Engine (Phase 6)
  sectionDivider: {
    enabled: boolean;
    style:
      | 'rainbow-gradient'
      | 'snake-crawl'
      | 'neon-laser-shimmer'
      | 'soundwave-eq'
      | 'cyber-circuit'
      | 'particle-sparkle'
      | 'retro-dashed-terminal'
      | 'curved-wave'
      | 'markdown-line';
  };

  // 2. Beast Mode Multi-Column Stats Dashboard
  beastModeDashboard: {
    enabled: boolean;
    showProfileViews: boolean;
    showGrowthMetrics: boolean;
    showOpenToWork: boolean;
    showHireMe: boolean;
    showStreakCard: boolean;
    showWakaTime: boolean;
    email: string;
  };

  // 3. GitHub Summary & Multi-Card Analytics
  githubAnalytics: {
    enabled: boolean;
    showProfileDetailsCard: boolean;
    showReposPerLanguage: boolean;
    showMostCommitLanguage: boolean;
    showStatsCard: boolean;
    showActivityWave: boolean;
    showTrophies: boolean;
    showNextAchievements: boolean;
  };

  // 4. Education, Academic Journey & LeetCode
  educationAndSkills: {
    enabled: boolean;
    institutionName: string;
    institutionColor: string;
    skillIcons: string[]; // skillicons.dev slugs
    additionalBadges: { name: string; color: string; logo: string }[];
    showWakaTimeDropdown: boolean;
    wakaTimeShareSvgUrl?: string;
    showTopLangsPie: boolean;
    showLeetCodeCard: boolean;
    leetCodeUsername?: string;
  };

  // 5. Technology Arsenal Matrix (80x80 table)
  techArsenal: {
    enabled: boolean;
    items: {
      name: string;
      iconUrl: string;
      levelBadge: string;
      levelColor: string;
    }[];
  };

  // 6. About Me & Facts
  aboutMe: {
    enabled: boolean;
    bioText: string;
    quickFacts: {
      currentWork: string;
      learning: string;
      collaborate: string;
      askMe: string;
      reachMe: string;
      funFact: string;
    };
    showLocation: boolean;
    showCompany: boolean;
    showBlog: boolean;
  };

  // 7. Tech Stack Badges (Categorized Shields)
  techStack: {
    enabled: boolean;
    style: 'for-the-badge' | 'flat-square' | 'flat';
    categorize: boolean;
    badges: string[];
  };

  // 8. Featured Projects
  featuredRepos: {
    enabled: boolean;
    repos: {
      name: string;
      description?: string | null;
      url: string;
      stargazerCount: number;
      primaryLanguage?: { name: string; color: string } | null;
    }[];
  };

  // 9. Interactive Breakout / Snake Game
  gameSuite: {
    enabled: boolean;
    gameType: 'breakout' | 'snake' | 'pacman';
    motto: string;
  };

  // 10. Social & Connect Matrix
  socialLinks: {
    enabled: boolean;
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    behance: string;
    instagram: string;
    portfolio: string;
    discord: string;
    youtube: string;
    scheduleMeetingUrl: string;
    responseTime: string;
  };

  // 11. Interactive Widgets (Quotes, Mantras, Philosophy, Spotify)
  interactiveWidgets: {
    enabled: boolean;
    showDailyDevQuote: boolean;
    showCodingChallenge: boolean;
    showVisitorMap: boolean;
    showPersonalPhilosophy: boolean;
    showSpotify?: boolean;
    mantras: string[];
  };

  // 12. Footer
  footer: {
    enabled: boolean;
    footerStyle: 'waving-capsule' | 'minimal' | 'custom-badge';
    closingText: string;
    showVisitorBadge: boolean;
    authorName: string;
    statusBadgeText: string;
  };

  // Section Ordering (Block Builder)
  sectionOrder?: string[];
}

export interface ProfileConfig {
  username: string;
  templateId: TemplateId;
  theme: ThemeId;
  modules: ModuleConfig;
  profileData?: {
    name?: string;
    bio?: string | null;
    location?: string | null;
    company?: string | null;
    blog?: string | null;
    avatarUrl?: string;
    followers?: number;
    publicRepos?: number;
    createdAt?: string;
  };
}

export function createDefaultModules(): ModuleConfig {
  return {
    headerBanner: {
      enabled: true,
      headerStyle: 'venom-capsule',
      title: 'Nurul Shaikh',
      subtitle: 'Full-Stack & MERN Developer',
      typingLines: [
        'Diploma in Computer Student @ VidhyaDeep University 🎓',
        'Frontend Ninja ⚡ Backend Explorer 🔍',
        'JavaScript Enthusiast 💻 DSA Master 🏆',
        'Building scalable web platforms 🚀',
      ],
      bannerColor: 'gradient',
    },
    sectionDivider: {
      enabled: true,
      style: 'rainbow-gradient',
    },
    beastModeDashboard: {
      enabled: true,
      showProfileViews: true,
      showGrowthMetrics: true,
      showOpenToWork: true,
      showHireMe: true,
      showStreakCard: true,
      showWakaTime: true,
      email: 'shaikhnurul8200@gmail.com',
    },
    githubAnalytics: {
      enabled: true,
      showProfileDetailsCard: true,
      showReposPerLanguage: true,
      showMostCommitLanguage: true,
      showStatsCard: true,
      showActivityWave: true,
      showTrophies: true,
      showNextAchievements: true,
    },
    educationAndSkills: {
      enabled: true,
      institutionName: 'VidhyaDeep_University',
      institutionColor: '6a11cb',
      skillIcons: [
        'git', 'github', 'html', 'css', 'js', 'jquery', 'bootstrap', 'tailwind',
        'nodejs', 'express', 'mongodb', 'mysql', 'c', 'cpp', 'python', 'figma',
        'ai', 'ps', 'vercel', 'netlify', 'vscode', 'atom', 'vite', 'powershell',
        'npm', 'bun', 'yarn', 'notion', 'svg', 'bash', 'markdown', 'ts', 'replit'
      ],
      additionalBadges: [
        { name: 'TRAE', color: '3a7bd5', logo: 'visualstudiocode' },
        { name: 'Qoder', color: '2c3e50', logo: 'visualstudiocode' },
        { name: 'EJS', color: '4a4a55', logo: 'ejs' },
        { name: 'MJS', color: 'FF6B6B', logo: 'javascript' },
        { name: 'Render', color: '46a3b7', logo: 'render' },
      ],
      showWakaTimeDropdown: true,
      wakaTimeShareSvgUrl: 'https://wakatime.com/share/@__https_shivu/1e3ecda4-24d6-47c5-bc37-a11c044df727.svg',
      showTopLangsPie: true,
      showLeetCodeCard: true,
      leetCodeUsername: 'Fr_Nurul',
    },
    techArsenal: {
      enabled: true,
      items: [
        { name: 'JavaScript', iconUrl: 'https://techstack-generator.vercel.app/js-icon.svg', levelBadge: 'ES6+', levelColor: '6a11cb' },
        { name: 'C++', iconUrl: 'https://techstack-generator.vercel.app/cpp-icon.svg', levelBadge: 'DSA', levelColor: '2575fc' },
        { name: 'Python', iconUrl: 'https://techstack-generator.vercel.app/python-icon.svg', levelBadge: '3.x', levelColor: '6a11cb' },
        { name: 'MySQL', iconUrl: 'https://techstack-generator.vercel.app/mysql-icon.svg', levelBadge: 'Database', levelColor: '2575fc' },
        { name: 'React', iconUrl: 'https://techstack-generator.vercel.app/react-icon.svg', levelBadge: 'Learning', levelColor: '6a11cb' },
        { name: 'Docker', iconUrl: 'https://techstack-generator.vercel.app/docker-icon.svg', levelBadge: 'Future', levelColor: '2575fc' },
        { name: 'AWS', iconUrl: 'https://techstack-generator.vercel.app/aws-icon.svg', levelBadge: 'Cloud', levelColor: '6a11cb' },
        { name: 'GitHub', iconUrl: 'https://techstack-generator.vercel.app/github-icon.svg', levelBadge: 'Expert', levelColor: 'FFD700' },
        { name: 'REST API', iconUrl: 'https://techstack-generator.vercel.app/restapi-icon.svg', levelBadge: 'Core', levelColor: '2575fc' },
        { name: 'Nginx', iconUrl: 'https://techstack-generator.vercel.app/nginx-icon.svg', levelBadge: 'DevOps', levelColor: '6a11cb' },
      ],
    },
    aboutMe: {
      enabled: true,
      bioText: 'I am a Full Stack Developer. Passionate about building high-performance web applications and mastering Data Structures & Algorithms.',
      quickFacts: {
        currentWork: 'Full-Stack MERN Projects & Cloud Architectures',
        learning: 'System Design, Microservices, and Advanced TypeScript',
        collaborate: 'Open Source Developer Tools & Full Stack Apps',
        askMe: 'JavaScript, Node.js, Express, MongoDB, C++',
        reachMe: 'shaikhnurul8200@gmail.com',
        funFact: 'Talk is cheap. Show me the code! ⚡',
      },
      showLocation: true,
      showCompany: true,
      showBlog: true,
    },
    techStack: {
      enabled: true,
      style: 'for-the-badge',
      categorize: true,
      badges: ['javascript', 'typescript', 'react', 'nextdotjs', 'nodedotjs', 'express', 'mongodb', 'tailwindcss', 'git', 'docker'],
    },
    featuredRepos: {
      enabled: true,
      repos: [],
    },
    gameSuite: {
      enabled: true,
      gameType: 'breakout',
      motto: '“Code. Commit. Conquer. — My journey, my style.”',
    },
    socialLinks: {
      enabled: true,
      github: 'Dev-Nurul08',
      linkedin: 'nurul-shaikh-44b41838b',
      twitter: '',
      email: 'shaikhnurul8200@gmail.com',
      behance: 'NurulShaikh2',
      instagram: '_fr.nurull',
      portfolio: '',
      discord: '',
      youtube: '',
      scheduleMeetingUrl: 'https://calendar.google.com',
      responseTime: '< 24 hours',
    },
    interactiveWidgets: {
      enabled: true,
      showDailyDevQuote: true,
      showCodingChallenge: true,
      showVisitorMap: true,
      showPersonalPhilosophy: true,
      mantras: [
        '💡 "Innovation happens at the intersection of curiosity and code"',
        '🎯 "Focus on progress, not perfection"',
        '🔥 "Build it, break it, make it better"',
        '⚡ "Learn in public, fail in private, succeed everywhere"',
      ],
    },
    footer: {
      enabled: true,
      footerStyle: 'waving-capsule',
      closingText: 'Thanks for visiting!',
      showVisitorBadge: true,
      authorName: 'Nurul Shaikh',
      statusBadgeText: 'Status-Beast Mode ON',
    },
    sectionOrder: [
      'header',
      'beastMode',
      'analytics',
      'education',
      'arsenal',
      'activity',
      'trophies',
      'game',
      'about',
      'social',
      'widgets',
      'footer',
    ],
  };
}

export const DEFAULT_SECTION_ORDER = [
  'header',
  'beastMode',
  'analytics',
  'education',
  'arsenal',
  'activity',
  'trophies',
  'game',
  'about',
  'social',
  'widgets',
  'footer',
];

function renderDivider(modules: ModuleConfig, tc: ThemeColorConfig): string {
  if (!modules.sectionDivider || !modules.sectionDivider.enabled || modules.sectionDivider.style === 'markdown-line') {
    return '---';
  }
  const style = modules.sectionDivider.style || tc.dividerStyle || 'rainbow-gradient';
  
  if (style === 'retro-dashed-terminal') {
    return '```\n────────────────────────────────────────────────────────────────────────────\n```';
  }
  if (style === 'cyber-circuit' || style === 'neon-laser-shimmer') {
    return `<img src="https://capsule-render.vercel.app/api?type=slice&color=${tc.capsule.color}&customColorList=${tc.capsule.customColorList || '0,2,4,6,30'}&height=4&section=header" width="100%" alt="Section Divider" />`;
  }
  if (style === 'curved-wave') {
    return `<img src="https://capsule-render.vercel.app/api?type=waving&color=${tc.capsule.color}&customColorList=${tc.capsule.customColorList || '12,14,16,18,20'}&height=6&section=header" width="100%" alt="Section Divider" />`;
  }
  return `<img src="https://capsule-render.vercel.app/api?type=rect&color=${tc.capsule.color}&customColorList=${tc.capsule.customColorList || '1,2,4,5,40'}&height=4&section=header" width="100%" alt="Section Divider" />`;
}

export function generateProfileMarkdown(config: ProfileConfig): string {
  return compileProfile(config).markdown;
}

export function compileProfile(config: ProfileConfig): { markdown: string; workflowYaml?: string } {
  const { username, templateId, modules } = config;
  const user = username || 'Dev-Nurul08';
  const tc = getThemeColors(templateId || 'beast-mode-neon');
  const divider = renderDivider(modules, tc);

  const lines: string[] = [];
  lines.push('<div align="center">');
  lines.push('');

  const order = modules.sectionOrder && modules.sectionOrder.length > 0
    ? modules.sectionOrder
    : DEFAULT_SECTION_ORDER;

  // Build section renderers
  const sectionRenderers: Record<string, () => string[]> = {
    // ── 1. Capsule Header ──
    header: () => {
      if (!modules.headerBanner.enabled) return [];
      const secLines: string[] = [];
      const titleEnc = encodeURIComponent(modules.headerBanner.title || user);
      const subEnc = encodeURIComponent(modules.headerBanner.subtitle || 'Full-Stack Developer');
      const hStyle = modules.headerBanner.headerStyle;
      const c = tc.capsule;

      if (hStyle === 'venom-capsule' || (!hStyle && c.type === 'venom')) {
        secLines.push(`  <img src="https://capsule-render.vercel.app/api?type=venom&color=${c.color}&customColorList=${c.customColorList || '1,2,4,5,40'}&height=250&section=header&text=${titleEnc}&fontSize=65&animation=${c.animation}&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=${encodeURIComponent(c.font)}&descFont=${encodeURIComponent(c.descFont)}&textColor=${c.textColor}&descColor=${c.descColor}&borderRadius=25" width="100%" alt="Header Banner" />`);
      } else if (hStyle === 'waving-capsule' || (!hStyle && c.type === 'waving')) {
        secLines.push(`  <img src="https://capsule-render.vercel.app/api?type=waving&color=${c.color}&customColorList=${c.customColorList || '1,2,4,5,40'}&height=220&section=header&text=${titleEnc}&fontSize=50&animation=${c.animation}&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=${encodeURIComponent(c.font)}&descFont=${encodeURIComponent(c.descFont)}&textColor=${c.textColor}&descColor=${c.descColor}" width="100%" alt="Header Banner" />`);
      } else if (hStyle === 'cartoonish-3d' || hStyle === 'cyberpunk-glitch' || (!hStyle && c.type === 'slice')) {
        secLines.push(`  <img src="https://capsule-render.vercel.app/api?type=slice&color=${c.color}&customColorList=${c.customColorList || '0,2,4,6,30'}&height=230&section=header&text=${titleEnc}&fontSize=60&animation=${c.animation}&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=${encodeURIComponent(c.font)}&descFont=${encodeURIComponent(c.descFont)}&textColor=${c.textColor}&descColor=${c.descColor}" width="100%" alt="Header Banner" />`);
      } else if (hStyle === 'terminal-prompt' || (!hStyle && c.type === 'cylinder')) {
        secLines.push(`  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=${c.color}&height=200&section=header&text=${titleEnc}&fontSize=55&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=${encodeURIComponent(c.font)}&descFont=${encodeURIComponent(c.descFont)}&textColor=${c.textColor}&descColor=${c.descColor}" width="100%" alt="Terminal Header" />`);
      } else if (hStyle === 'handwritten-script' || (!hStyle && c.type === 'soft')) {
        secLines.push(`  <img src="https://capsule-render.vercel.app/api?type=soft&color=${c.color}&customColorList=${c.customColorList || '10,20,30,40'}&height=220&section=header&text=${titleEnc}&fontSize=55&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=${encodeURIComponent(c.font)}&descFont=${encodeURIComponent(c.descFont)}&textColor=${c.textColor}&descColor=${c.descColor}" width="100%" alt="Signature Header" />`);
      } else {
        secLines.push(`  <h1>${modules.headerBanner.title || user}</h1>`);
        secLines.push(`  <p><em>${modules.headerBanner.subtitle}</em></p>`);
      }

      secLines.push('');

      // Typing SVG lines
      if (modules.headerBanner.typingLines.length > 0) {
        const typingParam = encodeURIComponent(modules.headerBanner.typingLines.join(';'));
        secLines.push('  <!-- Animated Profile Typing Header -->');
        secLines.push('  <div align="center">');
        secLines.push(`    <img src="https://readme-typing-svg.demolab.com?font=${encodeURIComponent(tc.typingSvgFont)}&weight=900&size=25&duration=3000&pause=1000&color=${tc.typingSvgColor}&center=true&vCenter=true&multiline=true&width=800&height=100&lines=${typingParam}" alt="Typing SVG" />`);
        secLines.push('  </div>');
        secLines.push('');
      }

      return secLines;
    },

    // ── 2. Beast Mode Multi-Column Stats Dashboard ──
    beastMode: () => {
      if (!modules.beastModeDashboard.enabled) return [];
      const secLines: string[] = [];
      secLines.push('  <!-- BEAST MODE STATS DASHBOARD: Live Multi-Column Matrix -->');
      secLines.push('  <div align="center">');
      secLines.push(`    <h2 align="center" style="font-family: '${tc.capsule.font}', sans-serif; color: #${tc.statsOverrides.titleColor}; margin: 20px 0;">`);
      secLines.push('      📊 Live Performance Dashboard');
      secLines.push('    </h2>');
      secLines.push('    <table style="width: 100%; border-collapse: collapse; margin: 20px 0">');
      secLines.push('      <tr>');

      if (modules.beastModeDashboard.showProfileViews) {
        secLines.push(`        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #${tc.statsOverrides.titleColor}, #${tc.statsOverrides.iconColor}); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #${tc.statsOverrides.titleColor};">`);
        secLines.push(`          <img src="https://komarev.com/ghpvc/?username=${user}&color=${tc.statsOverrides.titleColor}&style=flat-square&label=Profile%20Views" alt="Profile Views" />`);
        secLines.push(`          <br /><strong style="color: #${tc.statsOverrides.textColor}; font-family: '${tc.capsule.font}'">🚀 Live Counter</strong>`);
        secLines.push('        </td>');
      }

      if (modules.beastModeDashboard.showGrowthMetrics) {
        secLines.push(`        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #${tc.statsOverrides.iconColor}, #${tc.statsOverrides.titleColor}); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #${tc.statsOverrides.iconColor};">`);
        secLines.push(`          <img src="https://img.shields.io/github/followers/${user}?style=flat-square&color=${tc.statsOverrides.iconColor}&label=Followers&logo=person-add" alt="Followers" />`);
        secLines.push(`          <img src="https://img.shields.io/github/stars/${user}?style=flat-square&color=${tc.statsOverrides.titleColor}&label=Stars&logo=star" alt="Stars" />`);
        secLines.push(`          <br /><strong style="color: #${tc.statsOverrides.textColor}; font-family: '${tc.capsule.font}'">📈 Growth Metrics</strong>`);
        secLines.push('        </td>');
      }

      if (modules.beastModeDashboard.showOpenToWork) {
        secLines.push('        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #00ff7f, #32cd32); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #00ff7f;">');
        secLines.push('          <img src="https://img.shields.io/badge/Open%20to%20Work-✅%20YES-00FF7F?style=flat-square&logo=briefcase" alt="Open to Work" />');
        if (modules.beastModeDashboard.email) {
          secLines.push(`          <br /><a href="mailto:${modules.beastModeDashboard.email}"><img src="https://img.shields.io/badge/Hire%20Me-🚀%20Click%20Here-FF4500?style=flat-square&logo=rocket&logoColor=white" alt="Hire Me" /></a>`);
        }
        secLines.push('          <br /><strong style="color: #000; font-family: \'Fira Code\'">💼 Professional Status</strong>');
        secLines.push('        </td>');
      }

      if (modules.beastModeDashboard.showStreakCard) {
        const s = tc.streak;
        secLines.push(`        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #${tc.statsOverrides.titleColor}, #${tc.statsOverrides.borderColor}); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #${tc.statsOverrides.titleColor};">`);
        secLines.push(`          <img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${tc.statsTheme}&hide_border=true&stroke=${s.stroke}&background=${s.background}&ring=${s.ring}&fire=${s.fire}&currStreakLabel=${s.currStreakLabel}&sideLabels=${s.sideLabels}&dates=${s.dates}" alt="Streak Stats" />`);
        secLines.push(`          <br /><strong style="color: #${tc.statsOverrides.textColor}; font-family: '${tc.capsule.font}'">🔥 Contribution Streak</strong>`);
        secLines.push('        </td>');
      }

      secLines.push('      </tr>');

      if (modules.beastModeDashboard.showWakaTime) {
        secLines.push('      <tr>');
        secLines.push('        <td align="center" colspan="4" style="padding: 10px">');
        secLines.push(`          <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${user}&theme=${tc.statsTheme}&hide_border=true" alt="Practice Time" />`);
        secLines.push('        </td>');
        secLines.push('      </tr>');
      }

      secLines.push('    </table>');
      secLines.push('  </div>');
      secLines.push('');
      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 3. GitHub Summary & Multi-Card Analytics ──
    analytics: () => {
      if (!modules.githubAnalytics.enabled) return [];
      const secLines: string[] = [];
      secLines.push('  <!-- GitHub Account Performance Dashboard -->');
      secLines.push('  <h2 align="center">⚡ GitHub Performance Dashboard</h2>');
      secLines.push('');

      if (modules.githubAnalytics.showProfileDetailsCard) {
        secLines.push('  <div align="center">');
        secLines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${user}&theme=${tc.summaryTheme}" alt="Profile Details" />`);
        secLines.push('  </div>');
        secLines.push('');
      }

      if (modules.githubAnalytics.showReposPerLanguage || modules.githubAnalytics.showMostCommitLanguage || modules.githubAnalytics.showStatsCard) {
        secLines.push('  <div align="center">');
        if (modules.githubAnalytics.showReposPerLanguage) {
          secLines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${user}&theme=${tc.summaryTheme}" width="32%" alt="Repos per Language" />`);
        }
        if (modules.githubAnalytics.showMostCommitLanguage) {
          secLines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${user}&theme=${tc.summaryTheme}" width="32%" alt="Most Commit Language" />`);
        }
        if (modules.githubAnalytics.showStatsCard) {
          secLines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${user}&theme=${tc.summaryTheme}" width="32%" alt="Overall Stats" />`);
        }
        secLines.push('  </div>');
        secLines.push('');
      }

      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 4. Education & Skill Proficiency Journey ──
    education: () => {
      if (!modules.educationAndSkills.enabled) return [];
      const secLines: string[] = [];
      const edu = modules.educationAndSkills;
      secLines.push('  <!-- Education & Skills Journey -->');
      secLines.push('  <h2 align="center">🎓 Education & Skills Journey</h2>');
      secLines.push('');
      secLines.push('  <div align="center">');
      secLines.push('  <table width="100%">');
      secLines.push('    <tr>');
      secLines.push('      <td width="50%" style="vertical-align: top;">');
      secLines.push('        <h3 align="center">📚 Academic Path</h3>');
      secLines.push('        <div align="center">');
      secLines.push(`          <img src="https://img.shields.io/badge/${edu.institutionName || 'University'}-${edu.institutionColor || tc.statsOverrides.titleColor}?style=for-the-badge&logo=graduationcap&logoColor=white" />`);
      secLines.push('          <br /><br />');

      // SkillIcons Dev Grid
      if (edu.skillIcons.length > 0) {
        const chunk1 = edu.skillIcons.slice(0, 30).join(',');
        const chunk2 = edu.skillIcons.slice(30).join(',');
        const iconTheme = tc.statsTheme === 'nord' || tc.statsTheme === 'default' ? 'light' : 'dark';
        secLines.push('          <div style="margin: 20px 0; font-size: 1.1em;">');
        secLines.push(`            <img src="https://skillicons.dev/icons?i=${chunk1}&theme=${iconTheme}" style="height: 54px; margin: 4px;" alt="Skill Icons" />`);
        if (chunk2) {
          secLines.push(`            <img src="https://skillicons.dev/icons?i=${chunk2}&theme=${iconTheme}" style="height: 54px; margin: 4px;" alt="Additional Skill Icons" />`);
        }
        secLines.push('          </div>');
      }

      // Additional Custom Badges
      if (edu.additionalBadges.length > 0) {
        secLines.push('          <h3 align="center">Additional Skills</h3>');
        secLines.push('          <div style="margin: 15px 0;">');
        for (const badge of edu.additionalBadges) {
          secLines.push(`            <img src="https://img.shields.io/badge/${badge.name}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=white" style="height: 30px; margin: 3px;" />`);
        }
        secLines.push('          </div>');
      }

      // WakaTime collapsible progress
      if (edu.showWakaTimeDropdown && edu.wakaTimeShareSvgUrl) {
        secLines.push('          <br />');
        secLines.push('          <details open>');
        secLines.push('            <summary><b>🔍 View Detailed Coding Activity</b></summary>');
        secLines.push('            <br />');
        secLines.push(`            <img src="${edu.wakaTimeShareSvgUrl}" alt="WakaTime Stats" style="border-radius: 12px; box-shadow: 0 0 15px #${tc.statsOverrides.titleColor};" />`);
        secLines.push(`            <br /><strong style="color: #${tc.statsOverrides.titleColor}; font-size: 16px; font-family: 'Fira Code';">⏱️ Coding Activity - Auto-Updates Weekly</strong>`);
        secLines.push('          </details>');
      }

      secLines.push('        </div>');
      secLines.push('      </td>');

      // Right Column: Proficiency Charts & LeetCode
      secLines.push('      <td width="50%" style="vertical-align: top;">');
      secLines.push('        <h3 align="center">🚀 Skill Proficiency & Coding</h3>');
      secLines.push('        <div align="center">');
      if (edu.showTopLangsPie) {
        secLines.push(`          <img width="400" height="300" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=pie&theme=${tc.statsTheme}&hide_border=true" alt="Top Languages Pie" />`);
        secLines.push('          <br />');
      }
      if (edu.showLeetCodeCard && edu.leetCodeUsername) {
        const leetTheme = tc.statsTheme === 'dracula' ? 'dracula' : tc.statsTheme === 'nord' ? 'nord' : 'dark';
        secLines.push(`          <img src="https://leetcard.jacoblin.cool/${edu.leetCodeUsername}?theme=${leetTheme}&font=Karma&ext=heatmap" width="400" alt="LeetCode Stats" />`);
      }
      secLines.push('        </div>');
      secLines.push('      </td>');
      secLines.push('    </tr>');
      secLines.push('  </table>');
      secLines.push('  </div>');
      secLines.push('');
      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 5. Technology Arsenal Matrix (80x80 Grid Table) ──
    arsenal: () => {
      if (!modules.techArsenal.enabled || modules.techArsenal.items.length === 0) return [];
      const secLines: string[] = [];
      secLines.push('  <!-- Technology Arsenal -->');
      secLines.push('  <h2 align="center">🛠️ Technology Arsenal</h2>');
      secLines.push('');
      secLines.push('  <div align="center">');
      secLines.push('    <table>');

      const items = modules.techArsenal.items;
      const rows: typeof items[] = [];
      for (let i = 0; i < items.length; i += 5) {
        rows.push(items.slice(i, i + 5));
      }

      for (const row of rows) {
        secLines.push('      <tr>');
        for (const item of row) {
          secLines.push('        <td align="center" width="110">');
          secLines.push(`          <img src="${item.iconUrl}" alt="${item.name}" width="70" height="70" />`);
          secLines.push(`          <br /><b>${item.name}</b>`);
          secLines.push(`          <br /><img src="https://img.shields.io/badge/${encodeURIComponent(item.levelBadge)}-${item.levelColor || tc.statsOverrides.titleColor}?style=flat-square" />`);
          secLines.push('        </td>');
        }
        secLines.push('      </tr>');
      }

      secLines.push('    </table>');
      secLines.push('  </div>');
      secLines.push('');
      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 6. Advanced GitHub Analytics & Activity Graph ──
    activity: () => {
      if (!modules.githubAnalytics.enabled || !modules.githubAnalytics.showActivityWave) return [];
      const secLines: string[] = [];
      const act = tc.activityGraph;
      const str = tc.streak;
      secLines.push('  <!-- Enhanced GitHub Analytics & Activity -->');
      secLines.push('  <h2 align="center">📊 Advanced GitHub Analytics</h2>');
      secLines.push('');
      secLines.push('  <div align="center">');
      secLines.push(`    <img width="49%" src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&hide_border=true&theme=${tc.statsTheme}" alt="Stats" />`);
      secLines.push(`    <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=${tc.statsTheme}&hide_border=true&stroke=${str.stroke}&background=${str.background}&ring=${str.ring}&fire=${str.fire}&currStreakLabel=${str.currStreakLabel}" alt="Streaks" />`);
      secLines.push('  </div>');
      secLines.push('');
      secLines.push('  <details open>');
      secLines.push('    <summary><b>📈 Contribution Metrics & Intensity</b></summary>');
      secLines.push('    <br />');
      secLines.push('    <div align="center">');
      secLines.push(`      <img src="https://github-readme-activity-graph.vercel.app/graph?username=${user}&bg_color=${act.bgColor}&color=${act.color}&line=${act.line}&point=${act.point}&area=true&hide_border=true&custom_title=Weekly+Code+Intensity&theme=${tc.statsTheme}&border_radius=20&line_width=3&area_color=${act.areaColor}" alt="Activity Graph" />`);
      secLines.push('    </div>');
      secLines.push('  </details>');
      secLines.push('');
      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 7. GitHub Achievement Showcase & Trophies ──
    trophies: () => {
      if (!modules.githubAnalytics.enabled || !modules.githubAnalytics.showTrophies) return [];
      const secLines: string[] = [];
      secLines.push('  <!-- GitHub Achievement Showcase -->');
      secLines.push('  <h2 align="center">🏆 GitHub Achievement Showcase</h2>');
      secLines.push('');
      secLines.push('  <div align="center">');
      secLines.push(`    <img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=${tc.trophyTheme}" alt="GitHub Trophies" />`);
      secLines.push('  </div>');
      secLines.push('');

      if (modules.githubAnalytics.showNextAchievements) {
        secLines.push('  <div align="center">');
        secLines.push('    <h3>🎯 Next Achievements to Unlock</h3>');
        secLines.push(`    <img src="https://img.shields.io/badge/Arctic_Code_Vault_Contributor-2026-${tc.statsOverrides.titleColor}?style=for-the-badge&logo=github" />`);
        secLines.push(`    <img src="https://img.shields.io/badge/300_Days_Streak-In_Progress-${tc.statsOverrides.iconColor}?style=for-the-badge&logo=github" />`);
        secLines.push(`    <img src="https://img.shields.io/badge/Pull_Shark-Coming_Soon-${tc.statsOverrides.borderColor}?style=for-the-badge&logo=github" />`);
        secLines.push('  </div>');
        secLines.push('');
      }

      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 8. Breakout / Snake Game Suite ──
    game: () => {
      if (!modules.gameSuite.enabled) return [];
      const secLines: string[] = [];
      secLines.push('  <!-- 🎮 Interactive Arcade & Contribution Snake -->');
      secLines.push('  <h2 align="center">🎮 GitHub Contribution Snake Game</h2>');
      secLines.push('');
      secLines.push('  <div align="center" style="background: linear-gradient(135deg, #161b22, #0d1117); padding: 20px; border-radius: 16px; margin: 20px 0; border: 1px solid #30363d;">');
      secLines.push('    <picture>');
      secLines.push(`      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg" />`);
      secLines.push(`      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg" />`);
      secLines.push(`      <img alt="GitHub Contribution Snake" src="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg" />`);
      secLines.push('    </picture>');
      secLines.push('    <br />');
      secLines.push(`    <em>${modules.gameSuite.motto || 'Code. Commit. Conquer.'}</em>`);
      secLines.push('  </div>');
      secLines.push('');
      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 9. About Me & Facts ──
    about: () => {
      if (!modules.aboutMe.enabled) return [];
      const secLines: string[] = [];
      secLines.push('  <!-- About Me -->');
      secLines.push('  <h2 align="center">⚡ About Me</h2>');
      secLines.push('');
      if (modules.aboutMe.bioText) {
        secLines.push(`  <p align="center">${modules.aboutMe.bioText}</p>`);
        secLines.push('');
      }

      const qf = modules.aboutMe.quickFacts;
      if (qf.currentWork || qf.learning || qf.collaborate || qf.askMe || qf.reachMe || qf.funFact) {
        secLines.push('  <div align="center">');
        secLines.push('    <table>');
        if (qf.currentWork) secLines.push(`      <tr><td>🔭 I’m currently working on</td><td><b>${qf.currentWork}</b></td></tr>`);
        if (qf.learning) secLines.push(`      <tr><td>🌱 I’m currently learning</td><td><b>${qf.learning}</b></td></tr>`);
        if (qf.collaborate) secLines.push(`      <tr><td>👯 I’m looking to collaborate on</td><td><b>${qf.collaborate}</b></td></tr>`);
        if (qf.askMe) secLines.push(`      <tr><td>💬 Ask me about</td><td><b>${qf.askMe}</b></td></tr>`);
        if (qf.reachMe) secLines.push(`      <tr><td>📫 How to reach me</td><td><b>${qf.reachMe}</b></td></tr>`);
        if (qf.funFact) secLines.push(`      <tr><td>⚡ Fun fact</td><td><b>${qf.funFact}</b></td></tr>`);
        secLines.push('    </table>');
        secLines.push('  </div>');
        secLines.push('');
      }

      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 10. Connect & Social Links ──
    social: () => {
      if (!modules.socialLinks.enabled) return [];
      const secLines: string[] = [];
      const s = modules.socialLinks;
      secLines.push('  <!-- Connect & Collaborate -->');
      secLines.push('  <h2 align="center">🤝 Let\'s Connect & Collaborate</h2>');
      secLines.push('');
      secLines.push('  <div align="center">');

      const bStyle = tc.badgeStyle || 'for-the-badge';
      if (s.github) secLines.push(`    <a href="https://github.com/${s.github}"><img src="https://img.shields.io/badge/GitHub-181717?style=${bStyle}&logo=github&logoColor=white" /></a>`);
      if (s.linkedin) {
        const link = s.linkedin.startsWith('http') ? s.linkedin : `https://www.linkedin.com/in/${s.linkedin}`;
        secLines.push(`    <a href="${link}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=${bStyle}&logo=linkedin&logoColor=white" /></a>`);
      }
      if (s.email) secLines.push(`    <a href="mailto:${s.email}"><img src="https://img.shields.io/badge/Email-EA4335?style=${bStyle}&logo=gmail&logoColor=white" /></a>`);
      if (s.twitter) {
        const tw = s.twitter.startsWith('http') ? s.twitter : `https://x.com/${s.twitter.replace('@', '')}`;
        secLines.push(`    <a href="${tw}"><img src="https://img.shields.io/badge/Twitter%20%2F%20X-000000?style=${bStyle}&logo=x&logoColor=white" /></a>`);
      }
      if (s.behance) secLines.push(`    <a href="https://www.behance.net/${s.behance}"><img src="https://img.shields.io/badge/Behance-1769FF?style=${bStyle}&logo=behance&logoColor=white" /></a>`);
      if (s.instagram) secLines.push(`    <a href="https://www.instagram.com/${s.instagram.replace('@', '')}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=${bStyle}&logo=instagram&logoColor=white" /></a>`);
      if (s.portfolio) secLines.push(`    <a href="${s.portfolio}"><img src="https://img.shields.io/badge/Portfolio-6a11cb?style=${bStyle}&logo=googlechrome&logoColor=white" /></a>`);
      if (s.discord) secLines.push(`    <a href="${s.discord}"><img src="https://img.shields.io/badge/Discord-5865F2?style=${bStyle}&logo=discord&logoColor=white" /></a>`);
      if (s.youtube) secLines.push(`    <a href="${s.youtube}"><img src="https://img.shields.io/badge/YouTube-FF0000?style=${bStyle}&logo=youtube&logoColor=white" /></a>`);

      secLines.push('  </div>');
      secLines.push('');

      if (s.scheduleMeetingUrl || s.responseTime) {
        secLines.push('  <div align="center">');
        if (s.scheduleMeetingUrl) {
          secLines.push(`    <a href="${s.scheduleMeetingUrl}"><img src="https://img.shields.io/badge/Schedule_a_Meeting-4285F4?style=${bStyle}&logo=google-calendar&logoColor=white" /></a>`);
        }
        if (s.responseTime) {
          secLines.push(`    <br /><img src="https://img.shields.io/badge/Response_Time-${encodeURIComponent(s.responseTime)}-brightgreen?style=flat-square" />`);
        }
        secLines.push('  </div>');
        secLines.push('');
      }
      secLines.push(`  ${divider}`);
      secLines.push('');
      return secLines;
    },

    // ── 11. Interactive Widgets ──
    widgets: () => {
      if (!modules.interactiveWidgets.enabled) return [];
      const secLines: string[] = [];

      if (modules.interactiveWidgets.showSpotify) {
        secLines.push('  <!-- 🎵 Spotify Live Music Player -->');
        secLines.push('  <h2 align="center">🎵 Currently Vibing To</h2>');
        secLines.push('  <div align="center">');
        secLines.push('    <img src="https://synthetixgit.vercel.app/api/svg/spotify?track=Deep%20Focus%20%26%20Lofi%20Coding&artist=SynthetixGit%20Vibes" width="450" alt="Spotify Player" />');
        secLines.push('  </div>');
        secLines.push('');
        secLines.push(`  ${divider}`);
        secLines.push('');
      }

      if (modules.interactiveWidgets.showDailyDevQuote) {
        secLines.push('  <!-- Daily Dev Quote -->');
        secLines.push('  <h2>💬 Daily Dev Quote</h2>');
        secLines.push('');
        secLines.push('  <div align="center">');
        secLines.push(`    <img src="https://github-readme-quotes-bay.vercel.app/quote?theme=${tc.statsTheme}&animation=grow_out_in&layout=default&font=Fira%20Code" alt="Dev Quote" />`);
        secLines.push('  </div>');
        secLines.push('');
        secLines.push(`  ${divider}`);
        secLines.push('');
      }

      if (modules.interactiveWidgets.showCodingChallenge) {
        secLines.push('  <!-- Dynamic Coding Challenge -->');
        secLines.push('  <h2 align="center">🧠 Daily Coding Challenge</h2>');
        secLines.push('  <div align="center">');
        secLines.push('    <details>');
        secLines.push('      <summary><b>🎯 Click to reveal today\'s challenge!</b></summary>');
        secLines.push('      <br />');
        secLines.push('      <div id="daily-challenge">');
        secLines.push('        **Challenge: Two Sum Problem**<br />');
        secLines.push('        **Difficulty:** 🟡 Medium<br />');
        secLines.push('        > Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.<br />');
        secLines.push('      </div>');
        secLines.push('    </details>');
        secLines.push('  </div>');
        secLines.push('');
        secLines.push(`  ${divider}`);
        secLines.push('');
      }

      if (modules.interactiveWidgets.showPersonalPhilosophy && modules.interactiveWidgets.mantras.length > 0) {
        secLines.push('  <!-- Dynamic Personal Philosophy -->');
        secLines.push('  <h2 align="center">🌟 Personal Philosophy</h2>');
        secLines.push('');
        secLines.push('  <div align="center">');
        secLines.push('    <blockquote>');
        secLines.push('      <h3>🚀 My Developer Mantras</h3>');
        secLines.push('      <table>');
        for (const mantra of modules.interactiveWidgets.mantras) {
          secLines.push(`        <tr><td>${mantra}</td></tr>`);
        }
        secLines.push('      </table>');
        secLines.push('    </blockquote>');
        secLines.push('  </div>');
        secLines.push('');
        secLines.push(`  ${divider}`);
        secLines.push('');
      }

      return secLines;
    },

    // ── 12. Footer Capsule ──
    footer: () => {
      if (!modules.footer.enabled) return [];
      const secLines: string[] = [];
      const closeEnc = encodeURIComponent(modules.footer.closingText || 'Thanks for visiting!');
      const fc = tc.footerCapsule;
      secLines.push('  <div align="center">');
      secLines.push(`    <img src="https://capsule-render.vercel.app/api?type=${fc.type}&color=${fc.color}&customColorList=${fc.customColorList || '1,2,4,5,40'}&height=150&section=footer&text=${closeEnc}&fontSize=40&fontAlignY=65&animation=twinkling&fontColor=${fc.fontColor}" width="100%" alt="Footer Banner" />`);
      secLines.push('  </div>');
      secLines.push('');
      secLines.push('  <div align="center">');
      secLines.push(`    <img src="https://img.shields.io/badge/Made%20with-❤️-${tc.statsOverrides.titleColor}?style=for-the-badge" />`);
      secLines.push(`    <img src="https://img.shields.io/badge/By-${encodeURIComponent(modules.footer.authorName || user)}-${tc.statsOverrides.iconColor}?style=for-the-badge" />`);
      secLines.push(`    <img src="https://img.shields.io/badge/${encodeURIComponent(modules.footer.statusBadgeText || 'Status-Beast Mode ON')}-${tc.statsOverrides.borderColor}?style=for-the-badge" />`);
      secLines.push('  </div>');
      return secLines;
    },
  };

  // Run in order
  for (const secKey of order) {
    const fn = sectionRenderers[secKey];
    if (fn) {
      lines.push(...fn());
    }
  }

  lines.push('</div>');

  // Snake Actions Workflow YAML
  const workflowYaml = `name: Generate Snake Animation

on:
  schedule:
    - cron: "0 0 * * *"
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Generate Snake Animation
        uses: Platane/snk@v3
        with:
          github_user_name: \${{ github.repository_owner }}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark

      - name: Deploy to Output Branch
        uses: crazy-max/ghaction-github-pages@v3.1.0
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;

  return {
    markdown: lines.join('\n'),
    workflowYaml: modules.gameSuite.enabled ? workflowYaml : undefined,
  };
}
