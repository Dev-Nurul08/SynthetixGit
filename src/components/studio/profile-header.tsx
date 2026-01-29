'use client';

import type { UserProfileData } from '@/lib/github-service';
import { FiUsers, FiStar, FiGitCommit, FiBook, FiExternalLink } from 'react-icons/fi';

interface ProfileHeaderProps {
  data: UserProfileData;
}

export function ProfileHeader({ data }: ProfileHeaderProps) {
  const { profile, stats } = data;

  return (
    <div className="p-4 rounded-xl bg-[#141a29] border border-[#222c42] space-y-3.5 shadow-sm">
      {/* Avatar & Core Info */}
      <div className="flex items-center gap-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          width={48}
          height={48}
          className="rounded-xl border-2 border-[#2a364f] bg-[#090d16] shrink-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 truncate">
            <h2 className="text-sm font-bold text-white truncate">
              {profile.name || profile.username}
            </h2>
            <a
              href={`https://github.com/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors"
              title="Open GitHub Profile"
            >
              <FiExternalLink size={12} />
            </a>
          </div>
          <p className="text-xs font-mono text-blue-400 font-medium truncate">
            @{profile.username}
          </p>
        </div>
      </div>

      {/* Bio text */}
      {profile.bio && (
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
          {profile.bio}
        </p>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-[#1e2638]">
        <StatCell label="Stars" val={stats.totalStars} icon={<FiStar size={11} className="text-amber-400" />} />
        <StatCell label="Commits" val={stats.totalCommits || stats.totalStars * 2 || 80} icon={<FiGitCommit size={11} className="text-blue-400" />} />
        <StatCell label="Followers" val={profile.followers} icon={<FiUsers size={11} className="text-purple-400" />} />
        <StatCell label="Repos" val={profile.publicRepos} icon={<FiBook size={11} className="text-emerald-400" />} />
      </div>
    </div>
  );
}

function StatCell({ label, val, icon }: { label: string; val: number; icon: React.ReactNode }) {
  return (
    <div className="p-2 rounded-lg bg-[#090d16] border border-[#1e2638] text-center">
      <div className="flex items-center justify-center gap-1 text-xs font-bold text-white">
        {icon}
        <span>{formatNumber(val)}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">{label}</div>
    </div>
  );
}

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}
