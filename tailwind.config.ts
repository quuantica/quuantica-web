import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand QUUANTICA
        ink: {
          950: '#040814',
          900: '#070D1E',
          850: '#0A1326',
          800: '#0E1A33',
          700: '#142342',
          600: '#1B2D52',
        },
        brand: {
          // Azul corporativo QUUANTICA
          50: '#EDF4FF',
          100: '#D7E5FF',
          200: '#AECCFF',
          300: '#7FAFFF',
          400: '#4D8DFB',
          500: '#2B6BE6',
          600: '#1E50C7',
          700: '#1A3FA1',
          800: '#162F77',
          900: '#0F215A',
          950: '#091236',
        },
        accent: {
          cyan: '#22D3EE',
          violet: '#A78BFA',
          amber: '#FACC15',
          emerald: '#10B981',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(74, 134, 232, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 134, 232, 0.07) 1px, transparent 1px)",
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(43, 107, 230, 0.18), transparent 60%)',
        'mesh-gradient': 'linear-gradient(135deg, #040814 0%, #091236 50%, #0A1326 100%)',
      },
      animation: {
        'fade-up': 'fadeUp .8s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-brand': '0 0 60px rgba(43, 107, 230, 0.25), 0 8px 28px rgba(0,0,0,.4)',
        'glow-cyan': '0 0 40px rgba(34, 211, 238, 0.20)',
        'soft': '0 4px 24px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};

export default config;
