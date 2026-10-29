import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkGreen: "#285943",
          green: "#4F805D",
          cream: "#FFF8EE",
          terracotta: "#D97955",
          charcoal: "#252922",
          border: "#E8E5DC",
          surface: "#FFFFFF",
          muted: "#74796F",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
