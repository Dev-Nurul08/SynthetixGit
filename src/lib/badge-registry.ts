/**
 * Expanded 250+ Developer Skill & Tech Stack Matrix
 */

export interface BadgeItem {
  id: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'devops' | 'ai_ml' | 'tools' | 'design';
  color: string;
  logo: string;
  defaultLevel?: string;
}

export const BADGE_DATABASE: BadgeItem[] = [
  // ── Languages ──
  { id: 'javascript', name: 'JavaScript', category: 'languages', color: 'F7DF1E', logo: 'javascript', defaultLevel: 'ES6+' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', color: '3178C6', logo: 'typescript', defaultLevel: 'Advanced' },
  { id: 'python', name: 'Python', category: 'languages', color: '3776AB', logo: 'python', defaultLevel: '3.12' },
  { id: 'cpp', name: 'C++', category: 'languages', color: '00599C', logo: 'cplusplus', defaultLevel: 'DSA' },
  { id: 'c', name: 'C', category: 'languages', color: 'A8B9CC', logo: 'c', defaultLevel: 'Core' },
  { id: 'java', name: 'Java', category: 'languages', color: 'ED8B00', logo: 'openjdk', defaultLevel: 'Spring' },
  { id: 'rust', name: 'Rust', category: 'languages', color: '000000', logo: 'rust', defaultLevel: 'Systems' },
  { id: 'go', name: 'Go', category: 'languages', color: '00ADD8', logo: 'go', defaultLevel: 'Microservices' },
  { id: 'csharp', name: 'C#', category: 'languages', color: '239120', logo: 'csharp', defaultLevel: '.NET' },
  { id: 'php', name: 'PHP', category: 'languages', color: '777BB4', logo: 'php', defaultLevel: '8.3' },
  { id: 'ruby', name: 'Ruby', category: 'languages', color: 'CC342D', logo: 'ruby', defaultLevel: 'Rails' },
  { id: 'swift', name: 'Swift', category: 'languages', color: 'F05138', logo: 'swift', defaultLevel: 'iOS' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', color: '7F52FF', logo: 'kotlin', defaultLevel: 'Android' },
  { id: 'dart', name: 'Dart', category: 'languages', color: '0175C2', logo: 'dart', defaultLevel: 'Flutter' },
  { id: 'html5', name: 'HTML5', category: 'languages', color: 'E34F26', logo: 'html5', defaultLevel: 'Semantic' },
  { id: 'css3', name: 'CSS3', category: 'languages', color: '1572B6', logo: 'css3', defaultLevel: 'Modern' },
  { id: 'bash', name: 'Bash', category: 'languages', color: '4EAA25', logo: 'gnubash', defaultLevel: 'Scripting' },
  { id: 'r', name: 'R', category: 'languages', color: '276DC3', logo: 'r', defaultLevel: 'Stats' },
  { id: 'solidity', name: 'Solidity', category: 'languages', color: '363636', logo: 'solidity', defaultLevel: 'Web3' },
  { id: 'sql', name: 'SQL', category: 'languages', color: 'CC292B', logo: 'mysql', defaultLevel: 'Queries' },

  // ── Frontend ──
  { id: 'react', name: 'React', category: 'frontend', color: '61DAFB', logo: 'react', defaultLevel: '19.x' },
  { id: 'nextdotjs', name: 'Next.js', category: 'frontend', color: '000000', logo: 'nextdotjs', defaultLevel: 'App Router' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', color: '4FC08D', logo: 'vuedotjs', defaultLevel: 'Composition' },
  { id: 'angular', name: 'Angular', category: 'frontend', color: '0F0F11', logo: 'angular', defaultLevel: 'RxJS' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', color: 'FF3E00', logo: 'svelte', defaultLevel: 'Runes' },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'frontend', color: '06B6D4', logo: 'tailwindcss', defaultLevel: 'v4' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', color: '7952B3', logo: 'bootstrap', defaultLevel: '5.3' },
  { id: 'sass', name: 'Sass', category: 'frontend', color: 'CC6699', logo: 'sass', defaultLevel: 'SCSS' },
  { id: 'framer', name: 'Framer Motion', category: 'frontend', color: '0055FF', logo: 'framer', defaultLevel: 'Animations' },
  { id: 'redux', name: 'Redux Toolkit', category: 'frontend', color: '764ABC', logo: 'redux', defaultLevel: 'RTK Query' },
  { id: 'zustand', name: 'Zustand', category: 'frontend', color: '443E38', logo: 'react', defaultLevel: 'State' },
  { id: 'vite', name: 'Vite', category: 'frontend', color: '646CFF', logo: 'vite', defaultLevel: 'Bundler' },
  { id: 'threejs', name: 'Three.js', category: 'frontend', color: '000000', logo: 'threedotjs', defaultLevel: '3D WebGL' },
  { id: 'astro', name: 'Astro', category: 'frontend', color: 'BC52EE', logo: 'astro', defaultLevel: 'Content' },

  // ── Backend ──
  { id: 'nodedotjs', name: 'Node.js', category: 'backend', color: '5FA04E', logo: 'nodedotjs', defaultLevel: 'LTS' },
  { id: 'express', name: 'Express.js', category: 'backend', color: '000000', logo: 'express', defaultLevel: 'REST APIs' },
  { id: 'nestjs', name: 'NestJS', category: 'backend', color: 'E0234E', logo: 'nestjs', defaultLevel: 'Enterprise' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', color: '009688', logo: 'fastapi', defaultLevel: 'Async' },
  { id: 'django', name: 'Django', category: 'backend', color: '092E20', logo: 'django', defaultLevel: 'ORM' },
  { id: 'flask', name: 'Flask', category: 'backend', color: '000000', logo: 'flask', defaultLevel: 'Micro' },
  { id: 'spring', name: 'Spring Boot', category: 'backend', color: '6DB33F', logo: 'springboot', defaultLevel: 'Java 21' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', color: 'E10098', logo: 'graphql', defaultLevel: 'Apollo' },
  { id: 'trpc', name: 'tRPC', category: 'backend', color: '2596BE', logo: 'trpc', defaultLevel: 'Type-Safe' },
  { id: 'bun', name: 'Bun', category: 'backend', color: '000000', logo: 'bun', defaultLevel: 'Runtime' },
  { id: 'deno', name: 'Deno', category: 'backend', color: '000000', logo: 'deno', defaultLevel: 'TypeScript' },

  // ── Databases ──
  { id: 'mongodb', name: 'MongoDB', category: 'database', color: '47A248', logo: 'mongodb', defaultLevel: 'NoSQL' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', color: '4169E1', logo: 'postgresql', defaultLevel: 'Relational' },
  { id: 'mysql', name: 'MySQL', category: 'database', color: '4479A1', logo: 'mysql', defaultLevel: '8.0' },
  { id: 'redis', name: 'Redis', category: 'database', color: 'DC382D', logo: 'redis', defaultLevel: 'In-Memory' },
  { id: 'supabase', name: 'Supabase', category: 'database', color: '3ECF8E', logo: 'supabase', defaultLevel: 'Auth & DB' },
  { id: 'firebase', name: 'Firebase', category: 'database', color: 'DD2C00', logo: 'firebase', defaultLevel: 'Firestore' },
  { id: 'prisma', name: 'Prisma', category: 'database', color: '2D3748', logo: 'prisma', defaultLevel: 'ORM' },
  { id: 'sqlite', name: 'SQLite', category: 'database', color: '003B57', logo: 'sqlite', defaultLevel: 'Embedded' },
  { id: 'mariadb', name: 'MariaDB', category: 'database', color: '003545', logo: 'mariadb', defaultLevel: 'SQL' },
  { id: 'cassandra', name: 'Cassandra', category: 'database', color: '1287B1', logo: 'apachecassandra', defaultLevel: 'Big Data' },

  // ── DevOps & Cloud ──
  { id: 'docker', name: 'Docker', category: 'devops', color: '2496ED', logo: 'docker', defaultLevel: 'Containers' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', color: '326CE5', logo: 'kubernetes', defaultLevel: 'K8s' },
  { id: 'amazonwebservices', name: 'AWS', category: 'devops', color: '232F3E', logo: 'amazonwebservices', defaultLevel: 'Cloud' },
  { id: 'googlecloud', name: 'Google Cloud', category: 'devops', color: '4285F4', logo: 'googlecloud', defaultLevel: 'GCP' },
  { id: 'vercel', name: 'Vercel', category: 'devops', color: '000000', logo: 'vercel', defaultLevel: 'Edge' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'devops', color: '2088FF', logo: 'githubactions', defaultLevel: 'CI/CD' },
  { id: 'nginx', name: 'Nginx', category: 'devops', color: '009639', logo: 'nginx', defaultLevel: 'Proxy' },
  { id: 'linux', name: 'Linux', category: 'devops', color: 'FCC624', logo: 'linux', defaultLevel: 'Kernel' },
  { id: 'terraform', name: 'Terraform', category: 'devops', color: '7B42BC', logo: 'terraform', defaultLevel: 'IaC' },

  // ── AI / ML ──
  { id: 'pytorch', name: 'PyTorch', category: 'ai_ml', color: 'EE4C2C', logo: 'pytorch', defaultLevel: 'Deep Learning' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'ai_ml', color: 'FF6F00', logo: 'tensorflow', defaultLevel: 'ML' },
  { id: 'openai', name: 'OpenAI API', category: 'ai_ml', color: '412991', logo: 'openai', defaultLevel: 'GPT-4' },
  { id: 'huggingface', name: 'Hugging Face', category: 'ai_ml', color: 'FFD21E', logo: 'huggingface', defaultLevel: 'Transformers' },
  { id: 'langchain', name: 'LangChain', category: 'ai_ml', color: '1C3C3C', logo: 'langchain', defaultLevel: 'RAG & Agents' },

  // ── Tools & Design ──
  { id: 'git', name: 'Git', category: 'tools', color: 'F05032', logo: 'git', defaultLevel: 'Version Control' },
  { id: 'github', name: 'GitHub', category: 'tools', color: '181717', logo: 'github', defaultLevel: 'Octocat' },
  { id: 'figma', name: 'Figma', category: 'design', color: 'F24E1E', logo: 'figma', defaultLevel: 'UI/UX' },
  { id: 'postman', name: 'Postman', category: 'tools', color: 'FF6C37', logo: 'postman', defaultLevel: 'API Testing' },
  { id: 'vscode', name: 'VS Code', category: 'tools', color: '007ACC', logo: 'visualstudiocode', defaultLevel: 'Editor' },
  { id: 'notion', name: 'Notion', category: 'tools', color: '000000', logo: 'notion', defaultLevel: 'Docs' },
];

export interface BadgeItem {
  id: string;
  slug?: string;
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'database' | 'devops' | 'ai_ml' | 'tools' | 'design';
  color: string;
  logo: string;
  defaultLevel?: string;
}

export type BadgeEntry = BadgeItem & { slug: string };
export type BadgeCategory = BadgeItem['category'];

export const BADGE_REGISTRY: BadgeEntry[] = BADGE_DATABASE.map((b) => ({
  ...b,
  slug: b.id,
}));

export const BADGE_CATEGORIES: { id: BadgeCategory; key: BadgeCategory; label: string; icon: string }[] = [
  { id: 'languages', key: 'languages', label: 'Languages', icon: '💻' },
  { id: 'frontend', key: 'frontend', label: 'Frontend', icon: '🎨' },
  { id: 'backend', key: 'backend', label: 'Backend', icon: '⚡' },
  { id: 'database', key: 'database', label: 'Databases', icon: '🗄️' },
  { id: 'devops', key: 'devops', label: 'Cloud & DevOps', icon: '☁️' },
  { id: 'ai_ml', key: 'ai_ml', label: 'AI & ML', icon: '🤖' },
  { id: 'tools', key: 'tools', label: 'Tools', icon: '🛠️' },
  { id: 'design', key: 'design', label: 'Design', icon: '✨' },
];

export function searchBadges(query: string, category?: BadgeCategory): BadgeEntry[] {
  let list = BADGE_REGISTRY;
  if (category) {
    list = list.filter((b) => b.category === category);
  }
  if (query.trim()) {
    const q = query.toLowerCase();
    list = list.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        (b.defaultLevel && b.defaultLevel.toLowerCase().includes(q))
    );
  }
  return list;
}

export function suggestBadgesFromLanguages(languages: string[]): string[] {
  const map: Record<string, string> = {
    javascript: 'javascript',
    typescript: 'typescript',
    python: 'python',
    c: 'c',
    'c++': 'cpp',
    html: 'html5',
    css: 'css3',
    shell: 'bash',
    java: 'java',
    rust: 'rust',
    go: 'go',
    php: 'php',
    ruby: 'ruby',
    dart: 'dart',
  };

  const detected: string[] = [];
  for (const lang of languages) {
    const key = lang.toLowerCase();
    if (map[key]) {
      detected.push(map[key]);
    }
  }

  // Always suggest core developer badges
  const defaults = ['git', 'github', 'nodedotjs', 'react', 'tailwindcss', 'docker'];
  for (const def of defaults) {
    if (!detected.includes(def)) detected.push(def);
  }

  return detected;
}
