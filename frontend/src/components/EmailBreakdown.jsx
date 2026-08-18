import React from 'react';
import {
  User, Link, FileText, ChevronRight,
  Shield, AlertTriangle, CheckCircle
} from 'lucide-react';

function BreakdownSection({ title, icon: Icon, items, color = 'text-info' }) {
  return (
    <div className="bg-cyber-card border border-cyber-border p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.5} />
        <h4 className="font-display text-xs tracking-wide-label uppercase text-cyber-text">
          {title}
        </h4>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <ChevronRight className="w-3 h-3 mt-0.5 text-cyber-muted-text flex-shrink-0" strokeWidth={1.5} />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-label text-[10px] tracking-wide-label text-cyber-muted-text uppercase">
                  {item.label}
                </span>
                <StatusBadge status={item.status} />
              </div>
              {item.value && (
                <p className="font-mono text-xs text-cyber-text mt-0.5 break-all">
                  {item.value}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const config = {
    safe: { color: 'text-safe', icon: CheckCircle, label: 'CLEAR' },
    info: { color: 'text-info', icon: Shield, label: 'INFO' },
    warning: { color: 'text-warning', icon: AlertTriangle, label: 'FLAG' },
    danger: { color: 'text-danger', icon: AlertTriangle, label: 'ALERT' },
    neutral: { color: 'text-cyber-muted-text', icon: null, label: 'N/A' },
  }[status] || { color: 'text-cyber-muted-text', icon: null, label: status };

  const StatusIcon = config.icon;

  return (
    <div className={`flex items-center gap-1 ${config.color}`}>
      {StatusIcon && <StatusIcon className="w-3 h-3" strokeWidth={1.5} />}
      <span className="font-label text-[9px] tracking-wide-label uppercase">
        {config.label}
      </span>
    </div>
  );
}

export default function EmailBreakdown({ breakdown }) {
  if (!breakdown) return null;

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-cyber-border" />
          <h3 className="font-display text-xs sm:text-sm tracking-ultra-wide uppercase text-cyber-text">
            EMAIL BREAKDOWN
          </h3>
          <div className="h-px flex-1 bg-cyber-border" />
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <BreakdownSection
            title="SENDER ANALYSIS"
            icon={User}
            color="text-info"
            items={breakdown.sender || [
              { label: 'DOMAIN', value: 'Unknown', status: 'neutral' },
              { label: 'REPUTATION', value: 'Insufficient data', status: 'neutral' },
              { label: 'SPOOFING RISK', value: 'Unknown', status: 'neutral' },
            ]}
          />
          <BreakdownSection
            title="URL ANALYSIS"
            icon={Link}
            color="text-warning"
            items={breakdown.urls || [
              { label: 'NUMBER OF LINKS', value: '0', status: 'neutral' },
              { label: 'SUSPICIOUS LINKS', value: '0', status: 'safe' },
              { label: 'DOMAIN ANOMALIES', value: 'None detected', status: 'safe' },
            ]}
          />
          <BreakdownSection
            title="CONTENT ANALYSIS"
            icon={FileText}
            color="text-danger"
            items={breakdown.content || [
              { label: 'URGENCY', value: 'Not detected', status: 'safe' },
              { label: 'CREDENTIAL REQUEST', value: 'Not detected', status: 'safe' },
              { label: 'SOCIAL ENGINEERING', value: 'Not detected', status: 'safe' },
              { label: 'SUSPICIOUS LANGUAGE', value: 'Not detected', status: 'safe' },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
