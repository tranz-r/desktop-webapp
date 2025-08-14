import type { Config } from "tailwindcss";
import sharedPreset from "@repo/tailwind-config/tailwind.preset";

const config = {
  presets: [sharedPreset],
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9568b0",
          foreground: "#ffffff",
          50: "#f5f3f7",
          100: "#ebe6ef",
          200: "#d7cedf",
          300: "#bbabc8",
          400: "#9b85ad",
          500: "#9568b0",
          600: "#7a5294",
          700: "#654378",
          800: "#533963",
          900: "#463154",
        },
        secondary: {
          DEFAULT: "#bbabc8",
          foreground: "#2d2d2d",
          50: "#f8f7fa",
          100: "#f1eef5",
          200: "#e3deeb",
          300: "#bbabc8",
          400: "#a695b5",
          500: "#9180a2",
          600: "#7c6b8f",
          700: "#675a76",
          800: "#544b61",
          900: "#474052",
        },
        accent: {
          DEFAULT: "#a4cbd1",
          foreground: "#2d2d2d",
          50: "#f0f9fa",
          100: "#daf1f4",
          200: "#b8e3e9",
          300: "#a4cbd1",
          400: "#7db8c2",
          500: "#5aa5b3",
          600: "#4a8a9a",
          700: "#3f7080",
          800: "#375c68",
          900: "#314d57",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
