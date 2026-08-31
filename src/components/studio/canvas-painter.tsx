'use client';

import { useState } from 'react';
import { textToGrid52x7 } from '@/lib/font-matrix';
import { generateBashPainterScript } from '@/lib/git-painter-generator';
import {
  FiDownload,
  FiTrash2,
  FiType,
  FiHeart,
  FiSmile,
  FiZap,
  FiCopy,
  FiCheck,
  FiInfo,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const LEVEL_LABELS = ['Empty (0)', 'Low (2 commits)', 'Medium (5 commits)', 'High (10 commits)', 'Intense (20 commits)'];

interface CanvasPainterProps {
  username?: string;
}

export function CanvasPainter({ username = 'Dev-Nurul08' }: CanvasPainterProps) {
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: 52 }, () => Array(7).fill(0))
  );
  const [selectedLevel, setSelectedLevel] = useState<number>(4);
  const [customText, setCustomText] = useState<string>('NURUL');
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  // Count active cells and estimated commits
  const totalPixels = grid.reduce((acc, col) => acc + col.filter((l) => l > 0).length, 0);
  const commitMultiplier: Record<number, number> = { 0: 0, 1: 2, 2: 5, 3: 10, 4: 20 };
  const estimatedCommits = grid.reduce(
    (acc, col) => acc + col.reduce((sum, l) => sum + (commitMultiplier[l] || 0), 0),
    0
  );

  const handleCellClick = (col: number, row: number) => {
    setGrid((prev) => {
      const next = prev.map((c) => [...c]);
      next[col][row] = selectedLevel;
      return next;
    });
  };

  const handleCellHover = (col: number, row: number) => {
    if (!isMouseDown) return;
    handleCellClick(col, row);
  };

  const handleApplyText = (textToUse?: string) => {
    const txt = (textToUse || customText).trim();
    if (!txt) return;
    const newGrid = textToGrid52x7(txt);
    setGrid(newGrid);
    toast.success(`Painted "${txt.toUpperCase()}" on contribution canvas!`);
  };

  const handleClear = () => {
    setGrid(Array.from({ length: 52 }, () => Array(7).fill(0)));
    toast.success('Canvas cleared');
  };

  const handlePresetStamp = (preset: 'heart' | 'invader' | 'smile' | 'snake') => {
    const next = Array.from({ length: 52 }, () => Array(7).fill(0));
    if (preset === 'heart') {
      const startCol = 22;
      const heartPattern = [
        [0, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
      ];
      for (let r = 0; r < heartPattern.length; r++) {
        for (let c = 0; c < heartPattern[r].length; c++) {
          if (heartPattern[r][c]) next[startCol + c][r] = 4;
        }
      }
    } else if (preset === 'invader') {
      const startCol = 20;
      const invaderPattern = [
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
      ];
      for (let r = 0; r < invaderPattern.length; r++) {
        for (let c = 0; c < invaderPattern[r].length; c++) {
          if (invaderPattern[r][c]) next[startCol + c][r] = 4;
        }
      }
    } else if (preset === 'snake') {
      for (let c = 2; c < 50; c++) {
        const row = Math.floor(3 + Math.sin(c / 3) * 2.5);
        if (row >= 0 && row < 7) next[c][row] = 4;
      }
    }
    setGrid(next);
    toast.success(`Applied ${preset} preset stamp!`);
  };

  const getScriptContent = () => {
    return generateBashPainterScript({
      username,
      userEmail: 'shaikhnurul8200@gmail.com',
      repoName: 'github-contribution-art',
      grid,
    });
  };

  const handleExportScript = () => {
    const script = getScriptContent();
    const blob = new Blob([script], { type: 'application/x-sh' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paint-graph.sh';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded paint-graph.sh!');
  };

  const handleCopyScript = () => {
    const script = getScriptContent();
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
    toast.success('Copied bash script to clipboard!');
  };

  return (
    <div
      className="p-5 rounded-3xl bg-slate-900/90 border-2 border-slate-800 space-y-5 shadow-2xl select-none"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {/* Top Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FiZap className="text-emerald-400" size={16} />
              <span>52x7 GitHub Contribution Graph Art Studio</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Draw custom pixel art, write names, and generate automated bash scripts to paint on your GitHub calendar.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyScript}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
          >
            {copiedScript ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
            <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportScript}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/25"
          >
            <FiDownload size={14} />
            <span>Download paint-graph.sh</span>
          </button>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Weeks</span>
          <span className="text-sm font-mono font-bold text-slate-200">52 Weeks</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Painted Pixels</span>
          <span className="text-sm font-mono font-bold text-emerald-400">{totalPixels} / 364</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Commits</span>
          <span className="text-sm font-mono font-bold text-blue-400">~{estimatedCommits} Commits</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Target Author</span>
          <span className="text-sm font-mono font-bold text-amber-300 truncate block">@{username}</span>
        </div>
      </div>

      {/* Text-to-Pixel Generator & Quick Words */}
      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 w-full">
            <FiType size={15} className="text-blue-400 shrink-0" />
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyText()}
              placeholder="Type word (e.g. NURUL, DEV, HI, CODE)..."
              className="bg-transparent text-xs font-bold text-white outline-none w-full uppercase tracking-wider"
              maxLength={8}
            />
          </div>

          <button
            type="button"
            onClick={() => handleApplyText()}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shrink-0 shadow-md shadow-blue-600/25"
          >
            Auto-Paint Word
          </button>
        </div>

        {/* Quick word pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-slate-500">Quick Words:</span>
          {['NURUL', 'DEV', 'CODE', 'HI', 'GIT', 'PRO'].map((word) => (
            <button
              key={word}
              type="button"
              onClick={() => {
                setCustomText(word);
                handleApplyText(word);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] font-bold transition-all cursor-pointer"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 52x7 Contribution Canvas Grid */}
      <div className="overflow-x-auto p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[780px]">
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 52 }).map((_, c) => {
              const level = grid[c]?.[r] || 0;
              return (
                <div
                  key={`${c}-${r}`}
                  onClick={() => handleCellClick(c, r)}
                  onMouseEnter={() => handleCellHover(c, r)}
                  className="w-3.5 h-3.5 rounded-xs transition-all cursor-pointer hover:scale-125 hover:z-10 hover:ring-2 hover:ring-white shadow-xs"
                  style={{ backgroundColor: LEVEL_COLORS[level] }}
                  title={`Week ${c + 1}, Day ${r + 1} • Level ${level} (${LEVEL_LABELS[level]})`}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Palette, Presets & Tools */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        {/* Color Palette Intensity */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400 mr-1">Green Intensity:</span>
          {LEVEL_COLORS.map((col, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedLevel(idx)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer text-xs font-bold ${
                selectedLevel === idx
                  ? 'border-white bg-slate-800 text-white ring-2 ring-blue-500'
                  : 'border-slate-800 bg-slate-950 text-slate-400'
              }`}
            >
              <span className="w-3 h-3 rounded-xs shrink-0" style={{ backgroundColor: col }} />
              <span>{idx === 0 ? 'Clear (0)' : `Lvl ${idx}`}</span>
            </button>
          ))}
        </div>

        {/* Preset Stamps & Clear Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePresetStamp('heart')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-pink-400 border border-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <FiHeart size={14} className="text-pink-400" />
            <span>Heart</span>
          </button>
          <button
            type="button"
            onClick={() => handlePresetStamp('invader')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <FiSmile size={14} className="text-emerald-400" />
            <span>Invader</span>
          </button>
          <button
            type="button"
            onClick={() => handlePresetStamp('snake')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <span className="text-sm">🐍</span>
            <span>Wave</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-800 text-xs font-bold transition-all cursor-pointer"
          >
            <FiTrash2 size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Instructions callout */}
      <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-2.5 text-xs text-blue-200">
        <FiInfo size={16} className="text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white block">How to Paint on Your Live GitHub Contribution Calendar:</span>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            1. Click <strong>Download paint-graph.sh</strong> above. <br />
            2. Open a terminal and run <code className="text-emerald-300 bg-black/40 px-1.5 py-0.5 rounded">bash paint-graph.sh</code>. <br />
            3. Push the generated repository to your GitHub account to light up your 52-week contribution graph with your custom pixel art!
          </p>
        </div>
      </div>
    </div>
  );
}
