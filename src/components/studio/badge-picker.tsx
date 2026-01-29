'use client';

import { useState, useMemo } from 'react';
import {
  BADGE_REGISTRY,
  BADGE_CATEGORIES,
  searchBadges,
  type BadgeCategory,
  type BadgeEntry,
} from '@/lib/badge-registry';
import { FiSearch, FiX, FiCheck, FiPlus, FiZap } from 'react-icons/fi';

interface BadgePickerProps {
  selectedSlugs: string[];
  onAdd: (slug: string) => void;
  onRemove: (slug: string) => void;
  onApplyRole?: (role: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'ai-ml' | 'mobile') => void;
}

export function BadgePicker({ selectedSlugs, onAdd, onRemove, onApplyRole }: BadgePickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BadgeCategory | 'all'>('all');

  const filteredBadges = useMemo(() => {
    let badges: BadgeEntry[];
    if (searchQuery.trim()) {
      badges = searchBadges(searchQuery);
    } else if (activeCategory === 'all') {
      badges = BADGE_REGISTRY;
    } else {
      badges = BADGE_REGISTRY.filter(b => b.category === activeCategory);
    }
    return badges;
  }, [searchQuery, activeCategory]);

  const isSelected = (slug: string) => selectedSlugs.includes(slug);

  return (
    <div className="space-y-2.5">
      {/* Quick Role Presets */}
      {onApplyRole && (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <FiZap size={11} className="text-amber-400" />
            <span>Role Badges Quick-Add</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'fullstack', label: '+ Full Stack' },
              { id: 'frontend', label: '+ Frontend' },
              { id: 'backend', label: '+ Backend' },
              { id: 'devops', label: '+ DevOps' },
              { id: 'ai-ml', label: '+ AI / ML' },
              { id: 'mobile', label: '+ Mobile' },
            ].map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => onApplyRole(role.id as any)}
                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/[0.04] hover:bg-blue-500/20 text-slate-300 hover:text-blue-300 border border-white/[0.08] hover:border-blue-500/30 transition-all cursor-pointer"
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Badges List */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1.5">
          <span>Selected Badges ({selectedSlugs.length})</span>
          {selectedSlugs.length > 0 && (
            <span className="text-[10px] text-slate-500 font-normal">Click to remove</span>
          )}
        </div>

        {selectedSlugs.length > 0 ? (
          <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto p-1.5 rounded-lg bg-black/30 border border-white/[0.04]">
            {selectedSlugs.map((slug) => {
              const badge = BADGE_REGISTRY.find(b => b.slug === slug);
              if (!badge) return null;
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => onRemove(slug)}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-white/[0.06] hover:bg-red-500/20 text-slate-200 hover:text-red-300 border border-white/[0.08] hover:border-red-500/30 transition-colors group cursor-pointer"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: `#${badge.color}` }}
                  />
                  <span>{badge.name}</span>
                  <FiX size={10} className="text-slate-500 group-hover:text-red-400" />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="text-[11px] text-slate-500 italic p-2 rounded-lg bg-white/[0.01] border border-dashed border-white/[0.06] text-center">
            No badges selected.
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative">
        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          size={13}
        />
        <input
          type="text"
          placeholder="Filter 100+ technologies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.08] focus:border-blue-500/50 text-xs text-white placeholder-slate-500 outline-none transition-all"
        />
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div className="flex gap-1 overflow-x-auto no-scrollbar pb-0.5">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
            }`}
          >
            All ({BADGE_REGISTRY.length})
          </button>
          {BADGE_CATEGORIES.map(cat => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Badge Grid */}
      <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto pr-0.5">
        {filteredBadges.map((badge) => {
          const active = isSelected(badge.slug);
          return (
            <button
              key={badge.slug}
              type="button"
              onClick={() => active ? onRemove(badge.slug) : onAdd(badge.slug)}
              className={`flex items-center justify-between p-1.5 rounded-lg text-left text-[11px] font-medium transition-all border cursor-pointer ${
                active
                  ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                  : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.04] text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: `#${badge.color}` }}
                />
                <span className="truncate">{badge.name}</span>
              </div>
              {active ? (
                <FiCheck size={12} className="text-blue-400 shrink-0" />
              ) : (
                <FiPlus size={12} className="text-slate-500 hover:text-white shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
