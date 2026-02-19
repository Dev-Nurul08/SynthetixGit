'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FiGithub,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiRefreshCw,
  FiSliders,
  FiLayers,
  FiUploadCloud,
  FiCopy,
  FiDownload,
  FiZap,
  FiFileText,
  FiExternalLink,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useProfileStore } from '@/stores/profile-store';
import { useEditorStore } from '@/stores/editor-store';
import { ALL_15_TEMPLATES, type TemplateId } from '@/lib/template-engine';
import { getThemeColors } from '@/lib/theme-colors';
import { BlockSelector } from './block-selector';
import { ProfileLinkCollector } from './profile-link-collector';
import { MarkdownPreview } from '@/components/studio/markdown-preview';
import { DeployModal } from '@/components/studio/deploy-modal';
import type { ParsedReadmeData } from '@/lib/readme-parser';

type WizardStep = 'scan' | 'blocks' | 'details' | 'theme' | 'preview';

const STEPS: { id: WizardStep; label: string; number: number }[] = [
  { id: 'scan', label: '1. Scan Profile', number: 1 },
  { id: 'blocks', label: '2. Select Blocks', number: 2 },
  { id: 'details', label: '3. Add Links & Info', number: 3 },
  { id: 'theme', label: '4. Choose Theme', number: 4 },
  { id: 'preview', label: '5. Preview & Deploy', number: 5 },
];

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<WizardStep>('scan');
  const [inputUsername, setInputUsername] = useState('');
  const [existingReadmeData, setExistingReadmeData] = useState<{
    found: boolean;
    parsed?: ParsedReadmeData;
  } | null>(null);
  const [isScanningReadme, setIsScanningReadme] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { fetchProfile, profileData, isLoading: isProfileLoading } = useProfileStore();
  const {
    markdown,
    workflowYaml,
    modules,
    templateId,
    updateModule,
    applyTemplatePreset,
    importFromExistingReadme,
    initializeFromProfile,
    regenerateMarkdown,
  } = useEditorStore();

  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([
    'header',
    'beastMode',
    'analytics',
    'education',
    'arsenal',
    'activity',
    'trophies',
    'game',
    'about',
    'social',
    'widgets',
  ]);

  const activeUsername = profileData?.profile?.username || inputUsername.trim() || 'Dev-Nurul08';

  // Toggle a single block on/off
  const handleToggleBlock = (blockId: string) => {
    setSelectedBlocks((prev) => {
      const next = prev.includes(blockId)
        ? prev.filter((id) => id !== blockId)
        : [...prev, blockId];

      // Update module configs based on block selection
      syncModulesWithSelectedBlocks(next);
      return next;
    });
  };

  const handleSelectAllBlocks = () => {
    const all = [
      'header',
      'beastMode',
      'analytics',
      'education',
      'arsenal',
      'activity',
      'trophies',
      'game',
      'about',
      'social',
      'widgets',
    ];
    setSelectedBlocks(all);
    syncModulesWithSelectedBlocks(all);
  };

  const handleDeselectAllBlocks = () => {
    setSelectedBlocks([]);
    syncModulesWithSelectedBlocks([]);
  };

  const syncModulesWithSelectedBlocks = (blocks: string[]) => {
    updateModule('headerBanner', { enabled: blocks.includes('header') });
    updateModule('beastModeDashboard', { enabled: blocks.includes('beastMode') });
    updateModule('githubAnalytics', {
      enabled: blocks.includes('analytics') || blocks.includes('activity') || blocks.includes('trophies'),
      showProfileDetailsCard: blocks.includes('analytics'),
      showReposPerLanguage: blocks.includes('analytics'),
      showStatsCard: blocks.includes('analytics'),
      showActivityWave: blocks.includes('activity'),
      showTrophies: blocks.includes('trophies'),
    });
    updateModule('educationAndSkills', { enabled: blocks.includes('education') });
    updateModule('techArsenal', { enabled: blocks.includes('arsenal') });
    updateModule('gameSuite', { enabled: blocks.includes('game') });
    updateModule('aboutMe', { enabled: blocks.includes('about') });
    updateModule('socialLinks', { enabled: blocks.includes('social') });
    updateModule('interactiveWidgets', { enabled: blocks.includes('widgets') });
    updateModule('sectionOrder' as any, blocks as any);

    regenerateMarkdown(activeUsername, profileData);
  };

  // Step 1: Scan GitHub profile + existing profile README
  const handleScanProfile = async (targetOverride?: string) => {
    const target = (targetOverride || inputUsername).trim();
    if (!target) {
      toast.error('Please enter a GitHub username first.');
      return;
    }

    const toastId = toast.loading(`Scanning @${target} GitHub profile & README...`);
    try {
      const data = await fetchProfile(target);
      if (data) {
        initializeFromProfile(data);
      }

      // Also scan existing README
      setIsScanningReadme(true);
      try {
        const readmeRes = await fetch(`/api/user/readme/${encodeURIComponent(target)}`);
        const readmeJson = await readmeRes.json();
        if (readmeJson.found && readmeJson.parsed) {
          setExistingReadmeData(readmeJson);
        } else {
          setExistingReadmeData({ found: false });
        }
      } catch {
        setExistingReadmeData({ found: false });
      } finally {
        setIsScanningReadme(false);
      }

      toast.success(`Successfully gathered data for @${target}!`, { id: toastId });
      setCurrentStep('blocks');
    } catch {
      toast.error(`Could not fetch @${target}. Please check username.`, { id: toastId });
    }
  };

  const handleApplyExistingReadme = () => {
    if (existingReadmeData?.parsed) {
      importFromExistingReadme(existingReadmeData.parsed, activeUsername, profileData);
      toast.success('Imported all data from your existing GitHub profile README! 🚀');
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('README markdown copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy.');
    }
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded README.md!');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Wizard Progress Bar */}
      <div className="rounded-xl border border-white/10 bg-[#101720] p-3 shadow-xl">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          {STEPS.map((s) => {
            const isActive = currentStep === s.id;
            const isCompleted =
              STEPS.findIndex((step) => step.id === currentStep) >
              STEPS.findIndex((step) => step.id === s.id);

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  if (isCompleted || profileData) {
                    setCurrentStep(s.id);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'border border-cyan-400/40 bg-cyan-400/10 text-cyan-200 shadow-md'
                    : isCompleted
                      ? 'text-emerald-300 hover:bg-white/[0.04]'
                      : 'text-slate-500 cursor-not-allowed'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 font-black'
                      : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                        : 'bg-white/[0.05] text-slate-500'
                  }`}
                >
                  {isCompleted ? <FiCheck size={11} /> : s.number}
                </span>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: SCAN GITHUB PROFILE & EXISTING README */}
      {currentStep === 'scan' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#101720] shadow-2xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xs font-bold text-cyan-200">
              <FiZap size={13} />
              Instant GitHub Profile Ingestion
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Enter your GitHub username to get started.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              We’ll automatically scan your public repositories, languages, contribution activity, and existing profile README to craft your masterpiece.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleScanProfile();
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <div className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#0b0f14] focus-within:border-cyan-400 shadow-inner">
              <FiGithub size={20} className="text-slate-400" />
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="e.g. Dev-Nurul08, torvalds, shadcn..."
                className="w-full bg-transparent text-sm font-mono text-white outline-none placeholder:text-slate-500"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isProfileLoading || !inputUsername.trim()}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20 disabled:opacity-50"
            >
              {isProfileLoading ? (
                <>
                  <FiRefreshCw className="animate-spin" size={16} />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Scan & Continue</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick profile tags */}
          <div className="pt-2 flex items-center gap-2 flex-wrap text-xs text-slate-400">
            <span className="font-bold text-slate-500">Quick Test Profiles:</span>
            {['Dev-Nurul08', 'torvalds', 'shadcn', 'leerob'].map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => {
                  setInputUsername(u);
                  void handleScanProfile(u);
                }}
                className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white font-mono transition-colors"
              >
                @{u}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: SELECT PROFILE BLOCKS */}
      {currentStep === 'blocks' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#101720] shadow-2xl space-y-6">
          {/* Existing README Banner if found */}
          {existingReadmeData?.found && existingReadmeData.parsed && (
            <div className="p-4 rounded-xl border border-amber-400/30 bg-amber-400/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-400/20 text-amber-300">
                  <FiFileText size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Existing Profile README Detected! 📄
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    We found a README in <code>@{activeUsername}/{activeUsername}</code> with{' '}
                    {existingReadmeData.parsed.skillSlugs.length} skills and social handles.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyExistingReadme}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shrink-0 shadow-md shadow-amber-400/20"
              >
                Auto-Fill My Details
              </button>
            </div>
          )}

          <BlockSelector
            selectedBlocks={selectedBlocks}
            onToggleBlock={handleToggleBlock}
            onSelectAll={handleSelectAllBlocks}
            onDeselectAll={handleDeselectAllBlocks}
          />

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setCurrentStep('scan')}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <FiArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep('details')}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/20"
            >
              <span>Next: Add Links & Info</span>
              <FiArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: ADD PROFILE LINKS & DETAILS */}
      {currentStep === 'details' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#101720] shadow-2xl space-y-6">
          <ProfileLinkCollector
            selectedBlocks={selectedBlocks}
            modules={modules}
            onUpdateModule={updateModule}
            username={activeUsername}
          />

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setCurrentStep('blocks')}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <FiArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => {
                regenerateMarkdown(activeUsername, profileData);
                setCurrentStep('theme');
              }}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/20"
            >
              <span>Next: Choose Theme</span>
              <FiArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CHOOSE FROM 15 DISTINCT THEMES */}
      {currentStep === 'theme' && (
        <div className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#101720] shadow-2xl space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="text-base font-black text-white">Choose from 15 Distinct Themes</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Each theme features a uniquely styled capsule header, matched stats card palette, custom streak ring, and bespoke activity graph colors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ALL_15_TEMPLATES.map((t) => {
              const isSelected = templateId === t.id;
              const tc = getThemeColors(t.id);

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    applyTemplatePreset(t.id, activeUsername, profileData);
                    toast.success(`Applied ${t.name} theme!`);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all relative flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400/70 bg-cyan-400/[0.1] ring-2 ring-cyan-400 shadow-xl'
                      : 'border-white/10 bg-[#0b0f14] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{t.icon}</span>
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                            : 'border-white/20 bg-white/[0.04] text-transparent'
                        }`}
                      >
                        <FiCheck size={14} />
                      </span>
                    </div>

                    <h4 className="mt-3 text-sm font-black text-white">{t.name}</h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{t.desc}</p>
                  </div>

                  {/* Theme Color Palette Preview Bar */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Palette</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: `#${tc.statsOverrides.titleColor}` }}
                        title="Title Color"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: `#${tc.statsOverrides.iconColor}` }}
                        title="Icon Color"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: `#${tc.activityGraph.color}` }}
                        title="Graph Color"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/30"
                        style={{ backgroundColor: `#${tc.streak.ring}` }}
                        title="Streak Ring"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setCurrentStep('details')}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <FiArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => {
                regenerateMarkdown(activeUsername, profileData);
                setCurrentStep('preview');
              }}
              className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/20"
            >
              <span>Next: Live Preview & Deploy</span>
              <FiArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: PREVIEW & 1-CLICK DEPLOY */}
      {currentStep === 'preview' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-[#101720] shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xs font-bold text-emerald-200 mb-2">
                <FiCheck size={13} />
                Profile README Generated & Ready
              </span>
              <h2 className="text-2xl font-black text-white">Your GitHub Profile is Ready!</h2>
              <p className="text-xs text-slate-400 mt-1">
                Deploy directly to <code>@{activeUsername}/{activeUsername}</code> or copy the markdown code.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] text-xs font-bold transition-all flex items-center gap-2"
              >
                {copied ? <FiCheck className="text-emerald-400" size={14} /> : <FiCopy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] text-xs font-bold transition-all flex items-center gap-2"
              >
                <FiDownload size={14} />
                <span>Download .md</span>
              </button>

              <button
                type="button"
                onClick={() => setIsDeployModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/25 cursor-pointer"
              >
                <FiUploadCloud size={16} />
                <span>Deploy to GitHub 🚀</span>
              </button>
            </div>
          </div>

          {/* Live Preview Container */}
          <div className="rounded-2xl border border-white/10 bg-[#0b0f14] overflow-hidden shadow-2xl">
            <div className="px-4 py-3 border-b border-white/10 bg-[#101720] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <FiGithub size={15} className="text-cyan-400" />
                <span>Live Rendered GitHub Profile Preview</span>
              </div>
              <button
                type="button"
                onClick={() => router.push(`/studio?user=${encodeURIComponent(activeUsername)}&mode=profile`)}
                className="text-xs text-cyan-300 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Open in Full Studio</span>
                <FiExternalLink size={12} />
              </button>
            </div>

            <div className="p-4 sm:p-6 max-h-[750px] overflow-y-auto">
              <MarkdownPreview markdown={markdown} username={activeUsername} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep('theme')}
              className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <FiArrowLeft size={14} />
              <span>Back to Themes</span>
            </button>
          </div>
        </div>
      )}

      {/* Deploy Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        username={activeUsername}
        markdown={markdown}
        workflowYaml={workflowYaml}
      />
    </div>
  );
}
