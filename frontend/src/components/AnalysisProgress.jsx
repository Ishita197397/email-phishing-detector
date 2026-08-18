import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const PHISHING_STEPS = [
  { text: '> INITIALIZING THREAT ANALYSIS ENGINE...', delay: 0 },
  { text: '> PARSING EMAIL STRUCTURE...', delay: 400 },
  { text: '> EXTRACTING URLs AND DOMAINS...', delay: 800 },
  { text: '> ANALYZING SENDER REPUTATION...', delay: 1200 },
  { text: '> CHECKING PHISHING PATTERNS...', delay: 1600 },
  { text: '> RUNNING LINGUISTIC ANALYSIS...', delay: 2000 },
  { text: '> EXECUTING AI CLASSIFIER...', delay: 2400 },
  { text: '> GENERATING THREAT SCORE...', delay: 2800 },
  { text: '> ANALYSIS COMPLETE_', delay: 3200 },
];

const SAFE_STEPS = [
  { text: '> INITIALIZING THREAT ANALYSIS ENGINE...', delay: 0 },
  { text: '> PARSING EMAIL STRUCTURE...', delay: 300 },
  { text: '> EXTRACTING URLs AND DOMAINS...', delay: 600 },
  { text: '> ANALYZING SENDER REPUTATION...', delay: 900 },
  { text: '> CHECKING PHISHING PATTERNS...', delay: 1200 },
  { text: '> RUNNING LINGUISTIC ANALYSIS...', delay: 1500 },
  { text: '> EXECUTING AI CLASSIFIER...', delay: 1800 },
  { text: '> NO THREATS DETECTED_', delay: 2100 },
];

export default function AnalysisProgress({ isPhishing, onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const steps = isPhishing ? PHISHING_STEPS : SAFE_STEPS;

  useEffect(() => {
    const timers = steps.map((step, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, step.text]);
        if (i === steps.length - 1) {
          setTimeout(onComplete, 600);
        }
      }, step.delay)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-cyber-card border border-info/30">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-cyber-border bg-cyber-muted/30">
            <Terminal className="w-4 h-4 text-info" strokeWidth={1.5} />
            <span className="font-display text-xs tracking-wide-label uppercase text-info">
              THREAT ANALYSIS IN PROGRESS
            </span>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-16 h-1 bg-cyber-muted overflow-hidden">
                <div
                  className="h-full bg-info transition-all duration-300"
                  style={{ width: `${(visibleLines.length / steps.length) * 100}%` }}
                />
              </div>
              <span className="font-label text-[10px] text-info">
                {Math.round((visibleLines.length / steps.length) * 100)}%
              </span>
            </div>
          </div>

          <div className="p-6 font-mono text-sm space-y-1 min-h-[280px]">
            {visibleLines.map((line, i) => (
              <div
                key={i}
                className="animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span
                  className={
                    i === visibleLines.length - 1 && line.includes('COMPLETE')
                      ? 'text-safe text-glow-green'
                      : line.includes('NO THREATS')
                      ? 'text-safe text-glow-green'
                      : 'text-info'
                  }
                >
                  {line}
                </span>
              </div>
            ))}
            {visibleLines.length < steps.length && (
              <span className="terminal-cursor" />
            )}
          </div>

          <div className="px-4 py-2 border-t border-cyber-border bg-cyber-muted/20">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-info animate-glow-pulse" />
              <span className="font-label text-[10px] text-cyber-muted-text uppercase">
                Processing email through multi-stage threat pipeline...
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
