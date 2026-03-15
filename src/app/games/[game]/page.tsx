'use client';

import { Suspense, useState, useEffect, useRef, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiPlay, FiRotateCcw, FiAward, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';

function PlayGameContent({ params }: { params: Promise<{ game: string }> }) {
  const { game } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user') || 'octocat';

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showCtaModal, setShowCtaModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (gameOver) {
      setShowCtaModal(true);
    }
  }, [gameOver]);

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setShowCtaModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      {/* HUD Header */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-4 mb-4 flex items-center justify-between shadow-2xl">
        <button
          type="button"
          onClick={() => router.push(`/games?user=${user}`)}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <FiArrowLeft size={16} />
          <span>Arcade Catalog</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            Score: <strong className="text-emerald-400">{score}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            High Score: <strong className="text-amber-400">{highScore}</strong>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Restart Game"
          >
            <FiRotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
        <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
          <span>🎮 Playing {game.toUpperCase()} — @{user}</span>
        </h2>

        <div className="w-[600px] h-[350px] bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
          <canvas ref={canvasRef} width={600} height={350} className="rounded-xl" />

          {/* Canvas Overlay Info */}
          <div className="absolute top-3 left-3 text-[11px] font-mono text-slate-500">
            Use Arrow Keys or WASD to control
          </div>
        </div>
      </div>

      {/* Post-Game CTA Modal Dialog (Section 11) */}
      {showCtaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-[90vw] sm:w-[480px] min-w-[300px] max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 shrink-0 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                🏆
              </div>
              <h3 className="text-xl font-bold text-white">Game Completed!</h3>
              <p className="text-xs text-slate-400">
                You scored <strong className="text-emerald-400">{score}</strong> points on @{user}&apos;s profile arcade!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-center">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block">GitHub Profile Forge</span>
              <p className="text-xs text-slate-300 font-medium">
                Want a custom interactive README with games &amp; contribution art for your own GitHub profile?
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Play Again
              </button>
              <button
                type="button"
                onClick={() => router.push(`/builder?user=${user}`)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/20"
              >
                <FiZap size={14} />
                <span>Create My README</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PlayGamePage({ params }: { params: Promise<{ game: string }> }) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Game...</div>}>
      <PlayGameContent params={params} />
    </Suspense>
  );
}
