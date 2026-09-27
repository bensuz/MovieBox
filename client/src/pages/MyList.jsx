import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import {
    ExclamationTriangleIcon,
    FunnelIcon,
    HeartIcon,
    MagnifyingGlassIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { useMyList } from "../context/MyList";
import { parseGenres, toDateOnly } from "../lib/format";
import Seo from "../components/ui/Seo";
import Button, { ButtonLink } from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { inputClasses } from "../components/ui/Field";
import MovieGrid, { MovieGridSkeleton } from "../components/movies/MovieGrid";
import { itemFromRow } from "../components/movies/items";

const SORTS = {
    recent: { label: "Recently added", compare: (a, b) => b.id - a.id },
    title: { label: "Title (A–Z)", compare: (a, b) => a.title.localeCompare(b.title) },
    rating: { label: "Highest rated", compare: (a, b) => Number(b.rating) - Number(a.rating) },
    release: {
        label: "Newest release",
        compare: (a, b) => toDateOnly(b.release_date).localeCompare(toDateOnly(a.release_date)),
    },
};

export default function MyList() {
    const { movies, status } = useMyList();
    const [params, setParams] = useSearchParams();

    // Filters live in the URL so they survive reloads and the back button.
    // The text box keeps its own state: URL updates run in a transition,
    // which would make a controlled input lag behind fast typing.
    const [query, setQuery] = useState(() => params.get("q") ?? "");
    const genre = params.get("genre") ?? "";
    const sort = SORTS[params.get("sort")] ? params.get("sort") : "recent";

    const setParam = (key, value) =>
        setParams(
            (current) => {
                const next = new URLSearchParams(current);
                if (value) next.set(key, value);
                else next.delete(key);
                return next;
            },
            { replace: true }
        );

    const genres = useMemo(() => {
        const counts = new Map();
        for (const movie of movies) {
            for (const g of parseGenres(movie.genre)) counts.set(g, (counts.get(g) ?? 0) + 1);
        }
        return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    }, [movies]);

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return movies
            .filter((m) => !needle || m.title.toLowerCase().includes(needle))
            .filter((m) => !genre || parseGenres(m.genre).includes(genre))
            .sort(SORTS[sort].compare);
    }, [movies, query, genre, sort]);

    const onQueryChange = (event) => {
        setQuery(event.target.value);
        setParam("q", event.target.value);
    };

    const clearFilters = () => {
        setQuery("");
        setParams({}, { replace: true });
    };

    let content;
    if (status === "loading" || status === "idle") {
        content = <MovieGridSkeleton count={6} label="Loading your list" />;
    } else if (status === "error") {
        content = (
            <EmptyState
                icon={ExclamationTriangleIcon}
                title="Your list didn't load"
                actions={<Button onClick={() => window.location.reload()}>Reload</Button>}
            >
                We couldn&apos;t reach the server. Please try again in a moment.
            </EmptyState>
        );
    } else if (movies.length === 0) {
        content = (
            <EmptyState
                icon={HeartIcon}
                title="Your list is empty"
                actions={
                    <>
                        <ButtonLink to="/">Browse popular movies</ButtonLink>
                        <ButtonLink to="/movies/new" variant="secondary">
                            Add one manually
                        </ButtonLink>
                    </>
                }
            >
                Tap the heart on any movie to save it here, or add a movie that isn&apos;t in the
                catalog yet.
            </EmptyState>
        );
    } else {
        content = (
            <>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <label htmlFor="list-filter" className="sr-only">
                            Filter your list by title
                        </label>
                        <MagnifyingGlassIcon
                            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-400"
                            aria-hidden="true"
                        />
                        <input
                            id="list-filter"
                            type="search"
                            value={query}
                            onChange={onQueryChange}
                            placeholder="Filter by title"
                            autoComplete="off"
                            className={`${inputClasses} pl-12`}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <label htmlFor="list-sort" className="shrink-0 text-sm font-medium text-ink-300">
                            Sort by
                        </label>
                        <select
                            id="list-sort"
                            value={sort}
                            onChange={(e) => setParam("sort", e.target.value === "recent" ? "" : e.target.value)}
                            className={`${inputClasses} w-full pr-10 sm:w-52`}
                        >
                            {Object.entries(SORTS).map(([value, { label }]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {genres.length > 1 && (
                    <div className="mt-5 flex items-center gap-3">
                        <FunnelIcon className="size-5 shrink-0 text-ink-400" aria-hidden="true" />
                        <ul aria-label="Filter by genre" className="no-scrollbar -my-1 flex gap-2 overflow-x-auto py-1">
                            {[["", movies.length], ...genres].map(([name, count]) => {
                                const selected = genre === name;
                                return (
                                    <li key={name || "all"}>
                                        <button
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => setParam("genre", name)}
                                            className="whitespace-nowrap rounded-full bg-white/5 px-3.5 py-1.5 text-sm font-medium text-ink-200 ring-1 ring-inset ring-white/10 transition hover:bg-white/10 aria-pressed:bg-ink-50 aria-pressed:text-ink-950 aria-pressed:ring-transparent"
                                        >
                                            {name || "All"}{" "}
                                            <span className={selected ? "text-ink-600" : "text-ink-400"}>{count}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                <p className="mt-6 text-sm text-ink-400" role="status">
                    {visible.length === movies.length
                        ? `${movies.length} ${movies.length === 1 ? "movie" : "movies"}`
                        : `Showing ${visible.length} of ${movies.length} movies`}
                </p>

                <div className="mt-6">
                    {visible.length > 0 ? (
                        <MovieGrid items={visible.map(itemFromRow)} />
                    ) : (
                        <EmptyState
                            icon={MagnifyingGlassIcon}
                            title="No movies match your filters"
                            actions={
                                <Button variant="secondary" onClick={clearFilters}>
                                    Clear filters
                                </Button>
                            }
                        >
                            Try a different title or genre.
                        </EmptyState>
                    )}
                </div>
            </>
        );
    }

    return (
        <div className="shell pt-10 sm:pt-14">
            <Seo title="My List" noindex />
            <header className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
                        Your collection
                    </p>
                    <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                        My List
                    </h1>
                </div>
                <ButtonLink to="/movies/new">
                    <PlusIcon aria-hidden="true" />
                    Add a movie
                </ButtonLink>
            </header>
            {content}
        </div>
    );
}
