'use client';

import { useState } from 'react';
import {
  FiUser,
  FiCode,
  FiBarChart2,
  FiGrid,
  FiPlay,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCopy,
  FiDownload,
  FiZap,
  FiPlus,
  FiTrash2,
  FiBriefcase,
  FiCpu,
  FiDatabase,
  FiCloud,
  FiSmartphone,
  FiTerminal,
  FiAward,
  FiShare2,
  FiLayers,
  FiStar,
  FiBox,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useEditorStore } from '@/stores/editor-store';
import { BADGE_DATABASE } from '@/lib/badge-registry';
import { MarkdownPreview } from './markdown-preview';

interface ReadmeWizardProps {
  username: string;
  onComplete: () => void;
  onOpenDeployModal: () => void;
}

const WIZARD_STEPS = [
  { id: 1, name: '1. Basic Identity', icon: FiUser, desc: 'Name, subtitle & location' },
  { id: 2, name: '2. Header & Typing SVG', icon: FiTerminal, desc: 'Header banner style & typing lines' },
  { id: 3, name: '3. About Me Matrix', icon: FiBriefcase, desc: 'Role, learning goals & quick facts' },
  { id: 4, name: '4. Featured Projects', icon: FiStar, desc: 'Showcase top repositories & star counts' },
  { id: 5, name: '5. Frontend Stack', icon: FiCode, desc: 'React, Next.js, Vue, Tailwind, etc.' },
  { id: 6, name: '6. Backend & APIs', icon: FiCpu, desc: 'Node.js, Python, Go, Rust, Java' },
  { id: 7, name: '7. Databases & Storage', icon: FiDatabase, desc: 'PostgreSQL, Mongo, Redis, Supabase' },
  { id: 8, name: '8. DevOps & Cloud', icon: FiCloud, desc: 'Docker, K8s, AWS, Actions, Linux' },
  { id: 9, name: '9. Mobile & Cross-Platform', icon: FiSmartphone, desc: 'React Native, Flutter, Swift, Kotlin' },
  { id: 10, name: '10. AI, ML & Data Science', icon: FiCpu, desc: 'PyTorch, TensorFlow, OpenCV, Pandas' },
  { id: 11, name: '11. GitHub Analytics', icon: FiBarChart2, desc: 'Stats, Streak, Languages & Views' },
  { id: 12, name: '12. GitHub Trophies', icon: FiAward, desc: 'Showcase rank trophies & secret badges' },
  { id: 13, name: '13. Platform Metrics', icon: FiZap, desc: 'LeetCode, WakaTime & Spotify' },
  { id: 14, name: '14. Social & Contact', icon: FiShare2, desc: 'LinkedIn, Twitter/X, Email, Discord' },
  { id: 15, name: '15. Dividers & Themes', icon: FiGrid, desc: 'Pick divider styles & color theme' },
  { id: 16, name: '16. Arcade Mini-Games', icon: FiPlay, desc: 'Embed Snake, Brick Breaker & Pac-Man' },
  { id: 17, name: '17. Custom Footer', icon: FiLayers, desc: 'Closing statement & status badge' },
  { id: 18, name: '18. Review & Export', icon: FiCheckCircle, desc: 'Preview & download README' },
];

const SKILL_MAP: Record<string, string[]> = {
  frontend: ['react', 'nextjs', 'typescript', 'javascript', 'tailwind', 'vue', 'angular', 'svelte', 'html5', 'css3', 'redux', 'vite', 'webpack', 'sass'],
  backend: ['nodejs', 'express', 'python', 'django', 'fastapi', 'go', 'java', 'springboot', 'rust', 'graphql', 'nest', 'cplusplus', 'csharp'],
  databases: ['postgresql', 'mongodb', 'mysql', 'redis', 'supabase', 'firebase', 'prisma', 'sqlite', 'elasticsearch'],
  devops: ['docker', 'kubernetes', 'aws', 'gcp', 'azure', 'git', 'github', 'linux', 'nginx', 'terraform', 'ansible'],
  mobile: ['react', 'flutter', 'swift', 'kotlin', 'android', 'ios', 'electron'],
  aiml: ['python', 'pytorch', 'tensorflow', 'opencv', 'pandas', 'numpy', 'scikit-learn'],
};

const DIVIDER_STYLES = [
  { id: 'markdown-line', name: 'Minimal Line', icon: '➖' },
  { id: 'capsule-glow', name: 'Glow Capsule', icon: '✨' },
  { id: 'rainbow-accent', name: 'Accent Bar', icon: '🔷' },
  { id: 'subtle-border', name: 'Dotted Border', icon: '💬' },
];

function getBadgeLabel(slug: string): string {
  const item = BADGE_DATABASE.find((b) => b.id === slug || b.logo === slug);
  return item ? item.name : slug;
}

export function ReadmeWizard({ username, onComplete, onOpenDeployModal }: ReadmeWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const { modules, updateModule, addBadge, removeBadge, markdown, regenerateMarkdown, theme, setTheme } = useEditorStore();

  const [typingInput, setTypingInput] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');

  const handleNext = () => {
    regenerateMarkdown(username);
    if (currentStep < 18) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleAddTypingLine = () => {
    if (!typingInput.trim()) return;
    const currentLines = modules.headerBanner?.typingLines || [];
    updateModule('headerBanner', {
      typingLines: [...currentLines, typingInput.trim()],
    });
    setTypingInput('');
    toast.success('Line added to typing animation!');
  };

  const handleRemoveTypingLine = (index: number) => {
    const currentLines = modules.headerBanner?.typingLines || [];
    updateModule('headerBanner', {
      typingLines: currentLines.filter((_, i) => i !== index),
    });
  };

  const isBadgeSelected = (slug: string) => {
    return (modules.techStack?.badges || []).includes(slug);
  };

  const toggleBadge = (slug: string) => {
    if (isBadgeSelected(slug)) {
      removeBadge(slug);
    } else {
      addBadge(slug);
    }
    regenerateMarkdown(username);
  };

  const handleAddProject = () => {
    if (!newProjectName.trim()) return;
    const currentRepos = modules.featuredRepos?.repos || [];
    updateModule('featuredRepos', {
      enabled: true,
      repos: [
        ...currentRepos,
        {
          name: newProjectName.trim(),
          description: newProjectDesc.trim() || 'Awesome project',
          url: newProjectUrl.trim() || `https://github.com/${username}/${newProjectName.trim()}`,
          stargazerCount: 12,
          primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
        },
      ],
    });
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectUrl('');
    toast.success('Featured project added!');
  };

  const handleRemoveProject = (index: number) => {
    const currentRepos = modules.featuredRepos?.repos || [];
    updateModule('featuredRepos', {
      repos: currentRepos.filter((_, i) => i !== index),
    });
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success('README Markdown copied to clipboard!');
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
    toast.success('README.md downloaded successfully!');
  };

  const currentStepObj = WIZARD_STEPS.find((s) => s.id === currentStep) || WIZARD_STEPS[0];
  const StepIcon = currentStepObj.icon;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
      {/* Wizard Header Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-lg">
              <StepIcon size={20} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Step {currentStep} of 18</span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{currentStepObj.name}</span>
              </h3>
            </div>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">{currentStepObj.desc}</span>
        </div>

        {/* Scrollable Step Selector Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          {WIZARD_STEPS.map((step) => {
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  regenerateMarkdown(username);
                  setCurrentStep(step.id);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                    : isCompleted
                    ? 'bg-slate-800/80 border-slate-700 text-emerald-400'
                    : 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>{step.id}.</span>
                <span>{step.name.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="border-slate-800" />

      {/* Step Body Container */}
      <div className="min-h-[400px]">
        {/* STEP 1: BASIC IDENTITY */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Full Name / Display Title</label>
                <input
                  type="text"
                  value={modules.headerBanner?.title || ''}
                  onChange={(e) => updateModule('headerBanner', { title: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Subtitle / Role Headline</label>
                <input
                  type="text"
                  value={modules.headerBanner?.subtitle || ''}
                  onChange={(e) => updateModule('headerBanner', { subtitle: e.target.value })}
                  placeholder="e.g. Senior Full-Stack Engineer & Open Source Builder"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Location / Base</label>
                <input
                  type="text"
                  value={modules.aboutMe?.bioText || ''}
                  onChange={(e) => updateModule('aboutMe', { bioText: e.target.value })}
                  placeholder="e.g. San Francisco, CA 🌉"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1.5">Contact Email</label>
                <input
                  type="email"
                  value={modules.beastModeDashboard?.email || ''}
                  onChange={(e) => updateModule('beastModeDashboard', { email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: HEADER & TYPING SVG */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Header Banner Style</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { id: 'venom-capsule', name: 'Venom Capsule', desc: 'Sleek animated capsule header' },
                  { id: 'waving-capsule', name: 'Waving Wave', desc: 'Smooth wave banner effect' },
                  { id: 'cyberpunk-glitch', name: 'Glitch Cyber', desc: 'Futuristic geometric sliced style' },
                  { id: 'terminal-prompt', name: 'Terminal Shell', desc: 'Command prompt CLI header' },
                  { id: 'handwritten-script', name: 'Handwritten', desc: 'Elegant signature script' },
                  { id: 'minimal', name: 'Minimal Text', desc: 'Clean standard H1 title' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => updateModule('headerBanner', { headerStyle: st.id as any })}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                      modules.headerBanner?.headerStyle === st.id
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white mb-0.5">{st.name}</div>
                    <div className="text-[10px] text-slate-400">{st.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Typing Animation Lines</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={typingInput}
                  onChange={(e) => setTypingInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTypingLine()}
                  placeholder="e.g. Building high performance cloud systems 🚀"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTypingLine}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <FiPlus size={14} />
                  <span>Add Line</span>
                </button>
              </div>

              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {(modules.headerBanner?.typingLines || []).map((line, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                    <span className="font-mono">{line}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTypingLine(idx)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: ABOUT ME MATRIX */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">🔭 Current Work / Project</label>
                <input
                  type="text"
                  value={modules.aboutMe?.quickFacts?.currentWork || ''}
                  onChange={(e) =>
                    updateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe?.quickFacts, currentWork: e.target.value } as any,
                    })
                  }
                  placeholder="e.g. Building microservices at Acme Corp"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">🌱 Currently Learning</label>
                <input
                  type="text"
                  value={modules.aboutMe?.quickFacts?.learning || ''}
                  onChange={(e) =>
                    updateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe?.quickFacts, learning: e.target.value } as any,
                    })
                  }
                  placeholder="e.g. Distributed Systems & Rust"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">👯 Looking to Collaborate On</label>
                <input
                  type="text"
                  value={modules.aboutMe?.quickFacts?.collaborate || ''}
                  onChange={(e) =>
                    updateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe?.quickFacts, collaborate: e.target.value } as any,
                    })
                  }
                  placeholder="e.g. Open source developer tooling"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">⚡ Fun Fact</label>
                <input
                  type="text"
                  value={modules.aboutMe?.quickFacts?.funFact || ''}
                  onChange={(e) =>
                    updateModule('aboutMe', {
                      quickFacts: { ...modules.aboutMe?.quickFacts, funFact: e.target.value } as any,
                    })
                  }
                  placeholder="e.g. I have brewed over 500 cups of espresso"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: FEATURED PROJECTS */}
        {currentStep === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <FiPlus className="text-blue-400" />
                <span>Add Featured Project / Repository</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Project Name (e.g. SynthetixGit)"
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Description"
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={newProjectUrl}
                  onChange={(e) => setNewProjectUrl(e.target.value)}
                  placeholder="GitHub URL"
                  className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={handleAddProject}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FiPlus size={14} />
                <span>Add Project to Showcase</span>
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {(modules.featuredRepos?.repos || []).map((repo, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">{repo.name}</span>
                    <span className="text-slate-400 block text-[11px]">{repo.description}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(idx)}
                    className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: FRONTEND STACK */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-slate-400">Select Frontend Technologies for your README badge section:</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_MAP.frontend.map((slug) => {
                const label = getBadgeLabel(slug);
                const selected = isBadgeSelected(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => toggleBadge(slug)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selected ? '#3b82f6' : '#64748b' }} />
                    <span>{label}</span>
                    {selected && <FiCheck size={12} className="text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: BACKEND & APIS */}
        {currentStep === 6 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-slate-400">Select Backend &amp; API Technologies:</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_MAP.backend.map((slug) => {
                const label = getBadgeLabel(slug);
                const selected = isBadgeSelected(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => toggleBadge(slug)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selected ? '#3b82f6' : '#64748b' }} />
                    <span>{label}</span>
                    {selected && <FiCheck size={12} className="text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: DATABASES */}
        {currentStep === 7 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-slate-400">Select Database &amp; Storage Tech:</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_MAP.databases.map((slug) => {
                const label = getBadgeLabel(slug);
                const selected = isBadgeSelected(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => toggleBadge(slug)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selected ? '#3b82f6' : '#64748b' }} />
                    <span>{label}</span>
                    {selected && <FiCheck size={12} className="text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 8: DEVOPS & CLOUD */}
        {currentStep === 8 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-slate-400">Select DevOps &amp; Cloud Tech:</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_MAP.devops.map((slug) => {
                const label = getBadgeLabel(slug);
                const selected = isBadgeSelected(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => toggleBadge(slug)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selected ? '#3b82f6' : '#64748b' }} />
                    <span>{label}</span>
                    {selected && <FiCheck size={12} className="text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 9: MOBILE */}
        {currentStep === 9 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-slate-400">Select Mobile &amp; Cross-Platform Tech:</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_MAP.mobile.map((slug) => {
                const label = getBadgeLabel(slug);
                const selected = isBadgeSelected(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => toggleBadge(slug)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selected ? '#3b82f6' : '#64748b' }} />
                    <span>{label}</span>
                    {selected && <FiCheck size={12} className="text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 10: AI & ML */}
        {currentStep === 10 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <p className="text-xs text-slate-400">Select AI, Machine Learning &amp; Data Science Tech:</p>
            <div className="flex flex-wrap gap-2">
              {SKILL_MAP.aiml.map((slug) => {
                const label = getBadgeLabel(slug);
                const selected = isBadgeSelected(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => toggleBadge(slug)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                      selected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selected ? '#3b82f6' : '#64748b' }} />
                    <span>{label}</span>
                    {selected && <FiCheck size={12} className="text-blue-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 11: GITHUB ANALYTICS */}
        {currentStep === 11 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-white">GitHub Analytics Widgets</h4>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules.githubAnalytics?.showStatsCard}
                    onChange={(e) => updateModule('githubAnalytics', { showStatsCard: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Show GitHub Stats Card</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules.githubAnalytics?.showActivityWave}
                    onChange={(e) => updateModule('githubAnalytics', { showActivityWave: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Show Streak Stats Card</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules.githubAnalytics?.showReposPerLanguage}
                    onChange={(e) => updateModule('githubAnalytics', { showReposPerLanguage: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Show Top Languages Breakdown</span>
                </label>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-white">Growth &amp; View Counters</h4>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules.beastModeDashboard?.showProfileViews}
                    onChange={(e) => updateModule('beastModeDashboard', { showProfileViews: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Enable Live Profile Views Counter</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules.beastModeDashboard?.showGrowthMetrics}
                    onChange={(e) => updateModule('beastModeDashboard', { showGrowthMetrics: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Show Followers &amp; Stars Badges</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 12: GITHUB TROPHIES */}
        {currentStep === 12 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white">GitHub Trophies Showcase</h4>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modules.githubAnalytics?.showTrophies}
                  onChange={(e) => updateModule('githubAnalytics', { showTrophies: e.target.checked })}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Include GitHub Trophy Ranks in README</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 13: PLATFORM METRICS */}
        {currentStep === 13 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-white">Coding Platforms</h4>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">LeetCode Username</label>
                  <input
                    type="text"
                    value={modules.educationAndSkills?.leetCodeUsername || ''}
                    onChange={(e) =>
                      updateModule('educationAndSkills', {
                        showLeetCodeCard: true,
                        leetCodeUsername: e.target.value,
                      })
                    }
                    placeholder="e.g. alex_rivera"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <h4 className="text-xs font-bold text-white">Interactive Widgets</h4>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules.interactiveWidgets?.showDailyDevQuote}
                    onChange={(e) => updateModule('interactiveWidgets', { showDailyDevQuote: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Show Daily Dev Quote Widget</span>
                </label>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modules.interactiveWidgets?.showCodingChallenge}
                    onChange={(e) => updateModule('interactiveWidgets', { showCodingChallenge: e.target.checked })}
                    className="rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>Show Daily Coding Challenge</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 14: SOCIAL & CONTACT */}
        {currentStep === 14 && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={modules.socialLinks?.linkedin || ''}
                  onChange={(e) => updateModule('socialLinks', { linkedin: e.target.value, enabled: true })}
                  placeholder="e.g. in/alex-rivera"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Twitter / X Handle</label>
                <input
                  type="text"
                  value={modules.socialLinks?.twitter || ''}
                  onChange={(e) => updateModule('socialLinks', { twitter: e.target.value, enabled: true })}
                  placeholder="e.g. alex_dev"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Portfolio URL</label>
                <input
                  type="text"
                  value={modules.socialLinks?.portfolio || ''}
                  onChange={(e) => updateModule('socialLinks', { portfolio: e.target.value, enabled: true })}
                  placeholder="e.g. https://alexrivera.dev"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Discord / Community</label>
                <input
                  type="text"
                  value={modules.socialLinks?.discord || ''}
                  onChange={(e) => updateModule('socialLinks', { discord: e.target.value, enabled: true })}
                  placeholder="e.g. alex#1234"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 15: DIVIDERS & THEMES */}
        {currentStep === 15 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Section Divider Style</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {DIVIDER_STYLES.map((div) => {
                  const selected = modules.sectionDivider?.style === div.id;
                  return (
                    <button
                      key={div.id}
                      type="button"
                      onClick={() => updateModule('sectionDivider', { style: div.id as any })}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xl mb-1">{div.icon}</div>
                      <div className="text-xs font-bold">{div.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">Select Theme Color Palette</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'github_dark', name: 'GitHub Dark' },
                  { id: 'dracula', name: 'Dracula Slate' },
                  { id: 'tokyonight', name: 'Tokyo Night' },
                  { id: 'catppuccin', name: 'Catppuccin' },
                  { id: 'nord', name: 'Nord Minimal' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id as any)}
                    className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      theme === t.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 16: ARCADE MINI-GAMES */}
        {currentStep === 16 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 text-xs text-blue-300 leading-relaxed">
              🎮 <strong>Embed Mini-Games</strong> directly into your README markdown. Anyone clicking on them from GitHub will open the game on SynthetixGit and experience your profile!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: 'snake', name: 'Contribution Snake Run', desc: 'Classic snake game traversing green contribution tiles', icon: '🐍' },
                { id: 'breakout', name: 'Commit Brick Breaker', desc: 'Arcade breakout game smashing code block bricks', icon: '🧱' },
                { id: 'pacman', name: 'Code Pac-Man', desc: 'Navigate mazes eating repo commits and dodging bugs', icon: '👾' },
              ].map((game) => {
                const isEnabled = modules.gameSuite?.enabled;
                const isSelected = isEnabled && modules.gameSuite?.gameType === game.id;
                return (
                  <button
                    key={game.id}
                    type="button"
                    onClick={() =>
                      updateModule('gameSuite', {
                        enabled: !isSelected,
                        gameType: game.id as any,
                      })
                    }
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-2xl mb-2">{game.icon}</div>
                    <div className="text-xs font-bold text-white mb-1">{game.name}</div>
                    <div className="text-[11px] text-slate-400">{game.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 17: CUSTOM FOOTER */}
        {currentStep === 17 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Footer Closing Statement</label>
                <input
                  type="text"
                  value={modules.footer?.closingText || ''}
                  onChange={(e) => updateModule('footer', { closingText: e.target.value, enabled: true })}
                  placeholder="e.g. Thanks for visiting my GitHub profile! 🚀"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modules.footer?.showVisitorBadge}
                  onChange={(e) => updateModule('footer', { showVisitorBadge: e.target.checked })}
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Include Visitor Badge Counter in Footer</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 18: REVIEW & EXPORT */}
        {currentStep === 18 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white flex items-center gap-2">
                <FiZap className="text-blue-400" />
                <span>Live Generated README Preview</span>
              </h4>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FiCopy size={13} />
                  <span>Copy Markdown</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReadme}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FiDownload size={13} />
                  <span>Download README.md</span>
                </button>
              </div>
            </div>

            <div className="max-h-[350px] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <MarkdownPreview markdown={markdown} username={username} />
            </div>
          </div>
        )}
      </div>

      <hr className="border-slate-800" />

      {/* Navigation Footer */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
        >
          <FiArrowLeft size={14} />
          <span>Previous</span>
        </button>

        {currentStep < 18 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <span>Next Step ({currentStep + 1}/18)</span>
            <FiArrowRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              regenerateMarkdown(username);
              onOpenDeployModal();
            }}
            className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
          >
            <FiZap size={14} />
            <span>Finish &amp; Export README 🚀</span>
          </button>
        )}
      </div>
    </div>
  );
}
