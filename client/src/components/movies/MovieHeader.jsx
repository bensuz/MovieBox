import Poster from "./Poster";

// Shared hero for TMDB movies and saved movies: backdrop, poster, title,
// meta, genres, overview and actions.
export default function MovieHeader({
    title,
    tagline,
    backdrop,
    poster,
    meta = [],
    genres = [],
    overview,
    actions,
}) {
    return (
        <div className="relative isolate -mt-16 overflow-hidden">
            <div className="absolute inset-0 -z-10" aria-hidden="true">
                {backdrop ? (
                    <img
                        src={backdrop.src}
                        srcSet={backdrop.srcSet}
                        sizes="100vw"
                        alt=""
                        fetchPriority="high"
                        className="size-full object-cover object-top opacity-50"
                    />
                ) : (
                    poster?.src && (
                        <img
                            src={poster.src}
                            alt=""
                            className="size-full scale-125 object-cover opacity-30 blur-3xl"
                        />
                    )
                )}
                <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/80 to-ink-950/20" />
                <div className="absolute inset-0 bg-linear-to-r from-ink-950/90 via-ink-950/30 to-transparent" />
            </div>

            <div className="shell grid gap-8 pb-10 pt-28 sm:pt-32 md:grid-cols-[15rem_1fr] md:items-end md:gap-10 lg:grid-cols-[18rem_1fr] lg:gap-14 lg:pt-44">
                <div className="mx-auto w-44 animate-fade-up sm:w-52 md:mx-0 md:w-full">
                    <div className="aspect-2/3 overflow-hidden rounded-2xl bg-ink-800 shadow-poster ring-1 ring-white/15">
                        <Poster
                            image={poster}
                            title={title}
                            sizes="(min-width: 1024px) 288px, (min-width: 768px) 240px, 208px"
                            priority
                        />
                    </div>
                </div>

                <div className="min-w-0 text-center md:text-left">
                    <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                        {title}
                    </h1>
                    {tagline && (
                        <p className="mt-3 text-lg italic text-ink-300">{tagline}</p>
                    )}

                    {meta.length > 0 && (
                        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm font-medium text-ink-200 md:justify-start">
                            {meta.map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    {i > 0 && (
                                        <span className="text-ink-400" aria-hidden="true">
                                            •
                                        </span>
                                    )}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}

                    {genres.length > 0 && (
                        <ul
                            aria-label="Genres"
                            className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start"
                        >
                            {genres.map((genre) => (
                                <li
                                    key={genre}
                                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-ink-100 ring-1 ring-inset ring-white/15"
                                >
                                    {genre}
                                </li>
                            ))}
                        </ul>
                    )}

                    {overview && (
                        <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-relaxed text-ink-200 sm:text-lg md:mx-0">
                            {overview}
                        </p>
                    )}

                    {actions && (
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function MovieHeaderSkeleton() {
    return (
        <div role="status" className="shell grid gap-8 pb-10 pt-12 sm:pt-16 md:grid-cols-[15rem_1fr] md:items-end lg:grid-cols-[18rem_1fr] lg:gap-14 lg:pt-28">
            <span className="sr-only">Loading movie</span>
            <div aria-hidden="true" className="mx-auto aspect-2/3 w-44 animate-pulse rounded-2xl bg-ink-800 sm:w-52 md:mx-0 md:w-full" />
            <div aria-hidden="true" className="space-y-4">
                <div className="mx-auto h-12 w-3/4 animate-pulse rounded-lg bg-ink-800 md:mx-0" />
                <div className="mx-auto h-4 w-1/3 animate-pulse rounded bg-ink-800 md:mx-0" />
                <div className="mx-auto h-24 max-w-2xl animate-pulse rounded-lg bg-ink-800 md:mx-0" />
            </div>
        </div>
    );
}

export function FactList({ facts }) {
    const visible = facts.filter((fact) => fact.value);
    if (visible.length === 0) return null;
    return (
        <section aria-labelledby="facts-heading" className="shell">
            <h2 id="facts-heading" className="sr-only">
                Details
            </h2>
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10">
                {visible.map((fact) => (
                    <div key={fact.label} className="bg-ink-900 px-5 py-4">
                        <dt className="text-xs font-medium uppercase tracking-wider text-ink-400">
                            {fact.label}
                        </dt>
                        <dd className="mt-1 truncate text-sm font-semibold text-ink-100" title={fact.value}>
                            {fact.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}
