import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        black: "#444444",
        white: "#FFFFFF",

        green: "#64B32E",
        smoothGreen: "#E0F0D5",

        yellow: "#FBB034",
        smoothYellow: "#FEEFD6",

        purple: "#9B9AD5",
        smoothPurple: "#D6D7EB",
      },
      backgroundColor: {
        white: "#FFFFFF",
        green: "#64B32E",
        yellow: "#FBB034",
      },
    },
  },
  plugins: [],
};
export default config;
