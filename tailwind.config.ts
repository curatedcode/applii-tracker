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
      minWidth: {
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
        wiggle: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0.7rem, 1rem, 1rem)" },
        },
        "shift-gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left bottom",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right bottom",
          },
        },
        "make-visible": {
          "0%": {
            visibility: "hidden",
          },
          "100%": {
            visibility: "visible",
          },
        },
      },
      animation: {
        "metric-loading":
          "loading 0.75s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate",
        wiggle: "wiggle 10s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate",
        "shift-gradient-x":
          "shift-gradient-x 10s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate",
        appear: "make-visible 0ms linear 50ms forwards",
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
    "outline-none",
    "transition-colors",
    "focus-within:outline-none",
    "hover:opacity-95",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-dark-secondary",
    "focus-visible:ring-opacity-75",
    "focus-visible:ring-offset-dark-secondary",
    "dark:focus-visible:ring-light-secondary",
    "dark:focus-visible:ring-offset-light-secondary",
  ],
  darkMode: "class",
};
export default config;
