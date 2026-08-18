import React from 'react';
import { CheckCircle, AlertCircle, ShieldAlert } from 'lucide-react';

const EXPLANATIONS = {
  phishing: {
    icon: ShieldAlert,
    color: 'text-danger',
    borderColor: 'border-danger/30',
    bgColor: 'bg-danger/5',
    title: 'WHY THIS EMAIL IS DANGEROUS',
    defaultReasons: [
      'Uses urgent language to pressure the recipient into immediate action.',
      'Contains requests for personal or financial information.',
      'Links may lead to domains that do not match the claimed organization.',
      'Exhibits social engineering patterns consistent with known phishing campaigns.',
    ],
  },
  suspicious: {
    icon: AlertCircle,
    color: 'text-warning',
    borderColor: 'border-warning/30',
    bgColor: 'bg-warning/5',
    title: 'WHY THIS EMAIL NEEDS REVIEW',
    defaultReasons: [
      'Some linguistic patterns are consistent with unsolicited communications.',
      'The sender identity could not be fully verified.',
      'Contains language that may be attempting to establish false trust.',
    ],
  },
  safe: {
    icon: CheckCircle,
    color: 'text-safe',
    borderColor: 'border-safe/30',
    bgColor: 'bg-safe/5',
    title: 'WHY THIS EMAIL APPEARS SAFE',
    defaultReasons: [
      'Sender domain appears to be legitimate.',
      'No credential harvesting patterns detected.',
      'No suspicious URLs or malicious links found.',
      'Language and tone are consistent with normal communication.',
    ],
  },
};

export default function ThreatExplanation({ classification, reasons }) {
  const config = EXPLANATIONS[classification] || EXPLANATIONS.phishing;
  const Icon = config.icon;
  const displayReasons = reasons && reasons.length > 0 ? reasons : config.defaultReasons;

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-cyber-border" />
          <h3 className="font-display text-xs sm:text-sm tracking-ultra-wide uppercase text-cyber-text">
            {config.title}
          </h3>
          <div className="h-px flex-1 bg-cyber-border" />
        </div>

        <div className={`bg-cyber-card border ${config.borderColor} p-6 sm:p-8`}>
          <div className="flex items-start gap-4 mb-6">
            <Icon className={`w-6 h-6 ${config.color} flex-shrink-0 mt-0.5`} strokeWidth={1.5} />
            <p className="font-body text-sm text-cyber-text leading-relaxed">
              {classification === 'phishing' && (
                <>
                  This email exhibits <span className={`${config.color} font-semibold`}>multiple high-risk indicators</span> consistent with phishing attempts.
                  The combination of factors below suggests this message is designed to <span className={`${config.color} font-semibold`}>deceive the recipient</span> into taking harmful actions.
                </>
              )}
              {classification === 'suspicious' && (
                <>
                  While not definitively malicious, this email contains <span className={`${config.color} font-semibold`}>elements that warrant caution</span>.
                  Independent verification of the sender is strongly recommended before taking any action.
                </>
              )}
              {classification === 'safe' && (
                <>
                  Our analysis found <span className={`${config.color} font-semibold`}>no significant threat indicators</span> in this email.
                  The content, links, and sender information appear to be consistent with legitimate communication.
                </>
              )}
            </p>
          </div>

          <div className="space-y-3">
            {displayReasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className={`font-mono text-xs ${config.color} mt-0.5 flex-shrink-0`}>
                  {classification === 'safe' ? '[✓]' : '[!]'}
                </span>
                <span className="font-body text-sm text-cyber-muted-text leading-relaxed uppercase">
                  {reason}
                </span>
              </div>
            ))}
          </div>

          {classification === 'suspicious' && (
            <div className="mt-6 p-4 bg-warning/5 border border-warning/20">
              <p className="font-label text-xs text-warning leading-relaxed">
                RECOMMENDATION: Verify the sender through an independent channel (phone call, separate email thread) before interacting with any links or attachments in this email.
              </p>
            </div>
          )}

          {classification === 'phishing' && (
            <div className="mt-6 p-4 bg-danger/5 border border-danger/20">
              <p className="font-label text-xs text-danger leading-relaxed">
                DO NOT click any links, download attachments, or provide any personal information in response to this email. Report it to your IT security team immediately.
              </p>
            </div>
          )}

          {classification === 'safe' && (
            <div className="mt-6 p-4 bg-safe/5 border border-safe/20">
              <p className="font-label text-xs text-safe leading-relaxed">
                As a best practice, always verify sender addresses and hover over links before clicking, even in emails that appear safe.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
