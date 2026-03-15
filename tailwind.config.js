/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Divine Color Palette ──────────────────────────
        'gold':       '#C9A84C',
        'gold-light': '#F0C96B',
        'gold-dim':   '#8B6914',
        'deep':       '#070707',
        'dark':       '#0D0A06',
        'surface':    '#110E08',
        'surface2':   '#1A1510',
        'cream':      '#E8DCC8',
        'cream-dim':  '#8A7A60',
        // ── Legacy (kept for backward compat) ────────────
        'dark-bg':        '#0a0a0a',
        'celestial-gold': '#D4AF37',
        'electric-blue':  '#00B4D8',
        'dark-secondary': '#1a1a1a',
        'dark-tertiary':  '#2a2a2a',
      },
      fontFamily: {
        'display': ['"Cinzel Decorative"', 'serif'],
        'serif':   ['"Cinzel"', 'serif'],
        'body':    ['"Inter"', 'sans-serif'],
        // Legacy
        'display-legacy': ['Clash Display', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(48px,8vw,100px)', { lineHeight: '1', fontWeight: '900' }],
        'section-title': ['clamp(32px,4vw,56px)', { lineHeight: '1.1' }],
      },
      spacing: {
        'section': 'clamp(80px,10vw,140px)',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-gold':'goldPulse 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
