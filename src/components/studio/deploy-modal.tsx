'use client';

import { useState } from 'react';
import { FiX, FiCheck, FiGithub, FiUploadCloud, FiExternalLink, FiKey } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  markdown: string;
  workflowYaml?: string | null;
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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
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

        {/* Success Screen */}
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
          /* Form Screen */
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
                <FiKey size={13} className="text-amber-400" />
                <span>GitHub Personal Access Token (PAT)</span>
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx (Optional if configured in .env.local)"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-blue-500"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                Requires <code className="text-slate-400">repo</code> and <code className="text-slate-400">workflow</code> permissions.
              </span>
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
                disabled={isDeploying}
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
