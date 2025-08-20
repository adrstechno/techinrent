/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        skyblue: "#87ceeb", // now bg-skyblue works

        primary: "#1E40AF", // Blue
        secondary: "#6B7280", // Gray
        accent: "#059669", // Green
        danger: "#DC2626", // Red
        warning: "#F59E0B", // Amber

        neutral: {
          light: "#f8f9fa",
          medium: "#adb5bd",
          dark: "#495057",
          darkest: "#212529", // now text-neutral-darkest works
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: [
          "ui-monospace",
          "SF Mono",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],

        // ✅ Custom aliases
        body: [
          "Source Sans Pro",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "Roboto",
          "Inter",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Roboto",
          "Inter",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        "fluid-sm": "clamp(0.8rem, 1.5vw, 0.9rem)",
        "fluid-xl": "clamp(1.2rem, 2.5vw, 1.5rem)",
        "fluid-3xl": "clamp(1.8rem, 3.5vw, 2.25rem)",
        "fluid-4xl": "clamp(2.25rem, 4.5vw, 3rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
