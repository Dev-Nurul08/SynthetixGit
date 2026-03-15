'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiPlay, FiArrowLeft, FiGrid, FiZap } from 'react-icons/fi';

function GamesCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user') || 'octocat';

  const games = [
    {
      id: 'snake',
      name: 'Contribution Snake Run',
      desc: 'Navigate the snake through 52 weeks of green contribution cells and consume commit blocks!',
      icon: '🐍',
      badgeColor: 'from-emerald-600 to-teal-800',
    },
    {
      id: 'breakout',
      name: 'Commit Brick Breaker',
      desc: 'Break contribution grid blocks with your paddle to score commit points!',
      icon: '🧱',
      badgeColor: 'from-blue-600 to-indigo-800',
    },
    {
      id: 'pacman',
      name: 'Code Pac-Man',
      desc: 'Eat repo commits while dodging bugs and runtime exceptions across the contribution maze!',
      icon: '👾',
      badgeColor: 'from-purple-600 to-violet-800',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => router.push(`/builder?user=${user}`)}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <FiArrowLeft size={16} />
            <span>Back to Builder</span>
          </button>
          <div className="text-right">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Playable Profile Arcade</span>
            <h1 className="text-xl font-black text-white">GitHub Mini-Games Arcade</h1>
          </div>
        </div>

        {/* Game Cards Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${game.badgeColor} flex items-center justify-center text-3xl shadow-lg`}>
                  {game.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{game.desc}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/games/${game.id}?user=${user}`)}
                className="mt-6 w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <FiPlay size={14} />
                <span>Play Game Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GamesCatalogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Games Arcade...</div>}>
      <GamesCatalogContent />
    </Suspense>
  );
}
