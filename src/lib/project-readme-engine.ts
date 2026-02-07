/**
 * Project Repository README Architecture Engine (Phase 8)
 * Generates production-grade, battle-tested READMEs for open-source repositories & apps
 */

export interface ProjectReadmeConfig {
  projectName: string;
  tagline: string;
  repoUrl?: string;
  demoUrl?: string;
  authorName: string;
  authorGithub: string;
  license: string;
  templateType: 'fullstack' | 'api-backend' | 'cli-tool' | 'ai-ml' | 'library';
  features: string[];
  techStack: string[];
  envVariables: { key: string; description: string; example: string }[];
  apiEndpoints: { method: string; route: string; description: string }[];
  showArchitectureTree: boolean;
  showDockerGuide: boolean;
  showContributing: boolean;
}

export const defaultProjectConfig: ProjectReadmeConfig = {
  projectName: 'SynthetixGit',
  tagline: 'The All-in-One Developer Portfolio & Project README Studio',
  repoUrl: 'https://github.com/Dev-Nurul08/SynthetixGit',
  demoUrl: 'https://synthetixgit.vercel.app',
  authorName: 'Nurul Shaikh',
  authorGithub: 'Dev-Nurul08',
  license: 'MIT',
  templateType: 'fullstack',
  features: [
    '⚡ Multi-Source GitHub GraphQL v4 & REST Aggregator with 6h Cache',
    '🎨 Live Split-View Studio with 15+ Designer Presets',
    '👾 Interactive Arcade Suite (Snake, Brick Breaker, Pac-Man)',
    '🌈 Animated SVG Section Dividers & Custom Font Engine',
    '🖌️ Contribution Graph Canvas Art Painter & Automation Script Generator',
  ],
  techStack: ['nextdotjs', 'typescript', 'tailwindcss', 'zustand', 'graphql', 'docker'],
  envVariables: [
    { key: 'GITHUB_TOKEN', description: 'GitHub Personal Access Token (PAT) with repo & read:user scope', example: 'ghp_xxxxxxxxxxxx' },
    { key: 'NEXT_PUBLIC_APP_URL', description: 'Canonical base URL of the deployed application', example: 'https://synthetixgit.vercel.app' },
  ],
  apiEndpoints: [
    { method: 'GET', route: '/api/user/scan/:username', description: 'Scans user contributions, languages & profile data via GraphQL' },
    { method: 'POST', route: '/api/user/generate-profile', description: 'Compiles full customizable markdown README & workflow yaml' },
    { method: 'GET', route: '/api/svg/header', description: 'Dynamic SVG typography renderer with 3D & Glitch effects' },
    { method: 'GET', route: '/api/svg/divider', description: 'Animated SVG section divider renderer (8+ styles)' },
    { method: 'GET', route: '/play/:username/:game', description: 'Playable browser arcade level powered by user commits' },
  ],
  showArchitectureTree: true,
  showDockerGuide: true,
  showContributing: true,
};

export function compileProjectReadme(config: ProjectReadmeConfig): string {
  const lines: string[] = [];

  // Hero Section
  lines.push('<div align="center">');
  lines.push(`  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=1,2,4,5,40&height=200&section=header&text=${encodeURIComponent(config.projectName)}&fontSize=50&fontAlignY=40&desc=${encodeURIComponent(config.tagline)}&descAlignY=65&font=Fira%20Code&descFont=Roboto" width="100%" alt="Header" />`);
  lines.push('');

  // Badges
  lines.push('  <p>');
  lines.push(`    <a href="${config.repoUrl || '#'}"><img src="https://img.shields.io/github/stars/${config.authorGithub}/${config.projectName}?style=for-the-badge&logo=github&color=39d353" alt="Stars" /></a>`);
  lines.push(`    <a href="${config.repoUrl || '#'}/network/members"><img src="https://img.shields.io/github/forks/${config.authorGithub}/${config.projectName}?style=for-the-badge&logo=github&color=00ffff" alt="Forks" /></a>`);
  lines.push(`    <a href="${config.repoUrl || '#'}/issues"><img src="https://img.shields.io/github/issues/${config.authorGithub}/${config.projectName}?style=for-the-badge&logo=github&color=ff0055" alt="Issues" /></a>`);
  lines.push(`    <img src="https://img.shields.io/badge/License-${config.license}-6a11cb?style=for-the-badge" alt="License" />`);
  if (config.demoUrl) {
    lines.push(`    <a href="${config.demoUrl}"><img src="https://img.shields.io/badge/Live_Demo-Visit_Site-00ff66?style=for-the-badge&logo=vercel" alt="Demo" /></a>`);
  }
  lines.push('  </p>');
  lines.push('</div>');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Table of Contents
  lines.push('## 📑 Table of Contents');
  lines.push('- [✨ Key Features](#-key-features)');
  lines.push('- [🛠️ Technology Stack](#-technology-stack)');
  if (config.showArchitectureTree) lines.push('- [🏛️ Project Architecture](#-project-architecture)');
  lines.push('- [🚀 Quick Start Guide](#-quick-start-guide)');
  if (config.envVariables.length > 0) lines.push('- [🔐 Environment Configuration](#-environment-configuration)');
  if (config.apiEndpoints.length > 0) lines.push('- [📡 API Reference](#-api-reference)');
  if (config.showDockerGuide) lines.push('- [🐳 Docker Deployment](#-docker-deployment)');
  if (config.showContributing) lines.push('- [🤝 Contributing](#-contributing)');
  lines.push('- [📄 License](#-license)');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Features
  lines.push('## ✨ Key Features');
  for (const feat of config.features) {
    lines.push(`- **${feat.split(' ')[0]}** ${feat.substring(feat.indexOf(' ') + 1)}`);
  }
  lines.push('');
  lines.push('---');
  lines.push('');

  // Tech Stack Badges
  lines.push('## 🛠️ Technology Stack');
  lines.push('<div align="center">');
  lines.push(`  <img src="https://skillicons.dev/icons?i=${config.techStack.join(',')}" alt="Tech Stack" />`);
  lines.push('</div>');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Architecture Tree
  if (config.showArchitectureTree) {
    lines.push('## 🏛️ Project Architecture');
    lines.push('```bash');
    lines.push(`${config.projectName}/`);
    lines.push('├── src/');
    lines.push('│   ├── app/                 # Next.js App Router Pages & API Routes');
    lines.push('│   │   ├── api/             # REST Endpoints (Scanner, Generator, SVG)');
    lines.push('│   │   ├── play/            # Interactive HTML5 Arcade Games');
    lines.push('│   │   └── studio/          # Split-View Studio Workspace');
    lines.push('│   ├── components/          # Reusable UI & Configurator Components');
    lines.push('│   │   ├── studio/          # Sidebar, Canvas Painter, Trophies');
    lines.push('│   │   └── ui/              # Buttons, Cards, Glassmorphic Panels');
    lines.push('│   ├── lib/                 # Core Business Logic & Compilers');
    lines.push('│   │   ├── github-service.ts# GraphQL v4 Multi-Source Aggregator');
    lines.push('│   │   ├── template-engine.ts# 15+ Preset Markdown Compilers');
    lines.push('│   │   └── font-matrix.ts   # 52x7 ASCII Bit-Matrix Engine');
    lines.push('│   └── stores/              # Zustand Reactive State Stores');
    lines.push('├── public/                  # Static Assets, Icons & Audio');
    lines.push('├── Dockerfile               # Production Multi-Stage Container');
    lines.push('└── package.json');
    lines.push('```');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Quick Start Guide
  lines.push('## 🚀 Quick Start Guide');
  lines.push('### 1. Clone the Repository');
  lines.push('```bash');
  lines.push(`git clone ${config.repoUrl || `https://github.com/${config.authorGithub}/${config.projectName}.git`}`);
  lines.push(`cd ${config.projectName}`);
  lines.push('```');
  lines.push('');
  lines.push('### 2. Install Dependencies');
  lines.push('```bash');
  lines.push('npm install');
  lines.push('```');
  lines.push('');
  lines.push('### 3. Setup Environment');
  lines.push('```bash');
  lines.push('cp .env.example .env.local');
  lines.push('```');
  lines.push('');
  lines.push('### 4. Run Development Server');
  lines.push('```bash');
  lines.push('npm run dev');
  lines.push('```');
  lines.push('Open [http://localhost:3000](http://localhost:3000) in your browser.');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Environment Configuration
  if (config.envVariables.length > 0) {
    lines.push('## 🔐 Environment Configuration');
    lines.push('| Variable | Description | Example Value |');
    lines.push('| :--- | :--- | :--- |');
    for (const env of config.envVariables) {
      lines.push(`| \`${env.key}\` | ${env.description} | \`${env.example}\` |`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // API Reference
  if (config.apiEndpoints.length > 0) {
    lines.push('## 📡 API Reference');
    lines.push('| Method | Endpoint | Description |');
    lines.push('| :--- | :--- | :--- |');
    for (const ep of config.apiEndpoints) {
      lines.push(`| \`${ep.method}\` | \`${ep.route}\` | ${ep.description} |`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Docker Guide
  if (config.showDockerGuide) {
    lines.push('## 🐳 Docker Deployment');
    lines.push('```bash');
    lines.push('# Build Docker image');
    lines.push(`docker build -t ${config.projectName.toLowerCase()} .`);
    lines.push('');
    lines.push('# Run container');
    lines.push(`docker run -p 3000:3000 ${config.projectName.toLowerCase()}`);
    lines.push('```');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Contributing
  if (config.showContributing) {
    lines.push('## 🤝 Contributing');
    lines.push('Contributions, issues and feature requests are welcome!');
    lines.push('1. Fork the Project');
    lines.push('2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)');
    lines.push('3. Commit your Changes (`git commit -m "feat: add AmazingFeature"`)');
    lines.push('4. Push to the Branch (`git push origin feature/AmazingFeature`)');
    lines.push('5. Open a Pull Request');
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // License & Author
  lines.push('## 📄 License & Author');
  lines.push(`Distributed under the **${config.license}** License.`);
  lines.push(`Crafted with ❤️ by [${config.authorName}](https://github.com/${config.authorGithub}).`);

  return lines.join('\n');
}
