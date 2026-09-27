import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource-variable/bricolage-grotesque";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/Auth.jsx";
import { MyListProvider } from "./context/MyList.jsx";

// index.html ships default tags for crawlers that don't run JavaScript.
// From here on each page renders its own, so drop the defaults to avoid
// duplicates in <head>.
document.head
    .querySelectorAll('title, meta[name="description"], link[rel="canonical"]')
    .forEach((node) => node.remove());

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <MyListProvider>
                    <App />
                </MyListProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
