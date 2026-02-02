'use client';

import { useState } from 'react';
import { textToGrid52x7 } from '@/lib/font-matrix';
import { generateBashPainterScript } from '@/lib/git-painter-generator';
import { FiDownload, FiTrash2, FiType, FiHeart, FiSmile, FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';

const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

interface CanvasPainterProps {
  username?: string;
}

export function CanvasPainter({ username = 'Dev-Nurul08' }: CanvasPainterProps) {
  const [grid, setGrid] = useState<number[][]>(() =>
    Array.from({ length: 52 }, () => Array(7).fill(0))
  );
  const [selectedLevel, setSelectedLevel] = useState<number>(4);
  const [customText, setCustomText] = useState<string>('DEV');
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

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

  const handleApplyText = () => {
    if (!customText.trim()) return;
    const newGrid = textToGrid52x7(customText.trim());
    setGrid(newGrid);
    toast.success(`Rendered "${customText.toUpperCase()}" on 52x7 canvas!`);
  };

  const handleClear = () => {
    setGrid(Array.from({ length: 52 }, () => Array(7).fill(0)));
    toast.success('Canvas cleared');
  };

  const handlePresetStamp = (preset: 'heart' | 'invader' | 'smile') => {
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
    }
    setGrid(next);
    toast.success(`Applied ${preset} stamp!`);
  };

  const handleExportScript = () => {
    const script = generateBashPainterScript({
      username,
      userEmail: 'shaikhnurul8200@gmail.com',
      repoName: 'github-contribution-art',
      grid,
    });
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

  return (
    <div
      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 select-none"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <FiZap className="text-emerald-400" size={14} />
            <span>Interactive 52x7 Commit Canvas Painter</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            Draw custom pixel art or generate words to paint onto your real GitHub contribution graph.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportScript}
          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/20"
        >
          <FiDownload size={13} />
          <span>Export .sh Script</span>
        </button>
      </div>

      {/* Text-to-Pixel Generator */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
        <FiType size={14} className="text-slate-400 shrink-0 ml-1" />
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Type text e.g. NURUL"
          className="bg-transparent text-xs font-bold text-white outline-none w-full uppercase"
          maxLength={8}
        />
        <button
          type="button"
          onClick={handleApplyText}
          className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
        >
          Paint Text
        </button>
      </div>

      {/* Canvas Grid */}
      <div className="overflow-x-auto p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1 min-w-[700px]">
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 52 }).map((_, c) => {
              const level = grid[c]?.[r] || 0;
              return (
                <div
                  key={`${c}-${r}`}
                  onClick={() => handleCellClick(c, r)}
                  onMouseEnter={() => handleCellHover(c, r)}
                  className="w-3 h-3 rounded-xs transition-colors cursor-pointer hover:ring-1 hover:ring-white"
                  style={{ backgroundColor: LEVEL_COLORS[level] }}
                  title={`Week ${c + 1}, Day ${r + 1} (Level ${level})`}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Controls & Palette */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
        {/* Color Levels */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-slate-400 mr-1">Intensity:</span>
          {LEVEL_COLORS.map((col, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedLevel(idx)}
              className={`w-5 h-5 rounded-md border transition-all cursor-pointer ${
                selectedLevel === idx ? 'border-white ring-2 ring-blue-500' : 'border-slate-700'
              }`}
              style={{ backgroundColor: col }}
              title={`Level ${idx}`}
            />
          ))}
        </div>

        {/* Stamps & Clear */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handlePresetStamp('heart')}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-pink-400 border border-slate-800 text-xs transition-all cursor-pointer"
            title="Heart Stamp"
          >
            <FiHeart size={13} />
          </button>
          <button
            type="button"
            onClick={() => handlePresetStamp('invader')}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 border border-slate-800 text-xs transition-all cursor-pointer"
            title="Space Invader Stamp"
          >
            <FiSmile size={13} />
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 text-xs transition-all cursor-pointer"
            title="Clear Canvas"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
