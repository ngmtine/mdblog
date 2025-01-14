import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "iceberg-dark": "#161821",
                "iceberg-light": "#e8e9ec",
            },
            typography: {
                // proseクラス指定で付与されるデフォルトスタイルのリセット
                DEFAULT: {
                    css: {
                        maxWidth: "none",
                        h1: { color: "none" },
                        h2: { color: "none" },
                        h3: { color: "none" },
                        h4: { color: "none" },
                        h5: { color: "none" },
                        h6: { color: "none" },
                        p: { color: "inherit" },
                        a: { color: "inherit" },
                    },
                },
            },
        },
    },
    darkMode: "class",
    plugins: [typography, daisyui],
} satisfies Config;
