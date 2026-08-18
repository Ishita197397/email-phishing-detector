import React, { useEffect, useState } from 'react';
import '../styles/Hero.css';

export default function Hero() {
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left: Headline and Description */}
        <div className="hero-left">
          <h1 className="hero-title chromatic-glitch">
            EMAIL THREAT<br />DETECTION SYSTEM
          </h1>
          
          <p className="hero-description">
            Analyze suspicious emails, detect phishing indicators, and understand the threat before you click.
          </p>

          {/* Terminal Status Line */}
          <div className="hero-terminal">
            <span className="terminal-prompt">&gt;</span>
            <span className="terminal-text">THREAT ANALYSIS ENGINE</span>
            <span className="terminal-status"> ONLINE</span>
            <span className={`terminal-cursor ${cursorVisible ? 'cursor-blink' : ''}`}>_</span>
          </div>
        </div>

        {/* Right: Security HUD Visualization */}
        <div className="hero-right">
          <div className="security-hud">
            {/* Top Bar */}
            <div className="hud-bar">
              <div className="hud-label">EMAIL SCANNING</div>
              <div className="hud-indicator"></div>
            </div>

            {/* Main HUD Grid */}
            <div className="hud-grid">
              <div className="hud-cell">
                <div className="hud-title">THREAT</div>
                <div className="hud-value">••••</div>
              </div>
              <div className="hud-cell">
                <div className="hud-title">DETECTION</div>
                <div className="hud-value">••••</div>
              </div>
              <div className="hud-cell">
                <div className="hud-title">AI</div>
                <div className="hud-value">••••</div>
              </div>
              <div className="hud-cell">
                <div className="hud-title">ANALYSIS</div>
                <div className="hud-value">••••</div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="hud-bar">
              <div className="hud-label">SCANNING ACTIVE</div>
              <div className="hud-indicator-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}