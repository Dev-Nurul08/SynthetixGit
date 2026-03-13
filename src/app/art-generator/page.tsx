'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiGrid, FiZap } from 'react-icons/fi';
import Dashboard from '@/components/Dashboard';

function ArtGeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user') || 'octocat';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            >
              <FiArrowLeft size={14} />
              <span>Dashboard</span>
            </button>
            <a
              href={`/studio?user=${user}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <FiZap size={13} />
              <span>Studio</span>
            </a>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
              GitHub Art Forge Module
            </span>
            <h1 className="text-lg sm:text-xl font-black text-white">
              Contribution Grid Art Generator
            </h1>
          </div>
        </div>

        {/* Upgraded Dashboard Component */}
        <Dashboard showHeader={false} showFooter={true} initialText="HELLO" />
      </div>
    </div>
  );
}

export default function ArtGeneratorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400 font-mono">Loading Art Studio...</div>}>
      <ArtGeneratorContent />
    </Suspense>
  );
}
