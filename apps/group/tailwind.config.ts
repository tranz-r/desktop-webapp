import type { Config } from "tailwindcss";
import baseConfig from "@repo/tailwind-config/tailwind.preset";

export default {
  ...baseConfig,
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
} satisfies Config;
