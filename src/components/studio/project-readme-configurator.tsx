'use client';

import { useState } from 'react';
import { ProjectReadmeConfig, compileProjectReadme } from '@/lib/project-readme-engine';
import { FiBox, FiLayers, FiTerminal, FiPlus, FiTrash2, FiCopy, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ProjectConfiguratorProps {
  config: ProjectReadmeConfig;
  onChange: (config: ProjectReadmeConfig) => void;
  onApplyMarkdown: (markdown: string) => void;
}

export function ProjectReadmeConfigurator({
  config,
  onChange,
  onApplyMarkdown,
}: ProjectConfiguratorProps) {
  const [newFeature, setNewFeature] = useState('');

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    onChange({
      ...config,
      features: [...config.features, newFeature.trim()],
    });
    setNewFeature('');
  };

  const handleRemoveFeature = (idx: number) => {
    onChange({
      ...config,
      features: config.features.filter((_, i) => i !== idx),
    });
  };

  const handleCompileAndApply = () => {
    const md = compileProjectReadme(config);
    onApplyMarkdown(md);
    toast.success('Generated Project README into Live Preview!');
  };

  return (
    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <FiBox className="text-blue-400" size={14} />
            <span>Repository & Project README Architecture</span>
          </h3>
          <p className="text-[11px] text-slate-400">
            Generate production-ready documentation for standalone repos, APIs, and tools.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCompileAndApply}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer shadow-md shadow-blue-600/25 flex items-center gap-1.5"
        >
          <FiLayers size={13} />
          <span>Apply to Editor</span>
        </button>
      </div>

      {/* Project Meta Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-bold text-slate-300 block mb-1">Project Name</label>
          <input
            type="text"
            value={config.projectName}
            onChange={(e) => onChange({ ...config, projectName: e.target.value })}
            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="text-[11px] font-bold text-slate-300 block mb-1">Live Demo URL</label>
          <input
            type="text"
            value={config.demoUrl || ''}
            onChange={(e) => onChange({ ...config, demoUrl: e.target.value })}
            placeholder="https://myproject.vercel.app"
            className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="text-[11px] font-bold text-slate-300 block mb-1">Tagline & Elevator Pitch</label>
        <input
          type="text"
          value={config.tagline}
          onChange={(e) => onChange({ ...config, tagline: e.target.value })}
          className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
        />
      </div>

      {/* Feature Bullet Builder */}
      <div>
        <label className="text-[11px] font-bold text-slate-300 block mb-1.5">Key Highlights & Features</label>
        <div className="space-y-1.5 mb-2">
          {config.features.map((feat, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="truncate pr-2">{feat}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(idx)}
                className="text-slate-500 hover:text-red-400 cursor-pointer shrink-0"
              >
                <FiTrash2 size={13} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddFeature()}
            placeholder="Add new feature e.g. ⚡ Real-Time WebSockets..."
            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer shrink-0"
          >
            Add
          </button>
        </div>
      </div>

      {/* Architecture & Guidelines Toggles */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        <button
          type="button"
          onClick={() => onChange({ ...config, showArchitectureTree: !config.showArchitectureTree })}
          className={`py-2 px-2 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
            config.showArchitectureTree
              ? 'bg-blue-600/20 border-blue-500 text-blue-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          Tree Diagram 🏛️
        </button>

        <button
          type="button"
          onClick={() => onChange({ ...config, showDockerGuide: !config.showDockerGuide })}
          className={`py-2 px-2 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
            config.showDockerGuide
              ? 'bg-blue-600/20 border-blue-500 text-blue-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          Docker Guide 🐳
        </button>

        <button
          type="button"
          onClick={() => onChange({ ...config, showContributing: !config.showContributing })}
          className={`py-2 px-2 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
            config.showContributing
              ? 'bg-blue-600/20 border-blue-500 text-blue-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          Contributing 🤝
        </button>
      </div>
    </div>
  );
}
