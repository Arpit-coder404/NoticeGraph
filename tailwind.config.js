/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#17191C',
          light: '#282C32',
          muted: '#525863'
        },
        paper: {
          DEFAULT: '#FAF9F5',
          dark: '#F3F1E9',
          card: '#FFFFFF'
        },
        warm: {
          grey: '#EAE8E1',
          light: '#F5F4EE'
        },
        cobalt: {
          DEFAULT: '#315BEA',
          hover: '#2547C0',
          soft: '#E9EEFF'
        },
        signal: {
          orange: '#F27B42',
          hover: '#D66530',
          soft: '#FBECE3'
        },
        olive: {
          DEFAULT: '#92977C',
          soft: '#EFF2E7'
        },
        slate: {
          deep: '#41464D',
          border: '#DCDAD2'
        },
        divider: '#DCDAD2'
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}

