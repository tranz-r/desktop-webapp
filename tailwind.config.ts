import type { Config } from "tailwindcss";

const config = {
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
        black: {
          DEFAULT: "#000000",
          50: "#f7f7f7",
          100: "#e3e3e3",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#000000",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
