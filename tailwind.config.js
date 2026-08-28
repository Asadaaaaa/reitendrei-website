/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
        },
        muted: "var(--muted)",
        card: "var(--card)",
        border: "var(--border)",
        surface: "var(--surface)",
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Syne"', 'Impact', 'system-ui', 'sans-serif'],
        serifDisplay: ['"Cinzel"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        widest: '0.25em',
        ultra: '0.35em',
      },
    },
  },
  plugins: [],
}
