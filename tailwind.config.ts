import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        infinit: {
          navy: "#0B223A",
          primary: "#A682FF",
          accent: "#715AFF",
          secondary: "#5887FF",
          sky: "#55C1FF",
          dark: "#02040A",
          surface: "#0A0F1E"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"]
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #715AFF 0%, #A682FF 50%, #5887FF 100%)",
        "gradient-dark": "linear-gradient(180deg, #02040A 0%, #0A0F1E 100%)"
      },
      animation: {
        "orbit": "orbit 12s linear infinite",
        "orbit-reverse": "orbit-reverse 16s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite"
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" }
        }
      }
    }
  },
  plugins: []
};
export default config;
