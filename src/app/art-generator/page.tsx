'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiArrowLeft, FiGrid } from 'react-icons/fi';
import { CanvasPainter } from '@/components/studio/canvas-painter';

function ArtGeneratorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get('user') || 'octocat';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation Header */}
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
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">GitHub Art Forge Module</span>
            <h1 className="text-xl font-black text-white">Contribution Grid Art Generator</h1>
          </div>
        </div>

        {/* Art Painter Module */}
        <CanvasPainter username={user} />
      </div>
    </div>
  );
}

export default function ArtGeneratorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Art Generator...</div>}>
      <ArtGeneratorContent />
    </Suspense>
  );
}
