import React, { useEffect, useState } from 'react';
import { AlertTriangle, Brain } from 'lucide-react';

const STATS = [
  { label: 'PHISHING RATE', value: 26.6, suffix: '%', icon: AlertTriangle, color: 'text-warning' },
  { label: 'MODEL ACCURACY', value: 94.8, suffix: '%', icon: Brain, color: 'text-ai' },
];

function AnimatedCounter({ target, suffix, duration = 1500 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  const formatted = typeof count === 'number' && count >= 1000 && !suffix
    ? count.toLocaleString()
    : count;

  return (
    <span>{formatted}{suffix}</span>
  );
}

export default function SecurityStats() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-cyber-border" />
          <h3 className="font-display text-xs sm:text-sm tracking-ultra-wide uppercase text-cyber-text">
            PLATFORM STATISTICS
          </h3>
          <div className="h-px flex-1 bg-cyber-border" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
          {STATS.map(({ label, value, suffix, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-cyber-card border border-cyber-border p-4 sm:p-6 text-center hover:border-cyber-muted-text/30 transition-all duration-200 group"
            >
              <Icon className={`w-5 h-5 ${color} mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity`} strokeWidth={1.5} />
              <div className={`font-display text-xl sm:text-2xl lg:text-3xl font-bold ${color} mb-2`}>
                <AnimatedCounter target={value} suffix={suffix} />
              </div>
              <span className="font-label text-[9px] sm:text-[10px] tracking-wide-label text-cyber-muted-text uppercase">
                {label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center font-label text-[10px] text-cyber-muted-text/50 mt-4">
          DEMONSTRATION VALUES — NOT BASED ON REAL-WORLD DATA
        </p>
      </div>
    </section>
  );
}
