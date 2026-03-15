"use client";

/* eslint-disable @next/next/no-img-element */

import { Suspense, useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { IconType } from "react-icons";
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
  FiMaximize2,
  FiSend,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileHeader } from "@/components/studio/profile-header";
import { SidebarControls } from "@/components/studio/sidebar-controls";
import { MarkdownEditor } from "@/components/studio/markdown-editor";
import { MarkdownPreview } from "@/components/studio/markdown-preview";
import { ProfileSkeleton } from "@/components/ui/loading-skeleton";
import { DeployModal } from "@/components/studio/deploy-modal";
import { CanvasPainter } from "@/components/studio/canvas-painter";
import { ProjectReadmeConfigurator } from "@/components/studio/project-readme-configurator";
import { defaultProjectConfig } from "@/lib/project-readme-engine";
import {
  ALL_15_TEMPLATES,
  type TemplateId,
} from "@/lib/template-engine";
import {
  compileBlogSyncWidget,
  compileLeetCodeWidget,
  compileSpotifyWidget,
  compileTypingSvg,
} from "@/lib/dynamic-widgets-engine";
import { useEditorStore } from "@/stores/editor-store";
import { useProfileStore } from "@/stores/profile-store";
import {
  Button,
  Card,
  Input,
  Badge,
  IconTile,
  Tabs,
} from "@/components/ui";

import { ReadmeWizard } from "@/components/studio/readme-wizard";

type StudioMainMode = "wizard" | "profile" | "canvas" | "repo" | "arcade" | "widgets";
type ViewMode = "code" | "preview" | "split";
type MobileTab = "controls" | "editor" | "preview";

interface ModeOption {
  id: StudioMainMode;
  label: string;
  title: string;
  description: string;
  icon: IconType;
  tone: "brand" | "emerald" | "amber" | "rose" | "violet";
}

interface WidgetCard {
  title: string;
  description: string;
  previewUrl: string;
  markdown: string;
  tone: "brand" | "emerald" | "amber" | "violet";
}

const DEMO_USER = "octocat";
const validModes: StudioMainMode[] = [
  "wizard",
  "profile",
  "canvas",
  "repo",
  "arcade",
  "widgets",
];
const validTemplateIds = new Set(ALL_15_TEMPLATES.map((t) => t.id));

const modeOptions: ModeOption[] = [
  {
    id: "wizard",
    label: "Wizard",
    title: "Guided README Wizard",
    description:
      "Step-by-step 6-stage wizard to build your perfect custom animated README.",
    icon: FiZap,
    tone: "brand",
  },
  {
    id: "profile",
    label: "Profile",
    title: "Profile README Studio",
    description:
      "Presets, modules, badges, trophies, widgets, source markdown, and GitHub-rendered preview.",
    icon: FiSliders,
    tone: "brand",
  },
  {
    id: "canvas",
    label: "Art",
    title: "Contribution Art Painter",
    description:
      "Draw a 52 x 7 GitHub calendar and export a reproducible painting script.",
    icon: FiGrid,
    tone: "emerald",
  },
  {
    id: "repo",
    label: "Repo",
    title: "Project README Builder",
    description:
      "Generate project docs with feature lists, architecture, setup, environment, and API tables.",
    icon: FiBox,
    tone: "amber",
  },
  {
    id: "arcade",
    label: "Arcade",
    title: "GitHub Arcade Launcher",
    description:
      "Open playable canvas games for Contribution Snake, Brick Breaker, and Pac-Man runs.",
    icon: FiPlay,
    tone: "rose",
  },
  {
    id: "widgets",
    label: "Widgets",
    title: "Dynamic SVG Widgets",
    description:
      "Build embeddable typing, now playing, LeetCode, and blog-sync markdown blocks.",
    icon: FiActivity,
    tone: "violet",
  },
];

function parseMode(value: string | null): StudioMainMode {
  return validModes.includes(value as StudioMainMode)
    ? (value as StudioMainMode)
    : "profile";
}

function getTemplateId(value: string | null): TemplateId | null {
  return value && validTemplateIds.has(value as TemplateId)
    ? (value as TemplateId)
    : null;
}

function StudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userParam =
    searchParams.get("user") || searchParams.get("username") || "";
  const studioMode = parseMode(searchParams.get("mode"));
  const templateParam = getTemplateId(searchParams.get("template"));

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

  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [mobileTab, setMobileTab] = useState<MobileTab>("controls");
  const [copied, setCopied] = useState(false);
  const [scanInput, setScanInput] = useState(userParam || username || DEMO_USER);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [projectConfig, setProjectConfig] = useState(defaultProjectConfig);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeUser =
    profileData?.profile?.username || username || userParam || DEMO_USER;
  const activeMode =
    modeOptions.find((m) => m.id === studioMode) ?? modeOptions[0];
  const ActiveModeIcon = activeMode.icon;

  const widgetCards = useMemo<WidgetCard[]>(
    () => [
      {
        title: "Typing SVG",
        description:
          "Rotating headline lines for profile or project headers.",
        previewUrl:
          "/api/svg/typing?lines=Full%20Stack%20Developer;Open%20Source%20Builder;README%20Studio&color=22D3EE&background=0B0F14",
        markdown: compileTypingSvg(
          ["Full Stack Developer", "Open Source Builder", "README Studio"],
          "Orbitron",
          "22D3EE"
        ),
        tone: "brand",
      },
      {
        title: "Now Playing",
        description:
          "Animated equalizer SVG for a Spotify-style README block.",
        previewUrl:
          "/api/svg/spotify?track=Deep%20Focus%20Build&artist=SynthetixGit%20Studio",
        markdown: compileSpotifyWidget("Deep Focus Build", "SynthetixGit Studio"),
        tone: "emerald",
      },
      {
        title: "LeetCode Card",
        description:
          "Embeddable progress card linked to a coding profile.",
        previewUrl:
          "/api/svg/header?text=LeetCode%20Progress&subtitle=Daily%20practice&style=minimal&width=600&height=120",
        markdown: compileLeetCodeWidget(activeUser ?? "octocat", "dark"),
        tone: "amber",
      },
      {
        title: "Blog Sync",
        description:
          "Recent article embed block for Dev.to, Medium, or Hashnode style feeds.",
        previewUrl:
          "/api/svg/header?text=Latest%20Writing&subtitle=Blog%20feed&style=terminal-prompt&width=600&height=120",
        markdown: compileBlogSyncWidget("devto", "developer"),
        tone: "violet",
      },
    ],
    [activeUser]
  );

  const widgetMarkdown = useMemo(
    () => widgetCards.map((w) => w.markdown).join("\n\n"),
    [widgetCards]
  );

  useEffect(() => {
    const target = userParam.trim();
    const loadedUser = profileData?.profile.username.toLowerCase();
    if (!target || loadedUser === target.toLowerCase()) return;
    void fetchProfile(target).then((data) => {
      if (data) initializeFromProfile(data);
    });
  }, [
    fetchProfile,
    initializeFromProfile,
    profileData?.profile.username,
    userParam,
  ]);

  useEffect(() => {
    if (!templateParam || templateParam === templateId) return;
    applyTemplatePreset(templateParam, activeUser, profileData);
  }, [
    activeUser,
    applyTemplatePreset,
    profileData,
    templateId,
    templateParam,
  ]);

  useEffect(() => {
    if (studioMode === "profile") {
      regenerateMarkdown(activeUser, profileData);
    }
  }, [
    activeUser,
    modules,
    profileData,
    regenerateMarkdown,
    studioMode,
    templateId,
    theme,
  ]);

  const replaceStudioUrl = (nextMode: StudioMainMode, nextUser = activeUser) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", nextMode);
    params.set("user", nextUser);
    router.replace(`/studio?${params.toString()}`, { scroll: false });
  };

  const handleInStudioScan = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const target = scanInput.trim();
    if (!target) {
      toast.error("Enter a GitHub username.");
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

  const handleCopy = async (value = markdown, label = "README Markdown") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied.`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed.");
    }
  };

  const handleDownload = (
    value: string,
    fileName: string,
    type = "text/markdown"
  ) => {
    const blob = new Blob([value], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
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
      toast.error("Enable a game workflow before downloading.");
      return;
    }
    handleDownload(workflowYaml, "snake.yml", "text/yaml");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <StudioTopBar
        activeMode={activeMode}
        activeUser={activeUser}
        scanInput={scanInput}
        setScanInput={setScanInput}
        isLoading={isLoading}
        onScan={handleInStudioScan}
        onBack={() => router.push("/")}
        onDeploy={() => setIsDeployModalOpen(true)}
        onCopy={() => void handleCopy()}
        copied={copied}
        onDownloadMarkdown={() => handleDownload(markdown, "README.md")}
        onDownloadWorkflow={handleDownloadWorkflow}
        hasWorkflow={!!workflowYaml}
      />

      <div className="flex min-h-[calc(100vh-4rem)] flex-1">
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.aside
              key="sidebar"
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -260, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="hidden w-64 shrink-0 border-r border-border-primary bg-bg-secondary/60 backdrop-blur-xl p-3 xl:block"
            >
              <div className="mb-3 rounded-2xl border border-border-primary bg-bg-tertiary/50 p-4">
                <div className="flex items-center gap-2">
                  <IconTile icon={<FiShield size={14} />} tone="emerald" size="sm" />
                  <div>
                    <p className="text-xs font-bold text-text-primary">
                      Verified surfaces
                    </p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-text-muted">
                      Five production workspaces for direct testing.
                    </p>
                  </div>
                </div>
              </div>

              <nav className="space-y-1.5">
                {modeOptions.map((mode) => {
                  const Icon = mode.icon;
                  const selected = mode.id === studioMode;
                  return (
                    <motion.button
                      key={mode.id}
                      type="button"
                      whileHover={!selected ? { x: 2 } : undefined}
                      onClick={() => replaceStudioUrl(mode.id)}
                      className={[
                        "group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all duration-200",
                        selected
                          ? `border-brand-400/30 bg-brand-500/10 text-brand-200 shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_4px_20px_-8px_rgba(34,211,238,0.35)]`
                          : "border-transparent hover:bg-white/[0.035] hover:border-border-primary text-text-tertiary hover:text-text-primary",
                      ].join(" ")}
                    >
                      <IconTile icon={<Icon size={16} />} tone={mode.tone} size="sm" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-black">
                          {mode.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] opacity-75">
                          {mode.title}
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setSidebarOpen((v) => !v)}
          className="hidden xl:flex absolute left-[16rem] top-[5.5rem] z-30 grid h-7 w-7 place-items-center rounded-lg border border-border-primary bg-bg-secondary text-text-muted transition-colors hover:text-text-primary"
          style={{ left: sidebarOpen ? "16rem" : "0" }}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <FiMaximize2
            size={12}
            className={`transition-transform ${sidebarOpen ? "" : "rotate-180"}`}
          />
        </button>

        <main className="min-w-0 flex-1 overflow-y-auto p-3 pb-24 sm:p-5 xl:pb-5">
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary/60 backdrop-blur-xl p-5 sm:p-6"
          >
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div className="flex min-w-0 items-start gap-4">
                <div className="relative">
                  <IconTile
                    icon={<ActiveModeIcon size={22} />}
                    tone={activeMode.tone}
                    size="lg"
                    className="!bg-bg-tertiary/80"
                  />
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-bg-secondary bg-accent-emerald animate-pulse" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
                    Workspace · @{activeUser}
                  </p>
                  <h1 className="mt-1 text-2xl font-black tracking-tight text-text-primary sm:text-3xl">
                    {activeMode.title}
                  </h1>
                  <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-text-tertiary">
                    {activeMode.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="emerald" dot>
                  Build ready
                </Badge>
                <Badge tone="brand">15 presets</Badge>
                <Badge tone="violet">Next 16</Badge>
              </div>
            </div>
          </motion.section>

          <AnimatePresence mode="wait">
            {studioMode === "wizard" && (
              <motion.div
                key="wizard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mx-auto max-w-5xl"
              >
                <ReadmeWizard
                  username={activeUser}
                  onComplete={() => replaceStudioUrl("profile")}
                  onOpenDeployModal={() => setIsDeployModalOpen(true)}
                />
              </motion.div>
            )}

            {studioMode === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
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
                  onTemplateChange={(next) =>
                    applyTemplatePreset(next, activeUser, profileData)
                  }
                  onThemeChange={setTheme}
                  onUpdateMarkdown={setMarkdown}
                  onUpdateModule={updateModule}
                />
              </motion.div>
            )}

            {studioMode === "canvas" && (
              <motion.div
                key="canvas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mx-auto max-w-7xl"
              >
                <CanvasPainter username={activeUser} />
              </motion.div>
            )}

            {studioMode === "repo" && (
              <motion.div
                key="repo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="grid gap-4 xl:grid-cols-[420px_minmax(0,1fr)]"
              >
                <Card className="!p-4 h-fit xl:sticky xl:top-24">
                  <ProjectReadmeConfigurator
                    config={projectConfig}
                    onChange={setProjectConfig}
                    onApplyMarkdown={setMarkdown}
                  />
                </Card>
                <div className="grid min-h-[640px] overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary/40 backdrop-blur-xl lg:grid-cols-2">
                  <div className="border-b border-border-primary lg:border-b-0 lg:border-r lg:border-border-primary">
                    <PanelHeader
                      icon={<FiCode size={14} />}
                      label="Markdown"
                      accent="brand"
                      right={
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => void handleCopy()}
                            className="grid h-7 w-7 place-items-center rounded-lg text-text-muted hover:text-text-primary"
                            title="Copy"
                          >
                            {copied ? (
                              <FiCheck size={13} className="text-accent-emerald" />
                            ) : (
                              <FiCopy size={13} />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDownload(markdown, "README.md")
                            }
                            className="grid h-7 w-7 place-items-center rounded-lg text-text-muted hover:text-text-primary"
                            title="Download"
                          >
                            <FiDownload size={13} />
                          </button>
                        </div>
                      }
                    />
                    <div className="h-[calc(100%-2.75rem)]">
                      <MarkdownEditor
                        markdown={markdown}
                        onChange={setMarkdown}
                        readOnly={false}
                      />
                    </div>
                  </div>
                  <div>
                    <PanelHeader
                      icon={<FiEye size={14} />}
                      label="Preview"
                      accent="emerald"
                    />
                    <div className="h-[calc(100%-2.75rem)]">
                      <MarkdownPreview markdown={markdown} username={activeUser} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {studioMode === "arcade" && (
              <motion.div
                key="arcade"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <ArcadeLauncher username={activeUser} />
              </motion.div>
            )}

            {studioMode === "widgets" && (
              <motion.div
                key="widgets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <WidgetWorkspace
                  widgets={widgetCards}
                  widgetMarkdown={widgetMarkdown}
                  onApply={() => setMarkdown(widgetMarkdown)}
                  onCopy={(v, l) => void handleCopy(v, l)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border-primary bg-bg-primary/90 p-1.5 backdrop-blur-xl sm:hidden">
        {modeOptions.map((mode) => {
          const Icon = mode.icon;
          const selected = mode.id === studioMode;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => replaceStudioUrl(mode.id)}
              className={[
                "flex min-h-[3.25rem] flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-black transition-all",
                selected
                  ? "bg-brand-500 text-slate-950 shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)]"
                  : "text-text-muted",
              ].join(" ")}
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

interface StudioTopBarProps {
  activeMode: ModeOption;
  activeUser: string;
  scanInput: string;
  setScanInput: (v: string) => void;
  isLoading: boolean;
  onScan: (e?: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
  onDeploy: () => void;
  onCopy: () => void;
  copied: boolean;
  onDownloadMarkdown: () => void;
  onDownloadWorkflow: () => void;
  hasWorkflow: boolean;
}

function StudioTopBar({
  activeMode,
  activeUser,
  scanInput,
  setScanInput,
  isLoading,
  onScan,
  onBack,
  onDeploy,
  onCopy,
  copied,
  onDownloadMarkdown,
  onDownloadWorkflow,
  hasWorkflow,
}: StudioTopBarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border-primary bg-bg-primary/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-3 px-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <motion.button
            type="button"
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border-primary bg-bg-secondary/60 text-text-secondary transition-colors hover:border-border-secondary hover:bg-bg-tertiary hover:text-text-primary"
            title="Back home"
          >
            <FiArrowLeft size={16} />
          </motion.button>

          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-black text-text-primary">
              SynthetixGit <span className="text-brand-400">Studio</span>
            </p>
            <p className="truncate text-[10px] text-text-muted">
              {activeMode.title}
            </p>
          </div>
        </div>

        <form
          onSubmit={onScan}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border-primary bg-bg-secondary/60 px-3 py-2 focus-within:border-brand-400/50 focus-within:bg-bg-tertiary/60 focus-within:shadow-[0_0_0_4px_rgba(34,211,238,0.08)] sm:max-w-md"
        >
          <FiGithub size={15} className="shrink-0 text-text-muted" />
          <input
            value={scanInput}
            onChange={(e) => setScanInput(e.target.value)}
            placeholder={`@${activeUser}`}
            className="min-w-0 flex-1 bg-transparent font-mono text-xs text-text-primary outline-none placeholder:text-text-muted"
          />
          <Button
            type="submit"
            variant="primary"
            size="xs"
            loading={isLoading}
            rightIcon={!isLoading ? <FiSend size={11} /> : undefined}
            disabled={!scanInput.trim()}
            className="!h-7"
          >
            Scan
          </Button>
        </form>

        <div className="flex shrink-0 items-center gap-2">
          {hasWorkflow && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              leftIcon={<FiDownload size={14} />}
              onClick={onDownloadWorkflow}
              className="hidden lg:inline-flex"
            >
              Workflow
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            leftIcon={copied ? <FiCheck size={14} className="text-accent-emerald" /> : <FiCopy size={14} />}
            onClick={onCopy}
            className="hidden sm:inline-flex"
          >
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leftIcon={<FiDownload size={14} />}
            onClick={onDownloadMarkdown}
            className="hidden sm:grid"
            title="Download README.md"
          />
          <Button
            type="button"
            variant="primary"
            size="sm"
            leftIcon={<FiUploadCloud size={14} />}
            onClick={onDeploy}
          >
            <span className="hidden sm:inline">Deploy</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

interface ProfileWorkspaceProps {
  activeUser: string;
  copied: boolean;
  isLoading: boolean;
  markdown: string;
  mobileTab: MobileTab;
  modules: ReturnType<typeof useEditorStore.getState>["modules"];
  profileData: ReturnType<typeof useProfileStore.getState>["profileData"];
  setMobileTab: (tab: MobileTab) => void;
  setViewMode: (mode: ViewMode) => void;
  theme: ReturnType<typeof useEditorStore.getState>["theme"];
  templateId: TemplateId;
  viewMode: ViewMode;
  onAddBadge: (slug: string) => void;
  onApplyProjectMarkdown: (markdown: string) => void;
  onApplyRolePreset: NonNullable<
    ReturnType<typeof useEditorStore.getState>["applyRolePreset"]
  >;
  onCopy: () => void;
  onRemoveBadge: (slug: string) => void;
  onTemplateChange: (templateId: TemplateId) => void;
  onThemeChange: ReturnType<typeof useEditorStore.getState>["setTheme"];
  onUpdateMarkdown: (markdown: string) => void;
  onUpdateModule: ReturnType<typeof useEditorStore.getState>["updateModule"];
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
  const showDesktopEditor = viewMode === "code" || viewMode === "split";
  const showDesktopPreview = viewMode === "preview" || viewMode === "split";

  return (
    <div className="grid gap-4 xl:grid-cols-[400px_minmax(0,1fr)]">
      <aside
        className={`${
          mobileTab === "controls" ? "block" : "hidden"
        } xl:block`}
      >
        <Card className="!p-0 overflow-hidden sticky top-24">
          <div className="border-b border-border-primary p-4">
            {isLoading ? (
              <ProfileSkeleton />
            ) : profileData ? (
              <ProfileHeader data={profileData} />
            ) : (
              <div className="rounded-xl border border-border-primary bg-bg-tertiary/60 p-4">
                <p className="text-sm font-black text-text-primary">
                  @{activeUser}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">
                  Profile controls ready for local generation.
                </p>
              </div>
            )}
          </div>
          <div className="h-[calc(100vh-18rem)] min-h-[560px]">
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
        </Card>
      </aside>

      <section
        className={`${
          mobileTab === "controls" ? "hidden" : "block"
        } min-w-0 xl:block`}
      >
        <Card className="!p-0 overflow-hidden min-h-[640px] flex flex-col xl:h-[calc(100vh-11rem)]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-primary bg-bg-tertiary/30 px-4 py-3">
            <div className="hidden xl:block">
              <Tabs<ViewMode>
                value={viewMode}
                onChange={setViewMode}
                tabs={[
                  { id: "code", label: "Code", icon: <FiCode size={12} /> },
                  { id: "split", label: "Split", icon: <FiColumns size={12} /> },
                  { id: "preview", label: "Preview", icon: <FiEye size={12} /> },
                ]}
              />
            </div>

            <div className="xl:hidden">
              <Tabs<MobileTab>
                value={mobileTab}
                onChange={setMobileTab}
                tabs={[
                  { id: "controls", label: "Controls", icon: <FiSliders size={12} /> },
                  { id: "editor", label: "Code", icon: <FiCode size={12} /> },
                  { id: "preview", label: "Preview", icon: <FiEye size={12} /> },
                ]}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                leftIcon={copied ? <FiCheck size={13} className="text-accent-emerald" /> : <FiCopy size={13} />}
                onClick={onCopy}
              >
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="hidden min-h-0 flex-1 xl:flex">
            {showDesktopEditor && (
              <div
                className={`${
                  viewMode === "split"
                    ? "w-1/2 border-r border-border-primary"
                    : "w-full"
                } min-w-0 flex flex-col`}
              >
                <PanelHeader
                  icon={<FiCode size={13} />}
                  label="Markdown · README.md"
                  accent="brand"
                />
                <div className="flex-1 min-h-0">
                  <MarkdownEditor
                    markdown={markdown}
                    onChange={onUpdateMarkdown}
                    readOnly={false}
                  />
                </div>
              </div>
            )}
            {showDesktopPreview && (
              <div
                className={`${
                  viewMode === "split" ? "w-1/2" : "w-full"
                } min-w-0 flex flex-col`}
              >
                <PanelHeader
                  icon={<FiEye size={13} />}
                  label="Preview · GitHub render"
                  accent="emerald"
                />
                <div className="flex-1 min-h-0">
                  <MarkdownPreview markdown={markdown} username={activeUser} />
                </div>
              </div>
            )}
          </div>

          <div className="min-h-0 flex-1 xl:hidden flex flex-col">
            {mobileTab === "editor" && (
              <>
                <PanelHeader
                  icon={<FiCode size={13} />}
                  label="Markdown"
                  accent="brand"
                />
                <div className="flex-1 min-h-0">
                  <MarkdownEditor
                    markdown={markdown}
                    onChange={onUpdateMarkdown}
                    readOnly={false}
                  />
                </div>
              </>
            )}
            {mobileTab === "preview" && (
              <>
                <PanelHeader
                  icon={<FiEye size={13} />}
                  label="Preview"
                  accent="emerald"
                />
                <div className="flex-1 min-h-0">
                  <MarkdownPreview markdown={markdown} username={activeUser} />
                </div>
              </>
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

function PanelHeader({
  icon,
  label,
  accent = "neutral",
  right,
}: {
  icon: React.ReactNode;
  label: string;
  accent?: "brand" | "emerald" | "amber" | "rose" | "violet" | "neutral";
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border-primary bg-bg-tertiary/30 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <IconTile icon={icon} tone={accent} size="sm" className="!h-7 !w-7" />
        <span className="text-xs font-bold text-text-secondary">{label}</span>
      </div>
      {right}
    </div>
  );
}

function ArcadeLauncher({ username }: { username: string }) {
  const games = [
    {
      id: "snake",
      title: "Contribution Snake",
      description:
        "A fast canvas snake loop with commit tile scoring and arcade physics.",
      icon: FiZap,
      tone: "emerald" as const,
    },
    {
      id: "brick-breaker",
      title: "Commit Brick Breaker",
      description:
        "Paddle and ball physics against contribution-style brick columns.",
      icon: FiGrid,
      tone: "brand" as const,
    },
    {
      id: "pacman",
      title: "Pac-Man Commit Run",
      description:
        "Continuous dot collection along a commit-history race lane.",
      icon: FiActivity,
      tone: "amber" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-5 md:grid-cols-3">
        {games.map((game, idx) => {
          const Icon = game.icon;
          return (
            <motion.a
              key={game.id}
              href={`/play/${encodeURIComponent(username)}/${game.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group block h-full"
            >
              <Card hover glow className="h-full !p-6 flex flex-col">
                <IconTile icon={<Icon size={24} />} tone={game.tone} size="lg" />
                <h2 className="mt-5 text-xl font-black text-text-primary">
                  {game.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-tertiary">
                  {game.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <Badge tone={game.tone}>Play for @{username}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-300">
                    Launch
                    <FiExternalLink
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Card>
            </motion.a>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary/60 backdrop-blur-xl p-5"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <IconTile icon={<FiPlay size={18} />} tone="rose" size="lg" />
            <div className="min-w-0">
              <h3 className="text-sm font-black text-text-primary">
                Direct game routes
              </h3>
              <p className="mt-1 break-all font-mono text-[11px] text-text-muted">
                /play/{username}/snake · /play/{username}/brick-breaker · /play/{username}/pacman
              </p>
            </div>
          </div>
          <a
            href={`/play/${encodeURIComponent(username)}/snake`}
            className="inline-flex w-full justify-center sm:w-auto"
          >
            <Button variant="primary" size="md" rightIcon={<FiArrowRight size={14} />}>
              Start with Snake
            </Button>
          </a>
        </div>
      </motion.div>
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
  const toneMap: Record<WidgetCard["tone"], string> = {
    brand: "border-brand-400/25 bg-brand-500/10",
    emerald: "border-accent-emerald-border bg-accent-emerald-soft",
    amber: "border-accent-amber-border bg-accent-amber-soft",
    violet: "border-accent-violet-border bg-accent-violet-soft",
  };
  return (
    <div className="mx-auto grid max-w-7xl gap-4 xl:grid-cols-[minmax(0,1fr)_440px]">
      <div className="grid gap-4 md:grid-cols-2">
        {widgets.map((widget, idx) => (
          <motion.article
            key={widget.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className={`rounded-2xl border ${toneMap[widget.tone]} p-5`}
          >
            <div className="overflow-hidden rounded-xl border border-border-primary bg-bg-canvas">
              <img
                src={widget.previewUrl}
                alt={`${widget.title} preview`}
                className="h-32 w-full object-cover"
              />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-text-primary">
                  {widget.title}
                </h2>
                <Badge tone={widget.tone} className="mt-1">
                  Embeddable SVG
                </Badge>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-text-tertiary">
              {widget.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                leftIcon={<FiCopy size={13} />}
                onClick={() => onCopy(widget.markdown, widget.title)}
              >
                Copy block
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                leftIcon={<FiBookOpen size={13} />}
                onClick={onApply}
              >
                Apply set
              </Button>
            </div>
          </motion.article>
        ))}
      </div>

      <Card className="!p-5 xl:sticky xl:top-24 h-fit">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
              Combined markdown
            </p>
            <h2 className="mt-1 text-xl font-black text-text-primary">
              Widget bundle
            </h2>
            <p className="mt-1 text-xs text-text-muted">
              All {widgets.length} widgets merged for paste.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            leftIcon={<FiCopy size={13} />}
            onClick={() => onCopy(widgetMarkdown, "Widget bundle")}
          >
            Copy
          </Button>
        </div>
        <pre className="mt-5 max-h-[560px] overflow-auto whitespace-pre-wrap rounded-xl border border-border-primary bg-bg-canvas p-4 font-mono text-xs leading-relaxed text-text-secondary">
          {widgetMarkdown}
        </pre>
        <div className="mt-5">
          <Button
            type="button"
            variant="primary"
            size="md"
            fullWidth
            leftIcon={<FiLayers size={14} />}
            onClick={onApply}
          >
            Apply bundle to profile editor
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-bg-canvas text-text-tertiary">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <FiRefreshCw
              className="mx-auto animate-spin text-brand-300"
              size={30}
            />
            <p className="mt-4 font-mono text-xs text-text-muted">
              Loading studio…
            </p>
          </motion.div>
        </div>
      }
    >
      <StudioContent />
    </Suspense>
  );
}
