/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Backgrounds & Surfaces
        background: {
          DEFAULT: "#0F172A", // App background
          card: "#273244",
          input: "#111827",
        },

        // Primary Branding
        primary: {
          DEFAULT: "#5B67F2",
          light: "#818CF8",
        },

        // Status & Priority
        priority: {
          high: "#EF4444",
          medium: "#F59E0B",
          lowMedium: "#EAB308",
          low: "#22C55E",
        },

        // Secondary Accent
        accent: {
          teal: "#14B8A6",
        },

        // Typography
        text: {
          primary: "#F9FAFB",
          secondary: "#9CA3AF",
        },

        icon: {
          active: "#5B67F2",
          inactive: "#6B7280",
        },

        // Badge / Overdue backgrounds
        badge: {
          default: "rgba(249, 250, 251, 0.1)",
          overdue: "rgba(239, 68, 68, 0.15)",
        },
      },
    },
  },
  plugins: [],
};
