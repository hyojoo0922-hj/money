import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ── UI Kit 2.0 base palette ──────────────────────────
        bg:      "#0E0B16",   // app background
        card:    "#1F1B2E",   // card surface
        border:  "#2A263B",   // hairline border
        purple:  { DEFAULT: "#7B61FF", deep: "#5B3FD9" },
        pink:    { DEFAULT: "#FF4FDB", soft: "#FF4FDB33" },
        yellow:  { DEFAULT: "#FFBA3D", soft: "#FFBA3D22" },
        blue:    { DEFAULT: "#3882F6", soft: "#3882F622" },
        green:   { DEFAULT: "#00E5A8", soft: "#00E5A822" },
        // ── text ──────────────────────────────────────────────
        primary:   "#FFFFFF",
        secondary: "#A7A0BF",
        tertiary:  "#6D678A",
        // ── semantic shortcuts ────────────────────────────────
        surface:   "#1F1B2E",
      },
      fontFamily: {
        sans: ["Pretendard", "SF Pro Display", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xs:   "8px",
        sm:   "12px",
        md:   "16px",
        lg:   "20px",
        xl:   "24px",
        full: "9999px",
      },
      spacing: {
        // 8px base grid
        "1":  "4px",
        "2":  "8px",
        "3":  "12px",
        "4":  "16px",
        "5":  "20px",
        "6":  "24px",
        "8":  "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
      },
      backgroundImage: {
        // Gradient 01 — CTA / hero
        "grad-cta":     "linear-gradient(135deg, #FF4FDB 0%, #7B61FF 100%)",
        // Gradient 02 — cool accent
        "grad-cool":    "linear-gradient(135deg, #7B61FF 0%, #3882F6 100%)",
        // Gradient 03 — warm accent (yellow→pink)
        "grad-warm":    "linear-gradient(135deg, #FFBA3D 0%, #FF4FDB 100%)",
        // Card shimmer
        "card-glow":    "linear-gradient(135deg, #1F1B2E 0%, #2A1F3D 100%)",
        // Hero card bg
        "hero-bg":      "linear-gradient(160deg, #1A1235 0%, #0E0B16 100%)",
      },
      boxShadow: {
        // Neon glow on active/CTA elements
        "glow-pink":   "0 0 20px rgba(255, 79, 219, 0.35)",
        "glow-purple": "0 0 20px rgba(123, 97, 255, 0.35)",
        "glow-card":   "0 4px 24px rgba(0,0,0,0.45)",
        "glow-cta":    "0 8px 32px rgba(255,79,219,0.4)",
        "inner-glow":  "inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      keyframes: {
        floaty:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        pop:      { "0%": { transform: "scale(0.94)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
        shimmer:  { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        glow_pulse: { "0%,100%": { boxShadow: "0 0 12px rgba(255,79,219,0.3)" }, "50%": { boxShadow: "0 0 28px rgba(255,79,219,0.6)" } },
      },
      animation: {
        floaty:     "floaty 3.5s ease-in-out infinite",
        pop:        "pop 0.22s ease-out both",
        shimmer:    "shimmer 2s linear infinite",
        glow_pulse: "glow_pulse 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
