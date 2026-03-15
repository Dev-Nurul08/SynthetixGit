'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FiSliders,
  FiZap,
  FiCode,
  FiEye,
  FiDownload,
  FiCopy,
  FiGithub,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
  FiPlay,
  FiGrid,
  FiBox,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ReadmeWizard } from '@/components/studio/readme-wizard';
import { DeployModal } from '@/components/studio/deploy-modal';
import { MarkdownPreview } from '@/components/studio/markdown-preview';
import { MarkdownEditor } from '@/components/studio/markdown-editor';
import { useEditorStore } from '@/stores/editor-store';
import { useProfileStore } from '@/stores/profile-store';

function BuilderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUser = searchParams.get('user') || searchParams.get('username') || 'octocat';
  const initialMode = searchParams.get('mode') || 'wizard';

  const [activeTab, setActiveTab] = useState<'wizard' | 'editor' | 'preview'>(
    initialMode === 'editor' ? 'editor' : 'wizard'
  );
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { markdown, setMarkdown, workflowYaml, regenerateMarkdown } = useEditorStore();
  const { fetchProfile } = useProfileStore();

  useEffect(() => {
    if (initialUser) {
      void fetchProfile(initialUser);
    }
  }, [initialUser, fetchProfile]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('README Markdown copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('README.md downloaded!');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Header Navigation */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <FiArrowLeft size={16} />
            <span>Forge Home</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block" />
          <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-2">
            <span>GitHub Profile Forge Builder</span>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-mono uppercase">
              @{initialUser}
            </span>
          </h1>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('wizard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'wizard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiZap size={13} />
            <span>Guided Wizard</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'editor' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiCode size={13} />
            <span>Raw Markdown</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'preview' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiEye size={13} />
            <span>Live Preview</span>
          </button>
        </div>

        {/* Quick Action Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <FiCheck size={13} className="text-emerald-400" /> : <FiCopy size={13} />}
            <span className="hidden sm:inline">Copy</span>
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FiDownload size={13} />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            type="button"
            onClick={() => setIsDeployOpen(true)}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            <FiGithub size={14} />
            <span>Deploy README</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'wizard' && (
          <ReadmeWizard
            username={initialUser}
            onComplete={() => setActiveTab('preview')}
            onOpenDeployModal={() => setIsDeployOpen(true)}
          />
        )}

        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[650px]">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FiCode className="text-blue-400" />
                  <span>Markdown Source</span>
                </span>
              </div>
              <div className="flex-1">
                <MarkdownEditor markdown={markdown} onChange={setMarkdown} readOnly={false} />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FiEye className="text-emerald-400" />
                  <span>Live Render Preview</span>
                </span>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[600px] p-2 bg-slate-950 rounded-2xl border border-slate-800">
                <MarkdownPreview markdown={markdown} username={initialUser} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FiEye className="text-emerald-400" />
                <span>Full Profile README Preview (@{initialUser})</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FiDownload size={13} />
                  <span>Download README.md</span>
                </button>
              </div>
            </div>
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 min-h-[500px]">
              <MarkdownPreview markdown={markdown} username={initialUser} />
            </div>
          </div>
        )}
      </main>

      {/* 1-Click Deploy & Export Dialog */}
      <DeployModal
        isOpen={isDeployOpen}
        onClose={() => setIsDeployOpen(false)}
        username={initialUser}
        markdown={markdown}
        workflowYaml={workflowYaml}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Forge Builder...</div>}>
      <BuilderContent />
    </Suspense>
  );
}
