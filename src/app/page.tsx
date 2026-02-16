'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState, type FormEvent } from 'react';
import type { IconType } from 'react-icons';
import {
  FiActivity,
  FiArrowRight,
  FiBookOpen,
  FiBox,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiExternalLink,
  FiGithub,
  FiGrid,
  FiLayers,
  FiPlay,
  FiRefreshCw,
  FiShield,
  FiSliders,
  FiStar,
  FiTerminal,
  FiUploadCloud,
  FiZap,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ALL_15_TEMPLATES } from '@/lib/template-engine';
import { useProfileStore } from '@/stores/profile-store';

type StudioMode = 'profile' | 'canvas' | 'repo' | 'arcade' | 'widgets';

interface FeatureLauncher {
  id: StudioMode;
  title: string;
  label: string;
  summary: string;
  href: string;
  icon: IconType;
  accent: string;
}

interface PhaseAuditItem {
  phase: string;
  title: string;
  status: 'Operational' | 'Partial' | 'Verified';
  benchmark: string;
  note: string;
}

const DEMO_USER = 'Dev-Nurul08';

const featureLaunchers: FeatureLauncher[] = [
  {
    id: 'profile',
    title: 'Profile README Studio',
    label: 'Profile',
    summary: 'Live markdown, rendered preview, presets, badges, trophies, widgets, and GitHub analytics.',
    href: `/studio?user=${DEMO_USER}&mode=profile`,
    icon: FiSliders,
    accent: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200',
  },
  {
    id: 'canvas',
    title: 'Contribution Art Painter',
    label: 'Art',
    summary: '52x7 grid painter with word stamps and exportable backdated commit script.',
    href: `/studio?user=${DEMO_USER}&mode=canvas`,
    icon: FiGrid,
    accent: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
  },
  {
    id: 'repo',
    title: 'Project README Builder',
    label: 'Repo',
    summary: 'Repository docs generator with feature lists, architecture tree, env tables, and API tables.',
    href: `/studio?user=${DEMO_USER}&mode=repo`,
    icon: FiBox,
    accent: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  },
  {
    id: 'arcade',
    title: 'GitHub Arcade',
    label: 'Arcade',
    summary: 'Playable canvas games for Snake, Brick Breaker, and Pac-Man style commit runs.',
    href: `/studio?user=${DEMO_USER}&mode=arcade`,
    icon: FiPlay,
    accent: 'border-rose-400/40 bg-rose-400/10 text-rose-200',
  },
  {
    id: 'widgets',
    title: 'Dynamic SVG Widgets',
    label: 'Widgets',
    summary: 'Typing SVG, Spotify-style now playing, LeetCode, and blog embed generators.',
    href: `/studio?user=${DEMO_USER}&mode=widgets`,
    icon: FiActivity,
    accent: 'border-indigo-300/40 bg-indigo-300/10 text-indigo-100',
  },
];

const phaseAudit: PhaseAuditItem[] = [
  {
    phase: '01',
    title: 'GitHub Aggregator',
    status: 'Operational',
    benchmark: '/api/user/scan/[username], GraphQL, REST fallback, cache',
    note: 'Core scanner exists with 6-hour in-memory cache; Redis and token rotation are not present.',
  },
  {
    phase: '02',
    title: 'Split Workspace',
    status: 'Verified',
    benchmark: '15 template compile checks pass',
    note: 'Profile studio has controls, editor, preview, and presets; drag-and-drop ordering is not implemented.',
  },
  {
    phase: '03',
    title: 'Typography Engine',
    status: 'Operational',
    benchmark: '/api/svg/header',
    note: 'Server-rendered SVG headers cover cartoon, glitch, terminal, script, and minimal styles.',
  },
  {
    phase: '04',
    title: 'Contribution Painter',
    status: 'Operational',
    benchmark: 'Canvas painter and paint-graph.sh export',
    note: 'The 52x7 painter and bash exporter work; a Node runner export is not present.',
  },
  {
    phase: '05',
    title: 'Arcade Games',
    status: 'Partial',
    benchmark: '/play/[username]/[game]',
    note: 'Canvas games exist; levels are generated locally instead of using fetched contribution matrices.',
  },
  {
    phase: '06',
    title: 'SVG Dividers',
    status: 'Verified',
    benchmark: '/api/svg/divider',
    note: 'Eight separator styles are implemented as server-rendered SVG responses.',
  },
  {
    phase: '07',
    title: 'Badges And Trophies',
    status: 'Operational',
    benchmark: 'Badge registry, picker, trophy controls',
    note: 'Badge and trophy customization exists; the registry is not a full 250-plus item catalog yet.',
  },
  {
    phase: '08',
    title: 'Project README Builder',
    status: 'Operational',
    benchmark: 'compileProjectReadme',
    note: 'Project README generation works from form data; automatic repo parsing/tree-sitter is not implemented.',
  },
  {
    phase: '09',
    title: 'Dynamic Widgets',
    status: 'Partial',
    benchmark: '/api/svg/spotify and widget compilers',
    note: 'Embeddable SVG/widget strings exist; live provider OAuth sync is not implemented.',
  },
  {
    phase: '10',
    title: 'GitHub Deployer',
    status: 'Partial',
    benchmark: '/api/github/deploy',
    note: 'Direct deploy works with PAT/env token; full OAuth flow is not present.',
  },
];

const benchmarkCards = [
  {
    label: 'Build',
    value: 'Next 16 build',
    detail: 'Production routes compile with Turbopack.',
    icon: FiCheckCircle,
  },
  {
    label: 'Templates',
    value: '15 / 15 presets',
    detail: 'README compiler validates every preset.',
    icon: FiLayers,
  },
  {
    label: 'Routes',
    value: '13 app routes',
    detail: 'Studio, arcade, API, and SVG surfaces are present.',
    icon: FiCpu,
  },
];

const statusStyles: Record<PhaseAuditItem['status'], string> = {
  Operational: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
  Partial: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  Verified: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
};

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [activeFeature, setActiveFeature] = useState<StudioMode>('profile');
  const [activeTemplateId, setActiveTemplateId] = useState(ALL_15_TEMPLATES[0]?.id ?? 'beast-mode-neon');
  const { fetchProfile, isLoading } = useProfileStore();

  const activeTemplate = useMemo(
    () => ALL_15_TEMPLATES.find((template) => template.id === activeTemplateId) ?? ALL_15_TEMPLATES[0],
    [activeTemplateId]
  );

  const activeFeatureData = featureLaunchers.find((feature) => feature.id === activeFeature) ?? featureLaunchers[0];

  const routeForMode = (username: string, mode: StudioMode) => {
    if (mode === 'arcade') {
      return `/play/${encodeURIComponent(username)}/snake`;
    }

    return `/studio?user=${encodeURIComponent(username)}&mode=${mode}`;
  };

  const handleScan = async (mode: StudioMode = activeFeature, usernameOverride?: string) => {
    const target = (usernameOverride || inputValue).trim();

    if (!target) {
      toast.error('Enter a GitHub username first.');
      return;
    }

    const toastId = toast.loading(`Scanning @${target}`);

    try {
      const data = await fetchProfile(target);
      const resolvedUsername = data?.profile.username || target;

      toast.success(data ? `Loaded @${resolvedUsername}` : `Opening @${resolvedUsername}`, { id: toastId });
      router.push(routeForMode(resolvedUsername, mode));
    } catch {
      toast.dismiss(toastId);
      router.push(routeForMode(target, mode));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleScan();
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0f14]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
              <FiGithub size={19} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black text-white">SynthetixGit</span>
              <span className="block text-[11px] font-medium text-slate-400">README generator studio</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 text-xs font-semibold text-slate-400 md:flex">
            <a href="#workspace" className="transition-colors hover:text-white">
              Workspace
            </a>
            <a href="#features" className="transition-colors hover:text-white">
              Features
            </a>
            <a href="#benchmarks" className="transition-colors hover:text-white">
              Benchmarks
            </a>
            <a href="#audit" className="transition-colors hover:text-white">
              Phase Audit
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/studio?user=${DEMO_USER}&mode=profile`}
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.08]"
              title="Open studio"
            >
              <FiCode size={16} />
            </Link>
            <a
              href="https://github.com/Dev-Nurul08/SynthetixGit"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.08]"
              title="Open GitHub repository"
            >
              <FiStar size={16} />
            </a>
          </div>
        </div>
      </header>

      <section id="workspace" className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,0.98fr)] lg:items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-md border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
            <FiShield size={14} />
            Next 16 App Router verified locally
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Build a GitHub README, contribution artwork, and repo docs from one studio.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              A modern workspace for profile READMEs, animated SVG blocks, project documentation,
              playable commit games, and direct GitHub deployment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-3xl rounded-lg border border-white/10 bg-[#101720] p-2 shadow-2xl shadow-black/30">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex min-h-12 flex-1 items-center gap-3 rounded-md border border-white/10 bg-[#0b0f14] px-3 focus-within:border-cyan-300">
                <FiGithub size={18} className="shrink-0 text-slate-400" />
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="GitHub username"
                  className="h-full min-w-0 flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-slate-500"
                />
              </label>
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-300 px-5 text-sm font-black text-slate-950 transition-colors hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? <FiRefreshCw className="animate-spin" size={16} /> : <FiArrowRight size={17} />}
                Open Generator
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 px-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Quick scan:</span>
              {['Dev-Nurul08', 'torvalds', 'shadcn', 'leerob'].map((username) => (
                <button
                  key={username}
                  type="button"
                  onClick={() => {
                    setInputValue(username);
                    void handleScan(activeFeature, username);
                  }}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  @{username}
                </button>
              ))}
            </div>
          </form>

          <div className="grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featureLaunchers.slice(0, 3).map((feature) => {
              const Icon = feature.icon;

              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => {
                    setActiveFeature(feature.id);
                    if (inputValue.trim()) {
                      void handleScan(feature.id);
                    } else {
                      router.push(feature.href);
                    }
                  }}
                  className="group flex min-h-28 items-start gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 text-left transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border ${feature.accent}`}>
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-black text-white">{feature.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{feature.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#101720] p-3 shadow-2xl shadow-black/40">
          <div className="rounded-md border border-white/10 bg-[#0c1118]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <FiTerminal size={15} className="text-cyan-200" />
                <span>SynthetixGit workspace</span>
              </div>
              <span className={`rounded-md border px-2 py-1 text-[11px] font-bold ${activeFeatureData.accent}`}>
                {activeFeatureData.label}
              </span>
            </div>

            <div className="grid gap-3 p-4 lg:grid-cols-[180px_minmax(0,1fr)]">
              <div className="space-y-2">
                {featureLaunchers.map((feature) => {
                  const Icon = feature.icon;
                  const selected = feature.id === activeFeature;

                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => setActiveFeature(feature.id)}
                      className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-xs font-bold transition-colors ${
                        selected
                          ? 'border-cyan-300/40 bg-cyan-300/10 text-cyan-100'
                          : 'border-white/10 bg-white/[0.025] text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon size={14} />
                      {feature.label}
                    </button>
                  );
                })}
              </div>

              <div className="min-h-[380px] rounded-md border border-white/10 bg-[#0b0f14] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-cyan-200">{activeFeatureData.label} surface</p>
                    <h2 className="mt-1 text-2xl font-black text-white">{activeFeatureData.title}</h2>
                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">{activeFeatureData.summary}</p>
                  </div>
                  <Link
                    href={activeFeatureData.href}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-slate-200 transition-colors hover:bg-white/[0.08]"
                    title={`Open ${activeFeatureData.title}`}
                  >
                    <FiExternalLink size={15} />
                  </Link>
                </div>

                {activeFeature === 'canvas' ? <ContributionGraphPreview /> : <ReadmePreviewPanel />}

                <div className="mt-5 grid gap-2 sm:grid-cols-3">
                  {benchmarkCards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="rounded-md border border-white/10 bg-white/[0.025] p-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                          <Icon size={14} className="text-emerald-200" />
                          {item.label}
                        </div>
                        <p className="mt-2 text-sm font-black text-white">{item.value}</p>
                        <p className="mt-1 text-[11px] leading-4 text-slate-500">{item.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-white/10 bg-[#0f151d]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase text-amber-200">Independent generators</p>
              <h2 className="mt-2 text-3xl font-black text-white">Navigation built around the real tools</h2>
            </div>
            <Link
              href={`/studio?user=${DEMO_USER}&mode=profile`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-white/[0.09]"
            >
              Open full studio
              <FiArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {featureLaunchers.map((feature) => {
              const Icon = feature.icon;

              return (
                <Link
                  key={feature.id}
                  href={feature.href}
                  className="group rounded-lg border border-white/10 bg-[#0b0f14] p-4 transition-colors hover:border-white/20 hover:bg-[#111a23]"
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-md border ${feature.accent}`}>
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-4 text-base font-black text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{feature.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cyan-200">
                    Launch
                    <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="benchmarks" className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-bold uppercase text-emerald-200">Benchmarks</p>
          <h2 className="mt-2 text-3xl font-black text-white">Checks now match the roadmap surface.</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            The project has a production build gate, an ESLint gate, and a local verification command for
            the 15 README templates.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {benchmarkCards.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="rounded-lg border border-white/10 bg-[#101720] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-500">{item.label}</span>
                  <Icon size={17} className="text-emerald-200" />
                </div>
                <p className="mt-4 text-xl font-black text-white">{item.value}</p>
                <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="presets" className="border-y border-white/10 bg-[#101720]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
            <div>
              <p className="text-xs font-bold uppercase text-cyan-200">Preset engine</p>
              <h2 className="mt-2 text-3xl font-black text-white">Fifteen README styles, one compiler.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Pick a preset and open it directly in the profile workspace for the demo account.
              </p>

              {activeTemplate && (
                <Link
                  href={`/studio?user=${DEMO_USER}&mode=profile&template=${activeTemplate.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-md bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 transition-colors hover:bg-cyan-200"
                >
                  Open {activeTemplate.name}
                  <FiArrowRight size={16} />
                </Link>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {ALL_15_TEMPLATES.map((template) => {
                const selected = template.id === activeTemplateId;

                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setActiveTemplateId(template.id)}
                    className={`rounded-lg border p-4 text-left transition-colors ${
                      selected
                        ? 'border-cyan-300/40 bg-cyan-300/10'
                        : 'border-white/10 bg-[#0b0f14] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-bold uppercase text-slate-500">
                      {template.id}
                    </span>
                    <h3 className="mt-2 text-sm font-black text-white">{template.name}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{template.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="audit" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase text-rose-200">Phase audit</p>
            <h2 className="mt-2 text-3xl font-black text-white">What is complete, what is partial, and what is benchmarked.</h2>
          </div>
          <a
            href="https://github.com/Dev-Nurul08/SynthetixGit/blob/main/docs/ARCHITECTURE.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200 transition-colors hover:bg-white/[0.08]"
          >
            Architecture file
            <FiBookOpen size={15} />
          </a>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {phaseAudit.map((item) => (
            <article key={item.phase} className="rounded-lg border border-white/10 bg-[#101720] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-[#0b0f14] font-mono text-sm font-black text-cyan-200">
                    {item.phase}
                  </span>
                  <div>
                    <h3 className="text-sm font-black text-white">{item.title}</h3>
                    <p className="mt-1 text-[11px] font-mono text-slate-500">{item.benchmark}</p>
                  </div>
                </div>
                <span className={`rounded-md border px-2 py-1 text-[11px] font-bold ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#080b10]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6">
          <span>SynthetixGit - Developer profile and README studio</span>
          <span className="flex items-center gap-4">
            <Link href={`/studio?user=${DEMO_USER}&mode=canvas`} className="hover:text-white">
              Contribution art
            </Link>
            <Link href={`/studio?user=${DEMO_USER}&mode=repo`} className="hover:text-white">
              Project README
            </Link>
            <a href="https://github.com/Dev-Nurul08" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              @Dev-Nurul08
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}

function ReadmePreviewPanel() {
  return (
    <div className="mt-6 rounded-md border border-white/10 bg-[#111820]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <FiBookOpen size={14} className="text-cyan-200" />
          README.md
        </span>
        <span className="rounded bg-emerald-300/10 px-2 py-0.5 text-[11px] font-bold text-emerald-200">
          Live preview
        </span>
      </div>
      <div className="space-y-3 p-4">
        <div className="h-8 w-3/4 rounded bg-white/[0.12]" />
        <div className="h-3 w-full rounded bg-white/[0.08]" />
        <div className="h-3 w-5/6 rounded bg-white/[0.08]" />
        <div className="grid gap-2 pt-2 sm:grid-cols-3">
          <div className="h-20 rounded-md border border-cyan-300/20 bg-cyan-300/10" />
          <div className="h-20 rounded-md border border-emerald-300/20 bg-emerald-300/10" />
          <div className="h-20 rounded-md border border-amber-300/20 bg-amber-300/10" />
        </div>
        <div className="grid grid-cols-8 gap-1 pt-2">
          {Array.from({ length: 32 }).map((_, index) => (
            <span
              key={index}
              className={`h-5 rounded ${
                index % 5 === 0
                  ? 'bg-cyan-300/70'
                  : index % 3 === 0
                    ? 'bg-emerald-300/60'
                    : 'bg-white/[0.08]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContributionGraphPreview() {
  return (
    <div className="mt-6 overflow-hidden rounded-md border border-white/10 bg-[#111820] p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300">52 x 7 contribution canvas</span>
        <span className="rounded bg-emerald-300/10 px-2 py-0.5 text-[11px] font-bold text-emerald-200">
          Script export
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="grid min-w-[620px] grid-flow-col grid-rows-7 gap-1">
          {Array.from({ length: 52 }).map((_, column) =>
            Array.from({ length: 7 }).map((__, row) => {
              const active =
                (column > 5 && column < 16 && (row === 1 || row === 5 || column === 6 || column === 15)) ||
                (column > 22 && column < 33 && (row === 0 || row === 3 || row === 6)) ||
                (column > 38 && column < 48 && row === Math.abs((column % 7) - 3));

              return (
                <span
                  key={`${column}-${row}`}
                  className={`h-2.5 w-2.5 rounded-[2px] ${
                    active ? 'bg-emerald-300 shadow-sm shadow-emerald-300/30' : 'bg-white/[0.08]'
                  }`}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
