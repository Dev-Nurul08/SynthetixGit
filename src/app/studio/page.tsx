'use client';

/* eslint-disable @next/next/no-img-element */

import { Suspense, useEffect, useMemo, useState, type FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { IconType } from 'react-icons';
import {
  FiActivity,
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiBox,
  FiCheck,
  FiCode,
  FiColumns,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiEye,
  FiGithub,
  FiGrid,
  FiLayers,
  FiPlay,
  FiRefreshCw,
  FiShield,
  FiSliders,
  FiTerminal,
  FiUploadCloud,
  FiZap,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
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
  ALL_15_TEMPLATES,
  type TemplateId,
} from '@/lib/template-engine';
import {
  compileBlogSyncWidget,
  compileLeetCodeWidget,
  compileSpotifyWidget,
  compileTypingSvg,
} from '@/lib/dynamic-widgets-engine';
import { useEditorStore } from '@/stores/editor-store';
import { useProfileStore } from '@/stores/profile-store';

type StudioMainMode = 'profile' | 'canvas' | 'repo' | 'arcade' | 'widgets';
type ViewMode = 'code' | 'preview' | 'split';
type MobileTab = 'controls' | 'editor' | 'preview';

interface ModeOption {
  id: StudioMainMode;
  label: string;
  title: string;
  description: string;
  icon: IconType;
  accent: string;
}

interface WidgetCard {
  title: string;
  description: string;
  previewUrl: string;
  markdown: string;
  accent: string;
}

const DEMO_USER = 'Dev-Nurul08';
const validModes: StudioMainMode[] = ['profile', 'canvas', 'repo', 'arcade', 'widgets'];
const validTemplateIds = new Set(ALL_15_TEMPLATES.map((template) => template.id));

const modeOptions: ModeOption[] = [
  {
    id: 'profile',
    label: 'Profile',
    title: 'Profile README Studio',
    description: 'Presets, modules, badges, trophies, widgets, source markdown, and GitHub-rendered preview.',
    icon: FiSliders,
    accent: 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100',
  },
  {
    id: 'canvas',
    label: 'Art',
    title: 'Contribution Art Painter',
    description: 'Draw a 52x7 GitHub calendar and export a reproducible painting script.',
    icon: FiGrid,
    accent: 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100',
  },
  {
    id: 'repo',
    label: 'Repo',
    title: 'Project README Builder',
    description: 'Generate project docs with feature lists, architecture, setup, environment, and API tables.',
    icon: FiBox,
    accent: 'border-amber-300/40 bg-amber-300/10 text-amber-100',
  },
  {
    id: 'arcade',
    label: 'Arcade',
    title: 'GitHub Arcade Launcher',
    description: 'Open playable canvas games for contribution Snake, Brick Breaker, and Pac-Man style runs.',
    icon: FiPlay,
    accent: 'border-rose-300/40 bg-rose-300/10 text-rose-100',
  },
  {
    id: 'widgets',
    label: 'Widgets',
    title: 'Dynamic SVG Widgets',
    description: 'Build embeddable typing, now playing, LeetCode, and blog-sync markdown blocks.',
    icon: FiActivity,
    accent: 'border-indigo-300/40 bg-indigo-300/10 text-indigo-100',
  },
];

function parseMode(value: string | null): StudioMainMode {
  return validModes.includes(value as StudioMainMode) ? (value as StudioMainMode) : 'profile';
}

function getTemplateId(value: string | null): TemplateId | null {
  return value && validTemplateIds.has(value as TemplateId) ? (value as TemplateId) : null;
}

function StudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userParam = searchParams.get('user') || searchParams.get('username') || '';
  const studioMode = parseMode(searchParams.get('mode'));
  const templateParam = getTemplateId(searchParams.get('template'));

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

  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [mobileTab, setMobileTab] = useState<MobileTab>('controls');
  const [copied, setCopied] = useState(false);
  const [scanInput, setScanInput] = useState(userParam || username || DEMO_USER);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [projectConfig, setProjectConfig] = useState(defaultProjectConfig);

  const activeUser = profileData?.profile?.username || username || userParam || DEMO_USER;
  const activeMode = modeOptions.find((mode) => mode.id === studioMode) ?? modeOptions[0];
  const ActiveModeIcon = activeMode.icon;

  const widgetCards = useMemo<WidgetCard[]>(
    () => [
      {
        title: 'Typing SVG',
        description: 'Rotating headline lines for profile or project headers.',
        previewUrl: '/api/svg/typing?lines=Full%20Stack%20Developer;Open%20Source%20Builder;README%20Studio&color=22D3EE&background=0B0F14',
        markdown: compileTypingSvg(['Full Stack Developer', 'Open Source Builder', 'README Studio'], 'Orbitron', '22D3EE'),
        accent: 'border-cyan-300/30 bg-cyan-300/10',
      },
      {
        title: 'Now Playing',
        description: 'Animated equalizer SVG for a Spotify-style README block.',
        previewUrl: '/api/svg/spotify?track=Deep%20Focus%20Build&artist=SynthetixGit%20Studio',
        markdown: compileSpotifyWidget('Deep Focus Build', 'SynthetixGit Studio'),
        accent: 'border-emerald-300/30 bg-emerald-300/10',
      },
      {
        title: 'LeetCode Card',
        description: 'Embeddable progress card linked to a coding profile.',
        previewUrl: '/api/svg/header?text=LeetCode%20Progress&subtitle=Daily%20practice&style=minimal&width=600&height=120',
        markdown: compileLeetCodeWidget('Fr_Nurul', 'dark'),
        accent: 'border-amber-300/30 bg-amber-300/10',
      },
      {
        title: 'Blog Sync',
        description: 'Recent article embed block for Dev.to, Medium, or Hashnode style feeds.',
        previewUrl: '/api/svg/header?text=Latest%20Writing&subtitle=Blog%20feed&style=terminal-prompt&width=600&height=120',
        markdown: compileBlogSyncWidget('devto', 'developer'),
        accent: 'border-indigo-300/30 bg-indigo-300/10',
      },
    ],
    []
  );

  const widgetMarkdown = useMemo(
    () => widgetCards.map((widget) => widget.markdown).join('\n\n'),
    [widgetCards]
  );

  useEffect(() => {
    const target = userParam.trim();
    const loadedUser = profileData?.profile.username.toLowerCase();

    if (!target || loadedUser === target.toLowerCase()) {
      return;
    }

    void fetchProfile(target).then((data) => {
      if (data) {
        initializeFromProfile(data);
      }
    });
  }, [fetchProfile, initializeFromProfile, profileData?.profile.username, userParam]);

  useEffect(() => {
    if (!templateParam || templateParam === templateId) {
      return;
    }

    applyTemplatePreset(templateParam, activeUser, profileData);
  }, [activeUser, applyTemplatePreset, profileData, templateId, templateParam]);

  useEffect(() => {
    if (studioMode === 'profile') {
      regenerateMarkdown(activeUser, profileData);
    }
  }, [activeUser, modules, profileData, regenerateMarkdown, studioMode, templateId, theme]);

  const replaceStudioUrl = (nextMode: StudioMainMode, nextUser = activeUser) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', nextMode);
    params.set('user', nextUser);
    router.replace(`/studio?${params.toString()}`, { scroll: false });
  };

  const handleInStudioScan = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const target = scanInput.trim();

    if (!target) {
      toast.error('Enter a GitHub username.');
      return;
    }

    const toastId = toast.loading(`Scanning @${target}`);
    const data = await fetchProfile(target);

    if (data) {
      initializeFromProfile(data);
      toast.success(`Loaded @${data.profile.username}`, { id: toastId });
      replaceStudioUrl(studioMode, data.profile.username);
      return;
    }

    toast.error(`Could not fetch @${target}`, { id: toastId });
  };

  const handleCopy = async (value = markdown, label = 'README Markdown') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied.`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Copy failed.');
    }
  };

  const handleDownload = (value: string, fileName: string, type = 'text/markdown') => {
    const blob = new Blob([value], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${fileName}.`);
  };

  const handleDownloadWorkflow = () => {
    if (!workflowYaml) {
      toast.error('Enable a game workflow before downloading.');
      return;
    }

    handleDownload(workflowYaml, 'snake.yml', 'text/yaml');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0b0f14] text-slate-100 selection:bg-cyan-400 selection:text-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f14]/95 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
              title="Back home"
            >
              <FiArrowLeft size={16} />
            </button>

            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-black text-white">SynthetixGit</p>
              <p className="truncate text-[11px] text-slate-500">{activeMode.title}</p>
            </div>
          </div>

          <form
            onSubmit={handleInStudioScan}
            className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/10 bg-[#101720] px-2 py-1.5 focus-within:border-cyan-300 sm:max-w-md"
          >
            <FiGithub size={14} className="shrink-0 text-slate-500" />
            <input
              value={scanInput}
              onChange={(event) => setScanInput(event.target.value)}
              placeholder={`@${activeUser}`}
              className="min-w-0 flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isLoading || !scanInput.trim()}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-cyan-300 text-slate-950 transition-colors hover:bg-cyan-200 disabled:opacity-40"
              title="Scan profile"
            >
              {isLoading ? <FiRefreshCw className="animate-spin" size={13} /> : <FiArrowRight size={14} />}
            </button>
          </form>

          <div className="flex shrink-0 items-center gap-2">
            {workflowYaml && (
              <button
                type="button"
                onClick={handleDownloadWorkflow}
                className="hidden h-9 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-bold text-slate-200 transition-colors hover:bg-white/[0.08] lg:inline-flex"
              >
                <FiDownload size={14} />
                Workflow
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsDeployModalOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-md border border-cyan-300/30 bg-cyan-300/10 text-cyan-100 transition-colors hover:bg-cyan-300/20 sm:w-auto sm:px-3"
              title="Deploy to GitHub"
            >
              <FiUploadCloud size={15} />
              <span className="hidden text-xs font-bold sm:ml-2 sm:inline">Deploy</span>
            </button>
            <button
              type="button"
              onClick={() => void handleCopy()}
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.08] sm:w-auto sm:px-3"
              title="Copy markdown"
            >
              {copied ? <FiCheck size={15} className="text-emerald-200" /> : <FiCopy size={15} />}
              <span className="hidden text-xs font-bold sm:ml-2 sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              type="button"
              onClick={() => handleDownload(markdown, 'README.md')}
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.08]"
              title="Download README.md"
            >
              <FiDownload size={15} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)] flex-1">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0f151d] p-3 md:block">
          <div className="mb-3 rounded-lg border border-white/10 bg-[#0b0f14] p-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <FiShield size={14} className="text-emerald-200" />
              Verified surfaces
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">
              Profile, art, repo docs, arcade, widgets, and deploy are separated for direct testing.
            </p>
          </div>

          <nav className="space-y-2">
            {modeOptions.map((mode) => {
              const Icon = mode.icon;
              const selected = mode.id === studioMode;

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => replaceStudioUrl(mode.id)}
                  className={`flex w-full items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors ${
                    selected ? mode.accent : 'border-white/10 bg-white/[0.025] text-slate-400 hover:bg-white/[0.055] hover:text-white'
                  }`}
                >
                  <Icon size={17} className="shrink-0" />
                  <span className="min-w-0">
                    <span className="block text-sm font-black">{mode.label}</span>
                    <span className="mt-0.5 block truncate text-[11px] opacity-75">{mode.title}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto p-3 pb-24 sm:p-5 md:pb-5">
          <section className="mb-4 rounded-lg border border-white/10 bg-[#101720] p-4">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex min-w-0 items-start gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-md border ${activeMode.accent}`}>
                  <ActiveModeIcon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase text-slate-500">Workspace for @{activeUser}</p>
                  <h1 className="mt-1 text-2xl font-black text-white">{activeMode.title}</h1>
                  <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-400">{activeMode.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-xs font-bold text-emerald-100">
                  Build ready
                </span>
                <span className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-xs font-bold text-cyan-100">
                  15 presets
                </span>
                <span className="rounded-md border border-amber-300/30 bg-amber-300/10 px-2.5 py-1 text-xs font-bold text-amber-100">
                  Next 16
                </span>
              </div>
            </div>
          </section>

          {studioMode === 'profile' && (
            <ProfileWorkspace
              activeUser={activeUser}
              copied={copied}
              isLoading={isLoading}
              markdown={markdown}
              mobileTab={mobileTab}
              modules={modules}
              profileData={profileData}
              setMobileTab={setMobileTab}
              setViewMode={setViewMode}
              theme={theme}
              templateId={templateId}
              viewMode={viewMode}
              onAddBadge={addBadge}
              onApplyProjectMarkdown={setMarkdown}
              onApplyRolePreset={applyRolePreset}
              onCopy={() => void handleCopy()}
              onRemoveBadge={removeBadge}
              onTemplateChange={(nextTemplate) => applyTemplatePreset(nextTemplate, activeUser, profileData)}
              onThemeChange={setTheme}
              onUpdateMarkdown={setMarkdown}
              onUpdateModule={updateModule}
            />
          )}

          {studioMode === 'canvas' && (
            <div className="mx-auto max-w-7xl">
              <CanvasPainter username={activeUser} />
            </div>
          )}

          {studioMode === 'repo' && (
            <div className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]">
              <aside className="min-w-0 rounded-lg border border-white/10 bg-[#101720] p-3">
                <ProjectReadmeConfigurator
                  config={projectConfig}
                  onChange={setProjectConfig}
                  onApplyMarkdown={setMarkdown}
                />
              </aside>
              <div className="grid min-h-[620px] overflow-hidden rounded-lg border border-white/10 bg-[#0b0f14] lg:grid-cols-2">
                <MarkdownEditor markdown={markdown} onChange={setMarkdown} readOnly={false} />
                <MarkdownPreview markdown={markdown} username={activeUser} />
              </div>
            </div>
          )}

          {studioMode === 'arcade' && <ArcadeLauncher username={activeUser} />}

          {studioMode === 'widgets' && (
            <WidgetWorkspace
              widgets={widgetCards}
              widgetMarkdown={widgetMarkdown}
              onApply={() => setMarkdown(widgetMarkdown)}
              onCopy={(value, label) => void handleCopy(value, label)}
            />
          )}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-white/10 bg-[#0b0f14]/95 p-2 backdrop-blur-md md:hidden">
        {modeOptions.map((mode) => {
          const Icon = mode.icon;
          const selected = mode.id === studioMode;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => replaceStudioUrl(mode.id)}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-md text-[11px] font-bold ${
                selected ? 'bg-cyan-300 text-slate-950' : 'text-slate-400'
              }`}
            >
              <Icon size={16} />
              {mode.label}
            </button>
          );
        })}
      </nav>

      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        username={activeUser}
        markdown={markdown}
        workflowYaml={workflowYaml}
      />
    </div>
  );
}

interface ProfileWorkspaceProps {
  activeUser: string;
  copied: boolean;
  isLoading: boolean;
  markdown: string;
  mobileTab: MobileTab;
  modules: ReturnType<typeof useEditorStore.getState>['modules'];
  profileData: ReturnType<typeof useProfileStore.getState>['profileData'];
  setMobileTab: (tab: MobileTab) => void;
  setViewMode: (mode: ViewMode) => void;
  theme: ReturnType<typeof useEditorStore.getState>['theme'];
  templateId: TemplateId;
  viewMode: ViewMode;
  onAddBadge: (slug: string) => void;
  onApplyProjectMarkdown: (markdown: string) => void;
  onApplyRolePreset: NonNullable<ReturnType<typeof useEditorStore.getState>['applyRolePreset']>;
  onCopy: () => void;
  onRemoveBadge: (slug: string) => void;
  onTemplateChange: (templateId: TemplateId) => void;
  onThemeChange: ReturnType<typeof useEditorStore.getState>['setTheme'];
  onUpdateMarkdown: (markdown: string) => void;
  onUpdateModule: ReturnType<typeof useEditorStore.getState>['updateModule'];
}

function ProfileWorkspace({
  activeUser,
  copied,
  isLoading,
  markdown,
  mobileTab,
  modules,
  profileData,
  setMobileTab,
  setViewMode,
  theme,
  templateId,
  viewMode,
  onAddBadge,
  onApplyProjectMarkdown,
  onApplyRolePreset,
  onCopy,
  onRemoveBadge,
  onTemplateChange,
  onThemeChange,
  onUpdateMarkdown,
  onUpdateModule,
}: ProfileWorkspaceProps) {
  const showDesktopEditor = viewMode === 'code' || viewMode === 'split';
  const showDesktopPreview = viewMode === 'preview' || viewMode === 'split';

  return (
    <div className="grid gap-4 xl:grid-cols-[390px_minmax(0,1fr)]">
      <aside className={`${mobileTab === 'controls' ? 'block' : 'hidden'} xl:block`}>
        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#101720]">
          <div className="border-b border-white/10 p-3">
            {isLoading ? (
              <ProfileSkeleton />
            ) : profileData ? (
              <ProfileHeader data={profileData} />
            ) : (
              <div className="rounded-md border border-white/10 bg-[#0b0f14] p-4">
                <p className="text-sm font-black text-white">@{activeUser}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Profile controls are ready for local generation.</p>
              </div>
            )}
          </div>
          <div className="h-[calc(100vh-17rem)] min-h-[520px]">
            <SidebarControls
              modules={modules}
              theme={theme}
              templateId={templateId}
              onUpdateModule={onUpdateModule}
              onThemeChange={onThemeChange}
              onTemplateChange={onTemplateChange}
              onAddBadge={onAddBadge}
              onRemoveBadge={onRemoveBadge}
              onApplyRolePreset={onApplyRolePreset}
              onApplyProjectMarkdown={onApplyProjectMarkdown}
            />
          </div>
        </div>
      </aside>

      <section className={`${mobileTab === 'controls' ? 'hidden' : 'block'} min-w-0 xl:block`}>
        <div className="flex min-h-[620px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0b0f14] xl:h-[calc(100vh-11rem)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#101720] px-3 py-2">
            <div className="hidden items-center gap-1 rounded-md border border-white/10 bg-[#0b0f14] p-1 xl:flex">
              {[
                { id: 'code' as ViewMode, label: 'Code', icon: FiCode },
                { id: 'split' as ViewMode, label: 'Split', icon: FiColumns },
                { id: 'preview' as ViewMode, label: 'Preview', icon: FiEye },
              ].map((view) => {
                const Icon = view.icon;
                const selected = view.id === viewMode;

                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setViewMode(view.id)}
                    className={`inline-flex h-8 items-center gap-2 rounded-md px-3 text-xs font-bold transition-colors ${
                      selected ? 'bg-cyan-300 text-slate-950' : 'text-slate-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    {view.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 rounded-md border border-white/10 bg-[#0b0f14] p-1 xl:hidden">
              {[
                { id: 'controls' as MobileTab, label: 'Controls', icon: FiSliders },
                { id: 'editor' as MobileTab, label: 'Code', icon: FiCode },
                { id: 'preview' as MobileTab, label: 'Preview', icon: FiEye },
              ].map((tab) => {
                const Icon = tab.icon;
                const selected = tab.id === mobileTab;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setMobileTab(tab.id)}
                    className={`inline-flex h-8 items-center gap-2 rounded-md px-3 text-xs font-bold ${
                      selected ? 'bg-cyan-300 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    <Icon size={13} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onCopy}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 text-xs font-bold text-slate-200 transition-colors hover:bg-white/[0.08]"
            >
              {copied ? <FiCheck size={14} className="text-emerald-200" /> : <FiCopy size={14} />}
              {copied ? 'Copied' : 'Copy README'}
            </button>
          </div>

          <div className="hidden min-h-0 flex-1 xl:flex">
            {showDesktopEditor && (
              <div className={`${viewMode === 'split' ? 'w-1/2 border-r border-white/10' : 'w-full'} min-w-0`}>
                <MarkdownEditor markdown={markdown} onChange={onUpdateMarkdown} readOnly={false} />
              </div>
            )}
            {showDesktopPreview && (
              <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} min-w-0`}>
                <MarkdownPreview markdown={markdown} username={activeUser} />
              </div>
            )}
          </div>

          <div className="min-h-0 flex-1 xl:hidden">
            {mobileTab === 'editor' && <MarkdownEditor markdown={markdown} onChange={onUpdateMarkdown} readOnly={false} />}
            {mobileTab === 'preview' && <MarkdownPreview markdown={markdown} username={activeUser} />}
          </div>
        </div>
      </section>
    </div>
  );
}

function ArcadeLauncher({ username }: { username: string }) {
  const games = [
    {
      id: 'snake',
      title: 'Contribution Snake',
      description: 'A fast canvas snake loop with commit tile scoring.',
      icon: FiZap,
      accent: 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100',
    },
    {
      id: 'brick-breaker',
      title: 'Commit Brick Breaker',
      description: 'Paddle and ball physics against contribution-style bricks.',
      icon: FiGrid,
      accent: 'border-cyan-300/30 bg-cyan-300/10 text-cyan-100',
    },
    {
      id: 'pacman',
      title: 'Pac-Man Commit Run',
      description: 'Continuous dot collection along a commit-history lane.',
      icon: FiActivity,
      accent: 'border-amber-300/30 bg-amber-300/10 text-amber-100',
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-4 md:grid-cols-3">
        {games.map((game) => {
          const Icon = game.icon;

          return (
            <a
              key={game.id}
              href={`/play/${encodeURIComponent(username)}/${game.id}`}
              className="group rounded-lg border border-white/10 bg-[#101720] p-5 transition-colors hover:border-white/20 hover:bg-[#121c25]"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-md border ${game.accent}`}>
                <Icon size={21} />
              </span>
              <h2 className="mt-5 text-lg font-black text-white">{game.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{game.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-200">
                Play for @{username}
                <FiExternalLink size={15} className="transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          );
        })}
      </div>

      <div className="mt-4 rounded-lg border border-white/10 bg-[#101720] p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md border border-rose-300/30 bg-rose-300/10 text-rose-100">
            <FiPlay size={18} />
          </span>
          <div>
            <h3 className="text-sm font-black text-white">Direct game routes</h3>
            <p className="mt-1 text-xs text-slate-500">/play/{username}/snake, /play/{username}/brick-breaker, and /play/{username}/pacman</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WidgetWorkspace({
  widgets,
  widgetMarkdown,
  onApply,
  onCopy,
}: {
  widgets: WidgetCard[];
  widgetMarkdown: string;
  onApply: () => void;
  onCopy: (value: string, label: string) => void;
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
      <div className="grid gap-4 md:grid-cols-2">
        {widgets.map((widget) => (
          <article key={widget.title} className={`rounded-lg border ${widget.accent} p-4`}>
            <div className="overflow-hidden rounded-md border border-white/10 bg-[#0b0f14]">
              <img src={widget.previewUrl} alt={`${widget.title} preview`} className="h-32 w-full object-cover" />
            </div>
            <h2 className="mt-4 text-base font-black text-white">{widget.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">{widget.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onCopy(widget.markdown, widget.title)}
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold text-slate-200 transition-colors hover:bg-white/[0.08]"
              >
                <FiCopy size={14} />
                Copy block
              </button>
              <button
                type="button"
                onClick={onApply}
                className="inline-flex items-center gap-2 rounded-md bg-cyan-300 px-3 py-2 text-xs font-black text-slate-950 transition-colors hover:bg-cyan-200"
              >
                <FiBookOpen size={14} />
                Apply set
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="rounded-lg border border-white/10 bg-[#101720] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase text-slate-500">Combined markdown</p>
            <h2 className="mt-1 text-lg font-black text-white">Widget bundle</h2>
          </div>
          <button
            type="button"
            onClick={() => onCopy(widgetMarkdown, 'Widget bundle')}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.08]"
            title="Copy widget bundle"
          >
            <FiCopy size={15} />
          </button>
        </div>
        <pre className="mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-md border border-white/10 bg-[#0b0f14] p-3 text-xs leading-5 text-slate-300">
          {widgetMarkdown}
        </pre>
      </aside>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-[#0b0f14] text-slate-300">
          <div className="text-center">
            <FiRefreshCw className="mx-auto animate-spin text-cyan-200" size={28} />
            <p className="mt-3 text-xs font-mono text-slate-500">Loading studio</p>
          </div>
        </div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}
