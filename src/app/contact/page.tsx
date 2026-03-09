'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  FiMail,
  FiSend,
  FiMessageSquare,
  FiUser,
  FiTag,
  FiCheckCircle,
  FiGithub,
  FiArrowLeft,
  FiHelpCircle,
  FiZap,
} from 'react-icons/fi';

const CATEGORIES = [
  'General Feedback',
  'Feature Request',
  'Bug Report',
  'Collaboration & Sponsorship',
  'Help & Support',
];

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || message.trim().length < 5) {
      toast.error('Please enter a message with at least 5 characters.');
      return;
    }

    setStatus('sending');
    const toastId = toast.loading('Sending your message...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          category,
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('sent');
        toast.success('Message sent successfully! We will get back to you soon.', { id: toastId });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      toast.error(err.message || 'Something went wrong. Please try again or reach out on GitHub.', { id: toastId });
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setCategory(CATEGORIES[0]);
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-bg-canvas text-text-primary flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-border-primary pb-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-text-muted hover:text-text-primary transition-colors"
          >
            <FiArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            <span>Support &amp; Inquiries Live</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider">
            <FiMail size={13} />
            <span>Contact &amp; Feedback</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            We&apos;d love to hear from you
          </h1>
          <p className="text-sm sm:text-base text-text-tertiary max-w-xl mx-auto leading-relaxed">
            Have a question, requested feature, or feedback for SynthetixGit? Drop us a line below or contribute on GitHub.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-border-primary bg-bg-primary/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {status === 'sent' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent-emerald/20 border border-accent-emerald/40 text-accent-emerald flex items-center justify-center mx-auto text-3xl shadow-lg">
                <FiCheckCircle size={32} />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">Message Dispatched!</h2>
                <p className="text-sm text-text-tertiary max-w-md mx-auto">
                  Thank you for reaching out. We have logged your submission and will follow up with you as soon as possible.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-bg-secondary hover:bg-bg-tertiary border border-border-primary text-text-secondary hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-brand-500/25"
                >
                  Go to Dashboard
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                  <FiTag size={13} className="text-brand-400" />
                  <span>Topic / Category</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20 border border-brand-400'
                          : 'bg-bg-secondary text-text-muted hover:text-text-secondary hover:bg-bg-tertiary border border-border-primary'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                    <FiUser size={13} className="text-text-muted" />
                    <span>Your Name / GitHub Handle</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. octocat or Alex"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-border-primary text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-brand-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                    <FiMail size={13} className="text-text-muted" />
                    <span>Email Address (Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-border-primary text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-brand-400 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                  <FiZap size={13} className="text-text-muted" />
                  <span>Subject</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Summary of your inquiry or feedback"
                  className="w-full px-4 py-2.5 rounded-xl bg-bg-secondary border border-border-primary text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-brand-400 transition-colors"
                />
              </div>

              {/* Message Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-secondary flex items-center gap-1.5">
                  <FiMessageSquare size={13} className="text-text-muted" />
                  <span>Message *</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us what you think, what you'd like improved, or describe an issue in detail..."
                  className="w-full px-4 py-3 rounded-xl bg-bg-secondary border border-border-primary text-xs text-text-primary placeholder:text-text-muted outline-none focus:border-brand-400 transition-colors resize-y leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-text-muted">
                  🔒 Your details remain private and are never shared.
                </span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-400 hover:to-cyan-400 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-brand-500/25 cursor-pointer disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Alternate Channels Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-bg-primary border border-border-primary flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-primary flex items-center justify-center text-text-primary shrink-0">
              <FiGithub size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">GitHub Issues &amp; Discussions</h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                File bug reports or submit pull requests directly to the open source repository.
              </p>
              <a
                href="https://github.com/Dev-Nurul08/SynthetixGit"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-brand-400 hover:underline inline-flex items-center gap-1 mt-1.5"
              >
                <span>Visit GitHub Repository</span>
                <span>→</span>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bg-primary border border-border-primary flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary border border-border-primary flex items-center justify-center text-accent-emerald shrink-0">
              <FiHelpCircle size={18} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Interactive Studio Documentation</h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                Need help building your profile README or configuring commit artwork?
              </p>
              <Link
                href="/studio?mode=wizard"
                className="text-[11px] font-bold text-accent-emerald hover:underline inline-flex items-center gap-1 mt-1.5"
              >
                <span>Launch README Wizard</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
