import type { Config } from 'tailwindcss';

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

        // Orange accent
        orange: {
          DEFAULT: '#f97316',
          dark:    '#ea580c',
          light:   '#fff7ed',
          border:  '#fed7aa',
        },

        // Category colors (kept for badges on detail page)
        ai:       '#0d9488',
        n8n:      '#f97316',
        serenoil: '#16a34a',
        robotics: '#7c3aed',
        web:      '#2563eb',
        yt:       '#dc2626',

        // Status
        done:  '#16a34a',
        wip:   '#d97706',
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
    require('@tailwindcss/typography'),
  ],
};

export default config;
