/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {
                iceberg: "#161821",
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
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
