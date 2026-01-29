'use client';

import { useCallback, useState } from 'react';
import { FiCopy, FiDownload, FiCheck, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface MarkdownEditorProps {
  markdown: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export function MarkdownEditor({ markdown, onChange, readOnly = true }: MarkdownEditorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success('Raw Markdown copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  }, [markdown]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded README.md');
  }, [markdown]);

  const lines = markdown.split('\n');

  return (
    <div className="flex flex-col h-full bg-[#0a0b10]">
      {/* Editor top toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f1118] border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <FiFileText size={14} className="text-slate-400" />
          <span className="font-semibold">README.md</span>
          <span className="text-[11px] text-slate-500 font-normal">({lines.length} lines)</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-all cursor-pointer"
          >
            {copied ? <FiCheck size={12} className="text-emerald-400" /> : <FiCopy size={12} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-all cursor-pointer"
          >
            <FiDownload size={12} />
            <span>.md</span>
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-auto font-mono text-xs leading-6">
        {markdown ? (
          <div className="flex min-h-full">
            {/* Line numbers */}
            <div className="shrink-0 text-right pr-3 pl-3 pt-3 select-none text-slate-600 border-r border-white/[0.04] bg-[#07080c] min-w-[40px]">
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code */}
            <div className="flex-1 p-3 overflow-x-auto text-slate-300">
              {readOnly ? (
                <pre className="whitespace-pre-wrap font-mono text-xs">
                  {lines.map((line, i) => (
                    <div key={i} className="hover:bg-white/[0.02]">
                      <CodeColorizer line={line} />
                    </div>
                  ))}
                </pre>
              ) : (
                <textarea
                  value={markdown}
                  onChange={(e) => onChange?.(e.target.value)}
                  className="w-full h-full bg-transparent resize-none outline-none font-mono text-xs text-slate-200"
                  spellCheck={false}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-slate-500">
            No Markdown generated yet.
          </div>
        )}
      </div>
    </div>
  );
}

function CodeColorizer({ line }: { line: string }) {
  if (line.startsWith('#')) {
    return <span className="text-blue-400 font-bold">{line}</span>;
  }
  if (line.startsWith('- ') || line.startsWith('* ')) {
    return <span className="text-slate-300">{line}</span>;
  }
  if (line.startsWith('>')) {
    return <span className="text-emerald-400 italic">{line}</span>;
  }
  if (line.startsWith('![') || line.startsWith('[![')) {
    return <span className="text-amber-400">{line}</span>;
  }
  if (line.startsWith('<')) {
    return <span className="text-purple-400">{line}</span>;
  }
  return <span>{line}</span>;
}
