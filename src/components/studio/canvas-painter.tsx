'use client';

import { useState, useRef } from 'react';
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
  FiUploadCloud,
  FiRotateCcw,
  FiExternalLink,
  FiKey,
  FiX,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const LEVEL_LABELS = ['Empty (0)', 'Low (2 commits)', 'Medium (5 commits)', 'High (10 commits)', 'Intense (20 commits)'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CanvasPainterProps {
  username?: string;
}

export function CanvasPainter({ username = 'Dev-Nurul08' }: CanvasPainterProps) {
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: 52 }, () => Array(7).fill(0))
  );
  const [history, setHistory] = useState<number[][][]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number>(4);
  const [customText, setCustomText] = useState<string>('NURUL');
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deployedRepoUrl, setDeployedRepoUrl] = useState<string | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [patToken, setPatToken] = useState<string>('');
  const [targetYear, setTargetYear] = useState<number>(2025);

  const containerRef = useRef<HTMLDivElement>(null);

  // Count active cells and estimated commits
  const totalPixels = grid.reduce((acc, col) => acc + col.filter((l) => l > 0).length, 0);
  const commitMultiplier: Record<number, number> = { 0: 0, 1: 2, 2: 5, 3: 10, 4: 20 };
  const estimatedCommits = grid.reduce(
    (acc, col) => acc + col.reduce((sum, l) => sum + (commitMultiplier[l] || 0), 0),
    0
  );

  const pushHistory = (currentGrid: number[][]) => {
    setHistory((prev) => [...prev.slice(-15), currentGrid.map((c) => [...c])]);
  };

  const handleCellClick = (col: number, row: number) => {
    pushHistory(grid);
    setGrid((prev) => {
      const next = prev.map((c) => [...c]);
      next[col][row] = selectedLevel;
      return next;
    });
  };

  const handleCellHover = (col: number, row: number) => {
    if (!isMouseDown) return;
    setGrid((prev) => {
      const next = prev.map((c) => [...c]);
      next[col][row] = selectedLevel;
      return next;
    });
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setGrid(previous);
    toast.success('Undo action');
  };

  const handleApplyText = (textToUse?: string) => {
    const txt = (textToUse || customText).trim();
    if (!txt) return;
    pushHistory(grid);
    const newGrid = textToGrid52x7(txt);
    setGrid(newGrid);
    toast.success(`Painted "${txt.toUpperCase()}" on contribution canvas!`);
  };

  const handleClear = () => {
    pushHistory(grid);
    setGrid(Array.from({ length: 52 }, () => Array(7).fill(0)));
    toast.success('Canvas cleared');
  };

  const handlePresetStamp = (preset: 'heart' | 'invader' | 'smile' | 'snake') => {
    pushHistory(grid);
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
      targetYear,
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

  const handleDeployDirectly = async () => {
    if (totalPixels === 0) {
      toast.error('Draw some pixels on the canvas first!');
      return;
    }

    setIsDeploying(true);
    const toastId = toast.loading('Deploying contribution art to GitHub...');

    try {
      const res = await fetch('/api/github/deploy-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          token: patToken.trim() || undefined,
          grid,
          targetYear,
          repoName: 'github-contribution-art',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to deploy contribution art');
      }

      setDeployedRepoUrl(data.repoUrl);
      toast.success('Contribution art deployed to your GitHub profile repository! 🚀', { id: toastId });
    } catch (err: any) {
      toast.error(err.message || 'Deployment failed. Check your GitHub PAT permissions.', { id: toastId });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="p-5 sm:p-6 rounded-3xl bg-slate-900/95 border border-white/10 space-y-5 shadow-2xl select-none"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {/* Top Header & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <FiZap className="text-emerald-400" size={17} />
              <span>52x7 GitHub Contribution Graph Art Studio</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Draw custom pixel art, write names, and automatically deploy backdated commits to your GitHub calendar.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {history.length > 0 && (
            <button
              type="button"
              onClick={handleUndo}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 border border-white/10"
              title="Undo last change"
            >
              <FiRotateCcw size={13} />
              <span>Undo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyScript}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center gap-1.5 border border-white/10"
          >
            {copiedScript ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
            <span>{copiedScript ? 'Copied!' : 'Copy Script'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportScript}
            className="px-3.5 py-2 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold text-xs transition-all flex items-center gap-2"
          >
            <FiDownload size={14} />
            <span>Download .sh</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDeployModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            <FiUploadCloud size={15} />
            <span>Done: Deploy to GitHub 🚀</span>
          </button>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="p-3 rounded-xl bg-[#0b0f14] border border-white/10">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Total Calendar</span>
          <span className="text-sm font-mono font-bold text-slate-200">52 Wks (364 Days)</span>
        </div>
        <div className="p-3 rounded-xl bg-[#0b0f14] border border-white/10">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Painted Pixels</span>
          <span className="text-sm font-mono font-bold text-emerald-400">{totalPixels} / 364</span>
        </div>
        <div className="p-3 rounded-xl bg-[#0b0f14] border border-white/10">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Commits</span>
          <span className="text-sm font-mono font-bold text-cyan-300">~{estimatedCommits} Commits</span>
        </div>
        <div className="p-3 rounded-xl bg-[#0b0f14] border border-white/10">
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Target Author</span>
          <span className="text-sm font-mono font-bold text-amber-300 truncate block">@{username}</span>
        </div>
      </div>

      {/* Text-to-Pixel Generator & Quick Words */}
      <div className="p-3.5 rounded-2xl bg-[#0b0f14] border border-white/10 space-y-2.5">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#101720] border border-white/10 w-full">
            <FiType size={15} className="text-cyan-400 shrink-0" />
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
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black transition-all cursor-pointer shrink-0 shadow-md shadow-cyan-400/20"
          >
            Auto-Paint Word
          </button>
        </div>

        {/* Quick word pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-bold text-slate-500">Quick Words:</span>
          {['NURUL', 'DEV', 'CODE', 'HI', 'GIT', 'PRO', 'COOL'].map((word) => (
            <button
              key={word}
              type="button"
              onClick={() => {
                setCustomText(word);
                handleApplyText(word);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#101720] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-[11px] font-bold transition-all"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 52x7 Contribution Canvas Grid with Month & Day Labels */}
      <div className="overflow-x-auto p-4 rounded-2xl bg-[#0b0f14] border border-white/10">
        {/* Month Header Labels */}
        <div className="flex min-w-[800px] text-[10px] font-mono text-slate-500 mb-1.5 pl-8 justify-between pr-2">
          {MONTHS.map((m) => (
            <span key={m} className="w-12">{m}</span>
          ))}
        </div>

        <div className="flex min-w-[800px] gap-2">
          {/* Day of Week Labels */}
          <div className="grid grid-rows-7 gap-1 text-[9px] font-mono text-slate-500 shrink-0 select-none pt-0.5">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* 52 Columns x 7 Rows */}
          <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 flex-1">
            {Array.from({ length: 7 }).map((_, r) =>
              Array.from({ length: 52 }).map((_, c) => {
                const level = grid[c]?.[r] || 0;
                return (
                  <div
                    key={`${c}-${r}`}
                    onClick={() => handleCellClick(c, r)}
                    onMouseEnter={() => handleCellHover(c, r)}
                    className="w-3.5 h-3.5 rounded-[2px] transition-all cursor-pointer hover:scale-125 hover:z-10 hover:ring-2 hover:ring-white shadow-xs"
                    style={{ backgroundColor: LEVEL_COLORS[level] }}
                    title={`Week ${c + 1}, ${DAYS[r]} • Level ${level} (${LEVEL_LABELS[level]})`}
                  />
                );
              })
            )}
          </div>
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
                  ? 'border-white bg-[#101720] text-white ring-2 ring-emerald-400'
                  : 'border-white/10 bg-[#0b0f14] text-slate-400'
              }`}
            >
              <span className="w-3 h-3 rounded-[2px] shrink-0" style={{ backgroundColor: col }} />
              <span>{idx === 0 ? 'Clear (0)' : `Lvl ${idx}`}</span>
            </button>
          ))}
        </div>

        {/* Preset Stamps & Clear Action */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => handlePresetStamp('heart')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0b0f14] hover:bg-[#101720] text-slate-300 hover:text-pink-400 border border-white/10 text-xs font-bold transition-all"
          >
            <FiHeart size={14} className="text-pink-400" />
            <span>Heart</span>
          </button>
          <button
            type="button"
            onClick={() => handlePresetStamp('invader')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0b0f14] hover:bg-[#101720] text-slate-300 hover:text-emerald-400 border border-white/10 text-xs font-bold transition-all"
          >
            <FiSmile size={14} className="text-emerald-400" />
            <span>Invader</span>
          </button>
          <button
            type="button"
            onClick={() => handlePresetStamp('snake')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0b0f14] hover:bg-[#101720] text-slate-300 hover:text-cyan-400 border border-white/10 text-xs font-bold transition-all"
          >
            <span className="text-sm">🐍</span>
            <span>Wave</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0b0f14] hover:bg-rose-950/40 text-slate-400 hover:text-rose-400 border border-white/10 text-xs font-bold transition-all"
          >
            <FiTrash2 size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Deploy Art Modal */}
      {isDeployModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101720] border border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <FiUploadCloud size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Deploy Contribution Art to GitHub</h2>
                  <p className="text-[11px] text-slate-400">Creates @{username}/github-contribution-art with backdated commits</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDeployModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.04]"
              >
                <FiX size={18} />
              </button>
            </div>

            {deployedRepoUrl ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
                  <FiCheck size={28} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Contribution Art Successfully Deployed!</h3>
                  <p className="text-xs text-slate-400 mt-1">Your GitHub contribution calendar is now lighting up with your custom pixel art.</p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={deployedRepoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25"
                  >
                    <span>View Repository on GitHub</span>
                    <FiExternalLink size={13} />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeployModalOpen(false);
                      setDeployedRepoUrl(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <FiKey size={13} className="text-amber-400" />
                    <span>GitHub Personal Access Token (PAT)</span>
                  </label>
                  <input
                    type="password"
                    value={patToken}
                    onChange={(e) => setPatToken(e.target.value)}
                    placeholder="ghp_xxxxxxxxxxxx (Optional if configured in .env.local)"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-cyan-400"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Requires <code className="text-slate-400">repo</code> permissions to create repo and push commits.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Target Calendar Year</label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-cyan-400"
                  >
                    <option value={2026}>2026 (Current Year)</option>
                    <option value={2025}>2025 (Previous Year)</option>
                    <option value={2024}>2024</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-[#0b0f14] border border-white/10 space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Target Repository:</span>
                    <span className="font-mono text-cyan-300 font-bold">github.com/{username}/github-contribution-art</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Painted Pixels:</span>
                    <span className="font-mono text-emerald-400 font-bold">{totalPixels} cells</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDeployModalOpen(false)}
                    disabled={isDeploying}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleDeployDirectly}
                    disabled={isDeploying}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25 disabled:opacity-50 cursor-pointer"
                  >
                    {isDeploying ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                        <span>Deploying Pixels...</span>
                      </>
                    ) : (
                      <>
                        <FiUploadCloud size={14} />
                        <span>Confirm & Deploy 🚀</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
