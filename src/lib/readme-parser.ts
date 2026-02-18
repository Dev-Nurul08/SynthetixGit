/**
 * SynthetixGit — Profile README Scanner & Intelligent Parser (Phase 3)
 * Scans an existing GitHub profile README (from username/username)
 * and extracts structured bio, skills, badges, social URLs, LeetCode, WakaTime, etc.
 */

import type { ModuleConfig } from './template-engine';

export interface ParsedReadmeData {
  title?: string;
  subtitle?: string;
  bio?: string;
  typingLines?: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    behance?: string;
    instagram?: string;
    portfolio?: string;
    discord?: string;
    youtube?: string;
  };
  leetCodeUsername?: string;
  wakaTimeShareSvgUrl?: string;
  skillSlugs: string[];
  institutionName?: string;
  detectedBlocks: {
    hasHeader: boolean;
    hasStats: boolean;
    hasStreak: boolean;
    hasSkills: boolean;
    hasLeetCode: boolean;
    hasWakaTime: boolean;
    hasTrophies: boolean;
    hasSnake: boolean;
    hasSocials: boolean;
  };
}

export function parseExistingReadme(rawMarkdown: string, defaultUsername: string): ParsedReadmeData {
  const result: ParsedReadmeData = {
    socialLinks: {},
    skillSlugs: [],
    detectedBlocks: {
      hasHeader: false,
      hasStats: false,
      hasStreak: false,
      hasSkills: false,
      hasLeetCode: false,
      hasWakaTime: false,
      hasTrophies: false,
      hasSnake: false,
      hasSocials: false,
    },
  };

  if (!rawMarkdown || typeof rawMarkdown !== 'string') {
    return result;
  }

  // 1. Check for Capsule Header or H1 Header
  const capsuleMatch = rawMarkdown.match(/capsule-render\.vercel\.app\/api\?[^"'\s)]*text=([^&"'\s)]+)/i);
  if (capsuleMatch) {
    result.detectedBlocks.hasHeader = true;
    result.title = decodeURIComponent(capsuleMatch[1]).replace(/\+/g, ' ');
    const descMatch = rawMarkdown.match(/desc=([^&"'\s)]+)/i);
    if (descMatch) {
      result.subtitle = decodeURIComponent(descMatch[1]).replace(/\+/g, ' ');
    }
  } else {
    const h1Match = rawMarkdown.match(/^#\s+(.+)$/m) || rawMarkdown.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      result.detectedBlocks.hasHeader = true;
      result.title = h1Match[1].replace(/<[^>]+>/g, '').trim();
    }
  }

  // 2. Check for Typing SVG lines
  const typingMatch = rawMarkdown.match(/readme-typing-svg\.demolab\.com\?[^"'\s)]*lines=([^"'\s&)]+)/i);
  if (typingMatch) {
    result.detectedBlocks.hasHeader = true;
    const rawLines = decodeURIComponent(typingMatch[1]).split(';');
    result.typingLines = rawLines.map((l) => l.replace(/\+/g, ' ').trim()).filter(Boolean);
  }

  // 3. Extract LeetCode username
  const leetMatch =
    rawMarkdown.match(/leetcard\.jacoblin\.cool\/([^?/"'\s)]+)/i) ||
    rawMarkdown.match(/leetcode-stats-api\.herokuapp\.com\/([^?/"'\s)]+)/i) ||
    rawMarkdown.match(/leetcode\.com\/u\/([^/"'\s)]+)/i) ||
    rawMarkdown.match(/leetcode\.com\/([^/"'\s)]+)/i);
  if (leetMatch && leetMatch[1]) {
    result.leetCodeUsername = leetMatch[1];
    result.detectedBlocks.hasLeetCode = true;
  }

  // 4. Extract WakaTime Share URL
  const wakaMatch = rawMarkdown.match(/wakatime\.com\/share\/@?([^"'\s)]+\.svg)/i);
  if (wakaMatch) {
    result.wakaTimeShareSvgUrl = `https://wakatime.com/share/${wakaMatch[1]}`;
    result.detectedBlocks.hasWakaTime = true;
  }

  // 5. Extract Social Links
  // LinkedIn
  const linkedinMatch =
    rawMarkdown.match(/linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i) ||
    rawMarkdown.match(/badge\/LinkedIn-[^?]*logo=linkedin[^"'\s)]*/i);
  if (linkedinMatch && linkedinMatch[1]) {
    result.socialLinks.linkedin = linkedinMatch[1];
    result.detectedBlocks.hasSocials = true;
  }

  // Twitter / X
  const twitterMatch =
    rawMarkdown.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/i);
  if (twitterMatch && twitterMatch[1]) {
    result.socialLinks.twitter = twitterMatch[1];
    result.detectedBlocks.hasSocials = true;
  }

  // Email
  const emailMatch = rawMarkdown.match(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  if (emailMatch) {
    result.socialLinks.email = emailMatch[1];
    result.detectedBlocks.hasSocials = true;
  }

  // Behance
  const behanceMatch = rawMarkdown.match(/behance\.net\/([a-zA-Z0-9_-]+)/i);
  if (behanceMatch) {
    result.socialLinks.behance = behanceMatch[1];
    result.detectedBlocks.hasSocials = true;
  }

  // Instagram
  const instagramMatch = rawMarkdown.match(/instagram\.com\/([a-zA-Z0-9_.]+)/i);
  if (instagramMatch) {
    result.socialLinks.instagram = instagramMatch[1];
    result.detectedBlocks.hasSocials = true;
  }

  // Discord
  const discordMatch = rawMarkdown.match(/(?:discord\.gg|discord\.com\/users)\/([a-zA-Z0-9_-]+)/i);
  if (discordMatch) {
    result.socialLinks.discord = discordMatch[0];
    result.detectedBlocks.hasSocials = true;
  }

  // YouTube
  const youtubeMatch = rawMarkdown.match(/(?:youtube\.com\/(?:c\/|@|channel\/))([a-zA-Z0-9_-]+)/i);
  if (youtubeMatch) {
    result.socialLinks.youtube = youtubeMatch[0];
    result.detectedBlocks.hasSocials = true;
  }

  // 6. Extract SkillIcons
  const skillIconsMatch = rawMarkdown.match(/skillicons\.dev\/icons\?i=([^&"'\s)]+)/i);
  if (skillIconsMatch) {
    result.detectedBlocks.hasSkills = true;
    const slugs = skillIconsMatch[1].split(',').map((s) => s.trim().toLowerCase());
    result.skillSlugs.push(...slugs);
  }

  // 7. Extract Shields.io Badges
  const badgeMatches = rawMarkdown.matchAll(/img\.shields\.io\/badge\/([^-]+)-/gi);
  for (const match of badgeMatches) {
    const rawBadge = decodeURIComponent(match[1]).toLowerCase().replace(/_/g, '').trim();
    if (rawBadge && !result.skillSlugs.includes(rawBadge)) {
      result.skillSlugs.push(rawBadge);
    }
  }

  // 8. Detect Stats, Streaks, Trophies, Snake
  if (rawMarkdown.includes('github-readme-stats') || rawMarkdown.includes('github-profile-summary-cards')) {
    result.detectedBlocks.hasStats = true;
  }
  if (rawMarkdown.includes('github-readme-streak-stats')) {
    result.detectedBlocks.hasStreak = true;
  }
  if (rawMarkdown.includes('github-profile-trophy')) {
    result.detectedBlocks.hasTrophies = true;
  }
  if (rawMarkdown.includes('github-contribution-grid-snake') || rawMarkdown.includes('snk@')) {
    result.detectedBlocks.hasSnake = true;
  }

  // 9. Extract Bio text if present
  const bioMatch =
    rawMarkdown.match(/<!--\s*bio\s*-->\s*([\s\S]*?)\s*<!--/i) ||
    rawMarkdown.match(/<p align="center">([\s\S]*?)<\/p>/i);
  if (bioMatch && bioMatch[1]) {
    const cleanedBio = bioMatch[1].replace(/<[^>]+>/g, '').trim();
    if (cleanedBio.length > 10 && !cleanedBio.includes('img.shields')) {
      result.bio = cleanedBio;
    }
  }

  result.socialLinks.github = defaultUsername;
  return result;
}

/**
 * Merge parsed README data into a ModuleConfig
 */
export function applyParsedReadmeToModules(
  currentModules: ModuleConfig,
  parsed: ParsedReadmeData
): ModuleConfig {
  const updated: ModuleConfig = { ...currentModules };

  if (parsed.title || parsed.subtitle || (parsed.typingLines && parsed.typingLines.length > 0)) {
    updated.headerBanner = {
      ...updated.headerBanner,
      enabled: true,
      title: parsed.title || updated.headerBanner.title,
      subtitle: parsed.subtitle || updated.headerBanner.subtitle,
      typingLines: parsed.typingLines && parsed.typingLines.length > 0 ? parsed.typingLines : updated.headerBanner.typingLines,
    };
  }

  if (parsed.bio) {
    updated.aboutMe = {
      ...updated.aboutMe,
      enabled: true,
      bioText: parsed.bio,
    };
  }

  if (parsed.leetCodeUsername) {
    updated.educationAndSkills = {
      ...updated.educationAndSkills,
      enabled: true,
      showLeetCodeCard: true,
      leetCodeUsername: parsed.leetCodeUsername,
    };
  }

  if (parsed.wakaTimeShareSvgUrl) {
    updated.educationAndSkills = {
      ...updated.educationAndSkills,
      enabled: true,
      showWakaTimeDropdown: true,
      wakaTimeShareSvgUrl: parsed.wakaTimeShareSvgUrl,
    };
  }

  if (parsed.skillSlugs.length > 0) {
    updated.techStack = {
      ...updated.techStack,
      enabled: true,
      badges: Array.from(new Set([...updated.techStack.badges, ...parsed.skillSlugs])),
    };
    updated.educationAndSkills = {
      ...updated.educationAndSkills,
      skillIcons: Array.from(new Set([...updated.educationAndSkills.skillIcons, ...parsed.skillSlugs])),
    };
  }

  if (Object.keys(parsed.socialLinks).length > 0) {
    updated.socialLinks = {
      ...updated.socialLinks,
      enabled: true,
      ...parsed.socialLinks,
    };
  }

  if (parsed.detectedBlocks.hasSnake) {
    updated.gameSuite = {
      ...updated.gameSuite,
      enabled: true,
    };
  }

  if (parsed.detectedBlocks.hasTrophies) {
    updated.githubAnalytics = {
      ...updated.githubAnalytics,
      enabled: true,
      showTrophies: true,
    };
  }

  return updated;
}
