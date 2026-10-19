"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiZap,
  FiGrid,
  FiPlay,
  FiBox,
  FiActivity,
  FiLogOut,
  FiUser,
  FiExternalLink,
  FiCode,
  FiGithub,
  FiTerminal,
} from "react-icons/fi";
import Dashboard from "@/components/Dashboard";

const STUDIO_CARDS = [
  {
    id: "studio-wizard",
    href: "/studio?mode=wizard",
    icon: FiZap,
    label: "README Wizard",
    badge: "Guided 6-Step",
    desc: "Build an animated, metric-packed GitHub profile README in under 2 minutes.",
    gradient: "from-cyan-500 to-blue-600",
    borderHover: "hover:border-cyan-500/40",
  },
  {
    id: "studio-canvas",
    href: "/art-generator",
    icon: FiGrid,
    label: "Contribution Forge",
    badge: "52×7 Matrix",
    desc: "Standalone pixel art painter with script downloads and live GitHub deployment.",
    gradient: "from-emerald-500 to-teal-600",
    borderHover: "hover:border-emerald-500/40",
  },
  {
    id: "studio-arcade",
    href: "/games",
    icon: FiPlay,
    label: "Arcade Games",
    badge: "Playable Canvas",
    desc: "Embed real Snake, Brick Breaker, and Pac-Man games directly into your profile.",
    gradient: "from-rose-500 to-pink-600",
    borderHover: "hover:border-rose-500/40",
  },
  {
    id: "studio-widgets",
    href: "/studio?mode=widgets",
    icon: FiActivity,
    label: "Dynamic SVG Widgets",
    badge: "Real-time Embeds",
    desc: "Live typing banners, Spotify now-playing cards, and GitHub commit streak badges.",
    gradient: "from-violet-500 to-purple-600",
    borderHover: "hover:border-violet-500/40",
  },
  {
    id: "studio-repo",
    href: "/studio?mode=repo",
    icon: FiBox,
    label: "Project Docs Generator",
    badge: "Auto-Scanned",
    desc: "Generate production-grade project documentation with architecture diagrams and API tables.",
    gradient: "from-amber-500 to-orange-600",
    borderHover: "hover:border-amber-500/40",
  },
  {
    id: "studio-profile",
    href: "/studio?mode=profile",
    icon: FiCode,
    label: "Profile Studio",
    badge: "Live Split-Pane",
    desc: "Monaco code editor with instant live markdown preview and one-click copy.",
    gradient: "from-sky-500 to-cyan-600",
    borderHover: "hover:border-sky-500/40",
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <span className="text-xs font-mono text-slate-400">Loading Command Center...</span>
        </div>
      </div>
    );
  }

  const username =
    (session?.user as { username?: string })?.username ||
    session?.user?.name ||
    "Developer";
  const avatar = session?.user?.image;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-white">
      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <FiGithub size={18} className="text-slate-950 font-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-base tracking-tight text-white flex items-center gap-1">
                Synthetix<span className="text-cyan-400">Git</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  PRO
                </span>
              </span>
            </div>
          </a>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-400">
            <a href="/studio" className="hover:text-white transition-colors">
              Studio
            </a>
            <a href="/games" className="hover:text-white transition-colors">
              Arcade Lounge
            </a>
            <a href="/art-generator" className="hover:text-emerald-400 transition-colors">
              Art Forge
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Support
            </a>
          </nav>

          {/* User menu & Signout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt={username}
                  className="w-6 h-6 rounded-full border border-slate-700"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center">
                  <FiUser size={13} className="text-slate-400" />
                </div>
              )}
              <span className="text-xs font-bold text-slate-300 hidden sm:block">
                @{username}
              </span>
            </div>

            <button
              id="signout-btn"
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all cursor-pointer"
              title="Sign out"
            >
              <FiLogOut size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Welcome Identity Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatar}
                  alt={username}
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl border-2 border-slate-700/80 shadow-xl"
                />
              ) : (
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                  <FiUser size={32} className="text-slate-400" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-emerald-400">
                    GitHub OAuth Active
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                  Welcome, <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">@{username}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                  SynthetixGit Command Center — Design your contribution art, generate dynamic README badges, and launch playable profile games.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white hover:bg-slate-700 transition-all shadow-sm"
              >
                <FiGithub size={14} />
                View GitHub Profile
                <FiExternalLink size={12} className="opacity-50" />
              </a>
              <a
                href="/studio"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-black hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
              >
                <FiZap size={14} className="text-slate-950" />
                Launch Full Studio
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── CORE CENTERPIECE: CONTRIBUTION ART STUDIO ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Primary Module
              </span>
              <h2 className="text-xl font-black text-white">
                Contribution Calendar Studio
              </h2>
            </div>
            <span className="text-xs text-slate-400 hidden sm:block">
              Draw custom text or shapes &amp; commit directly to GitHub
            </span>
          </div>

          {/* Embedded Upgraded Dashboard Component */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-2 sm:p-4 backdrop-blur-xl shadow-2xl">
            <Dashboard showHeader={false} showFooter={false} />
          </div>
        </section>

        {/* ── STUDIO ECOSYSTEM: 6 QUICK-LAUNCH TOOLS ── */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono">
                Complete Toolset
              </span>
              <h2 className="text-xl font-black text-white">
                SynthetixGit Studio Ecosystem
              </h2>
            </div>
            <a
              href="/studio"
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
            >
              Open Studio <FiExternalLink size={11} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {STUDIO_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.id}
                  href={card.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`group relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 ${card.borderHover} transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1 block`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-black text-base text-white group-hover:text-cyan-300 transition-colors">
                    {card.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1.5">
                    {card.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-white transition-colors">
                    <span>Launch Tool</span>
                    <FiExternalLink size={13} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* ── ARCADE CALLOUT ── */}
        <section className="rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">
                🕹️ Arcade Suite
              </span>
              <span className="text-xs text-slate-400">Playable Profile Embeds</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Turn your GitHub Profile into a Playable Arcade
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Embed fully playable HTML5 Canvas games (Snake, Brick Breaker, Pac-Man) right on your README. Visitors can play with arrow keys and compete on your personal leaderboard.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/games"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-black shadow-lg shadow-rose-500/20 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <FiPlay size={15} />
              Open Arcade Lounge
            </a>
          </div>
        </section>

        {/* ── FOOTER ATTRIBUTION ── */}
        <footer className="border-t border-slate-800/80 pt-8 pb-12 mt-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span>SynthetixGit · Open Source Profile &amp; Contribution Studio</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/shivam-bhadoriya-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn: shivam-bhadoriya-dev
              </a>
              <span>·</span>
              <a href="/studio" className="hover:text-white transition-colors">
                Studio
              </a>
              <span>·</span>
              <a href="/art-generator" className="hover:text-white transition-colors">
                Art Forge
              </a>
              <span>·</span>
              <a href="/games" className="hover:text-white transition-colors">
                Arcade
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
