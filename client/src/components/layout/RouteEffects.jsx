import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigationType } from "react-router";

// Client-side navigation doesn't reset scroll or tell screen readers that the
// page changed. This restores both behaviours of a traditional page load.
export default function RouteEffects() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();
    const [announcement, setAnnouncement] = useState("");
    const isFirstRender = useRef(true);

    useLayoutEffect(() => {
        // Back/forward keeps the browser's own scroll restoration.
        if (navigationType !== "POP") window.scrollTo(0, 0);
    }, [pathname, navigationType]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // Wait for the new page to render its <title>.
        const timer = setTimeout(() => setAnnouncement(document.title), 400);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <p aria-live="polite" aria-atomic="true" className="sr-only">
            {announcement}
        </p>
    );
}
