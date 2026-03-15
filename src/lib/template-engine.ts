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

  sectionDivider: {
    enabled: boolean;
    style:
      | 'curved-wave'
      | 'snake-crawl'
      | 'neon-laser-shimmer'
      | 'soundwave-eq'
      | 'cyber-circuit'
      | 'particle-sparkle'
      | 'retro-dashed-terminal'
      | 'markdown-line';
  };

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

  educationAndSkills: {
    enabled: boolean;
    institutionName: string;
    institutionColor: string;
    skillIcons: string[];
    additionalBadges: { name: string; color: string; logo: string }[];
    showWakaTimeDropdown: boolean;
    wakaTimeShareSvgUrl?: string;
    showTopLangsPie: boolean;
    showLeetCodeCard: boolean;
    leetCodeUsername?: string;
  };

  techArsenal: {
    enabled: boolean;
    items: {
      name: string;
      iconUrl: string;
      levelBadge: string;
      levelColor: string;
    }[];
  };

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

  techStack: {
    enabled: boolean;
    style: 'for-the-badge' | 'flat-square' | 'flat';
    categorize: boolean;
    badges: string[];
  };

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

  gameSuite: {
    enabled: boolean;
    gameType: 'breakout' | 'snake' | 'pacman';
    motto: string;
  };

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

  interactiveWidgets: {
    enabled: boolean;
    showDailyDevQuote: boolean;
    showCodingChallenge: boolean;
    showVisitorMap: boolean;
    showPersonalPhilosophy: boolean;
    showSpotify?: boolean;
    mantras: string[];
  };

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
      title: '',
      subtitle: 'Software Developer',
      typingLines: [
        'Building modern web applications & scalable systems 🚀',
        'Full-Stack Developer & Software Engineer 💻',
        'Passionate about clean code & architecture 🏗️',
        'Always learning, always shipping ⚡',
      ],
      bannerColor: '0a0d12',
    },
    sectionDivider: {
      enabled: true,
      style: 'markdown-line',
    },
    beastModeDashboard: {
      enabled: true,
      showProfileViews: true,
      showGrowthMetrics: true,
      showOpenToWork: true,
      showHireMe: true,
      showStreakCard: true,
      showWakaTime: true,
      email: '',
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
      institutionName: '',
      institutionColor: '0e7490',
      skillIcons: [
        'git', 'github', 'html', 'css', 'js', 'jquery', 'bootstrap', 'tailwind',
        'nodejs', 'express', 'mongodb', 'mysql', 'c', 'cpp', 'python', 'figma',
        'ai', 'ps', 'vercel', 'netlify', 'vscode', 'atom', 'vite', 'powershell',
        'npm', 'bun', 'yarn', 'notion', 'svg', 'bash', 'markdown', 'ts', 'replit'
      ],
      additionalBadges: [
        { name: 'TRAE', color: '0891b2', logo: 'visualstudiocode' },
        { name: 'Qoder', color: '151c27', logo: 'visualstudiocode' },
        { name: 'EJS', color: '1a2332', logo: 'ejs' },
        { name: 'MJS', color: '0e7490', logo: 'javascript' },
        { name: 'Render', color: '06b6d4', logo: 'render' },
      ],
      showWakaTimeDropdown: true,
      wakaTimeShareSvgUrl: '',
      showTopLangsPie: true,
      showLeetCodeCard: true,
      leetCodeUsername: '',
    },
    techArsenal: {
      enabled: true,
      items: [
        { name: 'JavaScript', iconUrl: 'https://techstack-generator.vercel.app/js-icon.svg', levelBadge: 'ES6+', levelColor: '0e7490' },
        { name: 'C++', iconUrl: 'https://techstack-generator.vercel.app/cpp-icon.svg', levelBadge: 'DSA', levelColor: '06b6d4' },
        { name: 'Python', iconUrl: 'https://techstack-generator.vercel.app/python-icon.svg', levelBadge: '3.x', levelColor: '0e7490' },
        { name: 'MySQL', iconUrl: 'https://techstack-generator.vercel.app/mysql-icon.svg', levelBadge: 'Database', levelColor: '06b6d4' },
        { name: 'React', iconUrl: 'https://techstack-generator.vercel.app/react-icon.svg', levelBadge: 'Learning', levelColor: '0e7490' },
        { name: 'Docker', iconUrl: 'https://techstack-generator.vercel.app/docker-icon.svg', levelBadge: 'Future', levelColor: '06b6d4' },
        { name: 'AWS', iconUrl: 'https://techstack-generator.vercel.app/aws-icon.svg', levelBadge: 'Cloud', levelColor: '0e7490' },
        { name: 'GitHub', iconUrl: 'https://techstack-generator.vercel.app/github-icon.svg', levelBadge: 'Expert', levelColor: 'fbbf24' },
        { name: 'REST API', iconUrl: 'https://techstack-generator.vercel.app/restapi-icon.svg', levelBadge: 'Core', levelColor: '06b6d4' },
        { name: 'Nginx', iconUrl: 'https://techstack-generator.vercel.app/nginx-icon.svg', levelBadge: 'DevOps', levelColor: '0e7490' },
      ],
    },
    aboutMe: {
      enabled: true,
      bioText: 'I am a Software Developer passionate about building high-performance web applications and writing clean, maintainable code.',
      quickFacts: {
        currentWork: 'Full-Stack Projects & Cloud Architectures',
        learning: 'System Design, Microservices, and Advanced TypeScript',
        collaborate: 'Open Source Developer Tools & Full Stack Apps',
        askMe: 'JavaScript, Node.js, Express, MongoDB, C++',
        reachMe: '',
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
      motto: '"Code. Commit. Conquer. — My journey, my style."',
    },
    socialLinks: {
      enabled: true,
      github: '',
      linkedin: '',
      twitter: '',
      email: '',
      behance: '',
      instagram: '',
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
      authorName: '',
      statusBadgeText: 'Status · Active',
    },
  };
}

function renderDivider(modules: ModuleConfig): string {
  if (!modules.sectionDivider || !modules.sectionDivider.enabled || modules.sectionDivider.style === 'markdown-line') {
    return '---';
  }
  return '<img src="https://capsule-render.vercel.app/api?type=rect&color=0a0d12&height=4&section=header" width="100%" alt="Section Divider" />';
}

export function generateProfileMarkdown(config: ProfileConfig): string {
  return compileProfile(config).markdown;
}

export function compileProfile(config: ProfileConfig): { markdown: string; workflowYaml?: string } {
  const { username, templateId, theme, modules, profileData } = config;
  const user = username || 'github-user';
  const divider = renderDivider(modules);

  const resolvedTitle = modules.headerBanner.title || profileData?.name || user;
  const resolvedSubtitle = modules.headerBanner.subtitle || 'Software Developer';
  const resolvedEmail = modules.beastModeDashboard.email || `${user}@example.com`;
  const resolvedReachMe = modules.aboutMe.quickFacts.reachMe || `${user}@example.com`;
  const resolvedGithub = modules.socialLinks.github || user;
  const resolvedSocialEmail = modules.socialLinks.email || `${user}@example.com`;
  const resolvedAuthor = modules.footer.authorName || user;
  const resolvedStatus = modules.footer.statusBadgeText || 'Status · Active';

  const lines: string[] = [];

  lines.push('<div align="center">');
  lines.push('');

  if (modules.headerBanner.enabled) {
    const titleEnc = encodeURIComponent(resolvedTitle);
    const subEnc = encodeURIComponent(resolvedSubtitle);

    if (modules.headerBanner.headerStyle === 'venom-capsule') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=venom&color=0a0d12&height=250&section=header&text=${titleEnc}&fontSize=65&animation=twinkling&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=Fira%20Code&descFont=Roboto&textColor=22d3ee&descColor=cbd5e1&borderRadius=25" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'waving-capsule') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=waving&color=0a0d12&height=220&section=header&text=${titleEnc}&fontSize=50&animation=twinkling&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Fira%20Code&descFont=Roboto" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'cartoonish-3d' || modules.headerBanner.headerStyle === 'cyberpunk-glitch') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=slice&color=0a0d12&height=230&section=header&text=${titleEnc}&fontSize=60&animation=fadeIn&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=Orbitron&descFont=Fira%20Code&textColor=22d3ee&descColor=34d399" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'terminal-prompt') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=0a0d12&height=200&section=header&text=${titleEnc}&fontSize=55&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Fira%20Code&descFont=Roboto&textColor=34d399&descColor=22d3ee" width="100%" alt="Terminal Header" />`);
    } else if (modules.headerBanner.headerStyle === 'handwritten-script') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=soft&color=0a0d12&height=220&section=header&text=${titleEnc}&fontSize=55&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Kalam&descFont=Roboto&textColor=fbbf24&descColor=cbd5e1" width="100%" alt="Signature Header" />`);
    } else {
      lines.push(`  <h1>${resolvedTitle}</h1>`);
      lines.push(`  <p><em>${resolvedSubtitle}</em></p>`);
    }

    lines.push('');

    if (modules.headerBanner.typingLines.length > 0) {
      const typingParam = encodeURIComponent(modules.headerBanner.typingLines.join(';'));
      lines.push('  <div align="center">');
      lines.push(`    <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=900&size=25&duration=3000&pause=1000&color=22D3EE&center=true&vCenter=true&multiline=true&width=800&height=100&lines=${typingParam}" alt="Typing SVG" />`);
      lines.push('  </div>');
      lines.push('');
    }
  }

  if (modules.beastModeDashboard.enabled) {
    lines.push('  <div align="center">');
    lines.push('    <h2 align="center" style="font-family: \'Orbitron\', sans-serif; color: #22d3ee; margin: 20px 0;">');
    lines.push('      📊 Beast Mode Stats Dashboard');
    lines.push('    </h2>');
    lines.push('    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin: 20px 0;">');

    if (modules.beastModeDashboard.showProfileViews) {
      lines.push('      <div style="padding: 16px; border-radius: 12px; background: var(--color-bg-tertiary, #151c27); border: 1px solid var(--color-border-secondary, rgba(255,255,255,0.12)); text-align: center;">');
      lines.push(`        <img src="https://komarev.com/ghpvc/?username=${user}&color=0e7490&style=flat-square&label=Profile%20Views" alt="Profile Views" />`);
      lines.push(`        <br /><strong style="color: #22d3ee; font-family: 'Fira Code'">🚀 Live Counter</strong>`);
      lines.push('      </div>');
    }

    if (modules.beastModeDashboard.showGrowthMetrics) {
      lines.push('      <div style="padding: 16px; border-radius: 12px; background: var(--color-bg-tertiary, #151c27); border: 1px solid var(--color-border-secondary, rgba(255,255,255,0.12)); text-align: center;">');
      lines.push(`        <img src="https://img.shields.io/github/followers/${user}?style=flat-square&color=0891b2&label=Followers&logo=person-add" alt="Followers" />`);
      lines.push(`        <img src="https://img.shields.io/github/stars/${user}?style=flat-square&color=06b6d4&label=Stars&logo=star" alt="Stars" />`);
      lines.push(`        <br /><strong style="color: #cbd5e1; font-family: 'Fira Code'">📈 Growth Metrics</strong>`);
      lines.push('      </div>');
    }

    if (modules.beastModeDashboard.showOpenToWork) {
      lines.push('      <div style="padding: 16px; border-radius: 12px; background: var(--color-bg-tertiary, #151c27); border: 1px solid var(--color-border-secondary, rgba(255,255,255,0.12)); text-align: center;">');
      lines.push('        <img src="https://img.shields.io/badge/Open%20to%20Work-✅%20YES-34d399?style=flat-square&logo=briefcase" alt="Open to Work" />');
      if (modules.beastModeDashboard.showHireMe && resolvedEmail) {
        lines.push(`        <br /><a href="mailto:${resolvedEmail}"><img src="https://img.shields.io/badge/Hire%20Me-🚀%20Click%20Here-0891b2?style=flat-square&logo=rocket&logoColor=white" alt="Hire Me" /></a>`);
      }
      lines.push(`        <br /><strong style="color: #cbd5e1; font-family: 'Fira Code'">💼 Professional Status</strong>`);
      lines.push('      </div>');
    }

    if (modules.beastModeDashboard.showStreakCard) {
      lines.push('      <div style="padding: 16px; border-radius: 12px; background: var(--color-bg-tertiary, #151c27); border: 1px solid var(--color-border-secondary, rgba(255,255,255,0.12)); text-align: center;">');
      lines.push(`        <img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=dark&hide_border=true&stroke=0000&background=0d1117&ring=22d3ee&fire=fbbf24&currStreakLabel=06b6d4&sideLabels=34d399&dates=0891b2" alt="Streak Stats" />`);
      lines.push(`        <br /><strong style="color: #22d3ee; font-family: 'Fira Code'">🔥 Contribution Streak</strong>`);
      lines.push('      </div>');
    }

    if (modules.beastModeDashboard.showWakaTime) {
      lines.push('      <div style="padding: 16px; border-radius: 12px; background: var(--color-bg-tertiary, #151c27); border: 1px solid var(--color-border-secondary, rgba(255,255,255,0.12)); text-align: center; grid-column: 1 / -1;">');
      lines.push(`        <img src="https://github-readme-stats.vercel.app/api/wakatime?username=${user}&color=black&theme=dark&hide_border=true" alt="Practice Time." />`);
      lines.push('      </div>');
    }

    lines.push('    </div>');
    lines.push('  </div>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  if (modules.githubAnalytics.enabled) {
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
        lines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${user}&theme=dark" width="350" alt="Repos per Language" />`);
      }
      if (modules.githubAnalytics.showMostCommitLanguage) {
        lines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=${user}&theme=dark" width="350" alt="Most Commit Language" />`);
      }
      if (modules.githubAnalytics.showStatsCard) {
        lines.push(`    <img src="https://github-profile-summary-cards.vercel.app/api/cards/stats?username=${user}&theme=dark" width="350" alt="Overall Stats" />`);
      }
      lines.push('  </div>');
      lines.push('');
    }

    lines.push(`  ${divider}`);
    lines.push('');
  }

  if (modules.educationAndSkills.enabled) {
    const edu = modules.educationAndSkills;
    lines.push('  <h2 align="center">🎓 Education & Skills Journey</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    if (edu.institutionName) {
      lines.push(`    <img src="https://img.shields.io/badge/${encodeURIComponent(edu.institutionName)}-${edu.institutionColor}?style=for-the-badge&logo=graduationcap&logoColor=white" />`);
      lines.push('    <br /><br />');
    }

    if (edu.skillIcons.length > 0) {
      const chunk1 = edu.skillIcons.slice(0, 30).join(',');
      const chunk2 = edu.skillIcons.slice(30).join(',');
      lines.push('    <div align="center" style="margin: 20px 0;">');
      lines.push(`      <img src="https://skillicons.dev/icons?i=${chunk1}" style="height: 54px; margin: 4px;" alt="Skill Icons" />`);
      if (chunk2) {
        lines.push(`      <img src="https://skillicons.dev/icons?i=${chunk2}" style="height: 54px; margin: 4px;" alt="Additional Skill Icons" />`);
      }
      lines.push('    </div>');
    }

    if (edu.additionalBadges.length > 0) {
      lines.push('    <h3 align="center">Additional Skills</h3>');
      lines.push('    <div align="center" style="margin: 15px 0;">');
      for (const badge of edu.additionalBadges) {
        lines.push(`      <img src="https://img.shields.io/badge/${badge.name}-${badge.color}?style=for-the-badge&logo=${badge.logo}&logoColor=white" style="height: 30px; margin: 3px;" />`);
      }
      lines.push('    </div>');
    }

    if (edu.showWakaTimeDropdown && edu.wakaTimeShareSvgUrl) {
      lines.push('    <br />');
      lines.push('    <details open>');
      lines.push('      <summary><b>🔍 View Detailed Coding Activity</b></summary>');
      lines.push('      <br />');
      lines.push(`      <img src="${edu.wakaTimeShareSvgUrl}" alt="WakaTime Stats" style="border-radius: 12px;" />`);
      lines.push('    </details>');
    }

    if (edu.showTopLangsPie || (edu.showLeetCodeCard && edu.leetCodeUsername)) {
      lines.push('    <div align="center" style="margin: 20px 0;">');
      if (edu.showTopLangsPie) {
        lines.push(`      <img width="400" height="300" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=pie&theme=dark&hide_border=true" alt="Top Languages Pie" />`);
      }
      if (edu.showLeetCodeCard && edu.leetCodeUsername) {
        lines.push(`      <img src="https://leetcard.jacoblin.cool/${edu.leetCodeUsername}?theme=dark&font=Karma&ext=heatmap" width="400" alt="LeetCode Stats" />`);
      }
      lines.push('    </div>');
    }

    lines.push('  </div>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  if (modules.techArsenal.enabled && modules.techArsenal.items.length > 0) {
    lines.push('  <h2 align="center">🛠️ Technology Arsenal</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push('    <div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 16px;">');

    for (const item of modules.techArsenal.items) {
      lines.push('      <div align="center" style="min-width: 110px; padding: 10px;">');
      lines.push(`        <img src="${item.iconUrl}" alt="${item.name}" width="60" height="60" />`);
      lines.push(`        <br /><b>${item.name}</b>`);
      lines.push(`        <br /><img src="https://img.shields.io/badge/${encodeURIComponent(item.levelBadge)}-${item.levelColor}?style=flat-square" />`);
      lines.push('      </div>');
    }

    lines.push('    </div>');
    lines.push('  </div>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  if (modules.githubAnalytics.enabled && modules.githubAnalytics.showActivityWave) {
    lines.push('  <h2 align="center">📊 Advanced GitHub Analytics</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push(`    <img width="49%" src="https://github-readme-stats-sigma-five.vercel.app/api?username=${user}&show_icons=true&hide_border=true&title_color=0891b2&icon_color=06b6d4&bg_color=0d1117&text_color=cbd5e1&hide_rank=false&show=reviews,prs_merged,prs_merged_percentage" alt="Stats" />`);
    lines.push(`    <img width="49%" src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=dark&hide_border=true&stroke=0000&background=0d1117&ring=22d3ee&fire=fbbf24&currStreakLabel=0891b2" alt="Streaks" />`);
    lines.push('  </div>');
    lines.push('');
    lines.push('  <details open>');
    lines.push('    <summary><b>📈 Contribution Metrics & Intensity</b></summary>');
    lines.push('    <br />');
    lines.push('    <div align="center">');
    lines.push(`      <img src="https://github-readme-activity-graph.vercel.app/graph?username=${user}&bg_color=0d1117&color=0891b2&line=22d3ee&point=06b6d4&area=true&hide_border=true&custom_title=Weekly+Code+Intensity&theme=dark&border_radius=20&line_width=3&area_color=0e7490" alt="Activity Graph" />`);
    lines.push('    </div>');
    lines.push('  </details>');
    lines.push('');
    lines.push(`  ${divider}`);
    lines.push('');
  }

  if (modules.githubAnalytics.enabled && modules.githubAnalytics.showTrophies) {
    lines.push('  <h2 align="center">🏆 GitHub Achievement Showcase</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push(`    <img src="https://github-profile-trophy.vercel.app/?username=${user}" alt="GitHub Trophies" />`);
    lines.push('  </div>');
    lines.push('');

    if (modules.githubAnalytics.showNextAchievements) {
      lines.push('  <div align="center">');
      lines.push('    <h3>🎯 Next Achievements to Unlock</h3>');
      lines.push('    <img src="https://img.shields.io/badge/Arctic_Code_Vault_Contributor-2026-0e7490?style=for-the-badge&logo=github" />');
      lines.push('    <img src="https://img.shields.io/badge/300_Days_Streak-In_Progress-06b6d4?style=for-the-badge&logo=github" />');
      lines.push('    <img src="https://img.shields.io/badge/Pull_Shark-Coming_Soon-0891b2?style=for-the-badge&logo=github" />');
      lines.push('  </div>');
      lines.push('');
    }

    lines.push(`  ${divider}`);
    lines.push('');
  }

  if (modules.gameSuite.enabled) {
    lines.push('  <h2 align="center">🎮 GitHub Contribution Snake Game</h2>');
    lines.push('');
    lines.push('  <div align="center" style="background: var(--color-bg-secondary, #0f141c); padding: 20px; border-radius: 16px; margin: 20px 0; border: 1px solid var(--color-border-secondary, rgba(255,255,255,0.12));">');
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

  if (modules.socialLinks.enabled) {
    const s = modules.socialLinks;
    lines.push('  <h2 align="center">🤝 Let\'s Connect & Collaborate</h2>');
    lines.push('');
    lines.push('  <div align="center">');

    if (resolvedGithub) lines.push(`    <a href="https://github.com/${resolvedGithub}"><img src="https://img.shields.io/badge/GitHub-0e7490?style=for-the-badge&logo=github&logoColor=white" /></a>`);
    if (s.linkedin) lines.push(`    <a href="https://www.linkedin.com/in/${s.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a>`);
    if (resolvedSocialEmail) lines.push(`    <a href="mailto:${resolvedSocialEmail}"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>`);
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
        lines.push(`    <br /><img src="https://img.shields.io/badge/Response_Time-${encodeURIComponent(s.responseTime)}-34d399?style=flat-square" />`);
      }
      lines.push('  </div>');
      lines.push('');
    }
    lines.push(`  ${divider}`);
    lines.push('');
  }

  if (modules.interactiveWidgets.enabled) {
    if (modules.interactiveWidgets.showSpotify) {
      lines.push('  <h2 align="center">🎵 Currently Vibing To</h2>');
      lines.push('  <div align="center">');
      lines.push('    <img src="https://synthetixgit.vercel.app/api/svg/spotify?track=Deep%20Focus%20%26%20Lofi%20Coding&artist=SynthetixGit%20Vibes" width="450" alt="Spotify Player" />');
      lines.push('  </div>');
      lines.push('');
      lines.push(`  ${divider}`);
      lines.push('');
    }

    if (modules.interactiveWidgets.showDailyDevQuote) {
      lines.push('  <h2>💬 Daily Dev Quote</h2>');
      lines.push('');
      lines.push('  <div align="center">');
      lines.push('    <img src="https://github-readme-quotes-bay.vercel.app/quote?theme=dark&animation=grow_out_in&layout=default&font=Fira%20Code&bgColor=0a0d12&textColor=22d3ee&authorColor=0891b2&borderColor=0e7490" alt="Dev Quote" />');
      lines.push('  </div>');
      lines.push('');
      lines.push(`  ${divider}`);
      lines.push('');
    }

    if (modules.interactiveWidgets.showCodingChallenge) {
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

  if (modules.footer.enabled) {
    const closeEnc = encodeURIComponent(modules.footer.closingText || 'Thanks for visiting!');
    lines.push(`  <div align="center">`);
    lines.push(`    <img src="https://capsule-render.vercel.app/api?type=waving&color=0a0d12&height=150&section=footer&text=${closeEnc}&fontSize=40&fontAlignY=65&animation=twinkling&fontColor=fff" width="100%" alt="Footer Banner" />`);
    lines.push('  </div>');
    lines.push('');
    lines.push('  <div align="center">');
    lines.push('    <img src="https://img.shields.io/badge/Made%20with-❤️-0e7490?style=for-the-badge" />');
    lines.push(`    <img src="https://img.shields.io/badge/By-${encodeURIComponent(resolvedAuthor)}-06b6d4?style=for-the-badge" />`);
    lines.push(`    <img src="https://img.shields.io/badge/${encodeURIComponent(resolvedStatus)}-0891b2?style=for-the-badge" />`);
    lines.push('  </div>');
  }

  lines.push('</div>');

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
