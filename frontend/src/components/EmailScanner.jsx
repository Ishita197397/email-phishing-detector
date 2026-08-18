import React, { useState } from 'react';
import { Terminal, Shield, Mail, RotateCcw, ChevronRight } from 'lucide-react';

export default function EmailScanner({ onScan, isLoading }) {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [links, setLinks] = useState('');

  const handleScan = () => {
    const fullEmail = buildEmail();
    if (fullEmail.trim()) {
      onScan(fullEmail, { sender, subject, content, links });
    }
  };

  const buildEmail = () => {
    let parts = [];
    if (subject) parts.push(`Subject: ${subject}`);
    if (sender) parts.push(`From: ${sender}`);
    if (links) {
      parts.push(`Links found: ${links}`);
    }
    if (content) parts.push(content);
    return parts.join('\n\n');
  };

  const handleClear = () => {
    setSender('');
    setSubject('');
    setContent('');
    setLinks('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleScan();
    }
  };

  return (
    <section id="scanner" className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-cyber-card border border-cyber-border">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyber-border bg-cyber-muted/30">
            <div className="flex items-center gap-3">
              <Terminal className="w-4 h-4 text-info" strokeWidth={1.5} />
              <span className="font-display text-xs tracking-wide-label uppercase text-info">
                SECURE ANALYSIS TERMINAL
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-safe animate-glow-pulse" />
              <span className="font-label text-[10px] tracking-wide-label text-cyber-muted-text uppercase">
                {isLoading ? 'ANALYZING...' : 'READY FOR INPUT'}
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-6 space-y-4" onKeyDown={handleKeyDown}>
            {/* Sender Field */}
            <div className="space-y-1">
              <label className="font-label text-[10px] tracking-wide-label uppercase text-cyber-muted-text block">
                <ChevronRight className="w-3 h-3 inline mr-1" />
                FROM
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-safe/50 font-mono text-sm">&gt;</span>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="sender@example.com"
                  className="terminal-input w-full font-mono text-sm pl-7"
                  aria-label="Sender email address"
                />
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1">
              <label className="font-label text-[10px] tracking-wide-label uppercase text-cyber-muted-text block">
                <ChevronRight className="w-3 h-3 inline mr-1" />
                SUBJECT
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-safe/50 font-mono text-sm">&gt;</span>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="terminal-input w-full font-mono text-sm pl-7"
                  aria-label="Email subject"
                />
              </div>
            </div>

            {/* Content Field */}
            <div className="space-y-1">
              <label className="font-label text-[10px] tracking-wide-label uppercase text-cyber-muted-text block">
                <ChevronRight className="w-3 h-3 inline mr-1" />
                EMAIL CONTENT
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-safe/50 font-mono text-sm">&gt;</span>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste the full email content here for analysis..."
                  rows={8}
                  className="terminal-input w-full font-mono text-sm pl-7 resize-none"
                  aria-label="Email content"
                />
              </div>
            </div>

            {/* Links Field */}
            <div className="space-y-1">
              <label className="font-label text-[10px] tracking-wide-label uppercase text-cyber-muted-text block">
                <ChevronRight className="w-3 h-3 inline mr-1" />
                EXTRACTED LINKS <span className="text-cyber-muted-text/50">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-safe/50 font-mono text-sm">&gt;</span>
                <textarea
                  value={links}
                  onChange={(e) => setLinks(e.target.value)}
                  placeholder="Paste URLs found in the email (one per line)..."
                  rows={3}
                  className="terminal-input w-full font-mono text-sm pl-7 resize-none"
                  aria-label="Extracted links"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <span className="font-label text-[10px] text-cyber-muted-text">
                {content.length > 0
                  ? `${content.length} characters`
                  : 'Ctrl+Enter to scan'}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={handleClear}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-cyber-border text-cyber-muted-text font-label text-xs tracking-wide-label uppercase hover:border-cyber-muted-text hover:text-cyber-text transition-all duration-200 disabled:opacity-30"
                  aria-label="Clear all fields"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                  Clear
                </button>

                <button
                  onClick={handleScan}
                  disabled={!content.trim() || isLoading}
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-safe/10 border border-safe text-safe font-label text-xs tracking-wide-label uppercase hover:bg-safe/20 hover:shadow-[0_0_15px_rgba(0,255,136,0.15)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:border-cyber-border disabled:text-cyber-muted-text"
                  aria-label="Scan email for threats"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-safe border-t-transparent rounded-full animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4" strokeWidth={1.5} />
                      Scan Email
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2 border-t border-cyber-border bg-cyber-muted/20 flex items-center gap-2">
            <Mail className="w-3 h-3 text-cyber-muted-text" strokeWidth={1.5} />
            <span className="font-label text-[10px] text-cyber-muted-text">
              All analysis is performed in real-time. No email data is stored or transmitted to third parties.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
