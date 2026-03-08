// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FiGithub, FiZap, FiMenu, FiX, FiLayers, FiPlay, FiGrid, FiMail } from 'react-icons/fi';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/studio', label: 'Studio' },
    { href: '/builder', label: 'Builder' },
    { href: '/art-generator', label: 'Art Generator' },
    { href: '/games', label: 'Arcade' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#05070a]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <FiZap className="text-slate-950 font-black text-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Synthetix<span className="text-cyan-400">Git</span>
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 -mt-0.5">
                Studio Suite
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30 shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Dev-Nurul08/SynthetixGit"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-bold transition-all shadow-sm"
            >
              <FiGithub size={14} />
              <span>GitHub</span>
            </a>
            <Link
              href="/studio?mode=wizard"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-black transition-all shadow-lg shadow-cyan-500/25"
            >
              Launch Studio 🚀
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle navigation"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#080b12] px-4 pt-2 pb-5 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-cyan-400/15 text-cyan-300 border border-cyan-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/studio?mode=wizard"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2.5 rounded-xl bg-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-cyan-400/25"
            >
              Launch Studio 🚀
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
