'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/stores/profile-store';
import {
  FiGithub,
  FiArrowRight,
  FiStar,
  FiCode,
  FiLayout,
  FiBarChart2,
  FiTerminal,
  FiLayers,
  FiCheck,
  FiCpu,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const { fetchProfile, isLoading } = useProfileStore();
  const router = useRouter();

  const handleScan = async (usernameToScan?: string) => {
    const target = (usernameToScan || inputValue).trim();
    if (!target) {
      toast.error('Please enter a GitHub username');
      return;
    }

    const toastId = toast.loading(`Scanning @${target}...`);
    try {
      const data = await fetchProfile(target);
      if (data) {
        toast.success(`Found @${data.profile.username}!`, { id: toastId });
        router.push(`/studio?user=${encodeURIComponent(data.profile.username)}`);
      } else {
        toast.dismiss(toastId);
        router.push(`/studio?user=${encodeURIComponent(target)}`);
      }
    } catch {
      toast.dismiss(toastId);
      router.push(`/studio?user=${encodeURIComponent(target)}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleScan();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <FiGithub size={22} />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">SynthetixGit</span>
              <span className="ml-2 text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/studio')}
              className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all cursor-pointer shadow-sm"
            >
              Open Studio
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <FiStar size={15} />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Main Hero Section ── */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-950/60 border border-blue-800/60 text-blue-400 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>Professional GitHub Profile & README Studio</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-4xl">
          Elevate Your GitHub Profile to the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
            Next Level
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
          Scan your GitHub handle to auto-discover languages, stats, and pinned repos. Customize structured facts, 100+ badges, and contribution animations in real-time.
        </p>

        {/* Search Scanner Box */}
        <div className="w-full max-w-xl mt-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-slate-900 border-2 border-slate-700/80 focus-within:border-blue-500 transition-all shadow-2xl"
          >
            <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto text-slate-400 font-mono text-sm">
              <FiGithub size={18} className="text-slate-400" />
              <span>github.com/</span>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="username"
              className="flex-1 w-full bg-transparent px-3 py-2 text-sm sm:text-base font-semibold text-white placeholder-slate-500 outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-lg shadow-blue-600/30"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Generate Profile</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Profiles Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-5 text-xs text-slate-400">
            <span className="font-semibold text-slate-500">Popular Devs:</span>
            {['torvalds', 'sindresorhus', 'shadcn', 'leerob', 'yyx990803'].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setInputValue(name);
                  handleScan(name);
                }}
                className="px-3 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all cursor-pointer font-medium"
              >
                @{name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Feature Highlights Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-20 text-left">
          <FeatureCard
            icon={<FiCpu className="text-blue-400" size={22} />}
            title="Auto-Discovered Stack"
            desc="Parses your repositories and maps your languages to 100+ high-res Shields.io badges."
          />
          <FeatureCard
            icon={<FiLayout className="text-sky-400" size={22} />}
            title="Live Split Preview"
            desc="Interactive dual-pane workspace rendering authentic GitHub Markdown in real time."
          />
          <FeatureCard
            icon={<FiBarChart2 className="text-indigo-400" size={22} />}
            title="Streak & Activity Stats"
            desc="Embeds dynamic commit streaks, language breakdowns, and activity wave graphs."
          />
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} SynthetixGit Studio • Designed for Modern Developers</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all space-y-3 shadow-sm">
      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <h3 className="text-base font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
