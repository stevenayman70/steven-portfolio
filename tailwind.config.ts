import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['var(--font-poppins)', 'sans-serif'],
        body:  ['var(--font-poppins)', 'sans-serif'],
        mono:  ['var(--font-space-mono)', 'monospace'],
      },
      colors: {
        // Core palette
        cream:  '#f0ebe3',
        'cream-dark': '#e8e0d5',
        canvas: '#faf8f5',
        dark:   '#1a1a1a',
        muted:  '#6b7280',
        ink: '#101613',
        mist: '#f1f3ed',
        slate: '#626b65',
        lime: '#b7ff5a',
        green: '#347a53',

        // Orange accent
        orange: {
          DEFAULT: '#347a53',
          dark:    '#285f41',
          light:   '#edf7f0',
          border:  '#b8dac5',
        },

        // Category colors (kept for badges on detail page)
        ai:       '#0d9488',
        n8n:      '#347a53',
        serenoil: '#16a34a',
        web:      '#2563eb',
        yt:       '#dc2626',

        // Status
        done:  '#16a34a',
        wip:   '#347a53',
        study: '#2563eb',

        // Admin surfaces (keep slightly dark for contrast)
        surface: '#f9fafb',
        card:    '#ffffff',
        border:  '#e5e7eb',
      },
      fontSize: {
        '8xl': '6rem',
        '9xl': '8rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease both',
        'fade-in': 'fadeIn 0.3s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
