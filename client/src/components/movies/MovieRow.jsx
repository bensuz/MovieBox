import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "../ui/Button";
import MovieCard from "./MovieCard";

const ROW_SIZES = "(min-width: 1024px) 176px, (min-width: 640px) 160px, 144px";

// Horizontally scrolling shelf. Touch and trackpad users swipe; mouse users
// get paging buttons; keyboard users tab through the links.
export default function MovieRow({ title, href, linkLabel = "See all", items }) {
    const headingId = useId();
    const scroller = useRef(null);
    const [edges, setEdges] = useState({ start: true, end: false });

    const updateEdges = () => {
        const el = scroller.current;
        if (!el) return;
        setEdges({
            start: el.scrollLeft <= 4,
            end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
        });
    };

    useEffect(() => {
        const el = scroller.current;
        const observer = new ResizeObserver(updateEdges);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const page = (direction) => {
        const el = scroller.current;
        el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
    };

    return (
        <section aria-labelledby={headingId} className="mt-14">
            <div className="shell flex items-end justify-between gap-4">
                <h2 id={headingId} className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {title}
                </h2>
                <div className="flex items-center gap-1">
                    {href && (
                        <Link
                            to={href}
                            className="mr-2 rounded-full px-2 py-1 text-sm font-semibold text-brand-400 transition hover:text-brand-300"
                        >
                            {linkLabel}
                            <span className="sr-only"> in {title}</span>
                        </Link>
                    )}
                    <div className="hidden gap-1 md:flex">
                        <IconButton
                            label={`Scroll ${title} back`}
                            onClick={() => page(-1)}
                            disabled={edges.start}
                            className="ring-1 ring-white/10"
                        >
                            <ChevronLeftIcon aria-hidden="true" />
                        </IconButton>
                        <IconButton
                            label={`Scroll ${title} forward`}
                            onClick={() => page(1)}
                            disabled={edges.end}
                            className="ring-1 ring-white/10"
                        >
                            <ChevronRightIcon aria-hidden="true" />
                        </IconButton>
                    </div>
                </div>
            </div>
            <ul
                ref={scroller}
                onScroll={updateEdges}
                className="no-scrollbar px-bleed mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pt-1"
            >
                {items.map((item) => (
                    <li key={item.key} className="w-36 shrink-0 snap-start sm:w-40 lg:w-44">
                        <MovieCard item={item} sizes={ROW_SIZES} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
