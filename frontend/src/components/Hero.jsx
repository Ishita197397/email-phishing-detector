import React from 'react';
import { Shield, Scan, Brain, AlertTriangle, Lock, Eye } from 'lucide-react';

function SecurityHUD() {
  return (
    <div className="relative w-full aspect-square max-w-[320px] lg:max-w-none mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-full" aria-hidden="true">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="150" cy="150" r="140" fill="none" stroke="#2a2a3a" strokeWidth="0.5" />
        <circle cx="150" cy="150" r="110" fill="none" stroke="#2a2a3a" strokeWidth="0.5" />
        <circle cx="150" cy="150" r="80" fill="none" stroke="#2a2a3a" strokeWidth="0.5" />

        <circle
          cx="150" cy="150" r="130"
          fill="none" stroke="#00ff88" strokeWidth="1"
          strokeDasharray="8 12" opacity="0.4"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 150"
            to="360 150 150"
            dur="30s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="150" cy="150" r="100"
          fill="none" stroke="#00d4ff" strokeWidth="0.8"
          strokeDasharray="4 8" opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 150 150"
            to="0 150 150"
            dur="20s"
            repeatCount="indefinite"
          />
        </circle>

        <circle
          cx="150" cy="150" r="70"
          fill="none" stroke="#ff00ff" strokeWidth="0.5"
          strokeDasharray="2 6" opacity="0.25"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 150 150"
            to="360 150 150"
            dur="15s"
            repeatCount="indefinite"
          />
        </circle>

        <line x1="150" y1="10" x2="150" y2="50" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="150" y1="250" x2="150" y2="290" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="10" y1="150" x2="50" y2="150" stroke="#2a2a3a" strokeWidth="0.5" />
        <line x1="250" y1="150" x2="290" y2="150" stroke="#2a2a3a" strokeWidth="0.5" />

        <g filter="url(#glow)">
          <circle cx="150" cy="150" r="6" fill="#00ff88" opacity="0.8">
            <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        <g opacity="0.6" filter="url(#glow)">
          <circle cx="150" cy="20" r="3" fill="#00ff88" />
          <circle cx="280" cy="150" r="3" fill="#ff3366" />
          <circle cx="150" cy="280" r="3" fill="#00d4ff" />
          <circle cx="20" cy="150" r="3" fill="#ffcc00" />
        </g>

        <text x="150" y="165" textAnchor="middle" fill="#6b7280" fontSize="7" fontFamily="Share Tech Mono">
          SCANNING ACTIVE
        </text>
      </svg>

      <div className="absolute top-2 right-2 lg:top-4 lg:right-4 space-y-1.5">
        {[
          { label: 'EMAIL SCAN', icon: Scan, color: 'text-safe' },
          { label: 'THREAT DETECT', icon: AlertTriangle, color: 'text-danger' },
          { label: 'AI ANALYSIS', icon: Brain, color: 'text-ai' },
          { label: 'URL CHECK', icon: Lock, color: 'text-info' },
        ].map(({ label, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-1.5 text-[10px] font-label tracking-wide-label">
            <Icon className={`w-3 h-3 ${color}`} strokeWidth={1.5} />
            <span className="text-cyber-muted-text">{label}</span>
            <span className={`${color} text-glow-green`}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero({ onNavigate }) {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-4 h-4 text-cyber-muted-text" strokeWidth={1.5} />
                <span className="font-label text-xs tracking-wide-label text-cyber-muted-text uppercase">
                  AI-Powered Threat Detection
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-ultra-wide leading-tight">
                <span
                  className="glitch-text text-safe text-glow-green inline-block"
                  data-text="EMAIL"
                >
                  EMAIL
                </span>
                <br />
                <span className="text-cyber-text">THREAT</span>
                <br />
                <span className="text-danger text-glow-green">SHIELD</span>
              </h1>

              <p className="text-cyber-muted-text font-body text-sm sm:text-base max-w-lg mt-6 leading-relaxed">
                Instantly analyze emails for phishing, malware, and social engineering.
                Our multi-model system checks content, URLs, and behavioral patterns
                in real-time.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('scanner')}
                className="flex items-center gap-2 px-6 py-3 bg-safe/10 border border-safe/30 text-safe font-label text-xs tracking-wide-label uppercase hover:bg-safe/20 transition-all duration-200"
              >
                <Shield className="w-4 h-4" strokeWidth={1.5} />
                Start Analysis
              </button>
              <button
                onClick={() => onNavigate('how-it-works')}
                className="flex items-center gap-2 px-6 py-3 text-cyber-muted-text font-label text-xs tracking-wide-label uppercase hover:text-cyber-text transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <SecurityHUD />
          </div>
        </div>
      </div>
    </section>
  );
}
