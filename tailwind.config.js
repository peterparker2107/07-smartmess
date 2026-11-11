/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mess: {
          bg: '#090d16',
          surface: '#0f172a',
          card: '#1e293b',
          cardHover: '#283548',
          border: '#334155',
          borderLight: '#475569',
          orange: '#f97316',
          orangeGlow: 'rgba(249, 115, 22, 0.25)',
          amber: '#f59e0b',
          flame: '#ea580c',
          smoke: '#1e293b',
          emerald: '#10b981',
          rose: '#f43f5e',
          text: '#f8fafc',
          muted: '#94a3b8',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flame-flicker': 'flameFlicker 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))' },
          '50%': { opacity: '0.6', filter: 'drop-shadow(0 0 3px rgba(249, 115, 22, 0.2))' },
        },
        flameFlicker: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
