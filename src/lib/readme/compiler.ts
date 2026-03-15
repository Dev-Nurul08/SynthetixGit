/**
 * GitHub Profile Forge — Structured README Model Compiler (PDF Section 7 & 12)
 * Compiles a structured Forge profile configuration object into deterministic Markdown.
 */

import type { ModuleConfig, ThemeId, TemplateId } from '@/lib/template-engine';

export interface ForgeProfileConfig {
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
  };
}

export function compileForgeReadme(config: ForgeProfileConfig): string {
  const { username, modules, profileData } = config;
  const user = username.trim() || 'octocat';
  const resolvedTitle = modules.headerBanner.title || profileData?.name || user;
  const resolvedSubtitle = modules.headerBanner.subtitle || profileData?.bio || 'Software Engineer';
  const resolvedEmail = modules.beastModeDashboard.email || '';

  const lines: string[] = [];

  // Header Banner
  lines.push('<div align="center">');
  lines.push('');

  if (modules.headerBanner.enabled) {
    const titleEnc = encodeURIComponent(resolvedTitle);
    const subEnc = encodeURIComponent(resolvedSubtitle);

    if (modules.headerBanner.headerStyle === 'venom-capsule') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=venom&color=0a0d12&height=250&section=header&text=${titleEnc}&fontSize=65&animation=twinkling&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=Fira%20Code&descFont=Roboto&textColor=22d3ee&descColor=cbd5e1&borderRadius=25" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'waving-capsule') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=waving&color=0a0d12&height=220&section=header&text=${titleEnc}&fontSize=50&animation=twinkling&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Fira%20Code&descFont=Roboto" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'cyberpunk-glitch') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=slice&color=0a0d12&height=230&section=header&text=${titleEnc}&fontSize=60&animation=fadeIn&fontAlignY=38&desc=${subEnc}&descAlignY=62&font=Orbitron&descFont=Fira%20Code&textColor=22d3ee&descColor=34d399" width="100%" alt="Header Banner" />`);
    } else if (modules.headerBanner.headerStyle === 'terminal-prompt') {
      lines.push(`  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=0a0d12&height=200&section=header&text=${titleEnc}&fontSize=55&fontAlignY=40&desc=${subEnc}&descAlignY=65&font=Fira%20Code&descFont=Roboto&textColor=34d399&descColor=22d3ee" width="100%" alt="Terminal Header" />`);
    } else {
      lines.push(`  <h1>${resolvedTitle}</h1>`);
      lines.push(`  <p><em>${resolvedSubtitle}</em></p>`);
    }

    lines.push('');

    if (modules.headerBanner.typingLines && modules.headerBanner.typingLines.length > 0) {
      const typingParam = encodeURIComponent(modules.headerBanner.typingLines.join(';'));
      lines.push('  <div align="center">');
      lines.push(`    <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=900&size=25&duration=3000&pause=1000&color=22D3EE&center=true&vCenter=true&multiline=true&width=800&height=100&lines=${typingParam}" alt="Typing SVG" />`);
      lines.push('  </div>');
      lines.push('');
    }
  }

  // Beast Mode Dashboard
  if (modules.beastModeDashboard.enabled) {
    lines.push('  <div align="center">');
    lines.push('    <h2 align="center" style="font-family: \'Orbitron\', sans-serif; color: #22d3ee; margin: 20px 0;">');
    lines.push('      📊 Performance Dashboard');
    lines.push('    </h2>');
    lines.push('    <div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">');

    if (modules.beastModeDashboard.showProfileViews) {
      lines.push(`      <img src="https://komarev.com/ghpvc/?username=${user}&color=0e7490&style=flat-square&label=Profile%20Views" alt="Profile Views" />`);
    }

    if (modules.beastModeDashboard.showGrowthMetrics) {
      lines.push(`      <img src="https://img.shields.io/github/followers/${user}?style=flat-square&color=0891b2&label=Followers&logo=person-add" alt="Followers" />`);
      lines.push(`      <img src="https://img.shields.io/github/stars/${user}?style=flat-square&color=06b6d4&label=Stars&logo=star" alt="Stars" />`);
    }

    if (modules.beastModeDashboard.showOpenToWork) {
      lines.push('      <img src="https://img.shields.io/badge/Open%20to%20Work-✅%20YES-34d399?style=flat-square&logo=briefcase" alt="Open to Work" />');
      if (modules.beastModeDashboard.showHireMe && resolvedEmail) {
        lines.push(`      <a href="mailto:${resolvedEmail}"><img src="https://img.shields.io/badge/Hire%20Me-🚀%20Click%20Here-0891b2?style=flat-square&logo=rocket&logoColor=white" alt="Hire Me" /></a>`);
      }
    }

    lines.push('    </div>');
    lines.push('  </div>');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Tech Stack Badges
  if (modules.techStack && modules.techStack.enabled && modules.techStack.badges.length > 0) {
    lines.push('  <h2 align="center">🛠️ Tech Stack & Skills</h2>');
    lines.push('');
    lines.push('  <div align="center">');
    for (const badge of modules.techStack.badges) {
      lines.push(`    <img src="https://img.shields.io/badge/${badge}-0a0d12?style=for-the-badge&logo=${badge}&logoColor=white" style="margin: 4px;" />`);
    }
    lines.push('  </div>');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // GitHub Analytics
  if (modules.githubAnalytics.enabled) {
    lines.push('  <h2 align="center">⚡ GitHub Analytics</h2>');
    lines.push('');

    if (modules.githubAnalytics.showStatsCard) {
      lines.push('  <div align="center">');
      lines.push(`    <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=dark&hide_border=true" alt="GitHub Stats" />`);
      lines.push('  </div>');
      lines.push('');
    }

    if (modules.githubAnalytics.showActivityWave) {
      lines.push('  <div align="center">');
      lines.push(`    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${user}&theme=dark&hide_border=true" alt="Streak Stats" />`);
      lines.push('  </div>');
      lines.push('');
    }

    if (modules.githubAnalytics.showTrophies) {
      lines.push('  <div align="center">');
      lines.push(`    <img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=onedark&column=6&margin-w=15&margin-h=15" alt="Trophies" />`);
      lines.push('  </div>');
      lines.push('');
    }
  }

  // Arcade Game Badge Link
  if (modules.gameSuite && modules.gameSuite.enabled) {
    const gameType = modules.gameSuite.gameType || 'snake';
    lines.push('  <h2 align="center">🎮 Playable Profile Arcade</h2>');
    lines.push('  <div align="center">');
    lines.push(`    <a href="https://synthetixgit.vercel.app/games/${gameType}?user=${user}">`);
    lines.push(`      <img src="https://img.shields.io/badge/PLAY%20${gameType.toUpperCase()}%20ARCADE-🕹️%20Click%20To%20Play-34d399?style=for-the-badge&logo=gamepad" alt="Play Arcade Game" />`);
    lines.push('    </a>');
    lines.push('  </div>');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Footer
  if (modules.footer.enabled) {
    const closeEnc = encodeURIComponent(modules.footer.closingText || 'Thanks for visiting!');
    lines.push('  <div align="center">');
    lines.push(`    <img src="https://capsule-render.vercel.app/api?type=waving&color=0a0d12&height=120&section=footer&text=${closeEnc}&fontSize=35&fontAlignY=65&animation=twinkling&fontColor=fff" width="100%" alt="Footer Banner" />`);
    lines.push('  </div>');
  }

  lines.push('</div>');

  return lines.join('\n');
}
