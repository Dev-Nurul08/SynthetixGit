"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiGithub,
  FiArrowRight,
  FiCode,
  FiGrid,
  FiPlay,
  FiActivity,
  FiBox,
  FiZap,
  FiStar,
  FiUsers,
  FiCheck,
  FiLinkedin,
  FiExternalLink,
  FiTerminal,
  FiLayers,
} from "react-icons/fi";
import { getPatternGrid } from "@/lib/patternUtils";

/* ──────────────────────────────────────────────────
   HERO INTERACTIVE CONTRIBUTION ART PAINTER
────────────────────────────────────────────────── */
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const HEART_MATRIX = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];

const INVADER_MATRIX = [
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
];

function centerMatrix(pattern: number[][]): number[][] {
  const result: number[][] = Array(7).fill(0).map(() => Array(52).fill(0));
  const patWidth = pattern[0].length;
  const startCol = Math.max(0, Math.floor((52 - patWidth) / 2));
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < patWidth && startCol + c < 52; c++) {
      result[r][startCol + c] = pattern[r][c];
    }
  }
  return result;
}

function HeroInteractivePainter() {
  const [word, setWord] = useState("OCTOCAT");
  const [grid, setGrid] = useState<number[][]>(() => {
    const raw = getPatternGrid("OCTOCAT");
    return raw.map((r) => {
      const row = [...r];
      while (row.length < 52) row.push(0);
      return row.slice(0, 52);
    });
  });

  const handleWordChange = (newWord: string) => {
    const clean = newWord.toUpperCase().slice(0, 8);
    setWord(clean);
    const raw = getPatternGrid(clean);
    const padded = raw.map((r) => {
      const row = [...r];
      while (row.length < 52) row.push(0);
      return row.slice(0, 52);
    });
    setGrid(padded);
  };

  const handlePreset = (type: "heart" | "invader" | "wave" | "word", val?: string) => {
    if (type === "heart") {
      setWord("HEART");
      setGrid(centerMatrix(HEART_MATRIX));
    } else if (type === "invader") {
      setWord("INVADER");
      setGrid(centerMatrix(INVADER_MATRIX));
    } else if (type === "wave") {
      setWord("WAVE");
      const wave = Array(7).fill(0).map(() => Array(52).fill(0));
      for (let c = 0; c < 52; c++) {
        const r = Math.round(3 + 2.5 * Math.sin(c / 3.5));
        if (r >= 0 && r < 7) wave[r][c] = 1;
      }
      setGrid(wave);
    } else if (type === "word" && val) {
      handleWordChange(val);
    }
  };

  const activeCells = grid.reduce((acc, row) => acc + row.filter((c) => c > 0).length, 0);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl p-5 sm:p-6 bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-xl">
      {/* Interactive Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Canvas:
          </span>
          <input
            type="text"
            value={word}
            onChange={(e) => handleWordChange(e.target.value)}
            maxLength={8}
            placeholder="TYPE WORD"
            className="w-36 sm:w-44 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700/80 text-emerald-400 font-mono font-bold text-sm tracking-widest uppercase focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {["OCTOCAT", "NURUL", "DEV", "PRO", "2025"].map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => handlePreset("word", w)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-mono transition-all cursor-pointer ${
                word === w
                  ? "bg-emerald-500 text-slate-950 font-black"
                  : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              {w}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handlePreset("heart")}
            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-800 text-rose-300 hover:text-rose-200 hover:bg-slate-700 transition-all cursor-pointer"
          >
            ❤️ Heart
          </button>
          <button
            type="button"
            onClick={() => handlePreset("invader")}
            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-800 text-cyan-300 hover:text-cyan-200 hover:bg-slate-700 transition-all cursor-pointer"
          >
            👾 Invader
          </button>
          <button
            type="button"
            onClick={() => handlePreset("wave")}
            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-800 text-teal-300 hover:text-teal-200 hover:bg-slate-700 transition-all cursor-pointer"
          >
            🌊 Wave
          </button>
        </div>
      </div>

      {/* The 52x7 Matrix Display */}
      <div className="overflow-x-auto pb-2 select-none">
        <div className="min-w-[680px]">
          {/* Months header */}
          <div className="flex pl-7 text-[10px] font-mono font-bold text-slate-500 gap-[24px] mb-1.5">
            {MONTH_NAMES.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          <div className="flex gap-2">
            {/* Day labels */}
            <div className="flex flex-col justify-between text-[9px] font-mono text-slate-500 py-0.5 select-none">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Matrix blocks */}
            <div className="flex flex-col gap-[3.5px] p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
              {grid.map((row, ri) => (
                <div key={ri} className="flex gap-[3.5px]">
                  {row.map((cell, ci) => {
                    const isActive = cell > 0;
                    return (
                      <div
                        key={`${ri}-${ci}`}
                        className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] transition-all duration-300 ${
                          isActive
                            ? "bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.65)] border border-[#26a641]"
                            : "bg-[#161b22] border border-slate-800/50"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer details */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-emerald-400 font-bold">{activeCells}</span> active calendar cells
          <span className="text-slate-600">·</span>
          <span>~{activeCells * 3} backdated commits</span>
        </div>
        <div className="text-[11px] text-slate-400">
          ✨ Type any word or name to paint in real-time
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   ANIMATED COUNTER
────────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= to) {
        setVal(to);
        clearInterval(id);
      } else {
        setVal(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ──────────────────────────────────────────────────
   FEATURE DATA
────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: FiGrid,
    label: "Contribution Forge",
    title: "52×7 Calendar Art Studio",
    desc: "Type words, load templates, or freehand draw on your 52×7 calendar. Commit directly to GitHub or export Bash & PowerShell scripts.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(52,211,153,0.15)",
  },
  {
    icon: FiZap,
    label: "README Wizard",
    title: "6-Stage Profile Wizard",
    desc: "Answer a few questions and get a stunning, animated, metric-dense GitHub profile README in under 2 minutes.",
    gradient: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.15)",
  },
  {
    icon: FiPlay,
    label: "Arcade Games",
    title: "Playable Profile Arcade",
    desc: "Embed playable Snake, Brick Breaker, and Pac-Man games right on your README for visitors to play directly.",
    gradient: "from-rose-500 to-pink-600",
    glow: "rgba(251,113,133,0.15)",
  },
  {
    icon: FiActivity,
    label: "Dynamic Widgets",
    title: "Real-time SVG Widgets",
    desc: "Dynamic live typing banners, Spotify now-playing cards, LeetCode counters, and GitHub commit streak cards.",
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(167,139,250,0.15)",
  },
  {
    icon: FiBox,
    label: "Project Docs",
    title: "Project README Builder",
    desc: "Auto-scan repositories to generate complete project documentation with architecture diagrams and API tables.",
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(251,191,36,0.15)",
  },
  {
    icon: FiLayers,
    label: "15 Presets",
    title: "15 Theme Styles",
    desc: "Transform your profile aesthetic with Cyberpunk Glitch, Tokyo Night, Dracula, Emerald Matrix, and Nordic Snow.",
    gradient: "from-sky-500 to-indigo-600",
    glow: "rgba(56,189,248,0.15)",
  },
];

/* ──────────────────────────────────────────────────
   TERMINAL DEMO
────────────────────────────────────────────────── */
const TERMINAL_LINES = [
  { text: "$ synthetixgit forge --user octocat", color: "#22d3ee" },
  { text: "✓ Connected via GitHub OAuth 2.0", color: "#34d399" },
  { text: "✓ Generated 52×7 contribution matrix: 'OCTOCAT'", color: "#34d399" },
  { text: "✓ Backdated commit schedule created (184 commits)", color: "#34d399" },
  { text: "✓ Profile README built with 6 animated widgets", color: "#34d399" },
  { text: "✓ Playable arcade canvas compiled (Snake, Breakout, Pac-Man)", color: "#a78bfa" },
  { text: "$ Deploy status: Deployed to GitHub → 200 OK", color: "#fbbf24" },
];

function TerminalDemo() {
  const [lines, setLines] = useState<typeof TERMINAL_LINES>([]);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      if (i >= TERMINAL_LINES.length) {
        clearInterval(id);
        return;
      }
      setLines((prev) => [...prev, TERMINAL_LINES[i]]);
      i++;
    }, 350);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden font-mono">
      <div className="flex items-center px-4 py-3 bg-slate-950 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="ml-3 text-xs text-slate-400 flex items-center gap-1.5">
          <FiTerminal size={12} />
          synthetixgit-studio — automated-forge
        </span>
      </div>
      <div className="p-5 space-y-2 min-h-[220px] bg-slate-950/70 text-xs">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: line.color }}
          >
            {line.text}
          </motion.div>
        ))}
        {lines.length < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse" />
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────
   MAIN HOMEPAGE
────────────────────────────────────────────────── */
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const username = (session?.user as { username?: string })?.username || session?.user?.name;
      if (username === "Dev-Shivam-05") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <span className="text-xs font-mono text-slate-400">Initializing SynthetixGit...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* ── TOPBAR NAVBAR ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <FiGithub size={18} className="text-slate-950 font-black" />
            </div>
            <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
              Synthetix<span className="text-cyan-400">Git</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                PRO
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-300">
            <a href="/studio" className="hover:text-white transition-colors">Studio</a>
            <a href="/art-generator" className="hover:text-emerald-400 transition-colors">Art Forge</a>
            <a href="/games" className="hover:text-rose-400 transition-colors">Arcade Games</a>
            <a href="/contact" className="hover:text-white transition-colors">Support</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="nav-signin-btn"
              type="button"
              onClick={() => signIn("github")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-xs font-black hover:opacity-95 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <FiGithub size={15} />
              Sign in with GitHub
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Backdrops */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(6,182,212,0.14) 0%, rgba(52,211,153,0.08) 35%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative max-w-7xl mx-auto space-y-12">
          {/* Header Texts */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400 font-bold">SynthetixGit v2.0</span>
              <span className="text-slate-600">·</span>
              <span>Open Source GitHub Profile &amp; Contribution Forge</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white"
            >
              Your GitHub Profile &amp; Calendar,{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Reimagined.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Paint custom pixel artwork onto your 52×7 contribution calendar, generate animated metric-packed profile READMEs, embed playable arcade games, and build dynamic SVG widgets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <button
                id="hero-signin-btn"
                type="button"
                onClick={() => signIn("github")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <FiGithub size={18} />
                Sign in with GitHub — Free Forever
                <FiArrowRight size={16} />
              </button>

              <a
                href="/studio"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 hover:text-white transition-all shadow-sm"
              >
                <FiPlay size={16} className="text-cyan-400" />
                Try Studio Demo
              </a>
            </motion.div>
          </div>

          {/* Interactive Live Hero Painter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <HeroInteractivePainter />
          </motion.div>
        </div>
      </section>

      {/* ── STATS COUNTER BAR ── */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: 1200, suffix: "+", label: "Developers", icon: FiUsers, color: "text-cyan-400" },
              { val: 52, suffix: " wks", label: "Calendar Art Matrix", icon: FiGrid, color: "text-emerald-400" },
              { val: 15, suffix: " Presets", label: "Design Themes", icon: FiStar, color: "text-amber-400" },
              { val: 3, suffix: " Games", label: "Playable Canvas Arcades", icon: FiPlay, color: "text-rose-400" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-1">
                  <Icon size={22} className={`mx-auto ${stat.color}`} />
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    <Counter to={stat.val} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6 STUDIO POWERHOUSE FEATURES ── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Ecosystem Suite
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Everything you need to dominate on GitHub
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From backdated contribution art to playable canvas arcades and dynamic typing SVG banners — all accessible from one cohesive studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-cyan-500/5 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center shadow-lg text-white`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {feat.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-bold text-slate-400">
                  <a href="/studio" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                    Try Module <FiArrowRight size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── TERMINAL LIVE SCAN DEMO ── */}
      <section className="py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
              Automated CLI &amp; API
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Instant Generation. One-Click GitHub Sync.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              SynthetixGit connects with your GitHub account, reads your commit history, calculates optimal commit dates, and automatically commits contribution art or creates full profile repos in seconds.
            </p>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <FiCheck className="text-emerald-400" />
                <span>Zero configuration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheck className="text-emerald-400" />
                <span>Safe OAuth tokens</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiCheck className="text-emerald-400" />
                <span>Bash &amp; PS1 scripts</span>
              </div>
            </div>
          </div>

          <TerminalDemo />
        </div>
      </section>

      {/* ── PLAYABLE ARCADE TEASER ── */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-slate-800/80 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400 font-mono">
              Arcade Suite
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Make your GitHub profile playable.
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Embed playable HTML5 Canvas games (Snake, Brick Breaker, Pac-Man) right on your README. Visitors click "Play" and compete directly on your personal profile leaderboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="/games"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-xs shadow-lg shadow-rose-500/20 hover:opacity-90 transition-all flex items-center gap-2"
            >
              <FiPlay size={16} />
              Launch Arcade Games
            </a>
            <a
              href="/studio?mode=arcade"
              className="px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-800 transition-all"
            >
              Get README Embed Code
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4 sm:px-6 text-center space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Ready to transform your{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">
            GitHub presence?
          </span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Join developers worldwide creating high-impact GitHub profiles and calendar art today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
          <button
            type="button"
            onClick={() => signIn("github")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <FiGithub size={18} />
            Get Started with GitHub
          </button>
          <a
            href="https://github.com/Dev-Nurul08/SynthetixGit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <FiStar size={16} className="text-amber-400" />
            Star Repository on GitHub
          </a>
        </div>
      </section>

      {/* ── FOOTER ATTRIBUTION ── */}
      <footer className="border-t border-slate-800/80 py-10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
              <FiGithub size={14} className="text-slate-950 font-black" />
            </div>
            <span className="font-bold text-white">SynthetixGit</span>
            <span>·</span>
            <span>
              Architecture by{" "}
              <a
                href="https://github.com/Dev-Shivam-05"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-emerald-400 transition-colors"
              >
                Dev-Shivam-05
              </a>{" "}
              &amp;{" "}
              <a
                href="https://github.com/Dev-Nurul08"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-cyan-400 transition-colors"
              >
                Dev-Nurul08
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://www.linkedin.com/in/shivam-bhadoriya-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <FiLinkedin className="w-3.5 h-3.5 text-blue-400" />
              Shivam Bhadoriya
            </a>
            <a href="/studio" className="hover:text-white transition-colors">
              Studio
            </a>
            <a href="/art-generator" className="hover:text-emerald-400 transition-colors">
              Art Forge
            </a>
            <a href="/games" className="hover:text-rose-400 transition-colors">
              Arcade
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
