import type {Config} from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            width: {
                main: "1200px",
            },
            maxWidth: {
                main: "90%",
            },
            colors: {
                "background-primary": "#0D1B2A",
                "background-secondary": "#1B263B",
                "background-tertiary": "#202D45",
                "background-quaternary": "#22304A",
                "text-primary": "#E0E1DD",
                "text-secondary": "#888888",
            },
            keyframes: {
                "arrow-bounce": {
                    "0%, 100%": {transform: "translateY(0)"},
                    "10%": {transform: "translateY(-5px)"},
                    "20%": {transform: "translateY(0)"},
                    "100%": {transform: "translateY(0)"},
                },
                "header-pulse": {
                    "0%": {opacity: "0"},
                    "100%": {opacity: "1"},
                },
            },
            animation: {
                "arrow-bounce": "arrow-bounce 4s ease-in-out infinite",
                "header-pulse": "header-pulse .6s ease-out infinite alternate",
            },
        },
    },
    plugins: [],
} satisfies Config;
