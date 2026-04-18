import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // Background layers
        'bg':          'var(--theme-bg)',
        'surface':     'var(--theme-surface)',

        // Accent
        'accent':      'var(--theme-accent)',
        'accent-hover':'var(--theme-accent-hover)',

        // Text
        'primary':     'var(--theme-text)',
        'muted':       'var(--theme-muted)',
        'nav':         'var(--theme-nav-text)',
      },
      borderColor: {
        DEFAULT:       'var(--theme-border)',
        'theme':       'var(--theme-border)',
      },
      backgroundColor: {
        'glow':        'var(--theme-glow)',
      },
      textColor: {
        'primary':     'var(--theme-text)',
        'muted':       'var(--theme-muted)',
        'accent':      'var(--theme-accent)',
        'nav':         'var(--theme-nav-text)',
      },
      ringColor: {
        'accent':      'var(--theme-accent)',
      },
      fontFamily: {
        mono: ['Fira Code', 'Cascadia Code', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [typography],
} satisfies Config;