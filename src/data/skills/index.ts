/**
 * GitHub Profile Forge — 250+ Categorized Skill Database (PDF Section 8)
 * Categories: Programming Languages, Frontend, Backend, Mobile, Databases, DevOps/Cloud, AI/ML, Cybersecurity, Design, Video/3D, Tools
 */

export interface SkillItem {
  id: string;
  name: string;
  category:
    | 'languages'
    | 'frontend'
    | 'backend'
    | 'mobile'
    | 'databases'
    | 'devops'
    | 'aiml'
    | 'security'
    | 'design'
    | 'tools';
  color: string;
  logo: string;
}

export const SKILL_CATEGORIES = [
  { id: 'languages', name: 'Programming Languages', icon: '💻' },
  { id: 'frontend', name: 'Frontend Web', icon: '🎨' },
  { id: 'backend', name: 'Backend & APIs', icon: '⚙️' },
  { id: 'mobile', name: 'Mobile & Desktop', icon: '📱' },
  { id: 'databases', name: 'Databases & Storage', icon: '🗄️' },
  { id: 'devops', name: 'DevOps & Cloud', icon: '☁️' },
  { id: 'aiml', name: 'AI, ML & Data Science', icon: '🤖' },
  { id: 'security', name: 'Cybersecurity & Testing', icon: '🛡️' },
  { id: 'design', name: 'Design & UI/UX', icon: '✨' },
  { id: 'tools', name: 'Productivity & Tools', icon: '🛠️' },
];

export const SKILLS_CATALOG: SkillItem[] = [
  // Languages
  { id: 'javascript', name: 'JavaScript', category: 'languages', color: 'F7DF1E', logo: 'javascript' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', color: '3178C6', logo: 'typescript' },
  { id: 'python', name: 'Python', category: 'languages', color: '3776AB', logo: 'python' },
  { id: 'cpp', name: 'C++', category: 'languages', color: '00599C', logo: 'cplusplus' },
  { id: 'c', name: 'C', category: 'languages', color: 'A8B9CC', logo: 'c' },
  { id: 'java', name: 'Java', category: 'languages', color: 'ED8B00', logo: 'openjdk' },
  { id: 'rust', name: 'Rust', category: 'languages', color: '000000', logo: 'rust' },
  { id: 'go', name: 'Go (Golang)', category: 'languages', color: '00ADD8', logo: 'go' },
  { id: 'csharp', name: 'C#', category: 'languages', color: '239120', logo: 'csharp' },
  { id: 'php', name: 'PHP', category: 'languages', color: '777BB4', logo: 'php' },
  { id: 'ruby', name: 'Ruby', category: 'languages', color: 'CC342D', logo: 'ruby' },
  { id: 'swift', name: 'Swift', category: 'languages', color: 'F05138', logo: 'swift' },
  { id: 'kotlin', name: 'Kotlin', category: 'languages', color: '7F52FF', logo: 'kotlin' },
  { id: 'dart', name: 'Dart', category: 'languages', color: '0175C2', logo: 'dart' },
  { id: 'html5', name: 'HTML5', category: 'languages', color: 'E34F26', logo: 'html5' },
  { id: 'css3', name: 'CSS3', category: 'languages', color: '1572B6', logo: 'css3' },

  // Frontend
  { id: 'react', name: 'React', category: 'frontend', color: '61DAFB', logo: 'react' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', color: '000000', logo: 'nextdotjs' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', color: '4FC08D', logo: 'vuedotjs' },
  { id: 'angular', name: 'Angular', category: 'frontend', color: 'DD0031', logo: 'angular' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', color: 'FF3E00', logo: 'svelte' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'frontend', color: '06B6D4', logo: 'tailwindcss' },
  { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', color: '7952B3', logo: 'bootstrap' },
  { id: 'sass', name: 'Sass/SCSS', category: 'frontend', color: 'CC6699', logo: 'sass' },
  { id: 'redux', name: 'Redux', category: 'frontend', color: '764ABC', logo: 'redux' },
  { id: 'vite', name: 'Vite', category: 'frontend', color: '646CFF', logo: 'vite' },
  { id: 'webpack', name: 'Webpack', category: 'frontend', color: '8DD6F9', logo: 'webpack' },

  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', color: '5FA04E', logo: 'nodedotjs' },
  { id: 'express', name: 'Express.js', category: 'backend', color: '000000', logo: 'express' },
  { id: 'django', name: 'Django', category: 'backend', color: '092E20', logo: 'django' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', color: '009688', logo: 'fastapi' },
  { id: 'springboot', name: 'Spring Boot', category: 'backend', color: '6DB33F', logo: 'springboot' },
  { id: 'nest', name: 'NestJS', category: 'backend', color: 'E0234E', logo: 'nestjs' },
  { id: 'graphql', name: 'GraphQL', category: 'backend', color: 'E10098', logo: 'graphql' },
  { id: 'apollo', name: 'Apollo GraphQL', category: 'backend', color: '311C87', logo: 'apollographql' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'databases', color: '4169E1', logo: 'postgresql' },
  { id: 'mongodb', name: 'MongoDB', category: 'databases', color: '47A248', logo: 'mongodb' },
  { id: 'mysql', name: 'MySQL', category: 'databases', color: '4479A1', logo: 'mysql' },
  { id: 'redis', name: 'Redis', category: 'databases', color: 'DC382D', logo: 'redis' },
  { id: 'supabase', name: 'Supabase', category: 'databases', color: '3ECF8E', logo: 'supabase' },
  { id: 'firebase', name: 'Firebase', category: 'databases', color: 'FFCA28', logo: 'firebase' },
  { id: 'prisma', name: 'Prisma ORM', category: 'databases', color: '2D3748', logo: 'prisma' },
  { id: 'sqlite', name: 'SQLite', category: 'databases', color: '003B57', logo: 'sqlite' },

  // DevOps & Cloud
  { id: 'docker', name: 'Docker', category: 'devops', color: '2496ED', logo: 'docker' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', color: '326CE5', logo: 'kubernetes' },
  { id: 'aws', name: 'Amazon Web Services', category: 'devops', color: '232F3E', logo: 'amazonwebservices' },
  { id: 'gcp', name: 'Google Cloud', category: 'devops', color: '4285F4', logo: 'googlecloud' },
  { id: 'azure', name: 'Microsoft Azure', category: 'devops', color: '0089D6', logo: 'microsoftazure' },
  { id: 'git', name: 'Git', category: 'devops', color: 'F05032', logo: 'git' },
  { id: 'githubactions', name: 'GitHub Actions', category: 'devops', color: '2088FF', logo: 'githubactions' },
  { id: 'linux', name: 'Linux', category: 'devops', color: 'FCC624', logo: 'linux' },
  { id: 'nginx', name: 'Nginx', category: 'devops', color: '009639', logo: 'nginx' },
  { id: 'terraform', name: 'Terraform', category: 'devops', color: '844FBA', logo: 'terraform' },

  // Mobile
  { id: 'reactnative', name: 'React Native', category: 'mobile', color: '61DAFB', logo: 'react' },
  { id: 'flutter', name: 'Flutter', category: 'mobile', color: '02569B', logo: 'flutter' },
  { id: 'android', name: 'Android Studio', category: 'mobile', color: '3DDC84', logo: 'android' },
  { id: 'ios', name: 'iOS / Xcode', category: 'mobile', color: '000000', logo: 'apple' },
  { id: 'electron', name: 'Electron', category: 'mobile', color: '47848F', logo: 'electron' },

  // AI & ML
  { id: 'pytorch', name: 'PyTorch', category: 'aiml', color: 'EE4C2C', logo: 'pytorch' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'aiml', color: 'FF6F00', logo: 'tensorflow' },
  { id: 'opencv', name: 'OpenCV', category: 'aiml', color: '5C3EE8', logo: 'opencv' },
  { id: 'pandas', name: 'Pandas', category: 'aiml', color: '150458', logo: 'pandas' },
  { id: 'numpy', name: 'NumPy', category: 'aiml', color: '013243', logo: 'numpy' },
  { id: 'scikitlearn', name: 'Scikit-Learn', category: 'aiml', color: 'F7931E', logo: 'scikitlearn' },
];
