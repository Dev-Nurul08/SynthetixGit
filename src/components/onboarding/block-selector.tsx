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
  FiCheck,
} from 'react-icons/fi';

export interface BlockItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  category: string;
  badge?: string;
}

export const PROFILE_BLOCKS: BlockItem[] = [
  {
    id: 'header',
    name: 'Dynamic Header Banner',
    desc: 'Venom capsule header with animated multi-line typing intro text',
    icon: <FiSliders className="text-cyan-400" size={18} />,
    category: 'Visuals',
    badge: 'Popular',
  },
  {
    id: 'beastMode',
    name: 'Performance Matrix Dashboard',
    desc: 'Live visitor counter, follower metrics, Open to Work badge & streak stats',
    icon: <FiActivity className="text-purple-400" size={18} />,
    category: 'Stats',
    badge: 'High Impact',
  },
  {
    id: 'analytics',
    name: 'GitHub Analytics Cards',
    desc: 'Language breakdown, overall stats card, and commit summary metrics',
    icon: <FiBarChart2 className="text-blue-400" size={18} />,
    category: 'Stats',
  },
  {
    id: 'education',
    name: 'Education & LeetCode Card',
    desc: 'Academic path badge, SkillIcons developer grid & live LeetCode stats card',
    icon: <FiBook className="text-emerald-400" size={18} />,
    category: 'Skills',
    badge: 'Essential',
  },
  {
    id: 'arsenal',
    name: 'Technology Arsenal Matrix',
    desc: 'Grid table with technology icons and customizable skill level badges',
    icon: <FiCpu className="text-amber-400" size={18} />,
    category: 'Skills',
  },
  {
    id: 'activity',
    name: 'Weekly Code Intensity Graph',
    desc: 'Continuous GitHub contribution wave graph with custom theme colors',
    icon: <FiActivity className="text-pink-400" size={18} />,
    category: 'Stats',
  },
  {
    id: 'trophies',
    name: 'GitHub Trophy Showcase',
    desc: 'Dynamic achievements showcase and upcoming milestone badges',
    icon: <FiAward className="text-yellow-400" size={18} />,
    category: 'Gamification',
  },
  {
    id: 'game',
    name: 'Contribution Snake Game',
    desc: 'Animated snake eating your GitHub contribution grid with automated workflow',
    icon: <FiPlay className="text-emerald-400" size={18} />,
    category: 'Interactive',
    badge: 'Animated',
  },
  {
    id: 'about',
    name: 'About Me & Quick Facts',
    desc: 'Developer bio summary and structured quick facts table',
    icon: <FiSmile className="text-rose-400" size={18} />,
    category: 'Bio',
  },
  {
    id: 'social',
    name: 'Socials & Connect Matrix',
    desc: 'LinkedIn, Twitter/X, Email, Portfolio, Discord & scheduling buttons',
    icon: <FiShare2 className="text-indigo-400" size={18} />,
    category: 'Connect',
    badge: 'Crucial',
  },
  {
    id: 'widgets',
    name: 'Interactive Dev Widgets',
    desc: 'Spotify now-playing player, Daily Dev Quote & algorithmic challenge',
    icon: <FiAward className="text-violet-400" size={18} />,
    category: 'Interactive',
  },
];

interface BlockSelectorProps {
  selectedBlocks: string[];
  onToggleBlock: (blockId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function BlockSelector({
  selectedBlocks,
  onToggleBlock,
  onSelectAll,
  onDeselectAll,
}: BlockSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-black text-white">Choose Your Profile Blocks</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select the components you want in your GitHub README. Each block will be fully configured next.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSelectAll}
            className="px-3 py-1 rounded-md border border-cyan-400/30 bg-cyan-400/10 text-xs font-bold text-cyan-200 hover:bg-cyan-400/20 transition-colors"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={onDeselectAll}
            className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.04] text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PROFILE_BLOCKS.map((block) => {
          const isSelected = selectedBlocks.includes(block.id);

          return (
            <button
              key={block.id}
              type="button"
              onClick={() => onToggleBlock(block.id)}
              className={`p-4 rounded-xl text-left border transition-all relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-cyan-400/50 bg-cyan-400/[0.08] shadow-lg shadow-cyan-400/10'
                  : 'border-white/10 bg-[#101720] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-lg border border-white/10 bg-[#0b0f14]">
                    {block.icon}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {block.badge && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                        {block.badge}
                      </span>
                    )}
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                          : 'border-white/20 bg-white/[0.04] text-transparent'
                      }`}
                    >
                      <FiCheck size={14} />
                    </span>
                  </div>
                </div>

                <h4 className="mt-3 text-sm font-black text-white">{block.name}</h4>
                <p className="mt-1 text-xs text-slate-400 leading-5">{block.desc}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>{block.category}</span>
                <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                  {isSelected ? '✓ Included' : '+ Add'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
