import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "rgb(var(--bg-primary) / <alpha-value>)",
          secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
          card: "rgb(var(--bg-card) / <alpha-value>)",
          "card-hover": "rgb(var(--bg-card-hover) / <alpha-value>)",
        },
        fg: "rgb(var(--fg) / <alpha-value>)",
        border: {
          DEFAULT: "var(--border)",
          accent: "var(--border-accent)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "var(--text-muted)",
        },
        accent: {
          blue: "rgb(var(--accent-blue) / <alpha-value>)",
          "blue-light": "rgb(var(--accent-blue-light) / <alpha-value>)",
          "blue-dim": "var(--accent-blue-dim)",
          teal: "rgb(var(--accent-teal) / <alpha-value>)",
          "teal-light": "rgb(var(--accent-teal-light) / <alpha-value>)",
          "teal-dim": "var(--accent-teal-dim)",
          amber: "rgb(var(--accent-amber) / <alpha-value>)",
          "amber-light": "rgb(var(--accent-amber-light) / <alpha-value>)",
          "amber-dim": "var(--accent-amber-dim)",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
