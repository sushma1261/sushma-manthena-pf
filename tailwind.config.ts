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
        // shadcn/ui base tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Editorial design tokens
        "background": "#f7f9fb",
        "on-background": "#2a3439",
        "surface": "#f7f9fb",
        "surface-dim": "#cfdce3",
        "surface-bright": "#f7f9fb",
        "surface-variant": "#d9e4ea",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f0f4f7",
        "surface-container": "#e8eff3",
        "surface-container-high": "#e1e9ee",
        "surface-container-highest": "#d9e4ea",
        "on-surface": "#2a3439",
        "on-surface-variant": "#566166",
        "primary": "#565e74",
        "on-primary": "#f7f7ff",
        "primary-container": "#dae2fd",
        "primary-dim": "#4a5268",
        "secondary": "#526075",
        "on-secondary": "#f8f8ff",
        "secondary-container": "#d5e3fd",
        "tertiary": "#006b62",
        "tertiary-dim": "#005e56",
        "tertiary-container": "#91feef",
        "on-tertiary-container": "#006259",
        "outline": "#717c82",
        "outline-variant": "#a9b4b9",
        "inverse-surface": "#0b0f10",
        "inverse-on-surface": "#9a9d9f",
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Space Grotesk", "sans-serif"],
      },
      scale: {
        "101": "1.01",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.8s ease-out forwards",
        slideUp: "slideUp 0.5s ease-out forwards",
        blob: "blob 7s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
