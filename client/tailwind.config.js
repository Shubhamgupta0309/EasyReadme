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
          // Background colors (exact GitHub colors)
          canvas: '#ffffff',
          'canvas-default': '#ffffff',
          'canvas-subtle': '#f6f8fa',
          'canvas-inset': '#f6f8fa',
          
          // Border colors
          border: '#d0d7de',
          'border-default': '#d0d7de',
          'border-muted': '#d8dee4',
          
          // Text colors
          text: '#1f2328',
          'text-primary': '#1f2328',
          'text-secondary': '#656d76',
          'text-muted': '#656d76',
          
          // Interactive colors
          blue: '#0969da',
          'blue-hover': '#0860ca',
          green: '#1a7f37',
          'green-hover': '#116329',
          
          // Status colors
          success: '#1a7f37',
          'success-emphasis': '#116329',
          'success-subtle': '#dafbe1',
          'success-muted': '#1a7f37',
          
          danger: '#d1242f',
          'danger-emphasis': '#a40e26',
          'danger-subtle': '#ffebe9',
          'danger-muted': '#d1242f',
          
          attention: '#9a6700',
          'attention-emphasis': '#7d4e00',
          'attention-subtle': '#fff8c5',
          'attention-muted': '#9a6700',
          
          accent: '#0969da',
          'accent-emphasis': '#0860ca',
          'accent-subtle': '#ddf4ff',
          'accent-muted': '#0969da',
          
          // Neutral colors
          neutral: '#6e7781',
          'neutral-emphasis': '#656d76',
          'neutral-muted': '#f6f8fa',
          'neutral-subtle': '#afb8c1'
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
