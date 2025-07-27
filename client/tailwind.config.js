/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          bg: '#0d1117',
          'bg-secondary': '#161b22',
          'bg-tertiary': '#21262d',
          border: '#30363d',
          'text-primary': '#f0f6fc',
          'text-secondary': '#7d8590',
          'text-muted': '#656d76',
          blue: '#58a6ff',
          'blue-hover': '#4493e2',
          green: '#3fb950',
          'green-hover': '#2ea043'
        }
      },
      fontFamily: {
        mono: ['SFMono-Regular', 'Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Noto Sans"', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
