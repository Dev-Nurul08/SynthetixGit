'use client';

import { useState } from 'react';
import { ToggleSwitch } from '@/components/ui/toggle-switch';
import { BadgePicker } from '@/components/studio/badge-picker';
import { StatsCardConfigurator } from '@/components/studio/stats-card-configurator';
import type { ModuleConfig, ThemeId, TemplateId } from '@/lib/template-engine';
import {
  FiUser,
  FiCode,
  FiBarChart2,
  FiShare2,
  FiTerminal,
  FiSmile,
  FiRefreshCw,
  FiSliders,
  FiZap,
  FiCheck,
  FiDroplet,
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
}

type TabKey = 'header' | 'about' | 'tech' | 'stats' | 'social' | 'extras';

const THEMES: { id: ThemeId; name: string; color: string }[] = [
  { id: 'github_dark', name: 'GitHub Dark', color: '#0d1117' },
  { id: 'tokyonight', name: 'Tokyo Night', color: '#1a1b26' },
  { id: 'dark', name: 'Obsidian Dark', color: '#0a0a0f' },
  { id: 'nord', name: 'Nordic Frost', color: '#2e3440' },
  { id: 'dracula', name: 'Dracula', color: '#282a36' },
  { id: 'radical', name: 'Radical Neon', color: '#141321' },
];

const TEMPLATES: { id: TemplateId; name: string; desc: string; icon: string }[] = [
  { id: 'modern-developer', name: 'Modern Developer', desc: 'Waving hand, dynamic typing & categorized badges', icon: '🚀' },
  { id: 'cyber-engineer', name: 'Cyber Engineer', desc: 'Capsule banner, full stats matrix & activity graph', icon: '👾' },
  { id: 'minimalist-clean', name: 'Minimalist Clean', desc: 'Typography-driven, flat-square badges & lean bio', icon: '🎯' },
  { id: 'fullstack-lead', name: 'Full-Stack Lead', desc: 'Enterprise layout with featured projects & metrics', icon: '💼' },
];

const QUICK_QUOTES = [
  '💡 "Code is like humor. When you have to explain it, it is bad." — Cory House',
  '⚡ "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
  '🚀 "Make it work, make it right, make it fast." — Kent Beck',
  '👾 "Talk is cheap. Show me the code." — Linus Torvalds',
  '🎯 "First, solve the problem. Then, write the code." — John Johnson',
  '☕ "I turn caffeine into scalable architectures." — Developer Motto',
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
}: SidebarControlsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('header');

  const handleRandomQuote = () => {
    const q = QUICK_QUOTES[Math.floor(Math.random() * QUICK_QUOTES.length)];
    onUpdateModule('footer', { quote: q });
  };

  const navTabs: { id: TabKey; label: string; icon: React.ReactNode }[] = [
    { id: 'header', label: 'Header', icon: <FiSliders size={14} /> },
    { id: 'about', label: 'About', icon: <FiUser size={14} /> },
    { id: 'tech', label: 'Skills', icon: <FiCode size={14} /> },
    { id: 'stats', label: 'Stats', icon: <FiBarChart2 size={14} /> },
    { id: 'social', label: 'Socials', icon: <FiShare2 size={14} /> },
    { id: 'extras', label: 'Extras', icon: <FiTerminal size={14} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0e131f] text-slate-100">
      {/* ── Top Templates Row ── */}
      <div className="p-4 border-b border-[#1e2638] bg-[#0b0f19]">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <FiZap className="text-amber-400" size={13} />
            <span>Preset Templates</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Click to apply layout</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTemplateChange(t.id)}
              className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                templateId === t.id
                  ? 'bg-blue-600/15 border-blue-500 text-white shadow-sm'
                  : 'bg-[#141a29] hover:bg-[#1a2236] border-[#222c42] text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{t.icon}</span>
                {templateId === t.id && <FiCheck size={13} className="text-blue-400" />}
              </div>
              <div className="text-xs font-bold mt-1 text-white truncate">{t.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ── */}
      <div className="px-3 pt-3 border-b border-[#1e2638] bg-[#0c101b] flex items-center gap-1 overflow-x-auto no-scrollbar">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-t-lg text-xs font-bold transition-all border-t border-x cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#0e131f] border-[#1e2638] border-b-[#0e131f] text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#141a29]'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab Content Container ── */}
      <div className="p-4 overflow-y-auto flex-1 space-y-5">
        {/* ── TAB 1: HEADER & BANNER ── */}
        {activeTab === 'header' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a29] border border-[#222c42]">
              <div>
                <span className="text-xs font-bold text-white block">Enable Header Banner</span>
                <span className="text-[11px] text-slate-400">Display title & waving hand badge</span>
              </div>
              <ToggleSwitch
                enabled={modules.headerBanner.enabled}
                onToggle={(v) => onUpdateModule('headerBanner', { enabled: v })}
                label=""
              />
            </div>

            {modules.headerBanner.enabled && (
              <div className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Header Layout Style</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'waving-hand', label: 'Waving Hand 👋' },
                      { id: 'capsule', label: 'Capsule SVG' },
                      { id: 'minimal', label: 'Minimalist' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => onUpdateModule('headerBanner', { headerStyle: style.id as any })}
                        className={`py-2 px-2.5 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
                          modules.headerBanner.headerStyle === style.id
                            ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                            : 'bg-[#141a29] border-[#222c42] text-slate-400 hover:text-slate-200'
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
                    placeholder="Your Full Name or Handle..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b13] border border-[#263147] text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Subtitle / Role Tagline</label>
                  <input
                    type="text"
                    value={modules.headerBanner.subtitle}
                    onChange={(e) => onUpdateModule('headerBanner', { subtitle: e.target.value })}
                    placeholder="e.g. Full-Stack Developer • Open Source Creator"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b13] border border-[#263147] text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Typing SVG Phrases (semicolon-separated)
                  </label>
                  <input
                    type="text"
                    value={modules.headerBanner.typingLines.join(';')}
                    onChange={(e) => onUpdateModule('headerBanner', { typingLines: e.target.value.split(';').filter(Boolean) })}
                    placeholder="Building scalable web apps;Designing clean UI"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b13] border border-[#263147] text-xs text-white placeholder-slate-500 font-mono outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: ABOUT & FACTS ── */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a29] border border-[#222c42]">
              <div>
                <span className="text-xs font-bold text-white block">Enable About Me Section</span>
                <span className="text-[11px] text-slate-400">Structured developer bullets & bio</span>
              </div>
              <ToggleSwitch
                enabled={modules.aboutMe.enabled}
                onToggle={(v) => onUpdateModule('aboutMe', { enabled: v })}
                label=""
              />
            </div>

            {modules.aboutMe.enabled && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5">Bio Summary</label>
                  <textarea
                    value={modules.aboutMe.bioText}
                    onChange={(e) => onUpdateModule('aboutMe', { bioText: e.target.value })}
                    rows={3}
                    placeholder="Describe what you build, your mission, or passions..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b13] border border-[#263147] text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 resize-y"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-300 block">Developer Fact Bullets</label>
                  <FactRow
                    label="🔭 Working on"
                    value={modules.aboutMe.quickFacts.currentWork}
                    onChange={(v) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, currentWork: v }
                    })}
                  />
                  <FactRow
                    label="🌱 Learning"
                    value={modules.aboutMe.quickFacts.learning}
                    onChange={(v) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, learning: v }
                    })}
                  />
                  <FactRow
                    label="👯 Collaborating on"
                    value={modules.aboutMe.quickFacts.collaborate}
                    onChange={(v) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, collaborate: v }
                    })}
                  />
                  <FactRow
                    label="💬 Ask me about"
                    value={modules.aboutMe.quickFacts.askMe}
                    onChange={(v) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, askMe: v }
                    })}
                  />
                  <FactRow
                    label="📫 Reach me"
                    value={modules.aboutMe.quickFacts.reachMe}
                    onChange={(v) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, reachMe: v }
                    })}
                  />
                  <FactRow
                    label="⚡ Fun fact"
                    value={modules.aboutMe.quickFacts.funFact}
                    onChange={(v) => onUpdateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe.quickFacts, funFact: v }
                    })}
                  />
                </div>

                <div className="pt-2 border-t border-[#1e2638] space-y-1">
                  <ToggleSwitch
                    enabled={modules.aboutMe.showLocation}
                    onToggle={(v) => onUpdateModule('aboutMe', { showLocation: v })}
                    label="Show Location Badge"
                  />
                  <ToggleSwitch
                    enabled={modules.aboutMe.showCompany}
                    onToggle={(v) => onUpdateModule('aboutMe', { showCompany: v })}
                    label="Show Company Badge"
                  />
                  <ToggleSwitch
                    enabled={modules.aboutMe.showBlog}
                    onToggle={(v) => onUpdateModule('aboutMe', { showBlog: v })}
                    label="Show Portfolio / Website Link"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: TECH STACK ── */}
        {activeTab === 'tech' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a29] border border-[#222c42]">
              <div>
                <span className="text-xs font-bold text-white block">Enable Skills & Tech Stack</span>
                <span className="text-[11px] text-slate-400">Display Shields.io technology badges</span>
              </div>
              <ToggleSwitch
                enabled={modules.techStack.enabled}
                onToggle={(v) => onUpdateModule('techStack', { enabled: v })}
                label=""
              />
            </div>

            {modules.techStack.enabled && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Badge Visual Style</span>
                  <div className="flex gap-1.5">
                    {(['for-the-badge', 'flat-square', 'flat'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => onUpdateModule('techStack', { style: st })}
                        className={`text-xs px-2.5 py-1 rounded-lg capitalize font-bold transition-all ${
                          modules.techStack.style === st
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500'
                            : 'bg-[#141a29] text-slate-400 hover:text-slate-200 border border-[#222c42]'
                        }`}
                      >
                        {st.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <ToggleSwitch
                  enabled={modules.techStack.categorize}
                  onToggle={(v) => onUpdateModule('techStack', { categorize: v })}
                  label="Group by Category"
                  description="Languages, Frameworks, Databases, Tools"
                />

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

        {/* ── TAB 4: GITHUB STATS & METRICS ── */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a29] border border-[#222c42]">
              <div>
                <span className="text-xs font-bold text-white block">Enable GitHub Stats Matrix</span>
                <span className="text-[11px] text-slate-400">Dynamic activity cards and streak graphs</span>
              </div>
              <ToggleSwitch
                enabled={modules.githubStats.enabled}
                onToggle={(v) => onUpdateModule('githubStats', { enabled: v })}
                label=""
              />
            </div>

            {modules.githubStats.enabled && (
              <div className="space-y-4">
                {/* Theme Selector for stats cards */}
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <FiDroplet className="text-blue-400" size={13} />
                    <span>Widget Color Theme</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {THEMES.map((th) => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => onThemeChange(th.id)}
                        className={`p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                          theme === th.id
                            ? 'bg-blue-600/15 border-blue-500 text-blue-300'
                            : 'bg-[#141a29] hover:bg-[#1a2236] border-[#222c42] text-slate-400'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full shrink-0 border border-white/20" style={{ background: th.color }} />
                        <span className="truncate">{th.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1e2638]">
                  <StatsCardConfigurator
                    statsCard={modules.githubStats}
                    onUpdate={(v) => onUpdateModule('githubStats', v)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB 5: SOCIAL LINKS ── */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#141a29] border border-[#222c42]">
              <div>
                <span className="text-xs font-bold text-white block">Enable Socials Bar</span>
                <span className="text-[11px] text-slate-400">High-res Shields.io connect badges</span>
              </div>
              <ToggleSwitch
                enabled={modules.socialLinks.enabled}
                onToggle={(v) => onUpdateModule('socialLinks', { enabled: v })}
                label=""
              />
            </div>

            {modules.socialLinks.enabled && (
              <div className="space-y-3">
                <SocialInputRow
                  label="GitHub"
                  value={modules.socialLinks.github}
                  onChange={(v) => onUpdateModule('socialLinks', { github: v })}
                  placeholder="username"
                />
                <SocialInputRow
                  label="LinkedIn"
                  value={modules.socialLinks.linkedin}
                  onChange={(v) => onUpdateModule('socialLinks', { linkedin: v })}
                  placeholder="in/username"
                />
                <SocialInputRow
                  label="Twitter / X"
                  value={modules.socialLinks.twitter}
                  onChange={(v) => onUpdateModule('socialLinks', { twitter: v })}
                  placeholder="handle"
                />
                <SocialInputRow
                  label="Discord"
                  value={modules.socialLinks.discord}
                  onChange={(v) => onUpdateModule('socialLinks', { discord: v })}
                  placeholder="invite code or username"
                />
                <SocialInputRow
                  label="YouTube"
                  value={modules.socialLinks.youtube}
                  onChange={(v) => onUpdateModule('socialLinks', { youtube: v })}
                  placeholder="@handle"
                />
                <SocialInputRow
                  label="Portfolio"
                  value={modules.socialLinks.portfolio}
                  onChange={(v) => onUpdateModule('socialLinks', { portfolio: v })}
                  placeholder="https://..."
                />
                <SocialInputRow
                  label="Email"
                  value={modules.socialLinks.email}
                  onChange={(v) => onUpdateModule('socialLinks', { email: v })}
                  placeholder="contact@domain.com"
                />
              </div>
            )}
          </div>
        )}

        {/* ── TAB 6: EXTRAS & FOOTER ── */}
        {activeTab === 'extras' && (
          <div className="space-y-4">
            {/* Snake Animation */}
            <div className="p-3.5 rounded-xl bg-[#141a29] border border-[#222c42] space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Contribution Snake Animation</span>
                  <span className="text-[11px] text-slate-400">Theme-aware commit history game</span>
                </div>
                <ToggleSwitch
                  enabled={modules.snakeAnimation.enabled}
                  onToggle={(v) => onUpdateModule('snakeAnimation', { enabled: v })}
                  label=""
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-3.5 rounded-xl bg-[#141a29] border border-[#222c42] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Enable Footer Quote & Visitor Count</span>
                  <span className="text-[11px] text-slate-400">Profile view counter & closing quote</span>
                </div>
                <ToggleSwitch
                  enabled={modules.footer.enabled}
                  onToggle={(v) => onUpdateModule('footer', { enabled: v })}
                  label=""
                />
              </div>

              {modules.footer.enabled && (
                <div className="space-y-3 pt-2 border-t border-[#1e2638]">
                  <ToggleSwitch
                    enabled={modules.footer.showVisitorBadge}
                    onToggle={(v) => onUpdateModule('footer', { showVisitorBadge: v })}
                    label="Show Profile View Counter"
                  />

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300">Quote / Motto</label>
                      <button
                        type="button"
                        onClick={handleRandomQuote}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                      >
                        <FiRefreshCw size={11} />
                        <span>Randomize</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={modules.footer.quote}
                      onChange={(e) => onUpdateModule('footer', { quote: e.target.value })}
                      placeholder="Your favorite quote..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#080b13] border border-[#263147] text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FactRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold text-slate-400 block">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-[#080b13] border border-[#263147] text-xs text-white outline-none focus:border-blue-500"
      />
    </div>
  );
}

function SocialInputRow({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-semibold text-slate-400 block">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg bg-[#080b13] border border-[#263147] text-xs text-white placeholder-slate-600 outline-none focus:border-blue-500"
      />
    </div>
  );
}
