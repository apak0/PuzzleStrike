/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slideIn 0.5s ease-out',
        sparkle: 'sparkle 0.2s ease-in-out infinite',
        dissolve: 'dissolve 0.3s ease-out forwards'
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        sparkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        dissolve: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.1)', opacity: 0.5 },
          '100%': { transform: 'scale(0)', opacity: 0 }
        }
      },
    },
  },
  plugins: [],
};