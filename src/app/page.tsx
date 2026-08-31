'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileStore } from '@/stores/profile-store';
import { ALL_15_TEMPLATES } from '@/lib/template-engine';
import {
  FiGithub,
  FiArrowRight,
  FiStar,
  FiZap,
  FiPlay,
  FiBox,
  FiCheck,
  FiCpu,
  FiSliders,
  FiExternalLink,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const [selectedPreviewTab, setSelectedPreviewTab] = useState<string>('beast-mode-neon');
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

  const PHASES = [
    { num: '01', title: 'GraphQL v4 Aggregator', desc: 'Queries 52-week calendar, contributions, stars & streaks with 6h TTL cache.', icon: '⚡', color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30' },
    { num: '02', title: '15 Designer Presets', desc: 'Beast Mode Neon, Cyberpunk Glitch, Dracula Dark, Nord, Retro Terminal & more.', icon: '🎨', color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30' },
    { num: '03', title: '3D & Glitch Typography', desc: 'Dynamic SVG headers with 3D bubble fonts, glitch shifts & terminal prompts.', icon: '✨', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
    { num: '04', title: '52x7 Canvas Art Painter', desc: 'Interactive dot-matrix painter with text-to-pixel & paint-graph.sh export.', icon: '🖌️', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' },
    { num: '05', title: 'Interactive Game Suite', desc: 'Playable browser Snake, Brick Breaker & Pac-Man with real GitHub commit tiles.', icon: '🎮', color: 'from-rose-500/20 to-red-500/20 border-rose-500/30' },
    { num: '06', title: 'Animated SVG Dividers', desc: '8 dynamic separators including Rainbow Flow, Snake Crawl, EQ Waves & Laser.', icon: '🌈', color: 'from-violet-500/20 to-indigo-500/20 border-violet-500/30' },
    { num: '07', title: '250+ Tech Stack Matrix', desc: 'Categorized badges with dynamic proficiency pills & GitHub achievement trophies.', icon: '🏆', color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30' },
    { num: '08', title: 'Project Repository Mode', desc: 'Architecture ASCII tree generator, Docker guides & API documentation builder.', icon: '📦', color: 'from-sky-500/20 to-blue-500/20 border-sky-500/30' },
    { num: '09', title: 'Dynamic Widgets Suite', desc: 'Live Spotify now-playing player, LeetCode ratings, typing SVG & blog RSS sync.', icon: '🎵', color: 'from-green-500/20 to-emerald-500/20 border-green-500/30' },
    { num: '10', title: '1-Click GitHub Deployer', desc: 'Instant deploy directly to username/username with automated Actions provisioning.', icon: '🚀', color: 'from-fuchsia-500/20 to-purple-500/20 border-fuchsia-500/30' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-emerald-600/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 bg-pink-600/10 blur-3xl pointer-events-none -z-10" />

      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
              <FiGithub size={22} />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white">Synthetix<span className="text-blue-400">Git</span></span>
              <span className="ml-2 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                v1.0.0
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-400">
            <a href="#presets" className="hover:text-white transition-colors">15 Presets</a>
            <a href="#canvas" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>52x7 Canvas</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded">New</span>
            </a>
            <a href="#arcade" className="hover:text-purple-400 transition-colors">Arcade Games</a>
            <a href="#phases" className="hover:text-white transition-colors">10 Phases</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/studio?user=Dev-Nurul08')}
              className="text-xs sm:text-sm font-bold px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all cursor-pointer shadow-sm hover:border-slate-600"
            >
              Open Studio
            </button>
            <a
              href="https://github.com/Dev-Nurul08/SynthetixGit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all flex items-center gap-2 shadow-md shadow-blue-600/25 cursor-pointer"
            >
              <FiStar size={15} />
              <span className="hidden sm:inline">Star Repository</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── Main Hero Section ── */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 text-center">
        {/* Animated Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-950/60 border border-blue-500/30 text-blue-300 mb-8 shadow-inner animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>The Ultimate GitHub Profile, README & Contribution Studio</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1] max-w-4xl">
          Craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">Beast-Mode</span> Developer Profiles & READMEs.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          15 designer presets, live GitHub GraphQL v4 analytics, 52x7 contribution art painter, playable arcade games, and 1-Click GitHub Actions publishing.
        </p>

        {/* ── Live Username Scanner Card ── */}
        <div className="mt-10 w-full max-w-2xl p-2.5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-950 rounded-2xl border border-slate-800 w-full focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
              <FiGithub size={20} className="text-slate-400 shrink-0" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter GitHub username (e.g. Dev-Nurul08)..."
                className="bg-transparent text-sm sm:text-base font-mono text-white placeholder-slate-500 outline-none w-full"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30 disabled:opacity-40 shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Scan & Build Studio</span>
                  <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Profile Suggestions */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs text-slate-400">
            <span className="font-semibold">Try Live Demo:</span>
            {['Dev-Nurul08', 'torvalds', 'shadcn', 'leerob'].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => {
                  setInputValue(name);
                  handleScan(name);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-mono transition-all cursor-pointer"
              >
                @{name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Visual Studio Workspace Preview ── */}
        <div id="presets" className="mt-20 w-full text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <FiZap className="text-amber-400" />
                <span>15 Designer Profile Presets</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">Instant high-contrast themes tuned for modern developers</p>
            </div>

            {/* Preset switcher pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 max-w-full">
              {ALL_15_TEMPLATES.slice(0, 5).map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedPreviewTab(tpl.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                    selectedPreviewTab === tpl.id
                      ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  <span className="mr-1">{tpl.icon}</span>
                  <span>{tpl.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preset Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {ALL_15_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => router.push(`/studio?user=Dev-Nurul08&template=${tpl.id}`)}
                className={`p-4 rounded-2xl bg-slate-900/80 border transition-all cursor-pointer hover:scale-102 hover:shadow-xl group ${
                  selectedPreviewTab === tpl.id ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-2xl mb-2">{tpl.icon}</div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{tpl.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{tpl.desc}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-400 mt-3">
                  <span>Open Preset</span>
                  <FiArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 52x7 Contribution Canvas Section ── */}
        <div id="canvas" className="mt-20 w-full text-left p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6 shadow-2xl relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                <span>🎨 Phase 4 Innovation</span>
              </div>
              <h2 className="text-2xl font-black text-white">52x7 GitHub Contribution Canvas Art Painter</h2>
              <p className="text-xs text-slate-400 mt-1">
                Draw pixel art or type text to light up your GitHub contribution calendar in green tiles.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push('/studio?user=Dev-Nurul08')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-600/25 shrink-0"
            >
              <span>Launch Canvas Studio</span>
              <FiArrowRight size={14} />
            </button>
          </div>

          {/* Mini Interactive Preview Grid */}
          <div className="overflow-x-auto p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="inline-grid grid-rows-7 grid-flow-col gap-1 min-w-[700px]">
              {Array.from({ length: 7 }).map((_, r) =>
                Array.from({ length: 52 }).map((_, c) => {
                  const isPainted = (c > 5 && c < 15 && (r === 1 || r === 5 || c === 10)) || (c > 20 && c < 30 && r % 2 === 0);
                  return (
                    <div
                      key={`${c}-${r}`}
                      className={`w-3 h-3 rounded-xs ${isPainted ? 'bg-emerald-400 shadow-sm shadow-emerald-400/40' : 'bg-slate-900'}`}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* ── Playable Arcade Games Section ── */}
        <div id="arcade" className="mt-20 w-full text-left space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <FiPlay className="text-pink-400" />
              <span>Interactive HTML5 Arcade Games</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Play games in the browser using your real GitHub commit history</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => router.push('/play/Dev-Nurul08/snake')}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-all cursor-pointer group shadow-xl"
            >
              <div className="text-3xl mb-3">🐍</div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">Contribution Snake</h3>
              <p className="text-xs text-slate-400 mt-1">Eat your commit green tiles and grow your developer snake.</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 mt-4">
                <span>Play Live</span>
                <FiExternalLink size={12} />
              </span>
            </div>

            <div
              onClick={() => router.push('/play/Dev-Nurul08/brick-breaker')}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all cursor-pointer group shadow-xl"
            >
              <div className="text-3xl mb-3">🧱</div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">Commit Brick Breaker</h3>
              <p className="text-xs text-slate-400 mt-1">Smash contribution bricks with a physics bouncing ball.</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 mt-4">
                <span>Play Live</span>
                <FiExternalLink size={12} />
              </span>
            </div>

            <div
              onClick={() => router.push('/play/Dev-Nurul08/pacman')}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500 transition-all cursor-pointer group shadow-xl"
            >
              <div className="text-3xl mb-3">👾</div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">Pac-Man Commit Run</h3>
              <p className="text-xs text-slate-400 mt-1">Chomp commit corridor dots while evading bugs in real time.</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 mt-4">
                <span>Play Live</span>
                <FiExternalLink size={12} />
              </span>
            </div>
          </div>
        </div>

        {/* ── 10 Core Architectural Phases ── */}
        <div id="phases" className="mt-20 w-full text-left space-y-6">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2">
              <FiCpu className="text-blue-400" />
              <span>The 10 Core Architectural Phases</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Full technical breakdown of SynthetixGit architecture</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PHASES.map((phase) => (
              <div
                key={phase.num}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-lg shrink-0">
                  {phase.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-blue-400">PHASE {phase.num}</span>
                    <h3 className="text-sm font-bold text-white">{phase.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">SynthetixGit</span>
            <span>•</span>
            <span>The All-in-One Developer Profile & README Studio</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://github.com/Dev-Nurul08/SynthetixGit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub Repository
            </a>
            <span>•</span>
            <a href="https://github.com/Dev-Nurul08" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Author: @Dev-Nurul08
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
