import React from 'react';
import { ClipboardPaste, Cpu, ShieldAlert } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'SUBMIT',
    description: 'Paste or enter the suspicious email content into the secure analysis terminal.',
    icon: ClipboardPaste,
    color: 'text-info',
    borderColor: 'border-info/30',
  },
  {
    number: '02',
    title: 'ANALYZE',
    description: 'The system extracts sender data, URLs, linguistic patterns, and behavioral indicators.',
    icon: Cpu,
    color: 'text-ai',
    borderColor: 'border-ai/30',
  },
  {
    number: '03',
    title: 'DETECT',
    description: 'The ML model generates a threat score with a detailed explanation of detected risks.',
    icon: ShieldAlert,
    color: 'text-danger',
    borderColor: 'border-danger/30',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-cyber-border" />
          <h3 className="font-display text-xs sm:text-sm tracking-ultra-wide uppercase text-cyber-text">
            HOW IT WORKS
          </h3>
          <div className="h-px flex-1 bg-cyber-border" />
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-px bg-cyber-border" />

          {STEPS.map(({ number, title, description, icon: Icon, color, borderColor }) => (
            <div
              key={number}
              className={`bg-cyber-card border ${borderColor} p-6 sm:p-8 text-center relative hover:translate-y-[-2px] transition-all duration-200`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 border ${borderColor} bg-cyber-bg mb-4 relative z-10`}>
                <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.5} />
              </div>
              <div className={`font-display text-2xl font-bold ${color} mb-2`}>
                {number}
              </div>
              <h4 className="font-display text-sm tracking-wide-label uppercase text-cyber-text mb-3">
                {title}
              </h4>
              <p className="font-body text-xs text-cyber-muted-text leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
