/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ["'Noto Serif JP'", 'ui-serif', 'serif'],
      },
      colors: {
        ink: {
          950: '#05070d',
          900: '#0a0f1c',
          800: '#0f1628',
          700: '#141c33',
        },
        frost: {
          100: '#e6ecff',
          200: '#c5d1ef',
          300: '#8fa1c9',
        },
        accent: {
          cyan: '#7fe7ff',
          blue: '#4aa3ff',
          violet: '#8a6bff',
        },
      },
    },
  },
  plugins: [],
};
