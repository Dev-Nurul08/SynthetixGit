#!/usr/bin/env node

/**
 * SynthetixGit Standalone CLI Tool (Milestone 19 Feb 2026)
 * Usage: npx synthetix-cli <username> [--template <templateId>] [--output <filePath>]
 */

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .name('synthetix-cli')
  .description('SynthetixGit CLI: Generate high-fidelity developer profiles from the command line')
  .argument('<username>', 'Target GitHub username to scan and generate profile for')
  .option('-t, --template <templateId>', 'Template ID (e.g. beast-mode-neon, cyberpunk-glitch, dracula-dark)', 'beast-mode-neon')
  .option('-o, --output <file>', 'Output path for generated markdown', 'README.md')
  .action(async (username, options) => {
    console.log(`\n🚀 SynthetixGit CLI initializing for @${username}...`);
    console.log(`🎨 Selected Template: ${options.template}`);

    try {
      const endpoint = process.env.SYNTHETIX_API_URL || 'https://synthetixgit.vercel.app';
      const scanRes = await fetch(`${endpoint}/api/user/scan/${username}`);
      if (!scanRes.ok) throw new Error(`Failed to scan @${username}: HTTP ${scanRes.status}`);

      const scanData = await scanRes.json();
      console.log(`✅ Scanned @${username}: ${scanData.stats.totalStars} Stars, ${scanData.stats.totalCommitsLastYear} Commits, ${scanData.stats.topLanguages.length} Languages.`);

      const genRes = await fetch(`${endpoint}/api/user/generate-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          templateId: options.template,
          theme: 'dracula',
          modules: {
            headerBanner: {
              enabled: true,
              headerStyle: 'venom-capsule',
              title: scanData.profile.name || username,
              subtitle: scanData.profile.bio || 'Full-Stack Developer',
              typingLines: ['Full-Stack Developer ⚡', 'Open Source Contributor 🚀', 'DSA Master 🏆'],
              bannerColor: 'gradient',
            },
            beastModeDashboard: { enabled: true, showProfileViews: true, showGrowthMetrics: true, showOpenToWork: true, showHireMe: true, showStreakCard: true, showWakaTime: true, email: scanData.profile.email || '' },
            githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            educationAndSkills: { enabled: true, institutionName: 'University', institutionColor: '6a11cb', skillIcons: scanData.stats.topLanguages.map(l => l.name.toLowerCase()), additionalBadges: [], showWakaTimeDropdown: true, showTopLangsPie: true, showLeetCodeCard: true, leetCodeUsername: '' },
            techArsenal: { enabled: true, items: [] },
            aboutMe: { enabled: true, bioText: scanData.profile.bio || '', quickFacts: { currentWork: 'Web Applications', learning: 'Cloud Architecture', collaborate: 'Open Source', askMe: 'JavaScript, TypeScript', reachMe: scanData.profile.email || '', funFact: 'Talk is cheap. Show me the code!' }, showLocation: true, showCompany: true, showBlog: true },
            techStack: { enabled: true, style: 'for-the-badge', categorize: true, badges: scanData.stats.topLanguages.map(l => l.name.toLowerCase()) },
            featuredRepos: { enabled: false, repos: [] },
            gameSuite: { enabled: true, gameType: 'breakout', motto: 'Code. Commit. Conquer.' },
            socialLinks: { enabled: true, github: username, linkedin: '', twitter: '', email: scanData.profile.email || '', behance: '', instagram: '', portfolio: '', discord: '', youtube: '', scheduleMeetingUrl: '', responseTime: '< 24 hours' },
            interactiveWidgets: { enabled: true, showDailyDevQuote: true, showCodingChallenge: true, showVisitorMap: true, showPersonalPhilosophy: true, mantras: ['Focus on progress, not perfection'] },
            footer: { enabled: true, footerStyle: 'waving-capsule', closingText: 'Thanks for visiting!', showVisitorBadge: true, authorName: scanData.profile.name || username, statusBadgeText: 'Status-Beast Mode ON' },
          },
        }),
      });

      const genData = await genRes.json();
      if (!genRes.ok) throw new Error(genData.error || 'Failed to generate markdown');

      const outPath = path.resolve(process.cwd(), options.output);
      fs.writeFileSync(outPath, genData.markdown, 'utf-8');
      console.log(`\n🎉 Success! Profile README generated at: ${outPath}\n`);
    } catch (err) {
      console.error(`\n❌ Error: ${err.message}\n`);
      process.exit(1);
    }
  });

program.parse(process.argv);
