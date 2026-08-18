import React, { useEffect, useState } from 'react';
import '../styles/AnalysisProgress.css';

export default function AnalysisProgress({ isActive }) {
  const [displayedLines, setDisplayedLines] = useState([]);

  const progressLines = [
    '> INITIALIZING THREAT ANALYSIS...',
    '> PARSING EMAIL CONTENT...',
    '> EXTRACTING FEATURES...',
    '> ANALYZING SENDER INFORMATION...',
    '> DETECTING PHISHING PATTERNS...',
    '> RUNNING AI CLASSIFIER...',
    '> GENERATING THREAT ASSESSMENT...',
    '> ANALYSIS COMPLETE'
  ];

  useEffect(() => {
    if (!isActive) {
      setDisplayedLines([]);
      return;
    }

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < progressLines.length) {
        setDisplayedLines(prev => [...prev, progressLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive && displayedLines.length === 0) return null;

  return (
    <div className="analysis-progress slide-in">
      <div className="terminal-panel">
        <div className="terminal-header">
          <span className="terminal-title">[ ANALYSIS LOG ]</span>
        </div>
        
        <div className="terminal-output">
          {displayedLines.map((line, idx) => (
            <div key={idx} className="terminal-line">
              {line}
              {idx === displayedLines.length - 1 && isActive && (
                <span className="cursor-blink">_</span>
              )}
            </div>
          ))}
        </div>

        {!isActive && displayedLines.length > 0 && (
          <div className="terminal-footer">
            <span className="status-complete">✓ READY FOR NEXT ANALYSIS</span>
          </div>
        )}
      </div>
    </div>
  );
}