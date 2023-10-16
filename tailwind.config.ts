import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

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
      },
      minHeight: {
        formSection: "20rem",
      },
      screens: {
        "3xl": "120rem",
      },
      width: {
        "8xl": "120rem",
        "board-section": "22rem",
      },
      maxWidth: {
        "8xl": "120rem",
        "board-section": "22rem",
      },
      colors: {
        dark: {
          main: "#191919",
          secondary: "#2c2c2c",
          "secondary-shaded": "#404040",
          text: "#d4d4d4",
        },
        light: {
          main: "#ffffff",
          secondary: "#f1f1f0",
          "secondary-shaded": "#dadad8",
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
};
export default config;
