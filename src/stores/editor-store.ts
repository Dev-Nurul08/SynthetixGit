'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  compileProfile,
  createDefaultModules,
  type ModuleConfig,
  type ThemeId,
  type TemplateId,
  type ProfileConfig,
} from '@/lib/template-engine';
import type { UserProfileData } from '@/lib/github-service';
import { suggestBadgesFromLanguages } from '@/lib/badge-registry';
import { applyParsedReadmeToModules, type ParsedReadmeData } from '@/lib/readme-parser';

interface EditorState {
  markdown: string;
  workflowYaml: string | null;
  modules: ModuleConfig;
  theme: ThemeId;
  templateId: TemplateId;

  // Actions
  setTheme: (theme: ThemeId) => void;
  setTemplate: (templateId: TemplateId) => void;
  applyTemplatePreset: (templateId: TemplateId, username: string, profileData?: UserProfileData | null) => void;
  applyRolePreset: (role: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'ai-ml' | 'mobile') => void;
  updateModule: <K extends keyof ModuleConfig>(
    key: K,
    value: Partial<ModuleConfig[K]>
  ) => void;
  setMarkdown: (markdown: string) => void;
  regenerateMarkdown: (username: string, profileData?: UserProfileData | null) => void;
  initializeFromProfile: (profileData: UserProfileData) => void;
  importFromExistingReadme: (parsed: import('@/lib/readme-parser').ParsedReadmeData, username: string, profileData?: UserProfileData | null) => void;
  addBadge: (slug: string) => void;
  removeBadge: (slug: string) => void;
  setBadges: (slugs: string[]) => void;
  resetModules: () => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      markdown: '',
      workflowYaml: null,
      modules: createDefaultModules(),
      theme: 'github_dark' as ThemeId,
      templateId: 'beast-mode-neon' as TemplateId,

      setTheme: (theme) => {
        set({ theme });
      },

      setTemplate: (templateId) => {
        set({ templateId });
      },

      applyTemplatePreset: (templateId, username, profileData) => {
        const current = get().modules;
        const displayName = profileData?.profile?.name || username;
        let updated: ModuleConfig = { ...current };

        switch (templateId) {
          case 'beast-mode-neon':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'venom-capsule',
                title: displayName,
                subtitle: 'Full-Stack & MERN Developer 🔥',
                typingLines: ['Frontend Ninja ⚡ Backend Explorer 🔍', 'JavaScript Enthusiast 💻 DSA Master 🏆', 'Building Scalable Cloud Apps 🚀'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'rainbow-gradient' },
              beastModeDashboard: { enabled: true, showProfileViews: true, showGrowthMetrics: true, showOpenToWork: true, showHireMe: true, showStreakCard: true, showWakaTime: true, email: updated.beastModeDashboard.email || '' },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
              techArsenal: { ...updated.techArsenal, enabled: true },
            };
            set({ templateId, theme: 'dracula', modules: updated });
            break;

          case 'cyberpunk-glitch':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'cyberpunk-glitch',
                title: `${displayName} // CYBER_DEV`,
                subtitle: '⚡ Autonomous Systems & Next-Gen Cloud Engineer',
                typingLines: ['Compiling cyber systems 👾', 'Decentralized Architecture 🔐', 'High-Frequency Real-time Services ⚡'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'neon-laser-shimmer' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true, showStreakCard: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
              techArsenal: { ...updated.techArsenal, enabled: true },
            };
            set({ templateId, theme: 'cyberpunk', modules: updated });
            break;

          case 'dracula-dark':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'waving-capsule',
                title: displayName,
                subtitle: '🧛 Night Coder & Full-Stack Crafter',
                typingLines: ['Embracing the dark theme 🌙', 'Writing pure clean code 💜', 'Coffee to Code Pipeline ☕'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'curved-wave' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'dracula', modules: updated });
            break;

          case 'nord-frost':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'handwritten-script',
                title: displayName,
                subtitle: '❄️ Nordic Frost Architect & Software Engineer',
                typingLines: ['Icy precision architecture 🧊', 'Minimalist & performant ⚡', 'Clean interfaces, robust APIs 🛡️'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'curved-wave' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true, showProfileViews: true, showStreakCard: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: false, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: false },
            };
            set({ templateId, theme: 'nord', modules: updated });
            break;

          case 'minimal-monochrome':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'minimal',
                title: displayName,
                subtitle: profileData?.profile?.bio || 'Software Engineer & Designer',
                typingLines: [],
                bannerColor: 'black',
              },
              sectionDivider: { enabled: true, style: 'markdown-line' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: false },
              githubAnalytics: { enabled: true, showProfileDetailsCard: false, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: false, showNextAchievements: false },
              techArsenal: { ...updated.techArsenal, enabled: false },
            };
            set({ templateId, theme: 'dark', modules: updated });
            break;

          case 'retro-terminal':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'terminal-prompt',
                title: displayName,
                subtitle: '$ root@dev: ~ /usr/bin/engineer --verbose',
                typingLines: ['Initializing bash kernel... 📟', 'Mounting /dev/innovation 🚀', 'Compiling production assets 💾'],
                bannerColor: 'black',
              },
              sectionDivider: { enabled: true, style: 'retro-dashed-terminal' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true, showStreakCard: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'matrix', modules: updated });
            break;

          case 'matrix-green':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'terminal-prompt',
                title: displayName,
                subtitle: 'Wake up, Neo... The Matrix has you. 🟩',
                typingLines: ['Follow the white rabbit 🐇', 'Knock, knock, Neo 🚪', 'There is no spoon 🥄'],
                bannerColor: 'black',
              },
              sectionDivider: { enabled: true, style: 'cyber-circuit' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'matrix', modules: updated });
            break;

          case 'synthwave-84':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'waving-capsule',
                title: displayName,
                subtitle: '🌴 Outrun Retro Wave & Web Architect',
                typingLines: ['Cruising at 88mph down the neon grid 🏎️', '80s Synth Aesthetics 🌆', 'Full Stack Outrun Developer 🕹️'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'soundwave-eq' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'synthwave', modules: updated });
            break;

          case 'sunset-gradient':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'waving-capsule',
                title: displayName,
                subtitle: '🌅 Vibrant Sunset UI/UX & Full-Stack Developer',
                typingLines: ['Crafting radiant interfaces 🌇', 'Warm gradients, bold ideas ✨', 'Modern Web Architect 🚀'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'rainbow-gradient' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'radical', modules: updated });
            break;

          case 'glassmorphism':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'handwritten-script',
                title: displayName,
                subtitle: '💎 Frosted Glass & Spatial UI Architect',
                typingLines: ['Subtle blurs, translucent cards ✨', 'Modern Apple-like aesthetics 🍎', 'Full-Stack Performance ⚡'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'particle-sparkle' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'tokyonight', modules: updated });
            break;

          case 'tokyo-night':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'waving-capsule',
                title: displayName,
                subtitle: '🌃 Tokyo Midnight Cyber & Cloud Engineer',
                typingLines: ['Shinjuku neon vibes 🏮', 'High-throughput microservices 🚅', 'Tokyo Night Palette 🌌'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'neon-laser-shimmer' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'tokyonight', modules: updated });
            break;

          case 'catppuccin-mocha':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'handwritten-script',
                title: displayName,
                subtitle: '☕ Cozy Catppuccin Developer & Thinker',
                typingLines: ['Pastel lavender warmth 🌸', 'Crafting cozy software 🐱', 'TypeScript & Rust Enthusiast 🦀'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'curved-wave' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'catppuccin', modules: updated });
            break;

          case 'solarized-dark':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'terminal-prompt',
                title: displayName,
                subtitle: '☀️ Solarized Precision & System Programmer',
                typingLines: ['Ethan Schoonover balanced colors 📐', 'UNIX philosophy follower 🐧', 'High reliability systems 🛡️'],
                bannerColor: 'black',
              },
              sectionDivider: { enabled: true, style: 'retro-dashed-terminal' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'solarized', modules: updated });
            break;

          case 'clean-corporate':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'minimal',
                title: displayName,
                subtitle: '💼 Enterprise Solutions Architect & Lead Engineer',
                typingLines: ['Scalable multi-cloud architectures ☁️', 'Enterprise reliability 99.999% 🏢', 'Team leader & mentor 👥'],
                bannerColor: 'black',
              },
              sectionDivider: { enabled: true, style: 'markdown-line' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true, showStreakCard: false },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: false, showStatsCard: true, showActivityWave: true, showTrophies: false, showNextAchievements: false },
            };
            set({ templateId, theme: 'github_dark', modules: updated });
            break;

          case 'acid-tech':
            updated = {
              ...updated,
              headerBanner: {
                enabled: true,
                headerStyle: 'cyberpunk-glitch',
                title: `${displayName} // ACID_TECH`,
                subtitle: '⚡ High-Voltage Lime & Radical Cyberpunk',
                typingLines: ['Overclocked performance ⚡', 'Electric lime & purple matrix 🔋', 'Limitless experimentation 🧪'],
                bannerColor: 'gradient',
              },
              sectionDivider: { enabled: true, style: 'neon-laser-shimmer' },
              beastModeDashboard: { ...updated.beastModeDashboard, enabled: true },
              githubAnalytics: { enabled: true, showProfileDetailsCard: true, showReposPerLanguage: true, showMostCommitLanguage: true, showStatsCard: true, showActivityWave: true, showTrophies: true, showNextAchievements: true },
            };
            set({ templateId, theme: 'radical', modules: updated });
            break;

          default:
            set({ templateId, modules: updated });
            break;
        }

        get().regenerateMarkdown(username, profileData);
      },

      applyRolePreset: (role) => {
        const presets: Record<string, string[]> = {
          frontend: ['react', 'nextdotjs', 'typescript', 'javascript', 'tailwindcss', 'html5', 'css3', 'vite', 'figma'],
          backend: ['nodedotjs', 'express', 'python', 'postgresql', 'mongodb', 'redis', 'docker', 'fastapi', 'prisma'],
          fullstack: ['typescript', 'react', 'nextdotjs', 'nodedotjs', 'tailwindcss', 'postgresql', 'mongodb', 'docker', 'git'],
          devops: ['docker', 'kubernetes', 'linux', 'gnubash', 'terraform', 'githubactions', 'nginx', 'amazonwebservices', 'prometheus'],
          'ai-ml': ['python', 'pytorch', 'tensorflow', 'fastapi', 'docker', 'postgresql', 'jupyter', 'linux'],
          mobile: ['react', 'flutter', 'swift', 'kotlin', 'dart', 'firebase', 'typescript', 'figma'],
        };

        const badges = presets[role] || presets.fullstack;
        set((state) => ({
          modules: {
            ...state.modules,
            techStack: {
              ...state.modules.techStack,
              enabled: true,
              badges: Array.from(new Set([...state.modules.techStack.badges, ...badges])),
            },
          },
        }));
      },

      updateModule: (key, value) => {
        set((state) => ({
          modules: {
            ...state.modules,
            [key]: { ...state.modules[key], ...value },
          },
        }));
      },

      setMarkdown: (markdown) => set({ markdown }),

      regenerateMarkdown: (username, profileData) => {
        if (!username) return;
        const state = get();
        const config: ProfileConfig = {
          username,
          templateId: state.templateId,
          theme: state.theme,
          modules: state.modules,
          profileData: profileData
            ? {
                name: profileData.profile.name,
                bio: profileData.profile.bio,
                location: profileData.profile.location,
                company: profileData.profile.company,
                blog: profileData.profile.blog,
                avatarUrl: profileData.profile.avatarUrl,
                followers: profileData.profile.followers,
                publicRepos: profileData.profile.publicRepos,
                createdAt: profileData.profile.createdAt,
              }
            : undefined,
        };

        const result = compileProfile(config);
        set({ markdown: result.markdown, workflowYaml: result.workflowYaml ?? null });
      },

      initializeFromProfile: (profileData) => {
        const state = get();
        const username = profileData.profile.username;

        const langNames = profileData.stats.topLanguages.map((l) => l.name);
        const suggested = suggestBadgesFromLanguages(langNames);
        const finalBadges = state.modules.techStack.badges.length > 0
          ? state.modules.techStack.badges
          : suggested.length > 0
            ? suggested
            : ['javascript', 'typescript', 'react', 'nextdotjs', 'nodedotjs', 'express', 'mongodb', 'tailwindcss', 'git', 'docker'];

        const featuredRepos = profileData.pinnedRepos.map(r => ({
          name: r.name,
          description: r.description,
          url: r.url,
          stargazerCount: r.stargazerCount,
          primaryLanguage: r.primaryLanguage,
        }));

        const updatedModules: ModuleConfig = {
          ...state.modules,
          headerBanner: {
            ...state.modules.headerBanner,
            title: profileData.profile.name || username,
            subtitle: profileData.profile.bio ? profileData.profile.bio.replace(/[\r\n]+/g, ' ').slice(0, 100) : state.modules.headerBanner.subtitle,
          },
          aboutMe: {
            ...state.modules.aboutMe,
            bioText: profileData.profile.bio ? profileData.profile.bio.replace(/[\r\n]+/g, ' ') : '',
            showLocation: !!profileData.profile.location,
            showCompany: !!profileData.profile.company,
            showBlog: !!profileData.profile.blog,
          },
          techStack: {
            ...state.modules.techStack,
            badges: finalBadges,
          },
          featuredRepos: {
            enabled: featuredRepos.length > 0,
            repos: featuredRepos,
          },
          socialLinks: {
            ...state.modules.socialLinks,
            github: username,
            twitter: profileData.profile.twitterUsername || '',
            portfolio: profileData.profile.blog || '',
          },
        };

        set({ modules: updatedModules });
        get().regenerateMarkdown(username, profileData);
      },

      importFromExistingReadme: (parsed, username, profileData) => {
        const state = get();
        const updated = applyParsedReadmeToModules(state.modules, parsed);
        set({ modules: updated });
        get().regenerateMarkdown(username, profileData);
      },

      addBadge: (slug) => {
        set((state) => {
          const currentBadges = state.modules.techStack.badges;
          if (currentBadges.includes(slug)) return state;
          return {
            modules: {
              ...state.modules,
              techStack: {
                ...state.modules.techStack,
                badges: [...currentBadges, slug],
              },
            },
          };
        });
      },

      removeBadge: (slug) => {
        set((state) => ({
          modules: {
            ...state.modules,
            techStack: {
              ...state.modules.techStack,
              badges: state.modules.techStack.badges.filter((b) => b !== slug),
            },
          },
        }));
      },

      setBadges: (slugs) => {
        set((state) => ({
          modules: {
            ...state.modules,
            techStack: {
              ...state.modules.techStack,
              badges: slugs,
            },
          },
        }));
      },

      resetModules: () => {
        set({ modules: createDefaultModules(), markdown: '', workflowYaml: null });
      },
    }),
    {
      name: 'synthetixgit-editor-storage-v3',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({
        modules: state.modules,
        theme: state.theme,
        templateId: state.templateId,
      }),
    }
  )
);
