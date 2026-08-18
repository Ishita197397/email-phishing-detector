import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

const AI_LINES = [
  '> MODEL INITIALIZED [LogisticRegression + TF-IDF]',
  '> FEATURE EXTRACTION: 5000 TF-IDF features',
  '> URL SIGNALS ANALYZED',
  '> LINGUISTIC PATTERNS ANALYZED',
  '> SENDER FEATURES ANALYZED',
  '> CLASSIFICATION GENERATED',
];

export default function AIAnalysisTerminal({ classification, confidence }) {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const timers = AI_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, i * 300)
    );

    const finalTimer = setTimeout(() => {
      setVisibleLines((prev) => [
        ...prev,
        `> CONFIDENCE: ${confidence}%`,
        `> STATUS: ${classification === 'phishing' ? 'PHISHING DETECTED' : classification === 'safe' ? 'NO THREAT DETECTED' : 'SUSPICIOUS - REVIEW REQUIRED'}_`,
      ]);
    }, AI_LINES.length * 300 + 200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, [classification, confidence]);

  const getStatusColor = () => {
    if (classification === 'phishing') return 'text-danger';
    if (classification === 'safe') return 'text-safe';
    return 'text-warning';
  };

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-cyber-card border border-ai/20">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-cyber-border bg-cyber-muted/30">
            <Brain className="w-4 h-4 text-ai" strokeWidth={1.5} />
            <span className="font-display text-xs tracking-wide-label uppercase text-ai">
              AI THREAT ANALYSIS
            </span>
            <div className="ml-auto">
              <span className="font-label text-[10px] text-ai/60">ML PIPELINE v2.4</span>
            </div>
          </div>

          <div className="p-6 font-mono text-sm space-y-1">
            {visibleLines.map((line, i) => {
              const isStatus = line.startsWith('> STATUS:');
              const isConfidence = line.startsWith('> CONFIDENCE:');
              return (
                <div key={i} className="animate-fade-in">
                  <span
                    className={
                      isStatus
                        ? `${getStatusColor()} font-semibold`
                        : isConfidence
                        ? 'text-ai'
                        : 'text-info/80'
                    }
                  >
                    {line}
                  </span>
                </div>
              );
            })}
            {visibleLines.length < AI_LINES.length + 2 && (
              <span className="terminal-cursor" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
