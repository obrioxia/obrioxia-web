/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        obrioxia: {
          base: '#050B14',       // The Void (Deep Navy-Black)
          surface: '#121C2D',    // Glass (Dark Blue-Grey)
          cyan: '#00F0FF',       // The Laser (Primary Accent)
          green: '#00FF41',      // Terminal Green (Success/Verify)
          text: '#E2E8F0',       // Off-white slate
          muted: '#64748B'       // Muted text
        }
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #121C2D 1px, transparent 1px), linear-gradient(to bottom, #121C2D 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}


