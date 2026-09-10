'use client';

import { useEffect, useState } from 'react';
import { FiX, FiCheck, FiGithub, FiUploadCloud, FiExternalLink, FiKey, FiInfo, FiDownload, FiChevronDown, FiChevronRight, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  markdown: string;
  workflowYaml?: string | null;
}

interface AuthSession {
  authenticated: boolean;
  username?: string;
  tokenPreview?: string;
}

export function DeployModal({
  isOpen,
  onClose,
  username,
  markdown,
  workflowYaml,
}: DeployModalProps) {
  const [token, setToken] = useState('');
  const [commitMsg, setCommitMsg] = useState('feat: update profile README via SynthetixGit Studio 🚀');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedRepoUrl, setDeployedRepoUrl] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);
  const [authSession, setAuthSession] = useState<AuthSession | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    let cancelled = false;
    setAuthLoading(true);
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data: AuthSession) => {
        if (!cancelled) setAuthSession(data);
      })
      .catch(() => {
        if (!cancelled) setAuthSession({ authenticated: false });
      })
      .finally(() => {
        if (!cancelled) setAuthLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthSession({ authenticated: false });
    toast.success('Disconnected from GitHub');
  };

  const oauthReturnTo = `/studio?user=${encodeURIComponent(username)}&mode=profile`;

  if (!isOpen) return null;

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      const res = await fetch('/api/github/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          token: token.trim() || undefined,
          markdown,
          workflowYaml: workflowYaml || undefined,
          commitMessage: commitMsg,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Deployment failed');

      setDeployedRepoUrl(data.repoUrl);
      toast.success('Successfully deployed to your GitHub profile repo!');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Deployment error';
      toast.error(message);
    } finally {
      setIsDeploying(false);
    }
  };

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadReadme = () => {
    downloadFile(markdown, 'README.md', 'text/markdown');
    toast.success('README.md downloaded!');
  };

  const handleDownloadWorkflow = () => {
    if (!workflowYaml) {
      toast.error('No workflow YAML available');
      return;
    }
    downloadFile(workflowYaml, 'snake.yml', 'text/yaml');
    toast.success('snake.yml downloaded!');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <FiUploadCloud size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">1-Click GitHub Deployer</h2>
              <p className="text-[11px] text-slate-400">Push directly to @{username}/{username}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <FiX size={18} />
          </button>
        </div>

        {deployedRepoUrl ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto text-2xl">
              <FiCheck size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Profile Successfully Deployed!</h3>
              <p className="text-xs text-slate-400 mt-1">Your GitHub profile README is now live.</p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={deployedRepoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/25"
              >
                <span>View on GitHub</span>
                <FiExternalLink size={13} />
              </a>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* RECOMMENDED: DOWNLOAD */}
            <div className="rounded-2xl border border-blue-500/30 bg-blue-600/10 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📥</span>
                  <h3 className="text-xs font-bold text-white">Recommended · Download README</h3>
                </div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider bg-blue-500/20 px-2 py-0.5 rounded-full">Instant</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Download your generated <code className="text-blue-300">README.md</code> file and place it in your special GitHub repository <code className="text-blue-300">github.com/{username}/{username}</code>.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadReadme}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  <FiDownload size={14} />
                  <span>Download README.md</span>
                </button>
                <a
                  href={`https://github.com/${username}/${username}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <FiGithub size={14} />
                  <span>Open @{username}/{username}</span>
                  <FiExternalLink size={12} />
                </a>
              </div>
              {workflowYaml && (
                <button
                  type="button"
                  onClick={handleDownloadWorkflow}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FiDownload size={12} />
                  <span>Download GitHub Actions Snake Workflow (snake.yml)</span>
                </button>
              )}
            </div>

            {/* GITHUB OAUTH CONNECT + DIRECT DEPLOY */}
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-600/10 p-4 space-y-3">
              <h3 className="text-xs font-bold text-white flex items-center gap-2">
                <FiGithub size={14} className="text-emerald-400" />
                <span>Advanced · Direct API Deploy (OAuth or PAT)</span>
              </h3>

              {authLoading ? (
                <p className="text-[11px] text-slate-400">Checking GitHub connection…</p>
              ) : authSession?.authenticated ? (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-2">
                  <div>
                    <p className="text-[11px] text-emerald-300 font-bold">
                      Connected as @{authSession.username}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">{authSession.tokenPreview}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold flex items-center gap-1"
                  >
                    <FiLogOut size={11} />
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Authorize SynthetixGit to push READMEs to your profile repo. Requires a GitHub OAuth App configured on Vercel.
                  </p>
                  <a
                    href={`/api/auth/github?returnTo=${encodeURIComponent(oauthReturnTo)}`}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#24292f] hover:bg-[#2f363d] border border-slate-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FiGithub size={15} />
                    <span>Connect with GitHub →</span>
                  </a>
                  <a
                    href="https://github.com/settings/developers"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-blue-400"
                  >
                    <FiExternalLink size={10} />
                    Configure OAuth App on GitHub
                  </a>
                </div>
              )}

              <div className="pt-1 border-t border-slate-800/80">
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5">
                  Or paste a Personal Access Token (repo + workflow scopes)
                </label>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxx"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Commit Message</label>
              <input
                type="text"
                value={commitMsg}
                onChange={(e) => setCommitMsg(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Target Repository:</span>
                <span className="font-mono text-blue-400 font-bold">github.com/{username}/{username}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Target Branch:</span>
                <span className="font-mono text-slate-300 font-bold">main</span>
              </div>
              {workflowYaml && (
                <div className="flex items-center justify-between text-emerald-400">
                  <span>GitHub Actions Workflow:</span>
                  <span className="font-mono font-bold">.github/workflows/snake.yml</span>
                </div>
              )}
            </div>

            <div className="rounded-xl border border-slate-800 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowTips(!showTips)}
                className="w-full p-3 flex items-center justify-between bg-slate-900 hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">💡</span>
                  <span className="text-xs font-bold text-slate-300">
                    How to create a GitHub PAT with repo + workflow scopes
                  </span>
                </div>
                {showTips ? (
                  <FiChevronDown size={14} className="text-slate-500 shrink-0" />
                ) : (
                  <FiChevronRight size={14} className="text-slate-500 shrink-0" />
                )}
              </button>
              {showTips && (
                <div className="p-4 pt-2 space-y-2 border-t border-slate-800 bg-slate-950/50">
                  <ol className="text-[11px] text-slate-400 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Go to <span className="text-slate-300 font-semibold">github.com</span> and click your profile avatar → <span className="text-slate-300 font-semibold">Settings</span></li>
                    <li>Scroll down and click <span className="text-slate-300 font-semibold">Developer settings</span> (bottom of the sidebar)</li>
                    <li>Select <span className="text-slate-300 font-semibold">Personal access tokens</span> → <span className="text-slate-300 font-semibold">Tokens (classic)</span></li>
                    <li>Click <span className="text-slate-300 font-semibold">Generate new token</span> → Generate new token (classic)</li>
                    <li>Give it a name, set an expiration, then <strong className="text-amber-400">check</strong> the <code className="text-slate-300 bg-slate-800 px-1 rounded">repo</code> and <code className="text-slate-300 bg-slate-800 px-1 rounded">workflow</code> scopes</li>
                    <li>Click <span className="text-slate-300 font-semibold">Generate token</span> and <strong className="text-emerald-400">copy it immediately</strong> (you won't see it again)</li>
                  </ol>
                  <a
                    href="https://github.com/settings/tokens/new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-all border border-slate-700"
                  >
                    <FiExternalLink size={11} />
                    Open token generation page
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                disabled={isDeploying}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeploy}
                disabled={isDeploying || (!authSession?.authenticated && !token.trim())}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50"
              >
                {isDeploying ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Deploying...</span>
                  </>
                ) : (
                  <>
                    <FiGithub size={14} />
                    <span>Deploy to GitHub 🚀</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
