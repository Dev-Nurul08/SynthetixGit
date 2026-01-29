/**
 * SynthetixGit — Professional GitHub README Template Engine
 * Generates high-standard GitHub-Flavored Markdown for developer profile READMEs.
 */

import { getBadgeUrl, BADGE_REGISTRY, type BadgeEntry } from './badge-registry';

export type ThemeId = 'dark' | 'github_dark' | 'tokyonight' | 'radical' | 'nord' | 'dracula' | 'onehalf-dark';
export type TemplateId = 'modern-developer' | 'minimalist-clean' | 'cyber-engineer' | 'fullstack-lead';

export interface QuickFacts {
  currentWork: string;
  learning: string;
  collaborate: string;
  askMe: string;
  reachMe: string;
  funFact: string;
}

export interface ModuleConfig {
  headerBanner: {
    enabled: boolean;
    headerStyle: 'waving-hand' | 'capsule' | 'minimal';
    title: string;
    subtitle: string;
    typingLines: string[];
  };
  aboutMe: {
    enabled: boolean;
    bioText: string;
    showLocation: boolean;
    showCompany: boolean;
    showBlog: boolean;
    quickFacts: QuickFacts;
  };
  techStack: {
    enabled: boolean;
    style: 'for-the-badge' | 'flat-square' | 'flat';
    categorize: boolean;
    badges: string[]; // slugs
  };
  githubStats: {
    enabled: boolean;
    showGeneralStats: boolean;
    showStreak: boolean;
    showTopLangs: boolean;
    showActivityGraph: boolean;
    showTrophies: boolean;
  };
  featuredRepos: {
    enabled: boolean;
    repos: Array<{
      name: string;
      description: string | null;
      url: string;
      stargazerCount: number;
      primaryLanguage: { name: string; color: string } | null;
    }>;
  };
  snakeAnimation: {
    enabled: boolean;
  };
  socialLinks: {
    enabled: boolean;
    github: string;
    twitter: string;
    linkedin: string;
    portfolio: string;
    discord: string;
    youtube: string;
    email: string;
  };
  footer: {
    enabled: boolean;
    showVisitorBadge: boolean;
    quote: string;
  };
}

export interface ProfileConfig {
  username: string;
  templateId: TemplateId;
  theme: ThemeId;
  modules: ModuleConfig;
  profileData?: {
    name: string;
    bio: string | null;
    location: string | null;
    company: string | null;
    blog: string | null;
    avatarUrl: string;
    followers: number;
    publicRepos: number;
  };
}

// ── Theme Mapping for SVG services ──
const STATS_THEME_MAP: Record<ThemeId, string> = {
  dark: 'dark',
  github_dark: 'github_dark',
  tokyonight: 'tokyonight',
  radical: 'radical',
  nord: 'nord',
  dracula: 'dracula',
  'onehalf-dark': 'onehalf-dark',
};

// ── Header Renderer ──
function renderHeader(config: ProfileConfig): string {
  const { headerBanner } = config.modules;
  if (!headerBanner.enabled) return '';

  const name = config.profileData?.name || config.username;
  const lines: string[] = [];

  lines.push(`<div align="center">\n`);

  if (headerBanner.headerStyle === 'waving-hand') {
    lines.push(`  <h1>Hey there, I'm ${headerBanner.title || name} <img src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif" width="30px" alt="wave"></h1>\n`);
  } else if (headerBanner.headerStyle === 'capsule') {
    lines.push(`  <img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=180&section=header&text=${encodeURIComponent(headerBanner.title || name)}&fontSize=42&fontColor=ffffff&animation=fadeIn" width="100%" alt="Header Banner" />\n`);
  } else {
    lines.push(`  <h1>${headerBanner.title || name}</h1>\n`);
  }

  if (headerBanner.subtitle) {
    lines.push(`  <h3>${headerBanner.subtitle}</h3>\n`);
  }

  // Typing SVG
  if (headerBanner.typingLines.length > 0) {
    const typingQuery = headerBanner.typingLines.join(';');
    lines.push(`  <p align="center">\n    <a href="https://github.com/${config.username}">\n      <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=38BDF8&center=true&vCenter=true&width=500&lines=${encodeURIComponent(typingQuery)}" alt="Typing SVG" />\n    </a>\n  </p>\n`);
  }

  lines.push(`</div>\n\n---\n`);
  return lines.join('\n');
}

// ── About Me Renderer ──
function renderAboutMe(config: ProfileConfig): string {
  const { aboutMe } = config.modules;
  if (!aboutMe.enabled) return '';

  const lines: string[] = [];
  lines.push(`### 🚀 About Me\n`);

  if (aboutMe.bioText) {
    lines.push(`${aboutMe.bioText}\n`);
  }

  const qf = aboutMe.quickFacts;
  const facts: string[] = [];

  if (qf.currentWork) facts.push(`- 🔭 **Working on**: ${qf.currentWork}`);
  if (qf.learning) facts.push(`- 🌱 **Exploring & Learning**: ${qf.learning}`);
  if (qf.collaborate) facts.push(`- 👯 **Open to collaborate on**: ${qf.collaborate}`);
  if (qf.askMe) facts.push(`- 💬 **Ask me about**: ${qf.askMe}`);
  if (qf.reachMe) facts.push(`- 📫 **How to reach me**: ${qf.reachMe}`);
  if (qf.funFact) facts.push(`- ⚡ **Fun fact**: ${qf.funFact}`);

  if (facts.length > 0) {
    lines.push(facts.join('\n') + '\n');
  }

  const metaPills: string[] = [];
  if (aboutMe.showLocation && config.profileData?.location) {
    metaPills.push(`📍 Based in **${config.profileData.location}**`);
  }
  if (aboutMe.showCompany && config.profileData?.company) {
    metaPills.push(`🏢 Building at **${config.profileData.company}**`);
  }
  if (aboutMe.showBlog && config.profileData?.blog) {
    metaPills.push(`🌐 [Portfolio Website](${config.profileData.blog.startsWith('http') ? config.profileData.blog : `https://${config.profileData.blog}`})`);
  }

  if (metaPills.length > 0) {
    lines.push(metaPills.join(' • ') + '\n');
  }

  return lines.join('\n');
}

// ── Tech Stack Renderer ──
function renderTechStack(config: ProfileConfig): string {
  const { techStack } = config.modules;
  if (!techStack.enabled || techStack.badges.length === 0) return '';

  const badgeEntries = techStack.badges
    .map(slug => BADGE_REGISTRY.find(b => b.slug === slug))
    .filter((b): b is BadgeEntry => !!b);

  if (badgeEntries.length === 0) return '';

  const lines: string[] = [];
  lines.push(`### 🛠️ Languages & Tools\n`);

  if (techStack.categorize) {
    const categories: { key: string; label: string }[] = [
      { key: 'languages', label: 'Languages' },
      { key: 'frameworks', label: 'Frameworks & Libraries' },
      { key: 'databases', label: 'Databases & Storage' },
      { key: 'tools', label: 'DevOps & Tools' },
      { key: 'cloud', label: 'Cloud Services' },
      { key: 'testing', label: 'Testing' },
    ];

    categories.forEach(cat => {
      const inCat = badgeEntries.filter(b => b.category === cat.key);
      if (inCat.length > 0) {
        lines.push(`**${cat.label}**\n`);
        lines.push(`<p align="left">\n` + inCat.map(b => `  <img src="${getBadgeUrl(b, techStack.style)}" alt="${b.name}" />`).join('\n') + `\n</p>\n`);
      }
    });
  } else {
    lines.push(`<p align="center">\n` + badgeEntries.map(b => `  <img src="${getBadgeUrl(b, techStack.style)}" alt="${b.name}" />`).join('\n') + `\n</p>\n`);
  }

  return lines.join('\n');
}

// ── GitHub Stats Renderer ──
function renderGitHubStats(config: ProfileConfig): string {
  const { githubStats } = config.modules;
  if (!githubStats.enabled) return '';

  const theme = STATS_THEME_MAP[config.theme] || 'tokyonight';
  const username = config.username;
  const lines: string[] = [];

  lines.push(`### 📊 GitHub Activity & Metrics\n`);
  lines.push(`<div align="center">\n`);

  // General stats & Top languages row
  if (githubStats.showGeneralStats || githubStats.showTopLangs) {
    if (githubStats.showGeneralStats) {
      lines.push(`  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&hide_border=true&count_private=true" alt="GitHub Stats" height="165" />`);
    }
    if (githubStats.showTopLangs) {
      lines.push(`  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&hide_border=true" alt="Top Languages" height="165" />`);
    }
    lines.push('');
  }

  // Streak Stats
  if (githubStats.showStreak) {
    lines.push(`  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=true" alt="GitHub Streak" />\n`);
  }

  // Activity Graph
  if (githubStats.showActivityGraph) {
    const graphTheme = theme === 'dark' ? 'react-dark' : theme;
    lines.push(`  <img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme}&hide_border=true&area=true" alt="Activity Graph" width="100%" />\n`);
  }

  // Trophies
  if (githubStats.showTrophies) {
    lines.push(`  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true&column=7&margin_w=10" alt="GitHub Trophies" width="100%" />\n`);
  }

  lines.push(`</div>\n`);
  return lines.join('\n');
}

// ── Featured Repositories ──
function renderFeaturedRepos(config: ProfileConfig): string {
  const { featuredRepos } = config.modules;
  if (!featuredRepos.enabled || featuredRepos.repos.length === 0) return '';

  const lines: string[] = [];
  lines.push(`### 🌟 Featured Repositories\n`);

  featuredRepos.repos.slice(0, 4).forEach(repo => {
    const lang = repo.primaryLanguage?.name ? ` • \`${repo.primaryLanguage.name}\`` : '';
    const stars = repo.stargazerCount > 0 ? ` • ★ ${repo.stargazerCount}` : '';
    lines.push(`- **[${repo.name}](${repo.url})**${lang}${stars}`);
    if (repo.description) {
      lines.push(`  _${repo.description}_`);
    }
  });

  lines.push('');
  return lines.join('\n');
}

// ── Contribution Snake ──
function renderSnake(config: ProfileConfig): string {
  const { snakeAnimation } = config.modules;
  if (!snakeAnimation.enabled) return '';

  const username = config.username;

  return `### 🐍 Contribution Graph

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg" />
    <img alt="GitHub Contribution Snake Animation" src="https://raw.githubusercontent.com/${username}/${username}/output/github-contribution-grid-snake.svg" width="100%" />
  </picture>
</div>
\n`;
}

// ── Social Links ──
function renderSocials(config: ProfileConfig): string {
  const { socialLinks } = config.modules;
  if (!socialLinks.enabled) return '';

  const links: string[] = [];

  if (socialLinks.github) {
    links.push(`  <a href="https://github.com/${socialLinks.github}" target="_blank">\n    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />\n  </a>`);
  }
  if (socialLinks.linkedin) {
    links.push(`  <a href="https://linkedin.com/in/${socialLinks.linkedin}" target="_blank">\n    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />\n  </a>`);
  }
  if (socialLinks.twitter) {
    links.push(`  <a href="https://twitter.com/${socialLinks.twitter}" target="_blank">\n    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=x&logoColor=white" alt="Twitter" />\n  </a>`);
  }
  if (socialLinks.discord) {
    links.push(`  <a href="${socialLinks.discord.startsWith('http') ? socialLinks.discord : `https://discord.gg/${socialLinks.discord}`}" target="_blank">\n    <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />\n  </a>`);
  }
  if (socialLinks.youtube) {
    links.push(`  <a href="https://youtube.com/@${socialLinks.youtube}" target="_blank">\n    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" />\n  </a>`);
  }
  if (socialLinks.portfolio) {
    const url = socialLinks.portfolio.startsWith('http') ? socialLinks.portfolio : `https://${socialLinks.portfolio}`;
    links.push(`  <a href="${url}" target="_blank">\n    <img src="https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=safari&logoColor=white" alt="Portfolio" />\n  </a>`);
  }
  if (socialLinks.email) {
    links.push(`  <a href="mailto:${socialLinks.email}">\n    <img src="https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />\n  </a>`);
  }

  if (links.length === 0) return '';

  return `### 🌐 Connect With Me\n\n<p align="center">\n${links.join('\n')}\n</p>\n\n`;
}

// ── Footer ──
function renderFooter(config: ProfileConfig): string {
  const { footer } = config.modules;
  if (!footer.enabled) return '';

  const lines: string[] = [];
  lines.push(`---\n`);

  if (footer.quote) {
    lines.push(`<div align="center">\n  <p><em>${footer.quote}</em></p>\n</div>\n`);
  }

  if (footer.showVisitorBadge) {
    lines.push(`<div align="center">\n  <img src="https://komarev.com/ghpvc/?username=${config.username}&label=Profile%20Views&color=38BDF8&style=flat-square" alt="Profile Views" />\n</div>\n`);
  }

  return lines.join('\n');
}

// ── Snake Actions Workflow ──
export function generateSnakeWorkflow(username: string): string {
  return `name: Generate Snake Animation

on:
  schedule:
    - cron: "0 0 * * *" # Runs every 24 hours
  workflow_dispatch:
  push:
    branches:
      - main

jobs:
  generate:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Generate contribution snake SVG
        uses: Platane/snk/svg-only@v3
        with:
          github_user_name: ${username}
          outputs: |
            dist/github-contribution-grid-snake.svg
            dist/github-contribution-grid-snake-dark.svg?palette=github-dark
      
      - name: Push snake SVG to output branch
        uses: crazy-max/ghaction-github-pages@v4
        with:
          target_branch: output
          build_dir: dist
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
}

// ── Compiler ──
export function compileProfile(config: ProfileConfig): { markdown: string; workflowYaml?: string } {
  const sections = [
    renderHeader(config),
    renderAboutMe(config),
    renderTechStack(config),
    renderFeaturedRepos(config),
    renderGitHubStats(config),
    renderSnake(config),
    renderSocials(config),
    renderFooter(config),
  ].filter(s => s.trim().length > 0);

  const markdown = sections.join('\n');
  const workflowYaml = config.modules.snakeAnimation.enabled
    ? generateSnakeWorkflow(config.username)
    : undefined;

  return { markdown, workflowYaml };
}

// ── Factory Defaults ──
export function createDefaultModules(): ModuleConfig {
  return {
    headerBanner: {
      enabled: true,
      headerStyle: 'waving-hand',
      title: '',
      subtitle: 'Full-Stack Developer • Open Source Creator',
      typingLines: ['Building scalable web applications 🚀', 'Writing clean, elegant code ⚡', 'Open to exciting projects 🤝'],
    },
    aboutMe: {
      enabled: true,
      bioText: '',
      showLocation: true,
      showCompany: true,
      showBlog: true,
      quickFacts: {
        currentWork: 'High-scale web applications',
        learning: 'Cloud architectures & distributed systems',
        collaborate: 'Open source developer tools',
        askMe: 'TypeScript, React, Node.js, and System Design',
        reachMe: 'email or social channels below',
        funFact: 'I turn coffee into performant code ☕',
      },
    },
    techStack: {
      enabled: true,
      style: 'for-the-badge',
      categorize: true,
      badges: ['typescript', 'react', 'nextdotjs', 'nodedotjs', 'tailwindcss', 'postgresql', 'docker', 'git'],
    },
    githubStats: {
      enabled: true,
      showGeneralStats: true,
      showStreak: true,
      showTopLangs: true,
      showActivityGraph: true,
      showTrophies: false,
    },
    featuredRepos: {
      enabled: true,
      repos: [],
    },
    snakeAnimation: {
      enabled: true,
    },
    socialLinks: {
      enabled: true,
      github: '',
      twitter: '',
      linkedin: '',
      portfolio: '',
      discord: '',
      youtube: '',
      email: '',
    },
    footer: {
      enabled: true,
      showVisitorBadge: true,
      quote: '💡 "Code is like humor. When you have to explain it, it is bad." — Cory House',
    },
  };
}
