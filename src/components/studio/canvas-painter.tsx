'use client';

import { useState } from 'react';
import { textToGrid52x7 } from '@/lib/font-matrix';
import { generateBashPainterScript, generatePowerShellPainterScript } from '@/lib/git-painter-generator';
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
  FiCode,
  FiTerminal,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const LEVEL_LABELS = ['Empty (0)', 'Low (2 commits)', 'Medium (5 commits)', 'High (10 commits)', 'Intense (20 commits)'];

interface CanvasPainterProps {
  username?: string;
}

export function CanvasPainter({ username = '' }: CanvasPainterProps) {
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: 52 }, () => Array(7).fill(0))
  );
  const [selectedLevel, setSelectedLevel] = useState<number>(4);
  const [scriptType, setScriptType] = useState<'bash' | 'powershell'>('powershell');
  const [customText, setCustomText] = useState<string>(() => {
    if (!username) return 'HELLO';
    const alphanumeric = username.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8);
    return (alphanumeric.charAt(0).toUpperCase() + alphanumeric.slice(1)) || 'HELLO';
  });
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

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
    const config = {
      username: username || 'octocat',
      userEmail: `${username || 'octocat'}@users.noreply.github.com`,
      repoName: 'github-calendar-art',
      grid,
      targetYear: 2025,
    };

    return scriptType === 'powershell'
      ? generatePowerShellPainterScript(config)
      : generateBashPainterScript(config);
  };

  const handleCopyScript = () => {
    const content = getScriptContent();
    navigator.clipboard.writeText(content);
    setCopiedScript(true);
    toast.success(`Copied ${scriptType === 'powershell' ? 'PowerShell (.ps1)' : 'Bash (.sh)'} script!`);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleDownloadScript = () => {
    const content = getScriptContent();
    const filename = scriptType === 'powershell' ? 'paint-calendar.ps1' : 'paint-calendar.sh';
    const mime = scriptType === 'powershell' ? 'text/plain' : 'application/x-sh';

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}!`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">GitHub Contribution Graph Painter</span>
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
            <span>Draw Pixel Art on @{username || 'octocat'}&apos;s GitHub Timeline</span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            Pixels: <strong className="text-emerald-400">{totalPixels}</strong> / 364
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
            Commits: <strong className="text-blue-400">{estimatedCommits}</strong>
          </div>
        </div>
      </div>

      {/* Controls & Tools Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
        {/* Brush Color Level Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400">Brush Level:</span>
          {LEVEL_COLORS.map((color, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedLevel(idx)}
              title={LEVEL_LABELS[idx]}
              className={`w-6 h-6 rounded-lg transition-transform cursor-pointer border ${
                selectedLevel === idx
                  ? 'scale-125 border-white shadow-lg ring-2 ring-blue-500'
                  : 'border-slate-700 hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Text Generator Tool */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Text (max 8 chars)"
            maxLength={10}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500 w-36 uppercase font-mono"
          />
          <button
            type="button"
            onClick={() => handleApplyText()}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
          >
            <FiType size={13} />
            <span>Paint Text</span>
          </button>
        </div>

        {/* Preset Stamps */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handlePresetStamp('heart')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="Heart Stamp"
          >
            <FiHeart size={13} className="text-rose-400" />
            <span>Heart</span>
          </button>
          <button
            type="button"
            onClick={() => handlePresetStamp('invader')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="Space Invader Stamp"
          >
            <FiZap size={13} className="text-amber-400" />
            <span>Invader</span>
          </button>
          <button
            type="button"
            onClick={() => handlePresetStamp('snake')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="Snake Wave Stamp"
          >
            <span>🐍 Snake</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950/40 border border-slate-800 text-slate-400 hover:text-rose-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            title="Clear Canvas"
          >
            <FiTrash2 size={13} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* 52 x 7 Interactive Contribution Grid */}
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
        <div
          className="inline-grid grid-rows-7 grid-flow-col gap-1 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-inner select-none"
          onMouseDown={() => setIsMouseDown(true)}
          onMouseUp={() => setIsMouseDown(false)}
          onMouseLeave={() => setIsMouseDown(false)}
        >
          {grid.map((col, colIdx) =>
            col.map((level, rowIdx) => (
              <div
                key={`${colIdx}-${rowIdx}`}
                onClick={() => handleCellClick(colIdx, rowIdx)}
                onMouseEnter={() => handleCellHover(colIdx, rowIdx)}
                className="w-3.5 h-3.5 rounded-[3px] transition-colors cursor-pointer hover:ring-1 hover:ring-white/50"
                style={{ backgroundColor: LEVEL_COLORS[level] }}
                title={`Week ${colIdx + 1}, Day ${rowIdx + 1}: Level ${level}`}
              />
            ))
          )}
        </div>
      </div>

      {/* Script Generator & Export Options */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FiTerminal className="text-emerald-400" />
            <h3 className="text-xs font-bold text-white">Generated Backdated Commit Painter Script</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScriptType('powershell')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                scriptType === 'powershell'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              PowerShell (.ps1)
            </button>
            <button
              type="button"
              onClick={() => setScriptType('bash')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                scriptType === 'bash'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              Bash (.sh)
            </button>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 leading-relaxed">
          Run this script locally to execute automated backdated commits on your GitHub contribution graph timeline.
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCopyScript}
            className="flex-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/20"
          >
            {copiedScript ? <FiCheck size={14} /> : <FiCopy size={14} />}
            <span>Copy {scriptType === 'powershell' ? 'PowerShell' : 'Bash'} Script</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadScript}
            className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            <FiDownload size={14} />
            <span>Download .{scriptType === 'powershell' ? 'ps1' : 'sh'} File</span>
          </button>
        </div>
      </div>
    </div>
  );
}
