'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { FiBookOpen, FiExternalLink, FiFileText } from 'react-icons/fi';

interface MarkdownPreviewProps {
  markdown: string;
  username?: string;
}

export function MarkdownPreview({ markdown, username }: MarkdownPreviewProps) {
  if (!markdown || !markdown.trim()) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-slate-400 bg-[#080a11]">
        <div className="text-center space-y-3 max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-[#141a29] border border-[#222c42] flex items-center justify-center mx-auto text-blue-400">
            <FiFileText size={22} />
          </div>
          <h3 className="text-sm font-bold text-white">Live GitHub README Preview</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Configure modules or scan a GitHub username to preview your rendered profile here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto h-full bg-[#080a11]">
      {/* GitHub Repository Frame */}
      <div className="max-w-4xl mx-auto rounded-2xl border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden">
        {/* Top GitHub file tab */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
            <FiBookOpen size={16} className="text-slate-400" />
            <span className="font-mono">{username ? `${username} / README.md` : 'README.md'}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-300 bg-[#090d16] px-2.5 py-1 rounded-md border border-[#30363d]">
              GFM Rendered
            </span>
            {username && (
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Profile</span>
                <FiExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Rendered Markdown Body */}
        <div className="p-6 sm:p-10 github-readme-render">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              td: ({ node, vAlign, ...props }: any) => {
                const style = vAlign ? { verticalAlign: vAlign, ...props.style } : props.style;
                return <td {...props} style={style} />;
              },
              th: ({ node, vAlign, ...props }: any) => {
                const style = vAlign ? { verticalAlign: vAlign, ...props.style } : props.style;
                return <th {...props} style={style} />;
              },
              img: ({ src, alt, node, ...props }: any) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={alt || ''}
                  loading="lazy"
                  className="inline-block max-w-full my-1 rounded"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  {...props}
                />
              ),
              a: ({ href, children, node, ...props }: any) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                  {...props}
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
