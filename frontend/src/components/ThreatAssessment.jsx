import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

const STATUS_CONFIG = {
  safe: {
    color: 'text-safe',
    borderColor: 'border-safe/30',
    glowColor: 'shadow-[0_0_20px_rgba(0,255,136,0.1)]',
    bgGlow: 'bg-safe/5',
    icon: CheckCircle,
    label: 'NO SIGNIFICANT THREAT DETECTED',
    sublabel: 'LOW RISK',
  },
  suspicious: {
    color: 'text-warning',
    borderColor: 'border-warning/30',
    glowColor: 'shadow-[0_0_20px_rgba(255,204,0,0.1)]',
    bgGlow: 'bg-warning/5',
    icon: AlertCircle,
    label: 'SUSPICIOUS ACTIVITY',
    sublabel: 'REVIEW REQUIRED',
  },
  phishing: {
    color: 'text-danger',
    borderColor: 'border-danger/30',
    glowColor: 'shadow-[0_0_20px_rgba(255,51,102,0.1)]',
    bgGlow: 'bg-danger/5',
    icon: AlertTriangle,
    label: 'PHISHING DETECTED',
    sublabel: 'HIGH RISK',
  },
};

function ThreatScoreBar({ score }) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = () => {
    if (score <= 30) return { bar: 'bg-safe', text: 'text-safe', glow: 'shadow-[0_0_8px_rgba(0,255,136,0.4)]' };
    if (score <= 60) return { bar: 'bg-warning', text: 'text-warning', glow: 'shadow-[0_0_8px_rgba(255,204,0,0.4)]' };
    return { bar: 'bg-danger', text: 'text-danger', glow: 'shadow-[0_0_8px_rgba(255,51,102,0.4)]' };
  };

  const colors = getColor();

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <span className="font-label text-[10px] tracking-wide-label text-cyber-muted-text uppercase">
          THREAT SCORE
        </span>
        <span className={`font-display text-2xl sm:text-3xl font-bold ${colors.text}`}>
          {String(score).padStart(2, '0')}
          <span className="text-sm text-cyber-muted-text ml-1">/ 100</span>
        </span>
      </div>
      <div className="h-2 bg-cyber-muted w-full overflow-hidden">
        <div
          className={`h-full ${colors.bar} ${colors.glow} transition-all duration-1500 ease-out`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
      <div className="flex justify-between font-label text-[9px] text-cyber-muted-text">
        <span>SAFE</span>
        <span>SUSPICIOUS</span>
        <span>CRITICAL</span>
      </div>
    </div>
  );
}

export default function ThreatAssessment({ classification, score, confidence }) {
  const status = STATUS_CONFIG[classification] || STATUS_CONFIG.phishing;
  const StatusIcon = status.icon;

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className={`bg-cyber-card border ${status.borderColor} ${status.glowColor} animate-fade-in`}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-cyber-border bg-cyber-muted/30">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-info" strokeWidth={1.5} />
              <span className="font-display text-[10px] sm:text-xs tracking-wide-label uppercase text-info">
                THREAT ASSESSMENT // REPORT
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label text-[10px] text-cyber-muted-text">CLASS:</span>
              <span className={`font-label text-[10px] tracking-wide-label uppercase ${status.color}`}>
                {status.sublabel}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Status Banner */}
            <div className={`flex items-center gap-4 p-4 ${status.bgGlow} border ${status.borderColor}`}>
              <StatusIcon className={`w-8 h-8 sm:w-10 sm:h-10 ${status.color} flex-shrink-0`} strokeWidth={1.5} />
              <div>
                <h2 className={`font-display text-lg sm:text-xl tracking-wide-label uppercase ${status.color}`}>
                  {status.label}
                </h2>
                <p className="font-label text-xs text-cyber-muted-text mt-1">
                  Classification confidence: {confidence}%
                </p>
              </div>
            </div>

            {/* Score and Metrics */}
            <div className="grid sm:grid-cols-[2fr_1fr_1fr] gap-6">
              <ThreatScoreBar score={score} />

              <div className="space-y-1">
                <span className="font-label text-[10px] tracking-wide-label text-cyber-muted-text uppercase block">
                  CONFIDENCE
                </span>
                <span className={`font-display text-xl sm:text-2xl font-bold ${status.color}`}>
                  {confidence}%
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-label text-[10px] tracking-wide-label text-cyber-muted-text uppercase block">
                  CLASSIFICATION
                </span>
                <span className={`font-display text-sm sm:text-base font-bold tracking-wide-label uppercase ${status.color}`}>
                  {classification}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
