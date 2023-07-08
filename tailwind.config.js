/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
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
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/typography")],
};
