import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          300: '#4DF0E3',
          400: '#26E8DB',
          500: '#00BDB0',
          600: '#00A098',
          700: '#008379',
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
