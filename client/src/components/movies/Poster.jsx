import { useState } from "react";
import { FilmIcon } from "@heroicons/react/24/outline";
import { useInView } from "../../hooks/useInView";

// Poster image with a graceful fallback for missing or broken artwork.
// The alt text is empty because the title is always rendered next to it.
export default function Poster({ image, title, sizes, priority = false, className = "" }) {
    const [failedSrc, setFailedSrc] = useState(null);
    const [ref, inView] = useInView(!priority);

    if (!image?.src || failedSrc === image.src) {
        return (
            <div
                aria-hidden="true"
                className="flex size-full flex-col items-center justify-center bg-linear-to-br from-ink-700 to-ink-850 p-4 text-center"
            >
                <FilmIcon className="size-8 text-ink-400" />
                <span className="mt-2 line-clamp-3 text-xs font-medium text-ink-300">
                    {title}
                </span>
            </div>
        );
    }

    if (!inView) return <div ref={ref} className="size-full" aria-hidden="true" />;

    return (
        <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.srcSet ? sizes : undefined}
            alt=""
            width="342"
            height="513"
            fetchPriority={priority ? "high" : undefined}
            decoding="async"
            onError={() => setFailedSrc(image.src)}
            className={`size-full object-cover ${className}`}
        />
    );
}
