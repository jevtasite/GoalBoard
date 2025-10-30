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
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'score': '144px',
        'team': '48px',
        'timer': '72px',
        'period': '24px',
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
