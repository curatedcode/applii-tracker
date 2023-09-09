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
      screens: {
        "3xl": "120rem",
      },
      width: {
        "8xl": "120rem",
      },
      maxWidth: {
        "8xl": "120rem",
      },
      colors: {
        site: {
          main: "#222222",
        },
        card: {
          needToApply: "#add8e6",
          applied: "#22C55E",
          interviewing: "#ffdb58",
          offer: "#4169E1",
          closed: "#D9534F",
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    }),
  ],
};
export default config;
