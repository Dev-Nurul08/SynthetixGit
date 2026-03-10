"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import type { IconType } from "react-icons";
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
  FiChevronRight,
  FiCommand,
  FiDownload,
  FiCopy,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ALL_15_TEMPLATES } from "@/lib/template-engine";
import { useProfileStore } from "@/stores/profile-store";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import {
  Button,
  Card,
  Input,
  Badge,
  IconTile,
  SectionHeader,
  Tabs,
} from "@/components/ui";

type StudioMode = "profile" | "canvas" | "repo" | "arcade" | "widgets";

interface FeatureLauncher {
  id: StudioMode;
  title: string;
  label: string;
  summary: string;
  href: string;
  icon: IconType;
  tone: "brand" | "emerald" | "amber" | "rose" | "violet";
}

interface PhaseAuditItem {
  phase: string;
  title: string;
  status: "Operational" | "Partial" | "Verified";
  benchmark: string;
  note: string;
}

const DEMO_USER = "octocat";

const featureLaunchers: FeatureLauncher[] = [
  {
    id: "profile",
    title: "Profile README Studio",
    label: "Profile",
    summary:
      "Live markdown editor, rendered preview, 15 presets, 200+ badges, trophy cabinet, widgets, and real-time GitHub analytics.",
    href: `/studio?user=${DEMO_USER}&mode=profile`,
    icon: FiSliders,
    tone: "brand",
  },
  {
    id: "canvas",
    title: "Contribution Art Painter",
    label: "Canvas",
    summary:
      "52 x 7 grid pixel painter with word stamps, palette picker, and exportable backdated commit script generator.",
    href: `/studio?user=${DEMO_USER}&mode=canvas`,
    icon: FiGrid,
    tone: "emerald",
  },
  {
    id: "repo",
    title: "Project README Builder",
    label: "Repo Docs",
    summary:
      "Repository documentation generator with feature lists, architecture tree, environment tables, and API reference tables.",
    href: `/studio?user=${DEMO_USER}&mode=repo`,
    icon: FiBox,
    tone: "amber",
  },
  {
    id: "arcade",
    title: "GitHub Arcade",
    label: "Arcade",
    summary:
      "Playable canvas games: Snake, Brick Breaker, and Pac-Man style commit runs directly mapped from your history.",
    href: `/studio?user=${DEMO_USER}&mode=arcade`,
    icon: FiPlay,
    tone: "rose",
  },
  {
    id: "widgets",
    title: "Dynamic SVG Widgets",
    label: "Widgets",
    summary:
      "Typing SVG headers, Spotify-style now playing, LeetCode progress cards, and blog feed embed generators.",
    href: `/studio?user=${DEMO_USER}&mode=widgets`,
    icon: FiActivity,
    tone: "violet",
  },
];

const phaseAudit: PhaseAuditItem[] = [
  {
    phase: "01",
    title: "GitHub Aggregator",
    status: "Operational",
    benchmark: "/api/user/scan/[username], GraphQL, REST fallback, cache",
    note: "Core scanner ships with 6-hour in-memory cache; Redis layer and token rotation are planned.",
  },
  {
    phase: "02",
    title: "Split Workspace",
    status: "Verified",
    benchmark: "15 template compile checks pass",
    note: "Profile studio ships controls, editor, preview, and presets.",
  },
  {
    phase: "03",
    title: "Typography Engine",
    status: "Operational",
    benchmark: "/api/svg/header",
    note: "Server-rendered SVG headers cover cartoon, glitch, terminal, script, and minimal styles.",
  },
  {
    phase: "04",
    title: "Contribution Painter",
    status: "Operational",
    benchmark: "Canvas painter and paint-graph.sh export",
    note: "The 52 x 7 painter and bash exporter ship; a Node runner export is planned.",
  },
  {
    phase: "05",
    title: "Arcade Games",
    status: "Partial",
    benchmark: "/play/[username]/[game]",
    note: "Canvas games ship; levels are generated locally instead of using fetched contribution matrices.",
  },
  {
    phase: "06",
    title: "SVG Dividers",
    status: "Verified",
    benchmark: "/api/svg/divider",
    note: "Eight separator styles ship as server-rendered SVG responses.",
  },
  {
    phase: "07",
    title: "Badges And Trophies",
    status: "Operational",
    benchmark: "Badge registry, picker, trophy controls",
    note: "Badge and trophy customization ships; registry is growing.",
  },
  {
    phase: "08",
    title: "Project README Builder",
    status: "Operational",
    benchmark: "compileProjectReadme",
    note: "Project README generation works from form data.",
  },
  {
    phase: "09",
    title: "Dynamic Widgets",
    status: "Partial",
    benchmark: "/api/svg/spotify and widget compilers",
    note: "Embeddable SVG/widget strings ship; live provider OAuth sync is planned.",
  },
  {
    phase: "10",
    title: "GitHub Deployer",
    status: "Partial",
    benchmark: "/api/github/deploy",
    note: "Direct deploy works with PAT/env token; full OAuth flow is planned.",
  },
];

const benchmarkCards = [
  {
    label: "Build",
    value: "Next 16",
    detail: "Production routes compile with Turbopack.",
    icon: FiCheckCircle,
    tone: "emerald" as const,
  },
  {
    label: "Templates",
    value: "15 / 15",
    detail: "README compiler validates every preset.",
    icon: FiLayers,
    tone: "brand" as const,
  },
  {
    label: "Routes",
    value: "13 app routes",
    detail: "Studio, arcade, API, and SVG surfaces ship.",
    icon: FiCpu,
    tone: "violet" as const,
  },
];

const statusTone: Record<PhaseAuditItem["status"], "emerald" | "amber" | "brand"> = {
  Operational: "brand",
  Partial: "amber",
  Verified: "emerald",
};

const container = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

export default function HomePage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [activeFeature, setActiveFeature] = useState<StudioMode>("profile");
  const [activeTemplateId, setActiveTemplateId] = useState(
    ALL_15_TEMPLATES[0]?.id ?? "beast-mode-neon"
  );
  const { fetchProfile, isLoading } = useProfileStore();

  const activeTemplate = useMemo(
    () =>
      ALL_15_TEMPLATES.find((template) => template.id === activeTemplateId) ??
      ALL_15_TEMPLATES[0],
    [activeTemplateId]
  );

  const activeFeatureData =
    featureLaunchers.find((feature) => feature.id === activeFeature) ??
    featureLaunchers[0];

  const routeForMode = (username: string, mode: StudioMode) => {
    if (mode === "arcade") {
      return `/play/${encodeURIComponent(username)}/snake`;
    }
    return `/studio?user=${encodeURIComponent(username)}&mode=${mode}`;
  };

  const handleScan = async (
    mode: StudioMode = activeFeature,
    usernameOverride?: string
  ) => {
    const target = (usernameOverride || inputValue).trim();
    if (!target) {
      toast.error("Enter a GitHub username first.");
      return;
    }
    const toastId = toast.loading(`Scanning @${target}`);
    try {
      const data = await fetchProfile(target);
      const resolvedUsername = data?.profile.username || target;
      toast.success(data ? `Loaded @${resolvedUsername}` : `Opening @${resolvedUsername}`, {
        id: toastId,
      });
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

  const quickUsers = ["octocat", "torvalds", "shadcn", "leerob"];

  return (
    <main className="relative overflow-x-hidden text-text-primary">
      <Header />

      <section className="relative isolate overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="absolute inset-0">
          <HeroCanvas />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-bg-canvas opacity-90" />

        <div className={`relative ${container} pt-6`}>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="space-y-7"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border-secondary bg-bg-secondary/70 px-3.5 py-1.5 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-emerald opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-emerald" />
                </span>
                <span className="text-xs font-semibold text-text-secondary">
                  Next 16 · Turbopack · Zero-config studio
                </span>
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-[64px]">
                  Craft a{" "}
                  <span className="text-brand-300">
                    GitHub README
                  </span>
                  <br />
                  that actually stands out.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-text-tertiary sm:text-lg">
                  Profile READMEs, contribution artwork, project docs, dynamic SVG widgets,
                  and playable GitHub arcade — all from one clean, modern studio.
                </p>
              </div>

              <Card className="!p-2 !rounded-2xl shadow-[0_8px_60px_-16px_rgba(0,0,0,0.7)]">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <Input
                      leftIcon={<FiGithub size={18} />}
                      placeholder="Enter your GitHub username"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="!h-12 !rounded-xl !border-0 !bg-transparent !shadow-none focus-within:!ring-0"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isLoading}
                    fullWidth
                    rightIcon={!isLoading ? <FiArrowRight size={18} /> : undefined}
                    disabled={!inputValue.trim()}
                    className="sm:w-auto"
                  >
                    Open Studio
                  </Button>
                </form>

                <div className="flex flex-wrap items-center gap-2 px-2 pb-1 pt-1.5 text-xs text-text-muted">
                  <span className="font-semibold text-text-tertiary">Try one:</span>
                  {quickUsers.map((username) => (
                    <button
                      key={username}
                      type="button"
                      onClick={() => {
                        setInputValue(username);
                        void handleScan(activeFeature, username);
                      }}
                      className="rounded-lg border border-border-primary bg-bg-tertiary/40 px-2.5 py-1 font-mono text-[11px] font-medium text-text-secondary transition-colors hover:border-border-secondary hover:bg-bg-tertiary hover:text-text-primary"
                    >
                      @{username}
                    </button>
                  ))}
                </div>
              </Card>

              <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <IconTile icon={<FiCheckCircle size={14} />} tone="emerald" size="sm" />
                  <span>No install required</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconTile icon={<FiUploadCloud size={14} />} tone="brand" size="sm" />
                  <span>One-click deploy</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconTile icon={<FiDownload size={14} />} tone="violet" size="sm" />
                  <span>Markdown export</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative"
            >
              <WorkspacePreview activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className={`${container}`}>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader
              eyebrow="Workspaces"
              eyebrowTone="brand"
              title="Five surfaces. One studio."
              description="Jump directly into the exact generator you need. Each workspace ships with its own controls, live preview, and deployment hooks."
            />
            <Link href={`/studio?user=${DEMO_USER}&mode=profile`}>
              <Button variant="secondary" size="lg" rightIcon={<FiArrowRight size={16} />}>
                Open full studio
              </Button>
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {featureLaunchers.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link href={feature.href} className="block h-full">
                    <Card hover className="group h-full flex flex-col !p-6">
                      <IconTile icon={<Icon size={22} />} tone={feature.tone} size="lg" />
                      <h3 className="mt-5 text-lg font-black text-text-primary">
                        {feature.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-tertiary">
                        {feature.summary}
                      </p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-300">
                        <span>Launch workspace</span>
                        <FiChevronRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 bg-bg-secondary/30 border-y border-border-primary">
        <div className={`${container}`}>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <SectionHeader
              eyebrow="Benchmarks"
              eyebrowTone="emerald"
              title="Built for real pipelines."
              description="The project ships with a production build gate, ESLint gate, and a local verification command that validates every single README template before deploy."
            >
              <Link href={`/studio?user=${DEMO_USER}&mode=profile`} className="mt-4">
                <Button variant="primary" size="lg" rightIcon={<FiArrowRight size={16} />}>
                  Start generating
                </Button>
              </Link>
            </SectionHeader>

            <div className="grid gap-4 sm:grid-cols-3">
              {benchmarkCards.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Card glow className="!p-6 h-full">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                          {item.label}
                        </span>
                        <IconTile icon={<Icon size={18} />} tone={item.tone} size="md" />
                      </div>
                      <p className="mt-5 text-2xl font-black text-text-primary">{item.value}</p>
                      <p className="mt-2 text-xs leading-relaxed text-text-tertiary">
                        {item.detail}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28">
        <div className={`${container}`}>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow="Preset Engine"
                eyebrowTone="violet"
                title="15 README styles. One compiler."
                description="Pick from a growing collection of hand-tuned presets — each one compiles into clean, GitHub-optimized markdown. Launch any preset directly into the profile workspace."
              />
              {activeTemplate && (
                <Link
                  href={`/studio?user=${DEMO_USER}&mode=profile&template=${activeTemplate.id}`}
                  className="mt-6 inline-block"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<FiArrowRight size={16} />}
                  >
                    Open {activeTemplate.name}
                  </Button>
                </Link>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {ALL_15_TEMPLATES.map((template, idx) => {
                const selected = template.id === activeTemplateId;
                return (
                  <motion.button
                    key={template.id}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: (idx % 6) * 0.05 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ y: 0, scale: 0.99 }}
                    onClick={() => setActiveTemplateId(template.id)}
                    className={[
                      "relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-200",
                      selected
                        ? "border-brand-400/40 bg-brand-500/8 shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_8px_40px_-12px_rgba(34,211,238,0.35)]"
                        : "border-border-primary bg-bg-secondary/60 hover:border-border-secondary hover:bg-bg-tertiary/60",
                    ].join(" ")}
                  >
                    {selected && (
                      <span className="absolute right-3 top-3 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                        Active
                      </span>
                    )}
                    <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {template.id}
                    </span>
                    <h3 className="mt-2 text-sm font-black text-text-primary">
                      {template.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-text-tertiary line-clamp-3">
                      {template.desc}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-28 bg-bg-secondary/30 border-y border-border-primary">
        <div className={`${container}`}>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeader
              eyebrow="Phase Audit"
              eyebrowTone="rose"
              title="What ships, what's partial, what's verified."
              description="Ten tracked surfaces from the roadmap — every feature is benchmarked against an explicit entrypoint you can test right now."
            />
            <a
              href="https://github.com/Dev-Nurul08/SynthetixGit/blob/main/docs/ARCHITECTURE.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" rightIcon={<FiExternalLink size={15} />}>
                Architecture file
              </Button>
            </a>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {phaseAudit.map((item, idx) => (
              <motion.article
                key={item.phase}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (idx % 6) * 0.06 }}
              >
                <Card className="!p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border-secondary bg-bg-tertiary font-mono text-sm font-black text-brand-300">
                        {item.phase}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-black text-text-primary">{item.title}</h3>
                        <p className="mt-1 break-all font-mono text-[11px] text-text-muted">
                          {item.benchmark}
                        </p>
                      </div>
                    </div>
                    <Badge tone={statusTone[item.status]} dot>
                      {item.status}
                    </Badge>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-text-tertiary">
                    {item.note}
                  </p>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Header() {
  const navLinks = [
    { href: "#workspaces", label: "Workspaces" },
    { href: "#benchmarks", label: "Benchmarks" },
    { href: "#presets", label: "Presets" },
    { href: "#audit", label: "Audit" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mt-4 mx-3 sm:mx-auto sm:max-w-7xl sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4 rounded-2xl border border-border-primary/70 bg-bg-primary/70 px-3 backdrop-blur-xl shadow-[0_4px_40px_-12px_rgba(0,0,0,0.6)] sm:px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3 pl-1">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-brand-400/30 bg-brand-500/10 text-brand-200 shadow-[0_0_24px_-8px_rgba(34,211,238,0.5)]">
              <FiGithub size={18} />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-sm font-black leading-tight text-text-primary">
                SynthetixGit
              </span>
              <span className="block text-[10px] font-medium leading-tight text-text-muted">
                README & profile studio
              </span>
            </span>
            <span className="block text-sm font-black leading-tight text-text-primary sm:hidden">
              S<span className="text-brand-400">G</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-text-tertiary transition-colors hover:bg-white/[0.04] hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href={`/studio?user=${DEMO_USER}&mode=profile`}
              className="hidden grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border-primary bg-bg-tertiary/60 text-text-secondary transition-colors hover:border-border-secondary hover:bg-bg-tertiary hover:text-text-primary sm:grid"
              title="Open studio"
            >
              <FiCode size={15} />
            </Link>
            <a
              href="https://github.com/Dev-Nurul08/SynthetixGit"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border-primary bg-bg-tertiary/60 text-text-secondary transition-colors hover:border-border-secondary hover:bg-bg-tertiary hover:text-text-primary"
              title="GitHub"
            >
              <FiStar size={15} />
            </a>
            <Link href={`/studio?user=${DEMO_USER}&mode=profile`}>
              <Button variant="primary" size="sm" rightIcon={<FiArrowRight size={14} />}>
                <span className="hidden sm:inline">Launch</span>
                <FiCommand size={14} className="sm:hidden" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border-primary bg-bg-primary/60">
      <div className={`${container} py-10`}>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand-400/30 bg-brand-500/10 text-brand-200">
                <FiGithub size={20} />
              </span>
              <div>
                <p className="text-sm font-black text-text-primary">SynthetixGit</p>
                <p className="text-[11px] text-text-muted">
                  Developer profile & README studio
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-text-tertiary">
              Build stunning profile READMEs, contribution art, project docs, and dynamic
              widgets without touching an editor tab.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <FooterCol
              title="Studio"
              links={[
                { label: "Profile README", href: `/studio?user=${DEMO_USER}&mode=profile` },
                { label: "Contribution Art", href: `/studio?user=${DEMO_USER}&mode=canvas` },
                { label: "Project README", href: `/studio?user=${DEMO_USER}&mode=repo` },
                { label: "Arcade Games", href: `/studio?user=${DEMO_USER}&mode=arcade` },
              ]}
            />
            <FooterCol
              title="Tools"
              links={[
                { label: "SVG Widgets", href: `/studio?user=${DEMO_USER}&mode=widgets` },
                { label: "Badge Picker", href: `/studio?user=${DEMO_USER}&mode=profile` },
                { label: "Deploy", href: `/studio?user=${DEMO_USER}&mode=profile` },
                { label: "Templates", href: "#presets" },
              ]}
            />
            <FooterCol
              title="Resources"
              links={[
                { label: "Architecture", href: "https://github.com/Dev-Nurul08/SynthetixGit/blob/main/docs/ARCHITECTURE.md" },
                { label: "GitHub", href: "https://github.com/Dev-Nurul08/SynthetixGit" },
                { label: "Author", href: "https://github.com/Dev-Nurul08" },
                { label: "Changelog", href: "#audit" },
              ]}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border-primary pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} SynthetixGit — crafted for builders.</span>
          <span className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <FiShield size={12} className="text-accent-emerald" /> End-to-end type-safe
            </span>
            <span className="inline-flex items-center gap-2">
              <FiTerminal size={12} className="text-brand-300" /> Next 16 App Router
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-sm text-text-tertiary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkspacePreview({
  activeFeature,
  setActiveFeature,
}: {
  activeFeature: StudioMode;
  setActiveFeature: (m: StudioMode) => void;
}) {
  const active =
    featureLaunchers.find((f) => f.id === activeFeature) ?? featureLaunchers[0];
  const ActiveIcon = active.icon;
  return (
    <Card className="!p-0 overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between border-b border-border-primary bg-bg-tertiary/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-rose/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-amber/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald/70" />
          </span>
          <span className="ml-3 text-xs font-bold text-text-secondary">
            synthetix.app/studio
          </span>
        </div>
        <Badge tone={active.tone}>{active.label}</Badge>
      </div>

      <div className="grid gap-0 lg:grid-cols-[180px_minmax(0,1fr)]">
        <div className="border-b border-border-primary bg-bg-secondary/40 p-3 lg:border-b-0 lg:border-r lg:border-border-primary">
          <div className="flex gap-1 lg:flex-col">
            {featureLaunchers.map((feature) => {
              const Icon = feature.icon;
              const selected = feature.id === activeFeature;
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setActiveFeature(feature.id)}
                  className={[
                    "flex flex-1 items-center gap-2 rounded-xl border px-2.5 py-2 text-left text-xs font-bold transition-all duration-200 lg:w-full",
                    selected
                      ? "border-brand-400/30 bg-brand-500/10 text-brand-200 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]"
                      : "border-transparent bg-transparent text-text-muted hover:bg-white/[0.04] hover:text-text-secondary",
                  ].join(" ")}
                >
                  <Icon size={14} />
                  <span className="hidden xl:inline">{feature.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <IconTile icon={<ActiveIcon size={16} />} tone={active.tone} size="sm" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  {active.label} Surface
                </p>
              </div>
              <h2 className="mt-2 text-xl font-black text-text-primary">{active.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-text-tertiary line-clamp-2">
                {active.summary}
              </p>
            </div>
            <Link
              href={active.href}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border-primary bg-bg-tertiary/60 text-text-secondary transition-colors hover:border-border-secondary hover:bg-bg-tertiary hover:text-text-primary"
              title={`Open ${active.title}`}
            >
              <FiExternalLink size={14} />
            </Link>
          </div>

          <div className="mt-4">
            {activeFeature === "canvas" ? (
              <ContributionGraphPreview />
            ) : (
              <ReadmePreviewPanel />
            )}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {benchmarkCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-border-primary bg-bg-tertiary/40 p-3"
                >
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-tertiary">
                    <Icon size={12} /> {item.label}
                  </div>
                  <p className="mt-1.5 text-xs font-black text-text-primary">{item.value}</p>
                  <p className="mt-1 text-[10px] leading-relaxed text-text-muted line-clamp-2">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

function ReadmePreviewPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border-primary bg-bg-tertiary/40">
      <div className="flex items-center justify-between border-b border-border-primary px-3 py-2">
        <span className="flex items-center gap-2 text-[11px] font-bold text-text-secondary">
          <FiBookOpen size={13} className="text-brand-300" /> README.md
        </span>
        <span className="rounded-md bg-accent-emerald-soft px-2 py-0.5 text-[10px] font-bold text-accent-emerald">
          Live preview
        </span>
      </div>
      <div className="space-y-2.5 p-4">
        <div className="h-7 w-3/4 rounded-md bg-white/[0.08] shimmer" />
        <div className="h-2 w-full rounded bg-white/[0.07]" />
        <div className="h-2 w-5/6 rounded bg-white/[0.05]" />
        <div className="grid gap-2 pt-2 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 rounded-lg border border-border-primary bg-white/[0.04] shimmer"
            />
          ))}
        </div>
        <div className="grid grid-cols-10 gap-1 pt-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <span
              key={i}
              className={[
                "h-4 rounded-sm",
                i % 5 === 0
                  ? "bg-white/[0.08]"
                  : i % 3 === 0
                    ? "bg-white/[0.06]"
                    : "bg-white/[0.04]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ContributionGraphPreview() {
  return (
    <div className="overflow-hidden rounded-xl border border-border-primary bg-bg-tertiary/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-bold text-text-secondary">
          52 × 7 Contribution Canvas
        </span>
        <span className="rounded-md bg-accent-emerald-soft px-2 py-0.5 text-[10px] font-bold text-accent-emerald">
          Script export
        </span>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <div className="grid min-w-[580px] grid-flow-col grid-rows-7 gap-[3px]">
          {Array.from({ length: 52 }).map((_, col) =>
            Array.from({ length: 7 }).map((__, row) => {
              const active =
                (col > 5 && col < 16 && (row === 1 || row === 5 || col === 6 || col === 15)) ||
                (col > 22 && col < 33 && (row === 0 || row === 3 || row === 6)) ||
                (col > 38 && col < 48 && row === Math.abs((col % 7) - 3));
              return (
                <span
                  key={`${col}-${row}`}
                  className={[
                    "h-2.5 w-2.5 rounded-[2px]",
                    active
                      ? "bg-accent-emerald shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                      : "bg-white/[0.05]",
                  ].join(" ")}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
