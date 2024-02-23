import typography from "@tailwindcss/typography";

import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/pages/**/*.{js,ts,jsx,tsx,mdx}", "./app/components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                "iceberg-dark": "#161821",
                "iceberg-light": "#e8e9ec",
            },
            typography: {
                // proseクラス指定で付与されるデフォルトスタイルのリセット
                DEFAULT: {
                    css: {
                        maxWidth: "none",
                        h1: {
                            color: "none",
                        },
                        h2: {
                            color: "none",
                        },
                        h3: {
                            color: "none",
                        },
                        h4: {
                            color: "none",
                        },
                        h5: {
                            color: "none",
                        },
                        h6: {
                            color: "none",
                        },
                    },
                },
            },
            container: {
                screens: {
                    // sm: "640px",
                    // md: "768px",
                    // lg: "1024px",
                    // xl: "1280px",
                    "2xl": "1536px",
                },
            },
        },
    },
    darkMode: "class",
    plugins: [typography],
};

export default config;
