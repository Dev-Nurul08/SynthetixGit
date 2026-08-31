/**
 * SynthetixGit — World-Class Profile Template & Compiler Engine (Phase 2)
 * Supports 15+ rich presets, venom capsule headers, beast mode dashboards,
 * skillicons matrices, LeetCode cards, WakaTime embeds, and interactive widgets.
 */

import { BADGE_REGISTRY } from './badge-registry';

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
  };
}

function renderDivider(modules: ModuleConfig): string {
  if (!modules.sectionDivider || !modules.sectionDivider.enabled || modules.sectionDivider.style === 'markdown-line') {
    return '---';
  }
  return '<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=1,2,4,5,40&height=4&section=header" width="100%" alt="Section Divider" />';
}

export function generateProfileMarkdown(config: ProfileConfig): string {
  return compileProfile(config).markdown;
}

export function compileProfile(config: ProfileConfig): { markdown: string; workflowYaml?: string } {
  const { username, templateId, theme, modules } = config;
  const user = username || 'Dev-Nurul08';
  const divider = renderDivider(modules);

  const lines: string[] = [];

  lines.push('<div align="center">');
  lines.push('');

  // ── 1. Capsule Header ──
  if (modules.headerBanner.enabled) {
    const titleEnc = encodeURIComponent(modules.headerBanner.title || user);
    const subEnc = encodeURIComponent(modules.headerBanner.subtitle || 'Full-Stack Developer');
    
    if (modules.headerBanner.headerStyle === 'venom-capsule') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=venom&color=gradient&customColorList=1,2,4,5,40&height=250&section=header&text=${titleEnc}&fontSize=65&animation=twinkling&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=Fira%20Code&descFont=Roboto&textColor=FF4500&descColor=00FF7F&borderRadius=25" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'waving-capsule') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,2,4,5,40&height=220&section=header&text=${titleEnc}&fontSize=50&animation=twinkling&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Fira%20Code&descFont=Roboto" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'cartoonish-3d' || modules.headerBanner.headerStyle === 'cyberpunk-glitch') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=slice&color=gradient&customColorList=0,2,4,6,30&height=230&section=header&text=${titleEnc}&fontSize=60&animation=fadeIn&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=Orbitron&descFont=Fira%20Code&textColor=00FFFF&descColor=39D353" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'terminal-prompt') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=0:0d1117,100:161b22&height=200&section=header&text=${titleEnc}&fontSize=55&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Fira%20Code&descFont=Roboto&textColor=38EF7D&descColor=00FFFF" width="100%" alt="Terminal Header" />`);
    } else if (modules.headerBanner.headerStyle === 'handwritten-script') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=soft&color=gradient&customColorList=10,20,30,40&height=220&section=header&text=${titleEnc}&fontSize=55&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Kalam&descFont=Roboto&textColor=FFD700&descColor=E2E8F0" width="100%" alt="Signature Header" />`);
    } else {
      lines.push(`  <h1>${modules.headerBanner.title || user}</h1>`);
      lines.push(`  <p><em>${modules.headerBanner.subtitle}</em></p>`);
    }

    lines.push('');

    // Typing SVG lines
    if (modules.headerBanner.typingLines.length > 0) {
      const typingParam = encodeURIComponent(modules.headerBanner.typingLines.join(';'));
      lines.push('  <!-- Animated Profile Typing Header -->');
      lines.push('  <div align="center">');
      lines.push(`    <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=900&size=25&duration=3000&pause=1000&color=gradient&customColorList=0,4,4,8,30&center=true&vCenter=true&multiline=true&width=800&height=100&lines=${typingParam}" alt="Typing SVG" />`);
      lines.push('  </div>');
      lines.push('');
    }
  }

  // ── 2. Beast Mode Stats Dashboard Grid ──
  if (modules.beastModeDashboard.enabled) {
    lines.push('  <!-- BEAST MODE STATS DASHBOARD: Live Multi-Column Matrix -->');
    lines.push('  <div align="center">');
    lines.push('    <h2 align="center" style="font-family: \'Orbitron\', sans-serif; color: #8a2be2; margin: 20px 0;">');
    lines.push('      📊 Beast Mode Stats Dashboard');
    lines.push('    </h2>');
    lines.push('    <table style="width: 100%; border-collapse: collapse; margin: 20px 0">');
    lines.push('      <tr>');

    if (modules.beastModeDashboard.showProfileViews) {
      lines.push('        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #8a2be2, #ba55d3); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #8a2be2;">');
      lines.push(`          <img src="https://komarev.com/ghpvc/?username=${user}&color=8A2BE2&style=flat-square&label=Profile%20Views" alt="Profile Views" />`);
      lines.push('          <br /><strong style="color: #00ffff; font-family: \'Fira Code\'">🚀 Live Counter</strong>');
      lines.push('        </td>');
    }

    if (modules.beastModeDashboard.showGrowthMetrics) {
      lines.push('        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #ff1493, #ff69b4); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #ff1493;">');
      lines.push(`          <img src="https://img.shields.io/github/followers/${user}?style=flat-square&color=FF1493&label=Followers&logo=person-add" alt="Followers" />`);
      lines.push(`          <img src="https://img.shields.io/github/stars/${user}?style=flat-square&color=FF69B4&label=Stars&logo=star" alt="Stars" />`);
      lines.push('          <br /><strong style="color: #ffd700; font-family: \'Fira Code\'">📈 Growth Metrics</strong>');
      lines.push('        </td>');
    }

    if (modules.beastModeDashboard.showOpenToWork) {
      lines.push('        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #00ff7f, #32cd32); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #00ff7f;">');
      lines.push('          <img src="https://img.shields.io/badge/Open%20to%20Work-✅%20YES-00FF7F?style=flat-square&logo=briefcase" alt="Open to Work" />');
      if (modules.beastModeDashboard.email) {
        lines.push(`          <br /><a href="mailto:${modules.beastModeDashboard.email}"><img src="https://img.shields.io/badge/Hire%20Me-🚀%20Click%20Here-FF4500?style=flat-square&logo=rocket&logoColor=white" alt="Hire Me" /></a>`);
      }
      lines.push('          <br /><strong style="color: #000; font-family: \'Fira Code\'">💼 Professional Status</strong>');
      lines.push('        </td>');
    }

    if (modules.beastModeDashboard.showStreakCard) {
      lines.push('        <td align="center" style="padding: 10px; background: linear-gradient(45deg, #8a2be2, #4b0082); border-radius: 15px; margin: 5px; box-shadow: 0 0 10px #8a2be2;">');
      lines.push(`          <img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=dark&hide_border=true&stroke=0000&background=0d1117&ring=00FFFF&fire=FF4500&currStreakLabel=8A2BE2&sideLabels=00FF7F&dates=8A2BE2" alt="Streak Stats" />`);
      lines.push('          <br /><strong style="color: #ba55d3; font-family: \'Fira Code\'">🔥 Contribution Streak</strong>');
      lines.push('        </td>');
    }

    lines.push('      </tr>');

    if (modules.beastModeDashboard.showWakaTime) {
      lines.push('      <tr>');
      lines.push('        <td align="center" colspan="4" style="padding: 10px">');
      lines.push(`          <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${user}&color=black&theme=dark&hide_border=true" alt="Practice Time." />`);
      lines.push('        </td>');
      lines.push('      </tr>');
    }

    lines.push('    </table>');
    lines.push('  </div>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 3. GitHub Performance Summary Cards ──
  if (modules.githubAnalytics.enabled) {
    lines.push('  <!-- GitHub Account Performance Dashboard -->');
    lines.push('  <h2 align="center">⚡ GitHub Performance Dashboard</h2>');
    lines.push('');
    
    if (modules.githubAnalytics.showProfileDetailsCard) {
      lines.push('  <div align="center">');
      lines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=${user}&theme=github_dark" alt="Profile Details" />`);
      lines.push('  </div>');
      lines.push('');
    }

    if (modules.githubAnalytics.showReposPerLanguage || modules.githubAnalytics.showMostCommitLanguage || modules.githubAnalytics.showStatsCard) {
      lines.push('  <div align="center">');
      if (modules.githubAnalytics.showReposPerLanguage) {
        lines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${user}&theme=dark" width="32%" alt="Repos per Language" />`);
      }
      if (modules.githubAnalytics.showMostCommitLanguage) {
        lines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${user}&theme=dark" width="32%" alt="Most Commit Language" />`);
      }
      if (modules.githubAnalytics.showStatsCard) {
        lines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${user}&theme=dark" width="32%" alt="Overall Stats" />`);
      }
      lines.push('  </div>');
      lines.push('');
    }

    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 4. Education & Skill Proficiency Journey ──
  if (modules.educationAndSkills.enabled) {
    const edu = modules.educationAndSkills;
    lines.push('  <!-- Education & Skills Journey -->');
    lines.push('  <h2 align="center">🎓 Education & Skills Journey</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push('  <table width="100%">');
    lines.push('    <tr>');
    lines.push('      <td width="50%" valign="top">');
    lines.push('        <h3 align="center">📚 Academic Path</h3>');
    lines.push('        <div align="center">');
    lines.push(`          <img src="https://img.shields.io/badge/${edu.institutionName}-${edu.institutionColor}?style=for-the-badge&logo=graduationcap&logoColor=white" />`);
    lines.push('          <br /><br />');

    // SkillIcons Dev Grid
    if (edu.skillIcons.length > 0) {
      const chunk1 = edu.skillIcons.slice(0, 30).join(',');
      const chunk2 = edu.skillIcons.slice(30).join(',');
      lines.push('          <div style="margin: 20px 0; font-size: 1.1em;">');
      lines.push(`            <img src="https://skillicons.dev/icons?i=${chunk1}" style="height: 54px; margin: 4px;" alt="Skill Icons" />`);
      if (chunk2) {
        lines.push(`            <img src="https://skillicons.dev/icons?i=${chunk2}" style="height: 54px; margin: 4px;" alt="Additional Skill Icons" />`);
      }
      lines.push('          </div>');
    }

    // Additional Custom Badges
    if (edu.additionalBadges.length > 0) {
      lines.push('          <h3 align="center">Additional Skills</h3>');
      lines.push('          <div style="margin: 15px 0;">');
      for (const badge of edu.additionalBadges) {
        lines.push(`            <img src="https://img.shields.io/badge/${badge.name}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=white" style="height: 30px; margin: 3px;" />`);
      }
      lines.push('          </div>');
    }

    // WakaTime collapsible progress
    if (edu.showWakaTimeDropdown && edu.wakaTimeShareSvgUrl) {
      lines.push('          <br />');
      lines.push('          <details open>');
      lines.push('            <summary><b>🔍 View Detailed Coding Activity</b></summary>');
      lines.push('            <br />');
      lines.push(`            <img src="${edu.wakaTimeShareSvgUrl}" alt="WakaTime Stats" style="border-radius: 12px; box-shadow: 0 0 15px #8a2be2;" />`);
      lines.push('            <br /><strong style="color: #8a2be2; font-size: 16px; font-family: \'Fira Code\';">⏱️ Coding Activity - Auto-Updates Weekly</strong>');
      lines.push('          </details>');
    }

    lines.push('        </div>');
    lines.push('      </td>');

    // Right Column: Proficiency Charts & LeetCode
    lines.push('      <td width="50%" valign="top">');
    lines.push('        <h3 align="center">🚀 Skill Proficiency & Coding</h3>');
    lines.push('        <div align="center">');
    if (edu.showTopLangsPie) {
      lines.push(`          <img width="400" height="300" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=pie&theme=dark&hide_border=true" alt="Top Languages Pie" />`);
      lines.push('          <br />');
    }
    if (edu.showLeetCodeCard && edu.leetCodeUsername) {
      lines.push(`          <img src="https://leetcard.jacoblin.cool/${edu.leetCodeUsername}?theme=dark&font=Karma&ext=heatmap" width="400" alt="LeetCode Stats" />`);
    }
    lines.push('        </div>');
    lines.push('      </td>');
    lines.push('    </tr>');
    lines.push('  </table>');
    lines.push('  </div>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 5. Technology Arsenal Matrix (80x80 Grid Table) ──
  if (modules.techArsenal.enabled && modules.techArsenal.items.length > 0) {
    lines.push('  <!-- Technology Arsenal -->');
    lines.push('  <h2 align="center">🛠️ Technology Arsenal</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push('    <table>');

    const items = modules.techArsenal.items;
    const rows: typeof items[] = [];
    for (let i = 0; i < items.length; i += 5) {
      rows.push(items.slice(i, i + 5));
    }

    for (const row of rows) {
      lines.push('      <tr>');
      for (const item of row) {
        lines.push('        <td align="center" width="110">');
        lines.push(`          <img src="${item.iconUrl}" alt="${item.name}" width="70" height="70" />`);
        lines.push(`          <br /><b>${item.name}</b>`);
        lines.push(`          <br /><img src="https://img.shields.io/badge/${encodeURIComponent(item.levelBadge)}-${item.levelColor}?style=flat-square" />`);
        lines.push('        </td>');
      }
      lines.push('      </tr>');
    }

    lines.push('    </table>');
    lines.push('  </div>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 6. Advanced GitHub Analytics & Activity Graph ──
  if (modules.githubAnalytics.enabled && modules.githubAnalytics.showActivityWave) {
    lines.push('  <!-- Enhanced GitHub Analytics & Activity -->');
    lines.push('  <h2 align="center">📊 Advanced GitHub Analytics</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push(`    <img width="49%" src="https://github-readme-stats-sigma-five.vercel.app/api?username=${user}&show_icons=true&hide_border=true&title_color=7c217a&icon_color=7c217a&bg_color=0d1117&text_color=ffffff&hide_rank=false&show=reviews,prs_merged,prs_merged_percentage" alt="Stats" />`);
    lines.push(`    <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=dark&hide_border=true&stroke=0000&background=0d1117&ring=8A2387&fire=8A2387&currStreakLabel=8A2387" alt="Streaks" />`);
    lines.push('  </div>');
    lines.push('');
    lines.push('  <details open>');
    lines.push('    <summary><b>📈 Contribution Metrics & Intensity</b></summary>');
    lines.push('    <br />');
    lines.push('    <div align="center">');
    lines.push(`      <img src="https://github-readme-activity-graph.vercel.app/graph?username=${user}&bg_color=0d1117&color=8A2387&line=2575fc&point=8A2387&area=true&hide_border=true&custom_title=Weekly+Code+Intensity&theme=dark&border_radius=20&line_width=3&area_color=2575fc" alt="Activity Graph" />`);
    lines.push('    </div>');
    lines.push('  </details>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 7. GitHub Achievement Showcase & Trophies ──
  if (modules.githubAnalytics.enabled && modules.githubAnalytics.showTrophies) {
    lines.push('  <!-- GitHub Achievement Showcase -->');
    lines.push('  <h2 align="center">🏆 GitHub Achievement Showcase</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push(`    <img src="https://github-profile-trophy.vercel.app/?username=${user}" alt="GitHub Trophies" />`);
    lines.push('  </div>');
    lines.push('');

    if (modules.githubAnalytics.showNextAchievements) {
      lines.push('  <div align="center">');
      lines.push('    <h3>🎯 Next Achievements to Unlock</h3>');
      lines.push('    <img src="https://img.shields.io/badge/Arctic_Code_Vault_Contributor-2026-6a11cb?style=for-the-badge&logo=github" />');
      lines.push('    <img src="https://img.shields.io/badge/300_Days_Streak-In_Progress-2575fc?style=for-the-badge&logo=github" />');
      lines.push('    <img src="https://img.shields.io/badge/Pull_Shark-Coming_Soon-8A2387?style=for-the-badge&logo=github" />');
      lines.push('  </div>');
      lines.push('');
    }

    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 8. Breakout / Snake Game Suite ──
  if (modules.gameSuite.enabled) {
    lines.push('  <!-- 🎮 Interactive Arcade & Contribution Snake -->');
    lines.push('  <h2 align="center">🎮 GitHub Contribution Snake Game</h2>');
    lines.push('');
    lines.push('  <div align="center" style="background: linear-gradient(135deg, #161b22, #0d1117); padding: 20px; border-radius: 16px; margin: 20px 0; border: 1px solid #30363d;">');
    lines.push('    <picture>');
    lines.push(`      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake-dark.svg" />`);
    lines.push(`      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg" />`);
    lines.push(`      <img alt="GitHub Contribution Snake" src="https://raw.githubusercontent.com/${user}/${user}/output/github-contribution-grid-snake.svg" />`);
    lines.push('    </picture>');
    lines.push('    <br />');
    lines.push(`    <em>${modules.gameSuite.motto || 'Code. Commit. Conquer.'}</em>`);
    lines.push('  </div>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 9. Connect & Social Links ──
  if (modules.socialLinks.enabled) {
    const s = modules.socialLinks;
    lines.push('  <!-- Connect & Collaborate -->');
    lines.push('  <h2 align="center">🤝 Let\'s Connect & Collaborate</h2>');
    lines.push('');
    lines.push('  <div align="center">');

    if (s.github) lines.push(`    <a href="https://github.com/${s.github}"><img src="https://img.shields.io/badge/GitHub-6a11cb?style=for-the-badge&logo=github&logoColor=white" /></a>`);
    if (s.linkedin) lines.push(`    <a href="https://www.linkedin.com/in/${s.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>`);
    if (s.email) lines.push(`    <a href="mailto:${s.email}"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>`);
    if (s.behance) lines.push(`    <a href="https://www.behance.net/${s.behance}"><img src="https://img.shields.io/badge/Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white" /></a>`);
    if (s.instagram) lines.push(`    <a href="https://www.instagram.com/${s.instagram}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" /></a>`);

    lines.push('  </div>');
    lines.push('');

    if (s.scheduleMeetingUrl || s.responseTime) {
      lines.push('  <div align="center">');
      if (s.scheduleMeetingUrl) {
        lines.push(`    <a href="${s.scheduleMeetingUrl}"><img src="https://img.shields.io/badge/Schedule_a_Meeting-4285F4?style=for-the-badge&logo=google-calendar&logoColor=white" /></a>`);
      }
      if (s.responseTime) {
        lines.push(`    <br /><img src="https://img.shields.io/badge/Response_Time-${encodeURIComponent(s.responseTime)}-brightgreen?style=flat-square" />`);
      }
      lines.push('  </div>');
      lines.push('');
    }
    lines.push(`  ${divider}`);
    lines.push('');
  }

  // ── 10. Interactive Widgets (Daily Dev Quote, Spotify, Coding Challenge, Visitor Map, Mantras) ──
  if (modules.interactiveWidgets.enabled) {
    if (modules.interactiveWidgets.showSpotify) {
      lines.push('  <!-- 🎵 Spotify Live Music Player -->');
      lines.push('  <h2 align="center">🎵 Currently Vibing To</h2>');
      lines.push('  <div align="center">');
      lines.push('    <img src="https://synthetixgit.vercel.app/api/svg/spotify?track=Deep%20Focus%20%26%20Lofi%20Coding&artist=SynthetixGit%20Vibes" width="450" alt="Spotify Player" />');
      lines.push('  </div>');
      lines.push('');
      lines.push(`  ${divider}`);
      lines.push('');
    }

    if (modules.interactiveWidgets.showDailyDevQuote) {
      lines.push('  <!-- Daily Dev Quote -->');
      lines.push('  <h2>💬 Daily Dev Quote</h2>');
      lines.push('');
      lines.push('  <div align="center">');
      lines.push('    <img src="https://github-readme-quotes-bay.vercel.app/quote?theme=dark&animation=grow_out_in&layout=default&font=Fira%20Code&bgColor=#00FFFF&textColor=7B2FF7&authorColor=8B5CF6&borderColor=6a11cb" alt="Dev Quote" />');
      lines.push('  </div>');
      lines.push('');
      lines.push(`  ${divider}`);
      lines.push('');
    }

    if (modules.interactiveWidgets.showCodingChallenge) {
      lines.push('  <!-- Dynamic Coding Challenge -->');
      lines.push('  <h2 align="center">🧠 Daily Coding Challenge</h2>');
      lines.push('  <div align="center">');
      lines.push('    <details>');
      lines.push('      <summary><b>🎯 Click to reveal today\'s challenge!</b></summary>');
      lines.push('      <br />');
      lines.push('      <div id="daily-challenge">');
      lines.push('        **Challenge: Two Sum Problem**<br />');
      lines.push('        **Difficulty:** 🟡 Medium<br />');
      lines.push('        > Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.<br />');
      lines.push('      </div>');
      lines.push('    </details>');
      lines.push('  </div>');
      lines.push('');
      lines.push(`  ${divider}`);
      lines.push('');
    }

    if (modules.interactiveWidgets.showPersonalPhilosophy && modules.interactiveWidgets.mantras.length > 0) {
      lines.push('  <!-- Dynamic Personal Philosophy -->');
      lines.push('  <h2 align="center">🌟 Personal Philosophy</h2>');
      lines.push('');
      lines.push('  <div align="center">');
      lines.push('    <blockquote>');
      lines.push('      <h3>🚀 My Developer Mantras</h3>');
      lines.push('      <table>');
      for (const mantra of modules.interactiveWidgets.mantras) {
        lines.push(`        <tr><td>${mantra}</td></tr>`);
      }
      lines.push('      </table>');
      lines.push('    </blockquote>');
      lines.push('  </div>');
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }

  // ── 11. Footer Capsule ──
  if (modules.footer.enabled) {
    const closeEnc = encodeURIComponent(modules.footer.closingText || 'Thanks for visiting!');
    lines.push(`  <div align="center">`);
    lines.push(`    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,2,4,5,40&height=150&section=footer&text=${closeEnc}&fontSize=40&fontAlignY=65&animation=twinkling&fontColor=fff" width="100%" alt="Footer Banner" />`);
    lines.push('  </div>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push('    <img src="https://img.shields.io/badge/Made%20with-❤️-6a11cb?style=for-the-badge" />');
    lines.push(`    <img src="https://img.shields.io/badge/By-${encodeURIComponent(modules.footer.authorName || user)}-2575fc?style=for-the-badge" />`);
    lines.push(`    <img src="https://img.shields.io/badge/${encodeURIComponent(modules.footer.statusBadgeText || 'Status-Beast Mode ON')}-8A2387?style=for-the-badge" />`);
    lines.push('  </div>');
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
