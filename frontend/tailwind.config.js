/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-bg': '#0a0a0f',
        'cyber-card': '#12121a',
        'cyber-muted': '#1c1c2e',
        'cyber-border': '#2a2a3a',
        'cyber-text': '#e0e0e0',
        'cyber-muted-text': '#6b7280',
        'safe': '#00ff88',
        'danger': '#ff3366',
        'info': '#00d4ff',
        'ai': '#ff00ff',
        'warning': '#ffcc00',
      },
      fontFamily: {
        'display': ['"Orbitron"', '"Share Tech Mono"', 'monospace'],
        'mono': ['"JetBrains Mono"', '"Fira Code"', '"Consolas"', 'monospace'],
        'label': ['"Share Tech Mono"', 'monospace'],
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
        'wide-label': '0.12em',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'threat-pulse': 'threat-pulse 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'typing': 'typing 0.8s steps(40, end)',
        'score-fill': 'score-fill 1.5s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'threat-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'score-fill': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--score-width)' },
        },
      },
    },
  },
  plugins: [],
}
