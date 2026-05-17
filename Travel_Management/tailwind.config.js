/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        "secondary-fixed": "#cfe5ff",
        "on-tertiary-container": "#c6955e",
        "tertiary-fixed-dim": "#f2bc82",
        "tertiary-container": "#4f2e00",
        "surface-bright": "#f7f9fb",
        "primary": "#002045",
        "on-tertiary-fixed-variant": "#633f0f",
        "on-primary-fixed-variant": "#2d476f",
        "on-surface-variant": "#43474e",
        "primary-fixed": "#d6e3ff",
        "on-primary-container": "#86a0cd",
        "surface-container-highest": "#e0e3e5",
        "surface-container-lowest": "#ffffff",
        "inverse-primary": "#adc7f7",
        "outline-variant": "#c4c6cf",
        "primary-fixed-dim": "#adc7f7",
        "on-primary": "#ffffff",
        "secondary-container": "#61b4fd",
        "on-primary-fixed": "#001b3c",
        "inverse-on-surface": "#eff1f3",
        "error-container": "#ffdad6",
        "outline": "#74777f",
        "on-tertiary": "#ffffff",
        "surface-container-high": "#e6e8ea",
        "primary-container": "#1a365d",
        "surface-tint": "#455f88",
        "inverse-surface": "#2d3133",
        "on-secondary": "#ffffff",
        "on-error-container": "#93000a",
        "tertiary": "#321b00",
        "error": "#ba1a1a",
        "on-tertiary-fixed": "#2b1700",
        "surface": "#f7f9fb",
        "surface-container-low": "#f2f4f6",
        "on-error": "#ffffff",
        "on-secondary-fixed": "#001d34",
        "secondary": "#00629d",
        "surface-container": "#eceef0",
        "tertiary-fixed": "#ffddba",
        "background": "#f7f9fb",
        "on-background": "#191c1e",
        "secondary-fixed-dim": "#99cbff",
        "surface-dim": "#d8dadc",
        "on-surface": "#191c1e",
        "on-secondary-fixed-variant": "#004a78",
        "on-secondary-container": "#004470",
        "surface-variant": "#e0e3e5",
        "slate": {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0',
          600: '#475569', 700: '#334155', 900: '#0f172a'
        },
        "blue": {
          600: '#2563eb', 700: '#1d4ed8', 900: '#0c4a6e'
        }
      },
      borderRadius: {
        // ✅ FIXED: removed override of DEFAULT so standard rounded-* still work
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
    },
  },
  // ✅ Enable selection variant
  plugins: [
    function({ addVariant }) {
      addVariant('selection', '&::selection');
    }
  ],
}