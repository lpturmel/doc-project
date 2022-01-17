module.exports = {
    content: [
        "./pages/**/*.{js,ts,tsx,jsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: true, // or 'media' or 'class'
    theme: {
        extend: {
            gridTemplateColumns: {
                posts: "repeat(auto-fill, minmax(400px, 1fr))",
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: "#FFFFFF",
                        h2: {
                            color: "#ECB365",
                        },
                        h3: {
                            color: "#FFFFFF",
                        },
                    },
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("tailwind-scrollbar-hide"),
    ],
};
