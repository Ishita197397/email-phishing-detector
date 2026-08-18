import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-cyber-border bg-cyber-bg/80 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 gap-8">
          {/* Navigation */}
          <div>
            <h4 className="font-label text-[10px] tracking-wide-label uppercase text-cyber-text mb-3">
              NAVIGATION
            </h4>
            <div className="space-y-2">
              {['Scanner', 'Threat Intel', 'How It Works'].map((item) => (
                <p key={item} className="font-label text-xs text-cyber-muted-text hover:text-safe transition-colors cursor-pointer">
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h4 className="font-label text-[10px] tracking-wide-label uppercase text-cyber-text mb-3">
              SYSTEM
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-safe shadow-[0_0_4px_#00ff88]" />
                <span className="font-label text-xs text-safe">All systems operational</span>
              </div>
              <p className="font-label text-xs text-cyber-muted-text">Uptime: 99.97%</p>
              <p className="font-label text-xs text-cyber-muted-text">Latency: &lt;200ms</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-cyber-border text-center">
          <p className="font-label text-[10px] text-cyber-muted-text/50">
            v2.4.0
          </p>
        </div>
      </div>
    </footer>
  );
}
