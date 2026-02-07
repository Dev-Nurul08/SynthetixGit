'use client';

import { useState } from 'react';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { BadgePicker } from '@/components/studio/badge-picker';
import { CanvasPainter } from '@/components/studio/canvas-painter';
import { TrophyCustomizer } from '@/components/studio/trophy-customizer';
import { ProjectReadmeConfigurator } from '@/components/studio/project-readme-configurator';
import { defaultProjectConfig, type ProjectReadmeConfig } from '@/lib/project-readme-engine';
import type { ModuleConfig, ThemeId, TemplateId } from '@/lib/template-engine';
import {
  FiZap,
  FiSliders,
  FiBarChart2,
  FiCpu,
  FiBook,
  FiShare2,
  FiSmile,
  FiCheck,
  FiDroplet,
  FiActivity,
  FiAward,
  FiPlay,
  FiBox,
} from 'react-icons/fi';

interface SidebarControlsProps {
  modules: ModuleConfig;
  theme: ThemeId;
  templateId: TemplateId;
  onUpdateModule: <K extends keyof ModuleConfig>(key: K, value: Partial<ModuleConfig[K]>) => void;
  onThemeChange: (theme: ThemeId) => void;
  onTemplateChange: (templateId: TemplateId) => void;
  onAddBadge: (slug: string) => void;
  onRemoveBadge: (slug: string) => void;
  onApplyRolePreset?: (role: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'ai-ml' | 'mobile') => void;
  onApplyProjectMarkdown?: (markdown: string) => void;
}

type TabKey =
  | 'templates'
  | 'project'
  | 'canvas'
  | 'header'
  | 'beast'
  | 'analytics'
  | 'education'
  | 'arsenal'
  | 'about'
  | 'games'
  | 'social'
  | 'widgets';

export const ALL_15_TEMPLATES: { id: TemplateId; name: string; desc: string; icon: string }[] = [
  { id: 'beast-mode-neon', name: 'Beast Mode Neon', desc: 'Capsule venom banner, glowing stats & SkillIcons matrix', icon: '🔥' },
  { id: 'cyberpunk-glitch', name: 'Cyberpunk Glitch', desc: 'Glitch banner, neon matrices, high-intensity graph', icon: '👾' },
  { id: 'dracula-dark', name: 'Dracula Dark', desc: 'Classic Dracula purple/pink gradients & dark cards', icon: '🧛' },
  { id: 'nord-frost', name: 'Nord Frost', desc: 'Nordic icy blue/grey minimalism & crisp typography', icon: '❄️' },
  { id: 'minimal-monochrome', name: 'Minimal Monochrome', desc: 'Black/white ultra-sleek, clean sans typography', icon: '🎯' },
  { id: 'retro-terminal', name: 'Retro Terminal', desc: '8-bit ASCII prompts & green phosphor CRT style', icon: '📟' },
  { id: 'sunset-gradient', name: 'Sunset Gradient', desc: 'Warm orange/pink/purple capsule waves & vibrant badges', icon: '🌅' },
  { id: 'glassmorphism', name: 'Glassmorphism', desc: 'Frosted backdrop cards, blur borders & translucent pills', icon: '💎' },
  { id: 'tokyo-night', name: 'Tokyo Night', desc: 'Deep indigo/cyan aesthetic & neon glow charts', icon: '🌃' },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', desc: 'Pastel lavender/peach/mauve cozy developer palette', icon: '☕' },
  { id: 'solarized-dark', name: 'Solarized Dark', desc: 'Teal/amber balance & terminal-inspired syntax', icon: '☀️' },
  { id: 'matrix-green', name: 'Matrix Green', desc: 'Digital rain vibes, phosphor green glow & hacking stats', icon: '🟩' },
  { id: 'clean-corporate', name: 'Clean Corporate', desc: 'Lead architect enterprise layout with verified metrics', icon: '💼' },
  { id: 'acid-tech', name: 'Acid Tech', desc: 'High-voltage lime & electric purple cyber aesthetic', icon: '⚡' },
  { id: 'synthwave-84', name: 'Synthwave 84', desc: 'Outrun retro grid, neon sunset & 80s chrome badges', icon: '🌴' },
];

export function SidebarControls({
  modules,
  theme,
  templateId,
  onUpdateModule,
  onThemeChange,
  onTemplateChange,
  onAddBadge,
  onRemoveBadge,
  onApplyRolePreset,
  onApplyProjectMarkdown,
}: SidebarControlsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('templates');
  const [projectConfig, setProjectConfig] = useState<ProjectReadmeConfig>(defaultProjectConfig);

  const navTabs: { id: TabKey; label: string; icon: React.ReactNode }[] = [
    { id: 'templates', label: '15 Presets', icon: <FiZap size={14} className="text-amber-400" /> },
    { id: 'project', label: 'Repo Mode', icon: <FiBox size={14} className="text-blue-400" /> },
    { id: 'canvas', label: 'Canvas Painter', icon: <FiAward size={14} className="text-emerald-400" /> },
    { id: 'header', label: 'Header', icon: <FiSliders size={14} /> },
    { id: 'beast', label: 'Dashboard', icon: <FiActivity size={14} className="text-purple-400" /> },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 size={14} /> },
    { id: 'education', label: 'Education', icon: <FiBook size={14} /> },
    { id: 'arsenal', label: 'Arsenal', icon: <FiCpu size={14} /> },
    { id: 'about', label: 'About', icon: <FiSmile size={14} /> },
    { id: 'games', label: 'Games', icon: <FiPlay size={14} /> },
    { id: 'social', label: 'Socials', icon: <FiShare2 size={14} /> },
    { id: 'widgets', label: 'Widgets', icon: <FiAward size={14} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100">
      {/* ── Sub-Navigation Tabs ── */}
      <div className="px-3 pt-3 border-b border-slate-800 bg-slate-950 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-bold transition-all border-t border-x cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-900 border-slate-800 border-b-slate-900 text-blue-400 shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content Container ── */}
      <div className="p-4 overflow-y-auto flex-1 space-y-5">
        {/* ── TAB 1: 15 BUILT-IN PROFILE PRESETS ── */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FiZap className="text-amber-400" size={14} />
                <span>15 Built-in Profile Presets</span>
              </span>
              <span className="text-[11px] text-blue-400 font-semibold">1-Click Apply</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[520px] overflow-y-auto pr-1">
              {ALL_15_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onTemplateChange(t.id)}
                  className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                    templateId === t.id
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md'
                      : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{t.icon}</span>
                    {templateId === t.id && (
                      <span className="p-1 rounded-full bg-blue-500 text-white"><FiCheck size={10} /></span>
                    )}
                  </div>
                  <div className="text-xs font-bold mt-1.5 text-white truncate">{t.name}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-tight">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 1A: PROJECT REPO MODE (PHASE 8) ── */}
        {activeTab === 'project' && (
          <div className="space-y-4">
            <ProjectReadmeConfigurator
              config={projectConfig}
              onChange={setProjectConfig}
              onApplyMarkdown={(md) => onApplyProjectMarkdown?.(md)}
            />
          </div>
        )}

        {/* ── TAB 1B: CANVAS PAINTER ── */}
        {activeTab === 'canvas' && (
          <div className="space-y-4">
            <CanvasPainter username="Dev-Nurul08" />
          </div>
        )}

        {/* ── TAB 2: HEADER BANNER & DIVIDERS ── */}
        {activeTab === 'header' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Enable Header Banner</span>
                <span className="text-[11px] text-slate-400">Venom capsule banner & typing text</span>
              </div>
              <ToggleSwitch
                enabled={modules.headerBanner.enabled}
                onToggle={(v) => onUpdateModule('headerBanner', { enabled: v })}
                label=""
              />
            </div>

            {/* Section Divider Engine (Phase 6) */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Animated SVG Dividers</span>
                  <span className="text-[11px] text-slate-400">Replace static lines with flowing SVG animations</span>
                </div>
                <ToggleSwitch
                  enabled={modules.sectionDivider?.enabled ?? true}
                  onToggle={(v) => onUpdateModule('sectionDivider', { enabled: v })}
                  label=""
                />
              </div>

              {(modules.sectionDivider?.enabled ?? true) && (
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Divider Animation Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'rainbow-gradient', label: 'Rainbow Flow 🌈' },
                      { id: 'snake-crawl', label: 'Snake Crawl 🐍' },
                      { id: 'neon-laser-shimmer', label: 'Laser Node ⚡' },
                      { id: 'soundwave-eq', label: 'Soundwave EQ 🎵' },
                      { id: 'cyber-circuit', label: 'Cyber Circuit 👾' },
                      { id: 'particle-sparkle', label: 'Sparkles ✨' },
                      { id: 'retro-dashed-terminal', label: 'Terminal Dash 📟' },
                      { id: 'curved-wave', label: 'Curved Wave 🌊' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => onUpdateModule('sectionDivider', { style: d.id as any })}
                        className={`py-2 px-2.5 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
                          modules.sectionDivider?.style === d.id
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {modules.headerBanner.enabled && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Banner Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'venom-capsule', label: 'Venom Capsule 🔥' },
                      { id: 'waving-capsule', label: 'Waving Capsule 🌊' },
                      { id: 'cartoonish-3d', label: '3D Cartoonish 🎨' },
                      { id: 'cyberpunk-glitch', label: 'Cyber Glitch 👾' },
                      { id: 'terminal-prompt', label: 'Terminal Prompt 📟' },
                      { id: 'handwritten-script', label: 'Handwritten ✍️' },
                      { id: 'minimal', label: 'Minimalist ⚡' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => onUpdateModule('headerBanner', { headerStyle: style.id as any })}
                        className={`py-2 px-2.5 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
                          modules.headerBanner.headerStyle === style.id
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Headline Title</label>
                  <input
                    type="text"
                    value={modules.headerBanner.title}
                    onChange={(e) => onUpdateModule('headerBanner', { title: e.target.value })}
                    placeholder="Full Name or Handle..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Subtitle / Role Tagline</label>
                  <input
                    type="text"
                    value={modules.headerBanner.subtitle}
                    onChange={(e) => onUpdateModule('headerBanner', { subtitle: e.target.value })}
                    placeholder="e.g. Full-Stack & MERN Developer"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Multi-line Typing SVG Phrases (semicolon-separated)
                  </label>
                  <textarea
                    rows={3}
                    value={modules.headerBanner.typingLines.join(';')}
                    onChange={(e) => onUpdateModule('headerBanner', { typingLines: e.target.value.split(';').filter(Boolean) })}
                    placeholder="Frontend Ninja ⚡;Backend Explorer 🔍"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: BEAST MODE STATS DASHBOARD ── */}
        {activeTab === 'beast' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Beast Mode Stats Dashboard</span>
                <span className="text-[11px] text-slate-400">Live multi-column gradient matrix table</span>
              </div>
              <ToggleSwitch
                enabled={modules.beastModeDashboard.enabled}
                onToggle={(v) => onUpdateModule('beastModeDashboard', { enabled: v })}
                label=""
              />
            </div>

            {modules.beastModeDashboard.enabled && (
              <div className="space-y-2 pt-1">
                <ToggleSwitch
                  enabled={modules.beastModeDashboard.showProfileViews}
                  onToggle={(v) => onUpdateModule('beastModeDashboard', { showProfileViews: v })}
                  label="Profile Views Live Counter"
                  description="Dynamic visitor tracker card"
                  icon="🚀"
                />
                <ToggleSwitch
                  enabled={modules.beastModeDashboard.showGrowthMetrics}
                  onToggle={(v) => onUpdateModule('beastModeDashboard', { showGrowthMetrics: v })}
                  label="Followers & Stars Growth"
                  description="Live metric badges"
                  icon="📈"
                />
                <ToggleSwitch
                  enabled={modules.beastModeDashboard.showOpenToWork}
                  onToggle={(v) => onUpdateModule('beastModeDashboard', { showOpenToWork: v })}
                  label="Open to Work & Hire Me Button"
                  description="Interactive mailto button"
                  icon="💼"
                />
                <ToggleSwitch
                  enabled={modules.beastModeDashboard.showStreakCard}
                  onToggle={(v) => onUpdateModule('beastModeDashboard', { showStreakCard: v })}
                  label="Contribution Streak Stats"
                  description="Animated streak tracker"
                  icon="🔥"
                />
                <ToggleSwitch
                  enabled={modules.beastModeDashboard.showWakaTime}
                  onToggle={(v) => onUpdateModule('beastModeDashboard', { showWakaTime: v })}
                  label="WakaTime Practice Time Card"
                  description="Auto-synced IDE practice metrics"
                  icon="⏱️"
                />
              </div>
            )}
          </div>
        )}

        {/* ── TAB 4: GITHUB ANALYTICS & TROPHIES ── */}
        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <TrophyCustomizer
              theme={theme}
              showTrophies={modules.githubAnalytics.showTrophies}
              showNextAchievements={modules.githubAnalytics.showNextAchievements}
              onUpdate={(data) => onUpdateModule('githubAnalytics', data)}
            />
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">GitHub Performance Cards</span>
                <span className="text-[11px] text-slate-400">Profile summary cards, language charts, trophies</span>
              </div>
              <ToggleSwitch
                enabled={modules.githubAnalytics.enabled}
                onToggle={(v) => onUpdateModule('githubAnalytics', { enabled: v })}
                label=""
              />
            </div>

            {modules.githubAnalytics.enabled && (
              <div className="space-y-2 pt-1">
                <ToggleSwitch
                  enabled={modules.githubAnalytics.showProfileDetailsCard}
                  onToggle={(v) => onUpdateModule('githubAnalytics', { showProfileDetailsCard: v })}
                  label="Profile Summary Header Card"
                  icon="⚡"
                />
                <ToggleSwitch
                  enabled={modules.githubAnalytics.showReposPerLanguage}
                  onToggle={(v) => onUpdateModule('githubAnalytics', { showReposPerLanguage: v })}
                  label="Repos Per Language Card"
                  icon="📊"
                />
                <ToggleSwitch
                  enabled={modules.githubAnalytics.showMostCommitLanguage}
                  onToggle={(v) => onUpdateModule('githubAnalytics', { showMostCommitLanguage: v })}
                  label="Most Commit Language Card"
                  icon="💬"
                />
                <ToggleSwitch
                  enabled={modules.githubAnalytics.showActivityWave}
                  onToggle={(v) => onUpdateModule('githubAnalytics', { showActivityWave: v })}
                  label="Weekly Code Intensity Graph"
                  icon="📈"
                />
                <ToggleSwitch
                  enabled={modules.githubAnalytics.showTrophies}
                  onToggle={(v) => onUpdateModule('githubAnalytics', { showTrophies: v })}
                  label="GitHub Trophies Showcase"
                  icon="🏆"
                />
                <ToggleSwitch
                  enabled={modules.githubAnalytics.showNextAchievements}
                  onToggle={(v) => onUpdateModule('githubAnalytics', { showNextAchievements: v })}
                  label="Next Achievements to Unlock Badges"
                  icon="🎯"
                />
              </div>
            )}
          </div>
        )}

        {/* ── TAB 5: EDUCATION & SKILL PROFICIENCY ── */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Education & Skills Journey</span>
                <span className="text-[11px] text-slate-400">Academic path, SkillIcons grid, LeetCode card</span>
              </div>
              <ToggleSwitch
                enabled={modules.educationAndSkills.enabled}
                onToggle={(v) => onUpdateModule('educationAndSkills', { enabled: v })}
                label=""
              />
            </div>

            {modules.educationAndSkills.enabled && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">University / Institute Badge</label>
                  <input
                    type="text"
                    value={modules.educationAndSkills.institutionName}
                    onChange={(e) => onUpdateModule('educationAndSkills', { institutionName: e.target.value })}
                    placeholder="VidhyaDeep_University"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">LeetCode Username</label>
                  <input
                    type="text"
                    value={modules.educationAndSkills.leetCodeUsername || ''}
                    onChange={(e) => onUpdateModule('educationAndSkills', { leetCodeUsername: e.target.value })}
                    placeholder="Fr_Nurul"
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <ToggleSwitch
                    enabled={modules.educationAndSkills.showTopLangsPie}
                    onToggle={(v) => onUpdateModule('educationAndSkills', { showTopLangsPie: v })}
                    label="Show Top Languages Pie Chart"
                    icon="🥧"
                  />
                  <ToggleSwitch
                    enabled={modules.educationAndSkills.showLeetCodeCard}
                    onToggle={(v) => onUpdateModule('educationAndSkills', { showLeetCodeCard: v })}
                    label="Show LeetCode Ranking Card"
                    icon="🧠"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 6: TECHNOLOGY ARSENAL ── */}
        {activeTab === 'arsenal' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Technology Arsenal Grid</span>
                <span className="text-[11px] text-slate-400">High-res icons with skill level pills</span>
              </div>
              <ToggleSwitch
                enabled={modules.techArsenal.enabled}
                onToggle={(v) => onUpdateModule('techArsenal', { enabled: v })}
                label=""
              />
            </div>

            {modules.techArsenal.enabled && (
              <div className="space-y-2">
                <BadgePicker
                  selectedSlugs={modules.techStack.badges}
                  onAdd={onAddBadge}
                  onRemove={onRemoveBadge}
                  onApplyRole={onApplyRolePreset}
                />
              </div>
            )}
          </div>
        )}

        {/* ── TAB 7: ABOUT ME ── */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">About Me & Facts</span>
                <span className="text-[11px] text-slate-400">Developer bio & structured bullet facts</span>
              </div>
              <ToggleSwitch
                enabled={modules.aboutMe.enabled}
                onToggle={(v) => onUpdateModule('aboutMe', { enabled: v })}
                label=""
              />
            </div>

            {modules.aboutMe.enabled && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Bio Summary</label>
                  <textarea
                    rows={3}
                    value={modules.aboutMe.bioText}
                    onChange={(e) => onUpdateModule('aboutMe', { bioText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500 resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-300 block">Developer Fact Bullets</span>
                  <input
                    type="text"
                    value={modules.aboutMe.quickFacts.currentWork}
                    onChange={(e) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, currentWork: e.target.value }
                    })}
                    placeholder="🔭 Working on..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={modules.aboutMe.quickFacts.learning}
                    onChange={(e) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, learning: e.target.value }
                    })}
                    placeholder="🌱 Learning..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    value={modules.aboutMe.quickFacts.askMe}
                    onChange={(e) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, askMe: e.target.value }
                    })}
                    placeholder="💬 Ask me about..."
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 8: GAMES & MEDIA ── */}
        {activeTab === 'games' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Break-Out & Snake Game</span>
                <span className="text-[11px] text-slate-400">Animated commit history game banner</span>
              </div>
              <ToggleSwitch
                enabled={modules.gameSuite.enabled}
                onToggle={(v) => onUpdateModule('gameSuite', { enabled: v })}
                label=""
              />
            </div>

            {modules.gameSuite.enabled && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Select Interactive Game</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'snake', label: 'Snake 🐍' },
                      { id: 'breakout', label: 'Breaker 🧱' },
                      { id: 'pacman', label: 'Pac-Man 👾' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => onUpdateModule('gameSuite', { gameType: g.id as any })}
                        className={`py-2 px-2 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
                          modules.gameSuite.gameType === g.id
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Banner Motto Quote</label>
                  <input
                    type="text"
                    value={modules.gameSuite.motto}
                    onChange={(e) => onUpdateModule('gameSuite', { motto: e.target.value })}
                    placeholder="Code. Commit. Conquer."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 9: SOCIAL & CONNECT ── */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">Socials & Connect Matrix</span>
                <span className="text-[11px] text-slate-400">Shields.io badges & meeting links</span>
              </div>
              <ToggleSwitch
                enabled={modules.socialLinks.enabled}
                onToggle={(v) => onUpdateModule('socialLinks', { enabled: v })}
                label=""
              />
            </div>

            {modules.socialLinks.enabled && (
              <div className="space-y-2.5">
                <input
                  type="text"
                  value={modules.socialLinks.github}
                  onChange={(e) => onUpdateModule('socialLinks', { github: e.target.value })}
                  placeholder="GitHub Username"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={modules.socialLinks.linkedin}
                  onChange={(e) => onUpdateModule('socialLinks', { linkedin: e.target.value })}
                  placeholder="LinkedIn Profile Handle"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={modules.socialLinks.email}
                  onChange={(e) => onUpdateModule('socialLinks', { email: e.target.value })}
                  placeholder="Email Address"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={modules.socialLinks.behance}
                  onChange={(e) => onUpdateModule('socialLinks', { behance: e.target.value })}
                  placeholder="Behance Handle"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={modules.socialLinks.instagram}
                  onChange={(e) => onUpdateModule('socialLinks', { instagram: e.target.value })}
                  placeholder="Instagram Handle"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
            )}
          </div>
        )}

        {/* ── TAB 10: INTERACTIVE WIDGETS & FOOTER ── */}
        {activeTab === 'widgets' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <ToggleSwitch
                enabled={modules.interactiveWidgets.showDailyDevQuote}
                onToggle={(v) => onUpdateModule('interactiveWidgets', { showDailyDevQuote: v })}
                label="Show Daily Dev Quote Card"
              />
              <ToggleSwitch
                enabled={modules.interactiveWidgets.showCodingChallenge}
                onToggle={(v) => onUpdateModule('interactiveWidgets', { showCodingChallenge: v })}
                label="Show Interactive Daily Challenge Dropdown"
              />
              <ToggleSwitch
                enabled={modules.interactiveWidgets.showPersonalPhilosophy}
                onToggle={(v) => onUpdateModule('interactiveWidgets', { showPersonalPhilosophy: v })}
                label="Show Personal Philosophy & Mantras"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
