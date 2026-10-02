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
          dark: '#08231B',
          forest: '#0D3B2E',
          primary: '#047857',
          emerald: '#10B981',
          fresh: '#34D399',
          light: '#ECFDF5',
          navy: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 59, 46, 0.05)',
        'premium': '0 12px 35px -4px rgba(13, 59, 46, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
