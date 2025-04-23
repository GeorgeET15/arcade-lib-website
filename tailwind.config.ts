// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#282d36",
        input: "#191D23",
        ring: "#14c9c9",
        background: "#161B22",
        foreground: "#F7EFEA",
        primary: {
          DEFAULT: "#14c9c9",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#ffda41",
          foreground: "#0D1321",
        },
        destructive: {
          DEFAULT: "#EC2955",
          foreground: "#fff",
        },
        muted: {
          DEFAULT: "#282d36",
          foreground: "#e1e5ec",
        },
        accent: {
          DEFAULT: "#FF7BDF",
          foreground: "#161B22",
        },
        popover: {
          DEFAULT: "#243041",
          foreground: "#fff",
        },
        card: {
          DEFAULT: "#1F232B",
          foreground: "#F7EFEA",
        },
        pixel: {
          teal: "#14c9c9",
          pink: "#FF7BDF",
          yellow: "#ffda41",
          navy: "#192436",
          dark: "#161B22",
          white: "#F7EFEA",
          light: "#e1e5ec",
          magenta: "#EC2955",
          blue: "#3ad1ff",
          border: "#262533",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        code: ["Fira Code", "monospace"],
        sans: ["Inter", "sans-serif"],
        pixel: ['"Press Start 2P"', "system-ui", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        pixelFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pixelSpin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        fallIn: {
          "0%": { transform: "translateY(-100vh)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pixel-float": "pixelFloat 2s ease-in-out infinite",
        "pixel-spin": "pixelSpin 3s linear infinite",
        "fall-in": "fallIn 3s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
