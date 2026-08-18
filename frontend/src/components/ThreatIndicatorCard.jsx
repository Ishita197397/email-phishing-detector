import React from 'react';
import {
  User, Link, FileText, Fingerprint, Clock, ShieldAlert,
  CheckCircle, AlertTriangle, AlertCircle
} from 'lucide-react';

const INDICATOR_ICONS = {
  sender: User,
  url: Link,
  content: FileText,
  pattern: Fingerprint,
  urgency: Clock,
  spoofing: ShieldAlert,
};

const SEVERITY_CONFIG = {
  safe: {
    color: 'text-safe',
    borderColor: 'border-safe/30',
    bgColor: 'bg-safe/5',
    icon: CheckCircle,
    label: 'CLEAR',
  },
  low: {
    color: 'text-info',
    borderColor: 'border-info/30',
    bgColor: 'bg-info/5',
    icon: AlertCircle,
    label: 'LOW RISK',
  },
  medium: {
    color: 'text-warning',
    borderColor: 'border-warning/30',
    bgColor: 'bg-warning/5',
    icon: AlertTriangle,
    label: 'SUSPICIOUS',
  },
  high: {
    color: 'text-danger',
    borderColor: 'border-danger/30',
    bgColor: 'bg-danger/5',
    icon: AlertTriangle,
    label: 'MALICIOUS',
  },
};

function IndicatorCard({ type, severity, title, description }) {
  const Icon = INDICATOR_ICONS[type] || FileText;
  const config = SEVERITY_CONFIG[severity] || SEVERITY_CONFIG.medium;
  const SeverityIcon = config.icon;

  return (
    <div
      className={`bg-cyber-card border ${config.borderColor} p-4 hover:translate-y-[-1px] transition-all duration-200 group`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 ${config.bgColor} flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${config.color}`} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-label text-[10px] tracking-wide-label text-cyber-muted-text uppercase">
              {type}
            </span>
            <div className={`flex items-center gap-1 ${config.color}`}>
              <SeverityIcon className="w-3 h-3" strokeWidth={1.5} />
              <span className="font-label text-[10px] tracking-wide-label uppercase">
                {config.label}
              </span>
            </div>
          </div>
          <h4 className={`font-display text-sm font-semibold tracking-wide-label uppercase ${config.color}`}>
            {title}
          </h4>
          <p className="font-body text-xs text-cyber-muted-text mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ThreatIndicatorCard({ indicators }) {
  if (!indicators || indicators.length === 0) return null;

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-cyber-border" />
          <h3 className="font-display text-xs sm:text-sm tracking-ultra-wide uppercase text-cyber-text">
            DETECTED THREAT INDICATORS
          </h3>
          <div className="h-px flex-1 bg-cyber-border" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {indicators.map((indicator, i) => (
            <IndicatorCard key={i} {...indicator} />
          ))}
        </div>
      </div>
    </section>
  );
}
