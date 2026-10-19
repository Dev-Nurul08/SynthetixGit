import Link from "next/link";
import { FiGithub, FiZap, FiHeart, FiCode, FiGrid, FiPlay, FiMail, FiLayers } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-primary bg-bg-primary/95 text-text-secondary backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <FiZap className="text-slate-950 font-black text-base" />
              </div>
              <span className="font-black text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Synthetix<span className="text-cyan-400">Git</span>
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed">
              The all-in-one GitHub profile studio: custom profile READMEs, 52x7 contribution graph art, dynamic SVG widgets, and playable commit games.
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span>Full-Stack Suite Operational</span>
            </div>
          </div>

          {/* Studio Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Studio Suite</span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/studio?mode=wizard" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FiZap size={12} className="text-cyan-400" />
                  <span>README Wizard</span>
                </Link>
              </li>
              <li>
                <Link href="/studio?mode=profile" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FiLayers size={12} className="text-blue-400" />
                  <span>Profile Editor</span>
                </Link>
              </li>
              <li>
                <Link href="/art-generator" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FiGrid size={12} className="text-emerald-400" />
                  <span>52x7 Art Painter</span>
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FiCode size={12} className="text-amber-400" />
                  <span>Markdown Builder</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Arcade Mini-Games */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Commit Arcade</span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/games/snake" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="text-xs">🐍</span>
                  <span>Contribution Snake</span>
                </Link>
              </li>
              <li>
                <Link href="/games/breakout" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="text-xs">🧱</span>
                  <span>Commit Brick Breaker</span>
                </Link>
              </li>
              <li>
                <Link href="/games/pacman" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <span className="text-xs">👾</span>
                  <span>Code Pac-Man Run</span>
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-white transition-colors text-text-muted">
                  <span>View All Games Catalog →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">Community &amp; Open Source</span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Developer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FiMail size={12} />
                  <span>Contact &amp; Feedback</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/Dev-Nurul08/SynthetixGit"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FiGithub size={12} />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <Link
                  href="/art-generator"
                  className="hover:text-white transition-colors text-text-muted flex items-center gap-1.5"
                >
                  <span>Interactive Art Engine</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border-primary/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p className="flex items-center gap-1.5">
            Crafted with <FiHeart className="text-rose-500 fill-rose-500" size={12} /> by the SynthetixGit community.
          </p>
          <p>
            Powered by Next.js 16 (Turbopack) &bull; NestJS &bull; HTML5 Canvas
          </p>
        </div>
      </div>
    </footer>
  );
}