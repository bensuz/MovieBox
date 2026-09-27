import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// In development the Express API runs separately; proxy it so the app can use
// same-origin requests exactly like it does in production.
const API_URL = process.env.API_URL ?? "http://localhost:8000";

// The whole stylesheet is ~11 kB gzipped, so inlining it into index.html is
// cheaper than a separate render-blocking request before first paint.
function inlineCss() {
    return {
        name: "moviebox:inline-css",
        apply: "build",
        transformIndexHtml: {
            order: "post",
            handler(html, { bundle }) {
                return html.replace(
                    /<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/g,
                    (tag, file) => (bundle?.[file] ? `<style>${bundle[file].source}</style>` : tag)
                );
            },
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), inlineCss()],
    server: {
        proxy: { "/api": API_URL },
    },
    preview: {
        proxy: { "/api": API_URL },
    },
});
