import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "board-section": "28rem",
        "screen-minus-nav": "calc(100vh - 240px)",
        "board-section-card": "5.75rem",
      },
      minHeight: {
        formSection: "20rem",
      },
      screens: {
        micro: "270px",
        xs: "448px",
        "3xl": "120rem",
      },
      width: {
        "8xl": "120rem",
        "board-section": "23rem",
      },
      maxWidth: {
        "8xl": "120rem",
        "board-section": "23rem",
      },
      colors: {
        dark: {
          primary: "#191919",
          secondary: "#262626",
          tertiary: "#333333",
          text: "#d4d4d4",
        },
        light: {
          primary: "#eff2f5",
          secondary: "#fcfdfd",
          tertiary: "#dadad8",
          text: "#37352f",
        },
        card: {
          needToApply: "#ADD8E6",
          applied: "#22C55E",
          interviewing: "#FFDB58",
          offer: "#a891ee",
          closed: "#D9534F",
        },
      },
      keyframes: {
        loading: {
          to: {
            opacity: "0.1",
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
      animation: {
        "metric-loading":
          "loading 0.75s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate",
        "spin-slow":
          "spin 500s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  safelist: [
    "bg-card-needToApply",
    "bg-card-applied",
    "bg-card-interviewing",
    "bg-card-offer",
    "bg-card-closed",
  ],
  darkMode: "class",
};
export default config;
