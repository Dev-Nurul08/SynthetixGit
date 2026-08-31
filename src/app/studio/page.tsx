'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProfileStore } from '@/stores/profile-store';
import { useEditorStore } from '@/stores/editor-store';
import { ProfileHeader } from '@/components/studio/profile-header';
import { SidebarControls } from '@/components/studio/sidebar-controls';
import { MarkdownEditor } from '@/components/studio/markdown-editor';
import { MarkdownPreview } from '@/components/studio/markdown-preview';
import { ProfileSkeleton } from '@/components/ui/loading-skeleton';
import { DeployModal } from '@/components/studio/deploy-modal';
import { CanvasPainter } from '@/components/studio/canvas-painter';
import { ProjectReadmeConfigurator } from '@/components/studio/project-readme-configurator';
import { defaultProjectConfig } from '@/lib/project-readme-engine';
import {
  FiCode,
  FiEye,
  FiSliders,
  FiDownload,
  FiArrowLeft,
  FiCopy,
  FiCheck,
  FiGithub,
  FiColumns,
  FiUploadCloud,
  FiZap,
  FiBox,
  FiPlay,
  FiExternalLink,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

type StudioMainMode = 'profile' | 'canvas' | 'repo' | 'arcade';
type ViewMode = 'code' | 'preview' | 'split';
type MobileTab = 'controls' | 'editor' | 'preview';

function StudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userParam = searchParams.get('user') || searchParams.get('username') || '';

  const { profileData, isLoading, username, fetchProfile } = useProfileStore();
  const {
    markdown,
    workflowYaml,
    modules,
    theme,
    templateId,
    setTheme,
    applyTemplatePreset,
    applyRolePreset,
    updateModule,
    setMarkdown,
    addBadge,
    removeBadge,
    regenerateMarkdown,
    initializeFromProfile,
  } = useEditorStore();

  const [studioMode, setStudioMode] = useState<StudioMainMode>('profile');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [mobileTab, setMobileTab] = useState<MobileTab>('controls');
  const [copied, setCopied] = useState(false);
  const [scanInput, setScanInput] = useState('');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  const [projectConfig, setProjectConfig] = useState(defaultProjectConfig);

  // Initial load from URL query
  useEffect(() => {
    if (userParam && userParam !== username) {
      setScanInput(userParam);
      fetchProfile(userParam).then((data) => {
        if (data) initializeFromProfile(data);
      });
    } else if (username && !profileData && !isLoading) {
      fetchProfile(username).then((data) => {
        if (data) initializeFromProfile(data);
      });
    }
  }, [userParam]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeUser = profileData?.profile?.username || username || userParam || 'Dev-Nurul08';

  // Auto regenerate markdown
  useEffect(() => {
    if (activeUser && studioMode === 'profile') {
      regenerateMarkdown(activeUser, profileData);
    }
  }, [modules, theme, templateId, activeUser, profileData, regenerateMarkdown, studioMode]);

  // In-studio scanner
  const handleInStudioScan = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = scanInput.trim();
    if (!target) return;

    const toastId = toast.loading(`Scanning @${target}...`);
    const data = await fetchProfile(target);
    if (data) {
      initializeFromProfile(data);
      toast.success(`Loaded @${data.profile.username}`, { id: toastId });
      router.replace(`/studio?user=${encodeURIComponent(data.profile.username)}`);
    } else {
      toast.error(`Could not fetch @${target}`, { id: toastId });
    }
  };

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

  const handleDownloadReadme = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded README.md');
  };

  const handleDownloadSnake = () => {
    if (!workflowYaml) {
      toast.error('Enable Contribution Snake first');
      return;
    }
    const blob = new Blob([workflowYaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snake.yml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded snake.yml');
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white overflow-hidden">
      {/* ── Studio Top Header ── */}
      <header className="h-16 shrink-0 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 z-30 shadow-md">
        {/* Left: Back + Brand + Scanner */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700/80 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer shrink-0"
            title="Back to Home"
          >
            <FiArrowLeft size={16} />
          </button>

          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <span className="font-extrabold text-sm tracking-tight text-white">
              Synthetix<span className="text-blue-400">Git</span>
            </span>
          </div>

          {/* Quick Scanner */}
          <form onSubmit={handleInStudioScan} className="flex items-center gap-2 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-1.5 focus-within:border-blue-500 transition-all max-w-[200px] sm:max-w-xs">
            <FiGithub size={14} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder={activeUser ? `@${activeUser}` : 'Scan username...'}
              className="bg-transparent text-xs font-mono text-white placeholder-slate-500 outline-none w-full"
            />
            <button
              type="submit"
              disabled={isLoading || !scanInput.trim()}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 disabled:opacity-30 cursor-pointer shrink-0"
            >
              {isLoading ? '...' : 'Scan'}
            </button>
          </form>
        </div>

        {/* Center: Top Studio Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => setStudioMode('profile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studioMode === 'profile'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiZap size={13} className="text-amber-400" />
            <span className="hidden sm:inline">Profile Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode('canvas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studioMode === 'canvas'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span className="text-xs">🎨</span>
            <span className="hidden sm:inline">Contribution Canvas Art</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode('repo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studioMode === 'repo'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiBox size={13} className="text-blue-300" />
            <span className="hidden sm:inline">Repo Mode</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode('arcade')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studioMode === 'arcade'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FiPlay size={13} className="text-pink-400" />
            <span className="hidden sm:inline">Arcade Games</span>
          </button>
        </div>

        {/* Right: Export & Copy Actions */}
        <div className="flex items-center gap-2">
          {studioMode === 'profile' && (
            <div className="hidden lg:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 mr-1">
              <button
                type="button"
                onClick={() => setViewMode('code')}
                className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'code' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
                title="Raw Code"
              >
                <FiCode size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
                title="Split View"
              >
                <FiColumns size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`p-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'preview' ? 'bg-blue-600 text-white' : 'text-slate-400'
                }`}
                title="Live Preview"
              >
                <FiEye size={14} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsDeployModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-lg shadow-blue-600/30"
            title="1-Click Deploy to GitHub Profile"
          >
            <FiUploadCloud size={14} />
            <span className="hidden md:inline">1-Click Deploy</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md shadow-blue-600/25"
          >
            {copied ? <FiCheck size={14} className="text-emerald-300" /> : <FiCopy size={14} />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadReadme}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0"
            title="Download README.md"
          >
            <FiDownload size={14} className="text-blue-400" />
            <span className="hidden sm:inline">.md</span>
          </button>
        </div>
      </header>

      {/* ── Studio Main Viewport By Mode ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* 🌟 1. Profile Studio Mode (15 Presets & Split View) */}
        {studioMode === 'profile' && (
          <>
            {/* Left Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-[380px] lg:w-[420px] shrink-0 bg-slate-900 border-r border-slate-800 overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                {isLoading ? (
                  <ProfileSkeleton />
                ) : profileData ? (
                  <ProfileHeader data={profileData} />
                ) : (
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
                    <p className="text-xs font-bold text-white">Loaded Profile: @{activeUser}</p>
                    <p className="text-[11px] text-slate-400">Customizing Beast Mode and 15 designer presets</p>
                  </div>
                )}
              </div>

              <div className="flex-1 overflow-hidden">
                <SidebarControls
                  modules={modules}
                  theme={theme}
                  templateId={templateId}
                  onUpdateModule={updateModule}
                  onThemeChange={setTheme}
                  onTemplateChange={(t) => applyTemplatePreset(t, activeUser || 'developer', profileData)}
                  onAddBadge={addBadge}
                  onRemoveBadge={removeBadge}
                  onApplyRolePreset={applyRolePreset}
                  onApplyProjectMarkdown={(md: string) => setMarkdown(md)}
                />
              </div>
            </aside>

            {/* Mobile View Switching */}
            <div className="md:hidden flex-1 overflow-hidden">
              {mobileTab === 'controls' && (
                <div className="h-full flex flex-col bg-slate-900">
                  <div className="p-4 border-b border-slate-800">
                    {isLoading ? <ProfileSkeleton /> : profileData ? <ProfileHeader data={profileData} /> : null}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <SidebarControls
                      modules={modules}
                      theme={theme}
                      templateId={templateId}
                      onUpdateModule={updateModule}
                      onThemeChange={setTheme}
                      onTemplateChange={(t) => applyTemplatePreset(t, activeUser || 'developer', profileData)}
                      onAddBadge={addBadge}
                      onRemoveBadge={removeBadge}
                      onApplyRolePreset={applyRolePreset}
                    />
                  </div>
                </div>
              )}

              {mobileTab === 'editor' && (
                <div className="h-full overflow-hidden">
                  <MarkdownEditor markdown={markdown} />
                </div>
              )}

              {mobileTab === 'preview' && (
                <div className="h-full overflow-y-auto">
                  <MarkdownPreview markdown={markdown} username={activeUser} />
                </div>
              )}
            </div>

            {/* Desktop Code / Split / Preview View */}
            <div className="hidden md:flex flex-1 overflow-hidden bg-slate-950">
              {(viewMode === 'code' || viewMode === 'split') && (
                <div className={`h-full overflow-hidden flex flex-col ${viewMode === 'split' ? 'w-1/2 border-r border-slate-800' : 'w-full'}`}>
                  <MarkdownEditor markdown={markdown} />
                </div>
              )}

              {(viewMode === 'preview' || viewMode === 'split') && (
                <div className={`h-full overflow-hidden flex flex-col ${viewMode === 'split' ? 'w-1/2' : 'w-full'}`}>
                  <MarkdownPreview markdown={markdown} username={activeUser} />
                </div>
              )}
            </div>
          </>
        )}

        {/* 🎨 2. Dedicated 52x7 Contribution Canvas Art Studio Mode */}
        {studioMode === 'canvas' && (
          <div className="flex-1 overflow-y-auto p-6 max-w-6xl mx-auto w-full space-y-6">
            <CanvasPainter username={activeUser} />
          </div>
        )}

        {/* 📦 3. Repository Documentation Mode */}
        {studioMode === 'repo' && (
          <div className="flex-1 flex overflow-hidden">
            <aside className="w-[420px] shrink-0 bg-slate-900 border-r border-slate-800 overflow-y-auto p-4">
              <ProjectReadmeConfigurator
                config={projectConfig}
                onChange={setProjectConfig}
                onApplyMarkdown={(md: string) => setMarkdown(md)}
              />
            </aside>
            <div className="flex-1 flex overflow-hidden">
              <div className="w-1/2 h-full border-r border-slate-800 overflow-hidden">
                <MarkdownEditor markdown={markdown} />
              </div>
              <div className="w-1/2 h-full overflow-y-auto">
                <MarkdownPreview markdown={markdown} username={activeUser} />
              </div>
            </div>
          </div>
        )}

        {/* 🕹️ 4. Playable Arcade Games Mode */}
        {studioMode === 'arcade' && (
          <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full space-y-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                <span>🎮 Interactive HTML5 Arcade Games</span>
              </h2>
              <p className="text-sm text-slate-400">
                Play games in your browser powered directly by your real GitHub commit history!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Snake */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-emerald-500 transition-all shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl">
                  🐍
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Contribution Snake</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Classic retro snake eating your commit green food tiles.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/play/${activeUser}/snake`)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-600/25"
                >
                  <span>Play Snake</span>
                  <FiExternalLink size={14} />
                </button>
              </div>

              {/* Brick Breaker */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-blue-500 transition-all shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-2xl">
                  🧱
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Brick Breaker</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Paddle and physics ball bouncing to smash contribution bricks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/play/${activeUser}/brick-breaker`)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-blue-600/25"
                >
                  <span>Play Brick Breaker</span>
                  <FiExternalLink size={14} />
                </button>
              </div>

              {/* Pac-Man */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500 transition-all shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                  👾
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Pac-Man Commit Run</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Chomp commit corridor dots while evading bugs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push(`/play/${activeUser}/pacman`)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-600/25"
                >
                  <span>Play Pac-Man</span>
                  <FiExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deploy Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        username={activeUser || 'developer'}
        markdown={markdown}
        workflowYaml={workflowYaml}
      />
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-slate-950 text-slate-300">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-mono font-medium text-slate-400">Loading Studio...</p>
          </div>
        </div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}
