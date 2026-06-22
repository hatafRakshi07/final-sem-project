/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        sidebar: {
          bg:     '#0f172a',
          hover:  '#1e293b',
          active: '#4f46e5',
          text:   '#94a3b8',
          textHover: '#f1f5f9',
          border: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card':       '0 0 0 1px rgb(0 0 0 / 0.05), 0 1px 4px 0 rgb(0 0 0 / 0.06)',
        'card-md':    '0 0 0 1px rgb(0 0 0 / 0.05), 0 4px 16px 0 rgb(0 0 0 / 0.08)',
        'card-hover': '0 0 0 1px rgb(0 0 0 / 0.05), 0 4px 16px 0 rgb(0 0 0 / 0.08)',
        'card-lg': '0 0 0 1px rgb(0 0 0 / 0.05), 0 12px 40px 0 rgb(0 0 0 / 0.12)',
        'glow':    '0 0 24px rgb(99 102 241 / 0.4)',
        'glow-sm': '0 0 12px rgb(99 102 241 / 0.25)',
        'inner':   'inset 0 1px 2px 0 rgb(0 0 0 / 0.06)',
      },
      animation: {
        'fade-up':   'fadeUp 0.35s cubic-bezier(0.16,1,0.3,1)',
        'fade-in':   'fadeIn 0.2s ease-out',
        'scale-in':  'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1)',
        'slide-in':  'slideIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        'shimmer':   'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:  { from: { opacity:0, transform:'translateY(14px)' }, to: { opacity:1, transform:'translateY(0)' } },
        fadeIn:  { from: { opacity:0 }, to: { opacity:1 } },
        scaleIn: { from: { opacity:0, transform:'scale(0.94)' }, to: { opacity:1, transform:'scale(1)' } },
        slideIn: { from: { opacity:0, transform:'translateX(-14px)' }, to: { opacity:1, transform:'translateX(0)' } },
        shimmer: { '0%,100%': { opacity:1 }, '50%': { opacity:0.4 } },
      },
      screens: { xs: '375px' },
    },
  },
  plugins: [],
}
