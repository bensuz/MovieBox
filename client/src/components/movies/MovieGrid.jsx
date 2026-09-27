import MovieCard from "./MovieCard";

const GRID =
    "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6";

export default function MovieGrid({ items, priorityCount = 0 }) {
    return (
        <ul className={GRID}>
            {items.map((item, index) => (
                <li key={item.key}>
                    <MovieCard item={item} priority={index < priorityCount} />
                </li>
            ))}
        </ul>
    );
}

export function MovieGridSkeleton({ count = 12, label = "Loading movies" }) {
    return (
        <div role="status">
            <span className="sr-only">{label}</span>
            <ul className={GRID} aria-hidden="true">
                {Array.from({ length: count }, (_, i) => (
                    <li key={i}>
                        <div className="aspect-2/3 animate-pulse rounded-xl bg-ink-800" />
                        <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-ink-800" />
                        <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-ink-800" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
