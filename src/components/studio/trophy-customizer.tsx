'use client';

import { FiAward, FiEye, FiSettings } from 'react-icons/fi';

interface TrophyCustomizerProps {
  theme: string;
  showTrophies: boolean;
  showNextAchievements: boolean;
  onUpdate: (data: { showTrophies?: boolean; showNextAchievements?: boolean }) => void;
}

export function TrophyCustomizer({
  theme,
  showTrophies,
  showNextAchievements,
  onUpdate,
}: TrophyCustomizerProps) {
  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
          <FiAward className="text-amber-400" size={14} />
          <span>GitHub Trophies & Achievement Matrix</span>
        </h3>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
          Auto-Rank S/A/B
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => onUpdate({ showTrophies: !showTrophies })}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            showTrophies
              ? 'bg-amber-600/15 border-amber-500/50 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold">Profile Trophies</span>
            <span className="text-sm">🏆</span>
          </div>
          <p className="text-[11px] text-slate-400">Stars, Commits, Repos & Multi-Year Trophies</p>
        </button>

        <button
          type="button"
          onClick={() => onUpdate({ showNextAchievements: !showNextAchievements })}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            showNextAchievements
              ? 'bg-purple-600/15 border-purple-500/50 text-purple-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold">Next Unlocks</span>
            <span className="text-sm">🎯</span>
          </div>
          <p className="text-[11px] text-slate-400">Arctic Vault, 300-Day Streak & Pull Shark goals</p>
        </button>
      </div>
    </div>
  );
}
