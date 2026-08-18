import React from 'react';
import { Shield, Activity } from 'lucide-react';

export default function Navbar({ onNavigate, currentSection }) {
  return (
    <header className="sticky top-0 z-50 bg-cyber-bg/90 backdrop-blur-md border-b border-cyber-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-7 h-7 text-safe" strokeWidth={1.5} />
            <div className="absolute inset-0 w-7 h-7 text-safe blur-sm opacity-50">
              <Shield className="w-7 h-7" strokeWidth={1.5} />
            </div>
          </div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-ultra-wide text-safe text-glow-green">
            PHISH<span className="text-cyber-text">{'//'} </span>GUARD
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {['scanner', 'threat-intel', 'how-it-works'].map((section) => (
            <button
              key={section}
              onClick={() => onNavigate(section)}
              className={`px-4 py-2 font-label text-xs tracking-wide-label uppercase transition-all duration-200 ${
                currentSection === section
                  ? 'text-safe border-b border-safe'
                  : 'text-cyber-muted-text hover:text-cyber-text'
              }`}
            >
              {section.replace('-', ' ')}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-safe animate-glow-pulse" />
          <span className="font-label text-xs tracking-wide-label text-cyber-muted-text hidden sm:inline">
            SYSTEM STATUS:
          </span>
          <span className="font-label text-xs tracking-wide-label text-safe">
            ONLINE
          </span>
          <div className="w-2 h-2 rounded-full bg-safe shadow-[0_0_6px_#00ff88] animate-glow-pulse" />
        </div>
      </div>
    </header>
  );
}
