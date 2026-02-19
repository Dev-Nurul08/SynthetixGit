'use client';

import React from 'react';
import {
  FiSliders,
  FiActivity,
  FiBarChart2,
  FiBook,
  FiCpu,
  FiSmile,
  FiShare2,
  FiPlay,
  FiAward,
  FiArrowUp,
  FiArrowDown,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import type { ModuleConfig } from '@/lib/template-engine';
import { DEFAULT_SECTION_ORDER } from '@/lib/template-engine';

interface BlockBuilderProps {
  modules: ModuleConfig;
  onUpdateModule: <K extends keyof ModuleConfig>(key: K, value: Partial<ModuleConfig[K]>) => void;
}

interface BlockMetadata {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  moduleKey?: keyof ModuleConfig;
}

const ALL_BLOCK_DEFS: Record<string, BlockMetadata> = {
  header: {
    id: 'header',
    name: 'Dynamic Header Banner',
    desc: 'Venom capsule with animated typing subtitle',
    icon: <FiSliders className="text-cyan-400" size={15} />,
    moduleKey: 'headerBanner',
  },
  beastMode: {
    id: 'beastMode',
    name: 'Performance Dashboard',
    desc: 'Live visitor counter, metrics & streak stats',
    icon: <FiActivity className="text-purple-400" size={15} />,
    moduleKey: 'beastModeDashboard',
  },
  analytics: {
    id: 'analytics',
    name: 'GitHub Analytics Cards',
    desc: 'Repos per language & overall summary stats',
    icon: <FiBarChart2 className="text-blue-400" size={15} />,
    moduleKey: 'githubAnalytics',
  },
  education: {
    id: 'education',
    name: 'Education & LeetCode',
    desc: 'Academic path, SkillIcons & LeetCode stats',
    icon: <FiBook className="text-emerald-400" size={15} />,
    moduleKey: 'educationAndSkills',
  },
  arsenal: {
    id: 'arsenal',
    name: 'Technology Arsenal',
    desc: 'Skill icons grid with proficiency levels',
    icon: <FiCpu className="text-amber-400" size={15} />,
    moduleKey: 'techArsenal',
  },
  activity: {
    id: 'activity',
    name: 'Code Intensity Wave',
    desc: 'Activity graph with weekly commit waveform',
    icon: <FiActivity className="text-pink-400" size={15} />,
  },
  trophies: {
    id: 'trophies',
    name: 'GitHub Trophy Showcase',
    desc: 'Ranked achievements & unlockable medals',
    icon: <FiAward className="text-yellow-400" size={15} />,
  },
  game: {
    id: 'game',
    name: 'Contribution Snake Game',
    desc: 'Interactive snake animation grid',
    icon: <FiPlay className="text-emerald-400" size={15} />,
    moduleKey: 'gameSuite',
  },
  about: {
    id: 'about',
    name: 'About Me & Quick Facts',
    desc: 'Developer bio & structured info table',
    icon: <FiSmile className="text-rose-400" size={15} />,
    moduleKey: 'aboutMe',
  },
  social: {
    id: 'social',
    name: 'Socials & Connect Matrix',
    desc: 'LinkedIn, Twitter/X, Email & Portfolio',
    icon: <FiShare2 className="text-indigo-400" size={15} />,
    moduleKey: 'socialLinks',
  },
  widgets: {
    id: 'widgets',
    name: 'Interactive Dev Widgets',
    desc: 'Spotify live player, quotes & challenge',
    icon: <FiAward className="text-violet-400" size={15} />,
    moduleKey: 'interactiveWidgets',
  },
  footer: {
    id: 'footer',
    name: 'Footer Capsule Banner',
    desc: 'Waving footer banner with visitor count',
    icon: <FiSliders className="text-slate-400" size={15} />,
    moduleKey: 'footer',
  },
};

export function BlockBuilder({ modules, onUpdateModule }: BlockBuilderProps) {
  const currentOrder = modules.sectionOrder && modules.sectionOrder.length > 0
    ? modules.sectionOrder
    : DEFAULT_SECTION_ORDER;

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);

    onUpdateModule('sectionOrder' as any, newOrder as any);
  };

  const isBlockEnabled = (blockId: string): boolean => {
    switch (blockId) {
      case 'header':
        return modules.headerBanner.enabled;
      case 'beastMode':
        return modules.beastModeDashboard.enabled;
      case 'analytics':
        return modules.githubAnalytics.enabled;
      case 'education':
        return modules.educationAndSkills.enabled;
      case 'arsenal':
        return modules.techArsenal.enabled;
      case 'activity':
        return modules.githubAnalytics.enabled && modules.githubAnalytics.showActivityWave;
      case 'trophies':
        return modules.githubAnalytics.enabled && modules.githubAnalytics.showTrophies;
      case 'game':
        return modules.gameSuite.enabled;
      case 'about':
        return modules.aboutMe.enabled;
      case 'social':
        return modules.socialLinks.enabled;
      case 'widgets':
        return modules.interactiveWidgets.enabled;
      case 'footer':
        return modules.footer.enabled;
      default:
        return true;
    }
  };

  const toggleBlockEnabled = (blockId: string) => {
    switch (blockId) {
      case 'header':
        onUpdateModule('headerBanner', { enabled: !modules.headerBanner.enabled });
        break;
      case 'beastMode':
        onUpdateModule('beastModeDashboard', { enabled: !modules.beastModeDashboard.enabled });
        break;
      case 'analytics':
        onUpdateModule('githubAnalytics', { enabled: !modules.githubAnalytics.enabled });
        break;
      case 'education':
        onUpdateModule('educationAndSkills', { enabled: !modules.educationAndSkills.enabled });
        break;
      case 'arsenal':
        onUpdateModule('techArsenal', { enabled: !modules.techArsenal.enabled });
        break;
      case 'activity':
        onUpdateModule('githubAnalytics', {
          showActivityWave: !modules.githubAnalytics.showActivityWave,
          enabled: true,
        });
        break;
      case 'trophies':
        onUpdateModule('githubAnalytics', {
          showTrophies: !modules.githubAnalytics.showTrophies,
          enabled: true,
        });
        break;
      case 'game':
        onUpdateModule('gameSuite', { enabled: !modules.gameSuite.enabled });
        break;
      case 'about':
        onUpdateModule('aboutMe', { enabled: !modules.aboutMe.enabled });
        break;
      case 'social':
        onUpdateModule('socialLinks', { enabled: !modules.socialLinks.enabled });
        break;
      case 'widgets':
        onUpdateModule('interactiveWidgets', { enabled: !modules.interactiveWidgets.enabled });
        break;
      case 'footer':
        onUpdateModule('footer', { enabled: !modules.footer.enabled });
        break;
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <h4 className="text-sm font-black text-white">Section Order & Block Manager</h4>
        <p className="text-xs text-slate-400 mt-1">
          Reorder sections using the arrows or toggle visibility on and off.
        </p>
      </div>

      <div className="space-y-2">
        {currentOrder.map((blockId, index) => {
          const meta = ALL_BLOCK_DEFS[blockId] || {
            id: blockId,
            name: blockId,
            desc: '',
            icon: <FiSliders size={14} />,
          };
          const enabled = isBlockEnabled(blockId);

          return (
            <div
              key={blockId}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                enabled
                  ? 'border-white/15 bg-[#101720]'
                  : 'border-white/5 bg-[#0b0f14]/60 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="p-2 rounded-lg bg-[#0b0f14] border border-white/10 shrink-0">
                  {meta.icon}
                </span>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-white truncate">{meta.name}</span>
                  <span className="block text-[10px] text-slate-400 truncate">{meta.desc}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleBlockEnabled(blockId)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    enabled
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                      : 'border-white/10 bg-white/[0.04] text-slate-500'
                  }`}
                  title={enabled ? 'Disable section' : 'Enable section'}
                >
                  {enabled ? <FiEye size={13} /> : <FiEyeOff size={13} />}
                </button>

                <button
                  type="button"
                  onClick={() => moveBlock(index, 'up')}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move section up"
                >
                  <FiArrowUp size={13} />
                </button>

                <button
                  type="button"
                  onClick={() => moveBlock(index, 'down')}
                  disabled={index === currentOrder.length - 1}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move section down"
                >
                  <FiArrowDown size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
