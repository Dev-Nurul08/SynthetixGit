/**
 * Comprehensive registry of 100+ technologies mapped to Shields.io badge URLs.
 * Each badge uses the SimpleIcons slug for consistent rendering.
 */

export interface BadgeEntry {
  name: string;
  slug: string;
  color: string;
  category: BadgeCategory;
  logo?: string;
}

export type BadgeCategory = 'languages' | 'frameworks' | 'databases' | 'tools' | 'cloud' | 'design' | 'testing';

export const BADGE_REGISTRY: BadgeEntry[] = [
  // ── Languages ──
  { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E', category: 'languages' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6', category: 'languages' },
  { name: 'Python', slug: 'python', color: '3776AB', category: 'languages' },
  { name: 'Java', slug: 'java', color: 'ED8B00', category: 'languages' },
  { name: 'C++', slug: 'cplusplus', color: '00599C', category: 'languages' },
  { name: 'C#', slug: 'csharp', color: '239120', category: 'languages' },
  { name: 'C', slug: 'c', color: 'A8B9CC', category: 'languages' },
  { name: 'Go', slug: 'go', color: '00ADD8', category: 'languages' },
  { name: 'Rust', slug: 'rust', color: '000000', category: 'languages' },
  { name: 'Ruby', slug: 'ruby', color: 'CC342D', category: 'languages' },
  { name: 'PHP', slug: 'php', color: '777BB4', category: 'languages' },
  { name: 'Swift', slug: 'swift', color: 'F05138', category: 'languages' },
  { name: 'Kotlin', slug: 'kotlin', color: '7F52FF', category: 'languages' },
  { name: 'Dart', slug: 'dart', color: '0175C2', category: 'languages' },
  { name: 'Scala', slug: 'scala', color: 'DC322F', category: 'languages' },
  { name: 'R', slug: 'r', color: '276DC3', category: 'languages' },
  { name: 'Lua', slug: 'lua', color: '2C2D72', category: 'languages' },
  { name: 'Haskell', slug: 'haskell', color: '5D4F85', category: 'languages' },
  { name: 'Elixir', slug: 'elixir', color: '4B275F', category: 'languages' },
  { name: 'Shell', slug: 'gnubash', color: '4EAA25', category: 'languages' },
  { name: 'HTML5', slug: 'html5', color: 'E34F26', category: 'languages' },
  { name: 'CSS3', slug: 'css3', color: '1572B6', category: 'languages' },
  { name: 'Sass', slug: 'sass', color: 'CC6699', category: 'languages' },
  { name: 'Solidity', slug: 'solidity', color: '363636', category: 'languages' },
  { name: 'Zig', slug: 'zig', color: 'F7A41D', category: 'languages' },

  // ── Frameworks & Libraries ──
  { name: 'React', slug: 'react', color: '61DAFB', category: 'frameworks' },
  { name: 'Next.js', slug: 'nextdotjs', color: '000000', category: 'frameworks' },
  { name: 'Vue.js', slug: 'vuedotjs', color: '4FC08D', category: 'frameworks' },
  { name: 'Nuxt.js', slug: 'nuxtdotjs', color: '00DC82', category: 'frameworks' },
  { name: 'Angular', slug: 'angular', color: '0F0F11', category: 'frameworks' },
  { name: 'Svelte', slug: 'svelte', color: 'FF3E00', category: 'frameworks' },
  { name: 'Node.js', slug: 'nodedotjs', color: '5FA04E', category: 'frameworks' },
  { name: 'Express', slug: 'express', color: '000000', category: 'frameworks' },
  { name: 'Django', slug: 'django', color: '092E20', category: 'frameworks' },
  { name: 'Flask', slug: 'flask', color: '000000', category: 'frameworks' },
  { name: 'FastAPI', slug: 'fastapi', color: '009688', category: 'frameworks' },
  { name: 'Spring Boot', slug: 'springboot', color: '6DB33F', category: 'frameworks' },
  { name: 'Rails', slug: 'rubyonrails', color: 'D30001', category: 'frameworks' },
  { name: 'Laravel', slug: 'laravel', color: 'FF2D20', category: 'frameworks' },
  { name: 'Flutter', slug: 'flutter', color: '02569B', category: 'frameworks' },
  { name: 'React Native', slug: 'reactnative', logo: 'react', color: '61DAFB', category: 'frameworks' },
  { name: 'Electron', slug: 'electron', color: '47848F', category: 'frameworks' },
  { name: 'TailwindCSS', slug: 'tailwindcss', color: '06B6D4', category: 'frameworks' },
  { name: 'Bootstrap', slug: 'bootstrap', color: '7952B3', category: 'frameworks' },
  { name: 'jQuery', slug: 'jquery', color: '0769AD', category: 'frameworks' },
  { name: 'Three.js', slug: 'threedotjs', color: '000000', category: 'frameworks' },
  { name: 'Astro', slug: 'astro', color: 'BC52EE', category: 'frameworks' },
  { name: 'Remix', slug: 'remix', color: '000000', category: 'frameworks' },
  { name: 'Solid.js', slug: 'solid', color: '2C4F7C', category: 'frameworks' },
  { name: '.NET', slug: 'dotnet', color: '512BD4', category: 'frameworks' },

  // ── Databases ──
  { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1', category: 'databases' },
  { name: 'MySQL', slug: 'mysql', color: '4479A1', category: 'databases' },
  { name: 'MongoDB', slug: 'mongodb', color: '47A248', category: 'databases' },
  { name: 'Redis', slug: 'redis', color: 'FF4438', category: 'databases' },
  { name: 'SQLite', slug: 'sqlite', color: '003B57', category: 'databases' },
  { name: 'Firebase', slug: 'firebase', color: 'DD2C00', category: 'databases' },
  { name: 'Supabase', slug: 'supabase', color: '3FCF8E', category: 'databases' },
  { name: 'Prisma', slug: 'prisma', color: '2D3748', category: 'databases' },
  { name: 'DynamoDB', slug: 'amazondynamodb', color: '4053D6', category: 'databases' },
  { name: 'Cassandra', slug: 'apachecassandra', color: '1287B1', category: 'databases' },
  { name: 'Neo4j', slug: 'neo4j', color: '4581C3', category: 'databases' },
  { name: 'Elasticsearch', slug: 'elasticsearch', color: '005571', category: 'databases' },
  { name: 'MariaDB', slug: 'mariadb', color: '003545', category: 'databases' },

  // ── DevOps & Tools ──
  { name: 'Docker', slug: 'docker', color: '2496ED', category: 'tools' },
  { name: 'Kubernetes', slug: 'kubernetes', color: '326CE5', category: 'tools' },
  { name: 'Git', slug: 'git', color: 'F05032', category: 'tools' },
  { name: 'GitHub', slug: 'github', color: '181717', category: 'tools' },
  { name: 'GitLab', slug: 'gitlab', color: 'FC6D26', category: 'tools' },
  { name: 'GitHub Actions', slug: 'githubactions', color: '2088FF', category: 'tools' },
  { name: 'Jenkins', slug: 'jenkins', color: 'D24939', category: 'tools' },
  { name: 'Terraform', slug: 'terraform', color: '844FBA', category: 'tools' },
  { name: 'Nginx', slug: 'nginx', color: '009639', category: 'tools' },
  { name: 'Linux', slug: 'linux', color: 'FCC624', category: 'tools' },
  { name: 'Webpack', slug: 'webpack', color: '8DD6F9', category: 'tools' },
  { name: 'Vite', slug: 'vite', color: '646CFF', category: 'tools' },
  { name: 'NPM', slug: 'npm', color: 'CB3837', category: 'tools' },
  { name: 'Yarn', slug: 'yarn', color: '2C8EBB', category: 'tools' },
  { name: 'pnpm', slug: 'pnpm', color: 'F69220', category: 'tools' },
  { name: 'ESLint', slug: 'eslint', color: '4B32C3', category: 'tools' },
  { name: 'Prettier', slug: 'prettier', color: 'F7B93E', category: 'tools' },
  { name: 'VS Code', slug: 'visualstudiocode', color: '007ACC', category: 'tools' },
  { name: 'Postman', slug: 'postman', color: 'FF6C37', category: 'tools' },
  { name: 'Figma', slug: 'figma', color: 'F24E1E', category: 'tools' },
  { name: 'Notion', slug: 'notion', color: '000000', category: 'tools' },
  { name: 'Jira', slug: 'jira', color: '0052CC', category: 'tools' },
  { name: 'Grafana', slug: 'grafana', color: 'F46800', category: 'tools' },
  { name: 'Prometheus', slug: 'prometheus', color: 'E6522C', category: 'tools' },
  { name: 'Ansible', slug: 'ansible', color: 'EE0000', category: 'tools' },

  // ── Cloud & Services ──
  { name: 'AWS', slug: 'amazonwebservices', color: '232F3E', category: 'cloud' },
  { name: 'Google Cloud', slug: 'googlecloud', color: '4285F4', category: 'cloud' },
  { name: 'Azure', slug: 'microsoftazure', color: '0078D4', category: 'cloud' },
  { name: 'Vercel', slug: 'vercel', color: '000000', category: 'cloud' },
  { name: 'Netlify', slug: 'netlify', color: '00C7B7', category: 'cloud' },
  { name: 'Heroku', slug: 'heroku', color: '430098', category: 'cloud' },
  { name: 'DigitalOcean', slug: 'digitalocean', color: '0080FF', category: 'cloud' },
  { name: 'Cloudflare', slug: 'cloudflare', color: 'F38020', category: 'cloud' },
  { name: 'Railway', slug: 'railway', color: '0B0D0E', category: 'cloud' },
  { name: 'Render', slug: 'render', color: '000000', category: 'cloud' },

  // ── Testing ──
  { name: 'Jest', slug: 'jest', color: 'C21325', category: 'testing' },
  { name: 'Cypress', slug: 'cypress', color: '69D3A7', category: 'testing' },
  { name: 'Playwright', slug: 'playwright', color: '2EAD33', category: 'testing' },
  { name: 'Vitest', slug: 'vitest', color: '6E9F18', category: 'testing' },
  { name: 'Selenium', slug: 'selenium', color: '43B02A', category: 'testing' },
  { name: 'Mocha', slug: 'mocha', color: '8D6748', category: 'testing' },
  { name: 'Storybook', slug: 'storybook', color: 'FF4785', category: 'testing' },
];

/**
 * Maps common GitHub language names to badge slugs
 */
const LANGUAGE_TO_BADGE: Record<string, string> = {
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Python': 'python',
  'Java': 'java',
  'C++': 'cplusplus',
  'C#': 'csharp',
  'C': 'c',
  'Go': 'go',
  'Rust': 'rust',
  'Ruby': 'ruby',
  'PHP': 'php',
  'Swift': 'swift',
  'Kotlin': 'kotlin',
  'Dart': 'dart',
  'Scala': 'scala',
  'R': 'r',
  'Lua': 'lua',
  'Haskell': 'haskell',
  'Elixir': 'elixir',
  'Shell': 'gnubash',
  'HTML': 'html5',
  'CSS': 'css3',
  'Sass': 'sass',
  'SCSS': 'sass',
  'Zig': 'zig',
  'Solidity': 'solidity',
  'Vue': 'vuedotjs',
  'Svelte': 'svelte',
};

/**
 * Generate a Shields.io badge URL for a given technology
 */
export function getBadgeUrl(badge: BadgeEntry, style: string = 'for-the-badge'): string {
  const label = badge.name.replace(/-/g, '--').replace(/ /g, '%20');
  const logo = badge.logo || badge.slug;
  return `https://img.shields.io/badge/${label}-${badge.color}?style=${style}&logo=${logo}&logoColor=white`;
}

/**
 * Generate a badge Markdown string
 */
export function getBadgeMarkdown(badge: BadgeEntry, style: string = 'for-the-badge'): string {
  return `![${badge.name}](${getBadgeUrl(badge, style)})`;
}

/**
 * Suggest badges based on detected languages from a user's repositories
 */
export function suggestBadgesFromLanguages(languages: string[]): BadgeEntry[] {
  const suggestedSlugs = new Set<string>();
  const suggested: BadgeEntry[] = [];

  for (const lang of languages) {
    const slug = LANGUAGE_TO_BADGE[lang];
    if (slug && !suggestedSlugs.has(slug)) {
      suggestedSlugs.add(slug);
      const badge = BADGE_REGISTRY.find(b => b.slug === slug);
      if (badge) suggested.push(badge);
    }
  }

  return suggested;
}

/**
 * Search badges by name (case-insensitive partial match)
 */
export function searchBadges(query: string): BadgeEntry[] {
  const lower = query.toLowerCase();
  return BADGE_REGISTRY.filter(b => b.name.toLowerCase().includes(lower));
}

/**
 * Get badges filtered by category
 */
export function getBadgesByCategory(category: BadgeCategory): BadgeEntry[] {
  return BADGE_REGISTRY.filter(b => b.category === category);
}

export const BADGE_CATEGORIES: { key: BadgeCategory; label: string }[] = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'databases', label: 'Databases' },
  { key: 'tools', label: 'DevOps & Tools' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'testing', label: 'Testing' },
];
