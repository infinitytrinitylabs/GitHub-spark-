/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Daffodil-inspired warm, earthy palette
        bone: '#F2ECE2',
        cream: '#EDE4D3',
        sand: '#D9C8A9',
        ochre: '#C79A3A',
        daffodil: '#E9B949',
        amber: '#B87333',
        rust: '#7A3B1F',
        ink: '#14110F',
        moss: '#4A5A3A',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
    },
  },
  plugins: [],
};
