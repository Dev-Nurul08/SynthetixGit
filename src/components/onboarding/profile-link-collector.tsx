'use client';

import React from 'react';
import type { ModuleConfig } from '@/lib/template-engine';
import {
  FiUser,
  FiCode,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiGlobe,
  FiInstagram,
  FiYoutube,
  FiBook,
  FiMusic,
  FiSliders,
  FiCheckCircle,
} from 'react-icons/fi';

interface ProfileLinkCollectorProps {
  selectedBlocks: string[];
  modules: ModuleConfig;
  onUpdateModule: <K extends keyof ModuleConfig>(key: K, value: Partial<ModuleConfig[K]>) => void;
  username: string;
}

export function ProfileLinkCollector({
  selectedBlocks,
  modules,
  onUpdateModule,
  username,
}: ProfileLinkCollectorProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-3">
        <h3 className="text-base font-black text-white">Configure Your Selected Blocks</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Fill in your details, usernames, and profile links. Only fields for your selected blocks are shown below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Header Configuration */}
        {selectedBlocks.includes('header') && (
          <div className="p-4 rounded-xl border border-white/10 bg-[#101720] space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
              <FiSliders size={15} />
              <span>Header Banner & Typing Intro</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Display Name</label>
                <input
                  type="text"
                  value={modules.headerBanner.title || username}
                  onChange={(e) => onUpdateModule('headerBanner', { title: e.target.value })}
                  placeholder="Your Full Name..."
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Role / Tagline</label>
                <input
                  type="text"
                  value={modules.headerBanner.subtitle}
                  onChange={(e) => onUpdateModule('headerBanner', { subtitle: e.target.value })}
                  placeholder="e.g. Full-Stack & MERN Developer 🚀"
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Animated Typing Phrases (separated by semicolon <code>;</code>)
              </label>
              <input
                type="text"
                value={modules.headerBanner.typingLines.join(';')}
                onChange={(e) =>
                  onUpdateModule('headerBanner', {
                    typingLines: e.target.value.split(';').filter(Boolean),
                  })
                }
                placeholder="Frontend Ninja ⚡;Backend Explorer 🔍;Building Scalable Apps 🚀"
                className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white font-mono outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        )}

        {/* Education & LeetCode */}
        {selectedBlocks.includes('education') && (
          <div className="p-4 rounded-xl border border-white/10 bg-[#101720] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <FiBook size={15} />
              <span>Education & LeetCode Coding Profile</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center gap-1">
                <FiCode className="text-amber-400" size={13} />
                <span>LeetCode Username or Profile Link</span>
              </label>
              <input
                type="text"
                value={modules.educationAndSkills.leetCodeUsername || ''}
                onChange={(e) => {
                  const val = e.target.value.trim().replace(/^https?:\/\/(www\.)?leetcode\.com\/(u\/)?/i, '').replace(/\/$/, '');
                  onUpdateModule('educationAndSkills', { leetCodeUsername: val, showLeetCodeCard: true });
                }}
                placeholder="e.g. Fr_Nurul or https://leetcode.com/u/Fr_Nurul"
                className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-emerald-400"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                Accepts either handle (e.g. <code>Fr_Nurul</code>) or full URL.
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">University / Institute Badge Text</label>
              <input
                type="text"
                value={modules.educationAndSkills.institutionName}
                onChange={(e) => onUpdateModule('educationAndSkills', { institutionName: e.target.value })}
                placeholder="e.g. VidhyaDeep_University"
                className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-emerald-400"
              />
            </div>
          </div>
        )}

        {/* Social Links Matrix */}
        {selectedBlocks.includes('social') && (
          <div className="p-4 rounded-xl border border-white/10 bg-[#101720] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
              <FiLinkedin size={15} />
              <span>Social Links & Connect Handles</span>
            </div>

            <div className="space-y-2.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center gap-1.5">
                  <FiLinkedin className="text-blue-400" size={13} />
                  <span>LinkedIn Profile (Handle or URL)</span>
                </label>
                <input
                  type="text"
                  value={modules.socialLinks.linkedin}
                  onChange={(e) => {
                    const clean = e.target.value.trim().replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//i, '').replace(/\/$/, '');
                    onUpdateModule('socialLinks', { linkedin: clean });
                  }}
                  placeholder="e.g. nurul-shaikh-44b41838b or full URL"
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center gap-1.5">
                  <FiTwitter className="text-sky-400" size={13} />
                  <span>Twitter / X Username</span>
                </label>
                <input
                  type="text"
                  value={modules.socialLinks.twitter}
                  onChange={(e) => onUpdateModule('socialLinks', { twitter: e.target.value.replace('@', '').trim() })}
                  placeholder="e.g. your_handle"
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center gap-1.5">
                  <FiMail className="text-rose-400" size={13} />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={modules.socialLinks.email}
                  onChange={(e) => onUpdateModule('socialLinks', { email: e.target.value.trim() })}
                  placeholder="e.g. shaikhnurul8200@gmail.com"
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-indigo-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center gap-1.5">
                  <FiGlobe className="text-emerald-400" size={13} />
                  <span>Personal Portfolio / Website URL</span>
                </label>
                <input
                  type="url"
                  value={modules.socialLinks.portfolio}
                  onChange={(e) => onUpdateModule('socialLinks', { portfolio: e.target.value.trim() })}
                  placeholder="https://yourportfolio.dev"
                  className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* About Me & Quick Facts */}
        {selectedBlocks.includes('about') && (
          <div className="p-4 rounded-xl border border-white/10 bg-[#101720] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
              <FiUser size={15} />
              <span>About Me & Quick Facts</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Developer Bio</label>
              <textarea
                rows={3}
                value={modules.aboutMe.bioText}
                onChange={(e) => onUpdateModule('aboutMe', { bioText: e.target.value })}
                placeholder="Passionate Full Stack Developer building scalable web apps..."
                className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-rose-400 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">🔭 Currently Working On</label>
              <input
                type="text"
                value={modules.aboutMe.quickFacts.currentWork}
                onChange={(e) =>
                  onUpdateModule('aboutMe', {
                    quickFacts: { ...modules.aboutMe.quickFacts, currentWork: e.target.value },
                  })
                }
                placeholder="Full-Stack MERN Projects & Cloud Architectures"
                className="w-full px-3 py-2 rounded-lg bg-[#0b0f14] border border-white/10 text-xs text-white outline-none focus:border-rose-400"
              />
            </div>
          </div>
        )}

        {/* Interactive Widgets */}
        {selectedBlocks.includes('widgets') && (
          <div className="p-4 rounded-xl border border-white/10 bg-[#101720] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
              <FiMusic size={15} />
              <span>Interactive Widgets</span>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modules.interactiveWidgets.showSpotify ?? true}
                  onChange={(e) =>
                    onUpdateModule('interactiveWidgets', { showSpotify: e.target.checked })
                  }
                  className="rounded accent-cyan-400"
                />
                <span>Spotify Live Music Player</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modules.interactiveWidgets.showDailyDevQuote}
                  onChange={(e) =>
                    onUpdateModule('interactiveWidgets', { showDailyDevQuote: e.target.checked })
                  }
                  className="rounded accent-cyan-400"
                />
                <span>Daily Dev Inspiration Quote</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={modules.interactiveWidgets.showCodingChallenge}
                  onChange={(e) =>
                    onUpdateModule('interactiveWidgets', { showCodingChallenge: e.target.checked })
                  }
                  className="rounded accent-cyan-400"
                />
                <span>Interactive Algorithm Challenge Dropdown</span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 flex items-center gap-2.5 text-xs text-emerald-300">
        <FiCheckCircle size={16} className="shrink-0" />
        <span>All filled information will be automatically compiled into your active README markdown.</span>
      </div>
    </div>
  );
}
