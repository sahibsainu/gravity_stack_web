/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf0ff',
          100: '#dfe3ff',
          200: '#c4caff',
          300: '#a0a6ff',
          400: '#7f7dff',
          500: '#6C63FF', // Main primary color
          600: '#5a4aef',
          700: '#4c38d9',
          800: '#3e30af',
          900: '#352d88',
        },
        space: {
          50: '#EEF2FF',
          100: '#D9E2FC',
          200: '#B2C1F0',
          300: '#8A9FE3',
          400: '#647CD7',
          500: '#3B5BD9',
          600: '#2A439E',
          700: '#1E3274',
          800: '#13204A',
          900: '#0A1128', // Deep space blue
        },
        cosmic: {
          50: '#F0F4FD',
          100: '#E2E9FA',
          200: '#C5D3F6',
          300: '#A7BDF1',
          400: '#8AA7ED',
          500: '#6D91E8',
          600: '#5174BA',
          700: '#3A578B',
          800: '#233A5D',
          900: '#0C1D2E',
        },
        success: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
        'hard': '0 8px 30px 0 rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/hero-bg.svg')",
        'footer-pattern': "url('/src/assets/footer-bg.svg')",
      }
    },
  },
  plugins: [],
};
