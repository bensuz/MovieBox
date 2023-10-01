/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "main-bg": "#242E34",
                "mb-primary": "#DDDDDD",
                "mb-secondary": "#222831",
                "mb-tertiary": "#30475E",
                "mb-quartery": "#FF4155",
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
                figtree: ["Figtree", "sans-serif"],
                scada: ["Scada", "sans-serif"],
            },
            height: {
                144: "36rem",
            },
            backgroundImage: {
                barbie: "url('.src/assets/barbie.jpeg')",
            },
        },
    },
    plugins: [require("tailwindcss-animated")],
};
