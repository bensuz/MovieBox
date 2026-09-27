import { useEffect, useRef, useState } from "react";

// One shared observer for every lazy image. Native loading="lazy" starts
// downloads 1250px+ below the viewport, which steals bandwidth from the hero
// image on phones; a tighter margin keeps the first paint fast.
const callbacks = new WeakMap();
let observer;

function getObserver() {
    observer ??= new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                callbacks.get(entry.target)?.();
                observer.unobserve(entry.target);
                callbacks.delete(entry.target);
            }
        },
        { rootMargin: "200px" }
    );
    return observer;
}

export function useInView(enabled = true) {
    const ref = useRef(null);
    const [inView, setInView] = useState(!enabled);

    useEffect(() => {
        const element = ref.current;
        if (!enabled || !element) return;
        callbacks.set(element, () => setInView(true));
        getObserver().observe(element);
        return () => {
            getObserver().unobserve(element);
            callbacks.delete(element);
        };
    }, [enabled]);

    return [ref, inView];
}
