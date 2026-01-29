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
      templateId: 'modern-developer' as TemplateId,

      setTheme: (theme) => {
        set({ theme });
      },

      setTemplate: (templateId) => {
        set({ templateId });
      },

      applyTemplatePreset: (templateId, username, profileData) => {
        const current = get().modules;
        let updated: ModuleConfig = { ...current };

        if (templateId === 'modern-developer') {
          updated = {
            ...updated,
            headerBanner: {
              enabled: true,
              headerStyle: 'waving-hand',
              title: profileData?.profile?.name || username,
              subtitle: 'Full-Stack Developer • Open Source Creator',
              typingLines: ['Building scalable web applications 🚀', 'Writing clean, performant TypeScript ⚡', 'Designing intuitive user interfaces 🎨'],
            },
            techStack: {
              ...updated.techStack,
              style: 'for-the-badge',
              categorize: true,
            },
            githubStats: {
              enabled: true,
              showGeneralStats: true,
              showStreak: true,
              showTopLangs: true,
              showActivityGraph: true,
              showTrophies: false,
            },
            snakeAnimation: { enabled: true },
          };
          set({ templateId, theme: 'github_dark', modules: updated });
        } else if (templateId === 'minimalist-clean') {
          updated = {
            ...updated,
            headerBanner: {
              enabled: true,
              headerStyle: 'minimal',
              title: profileData?.profile?.name || username,
              subtitle: profileData?.profile?.bio || 'Software Engineer',
              typingLines: [],
            },
            techStack: {
              ...updated.techStack,
              style: 'flat-square',
              categorize: false,
            },
            githubStats: {
              enabled: true,
              showGeneralStats: true,
              showStreak: false,
              showTopLangs: true,
              showActivityGraph: false,
              showTrophies: false,
            },
            snakeAnimation: { enabled: false },
            footer: {
              enabled: false,
              showVisitorBadge: false,
              quote: '',
            },
          };
          set({ templateId, theme: 'nord', modules: updated });
        } else if (templateId === 'cyber-engineer') {
          updated = {
            ...updated,
            headerBanner: {
              enabled: true,
              headerStyle: 'capsule',
              title: `${username} // SYS_ENG`,
              subtitle: '⚡ Cloud Architect & Autonomous Systems Builder',
              typingLines: ['Compiling next-gen systems 👾', 'Kubernetes, Cloud & Microservices 🛠️', 'Security & Decentralized Tech 🔐'],
            },
            techStack: {
              ...updated.techStack,
              style: 'for-the-badge',
              categorize: true,
            },
            githubStats: {
              enabled: true,
              showGeneralStats: true,
              showStreak: true,
              showTopLangs: true,
              showActivityGraph: true,
              showTrophies: true,
            },
            snakeAnimation: { enabled: true },
          };
          set({ templateId, theme: 'tokyonight', modules: updated });
        } else if (templateId === 'fullstack-lead') {
          updated = {
            ...updated,
            headerBanner: {
              enabled: true,
              headerStyle: 'waving-hand',
              title: `${profileData?.profile?.name || username}`,
              subtitle: 'Lead Software Architect • Systems • Modern Web Tech',
              typingLines: ['Architecting enterprise-scale platforms 💼', 'Mentoring & engineering best practices 📈'],
            },
            githubStats: {
              enabled: true,
              showGeneralStats: true,
              showStreak: true,
              showTopLangs: true,
              showActivityGraph: true,
              showTrophies: false,
            },
            snakeAnimation: { enabled: true },
          };
          set({ templateId, theme: 'dark', modules: updated });
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
        const suggested = suggestBadgesFromLanguages(langNames).map((b) => b.slug);
        const finalBadges = state.modules.techStack.badges.length > 0
          ? state.modules.techStack.badges
          : suggested.length > 0
            ? suggested
            : ['typescript', 'react', 'nextdotjs', 'nodedotjs', 'tailwindcss', 'postgresql', 'docker', 'git'];

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
            subtitle: profileData.profile.bio ? profileData.profile.bio.slice(0, 100) : state.modules.headerBanner.subtitle,
          },
          aboutMe: {
            ...state.modules.aboutMe,
            bioText: profileData.profile.bio || '',
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
      name: 'synthetixgit-editor-storage-v2',
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
