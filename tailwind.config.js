/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#142E09',        // Deepest logo dark green
          forest: '#1E3F0A',      // Logo dark green
          primary: '#3F6B18',     // Deep medium logo green
          emerald: '#527E24',     // Official logo medium/fresh green
          fresh: '#6CA230',       // Highlight fresh green
          light: '#F3F8EE',       // Light tinted background
          navy: '#0F172A',        // Dark navy/charcoal for text
          charcoal: '#1E293B',    // Soft charcoal
          muted: '#64748B',       // Muted slate
          border: '#E2E8F0',      // Soft border
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 63, 10, 0.05)',
        'premium': '0 12px 35px -4px rgba(30, 63, 10, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
