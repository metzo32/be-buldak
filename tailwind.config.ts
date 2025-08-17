import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kingsejong)", "Apple SD Gothic Neo", "sans-serif"],
      },
    },
  },
  plugins: [scrollbar],
};

export default config;
