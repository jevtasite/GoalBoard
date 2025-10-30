/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        broadcastNavy: '#0A1628',
        electricMint: '#00FF87',
        steelBlue: '#1E3A5F',
        broadcastRed: '#FF2D55',
        slateGray: '#8E99AB',
        goalGreen: '#34C759',
        teamA: '#00FF87',           // Electric Mint - cyan/green
        teamB: '#FF8C00',           // Broadcast Orange - warm contrast
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'score': '240px',        // Increased from 144px
        'team': '80px',          // Increased from 48px
        'timer': '120px',        // Increased from 72px
        'timer-ms': '60px',      // For milliseconds
        'period': '40px',        // Increased from 24px
        'vs': '64px',            // For VS indicator
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        'xxl': '64px',
      },
    },
  },
  plugins: [],
}
