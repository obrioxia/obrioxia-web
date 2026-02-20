/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        obrioxia: {
          base: '#000000',       // Pure Black background
          surface: '#121C2D',    // Glass (Dark Blue-Grey)
          cyan: '#00F0FF',       // The Laser (Primary Accent)
          green: '#00FF41',      // Terminal Green (Success/Verify)
          text: '#FFFFFF',       // Full white
          muted: '#94A3B8'       // Muted text
        }
      },
      fontFamily: {
        orbitron: ['"General Sans"', 'sans-serif'], // Map legacy fonts to new global font
        inter: ['"General Sans"', 'sans-serif'],
        general: ['"General Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #121C2D 1px, transparent 1px), linear-gradient(to bottom, #121C2D 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}


