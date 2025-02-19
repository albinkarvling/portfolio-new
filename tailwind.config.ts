import type {Config} from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "background-primary": "#0D1B2A",
                "background-secondary": "#1B263B",
                "background-tertiary": "#202D45",
                "background-quaternary": "#22304A",
                "text-primary": "#E0E1DD",
                "text-secondary": "#888888",
            },
        },
    },
    plugins: [],
} satisfies Config;
