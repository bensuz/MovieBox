import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ExclamationTriangleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useQuery } from "../hooks/useQuery";
import { useMovieList } from "../hooks/useMovieList";
import { moviesApi } from "../lib/api";
import Seo from "../components/ui/Seo";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { inputClasses } from "../components/ui/Field";
import MovieGrid, { MovieGridSkeleton } from "../components/movies/MovieGrid";
import { itemFromTmdb } from "../components/movies/items";

function SearchForm({ initialQuery }) {
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Arriving on an empty search page (e.g. from the mobile tab bar) means
    // the visitor wants to type.
    useEffect(() => {
        if (!initialQuery) inputRef.current?.focus();
    }, [initialQuery]);

    const onSubmit = (event) => {
        event.preventDefault();
        const query = inputRef.current.value.trim();
        if (query) navigate(`/search/${encodeURIComponent(query)}`);
    };

    return (
        <form role="search" onSubmit={onSubmit} className="mt-6 flex max-w-2xl gap-3">
            <div className="relative flex-1">
                <label htmlFor="search-page-input" className="sr-only">
                    Movie title
                </label>
                <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-400"
                    aria-hidden="true"
                />
                <input
                    ref={inputRef}
                    key={initialQuery}
                    id="search-page-input"
                    type="search"
                    name="q"
                    defaultValue={initialQuery}
                    placeholder="Search by movie title"
                    autoComplete="off"
                    enterKeyHint="search"
                    className={`${inputClasses} h-12 pl-12 text-base sm:text-base`}
                />
            </div>
            <Button type="submit" size="lg">
                Search
            </Button>
        </form>
    );
}

function Suggestions() {
    const { movies } = useMovieList("popular");
    const titles = movies.slice(0, 8).map((m) => m.title);
    if (titles.length === 0) return null;
    return (
        <section aria-labelledby="suggestions-heading" className="mt-12">
            <h2 id="suggestions-heading" className="text-sm font-semibold uppercase tracking-wider text-ink-400">
                Popular right now
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
                {titles.map((title) => (
                    <li key={title}>
                        <Link
                            to={`/search/${encodeURIComponent(title)}`}
                            className="block rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-ink-200 ring-1 ring-inset ring-white/10 transition hover:bg-white/10 hover:text-ink-50"
                        >
                            {title}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default function Search() {
    const { query: rawQuery = "" } = useParams();
    const query = rawQuery.trim();
    const results = useQuery(query ? `search:${query.toLowerCase()}` : null, () =>
        moviesApi.search(query)
    );

    let content = null;
    if (!query) {
        content = <Suggestions />;
    } else if (results.status === "error") {
        content = (
            <EmptyState
                icon={ExclamationTriangleIcon}
                title="Search isn't working right now"
                actions={<Button onClick={results.retry}>Try again</Button>}
            >
                We couldn&apos;t reach the movie catalog. Please try again.
            </EmptyState>
        );
    } else if (results.status !== "success") {
        content = (
            <div className="mt-10">
                <MovieGridSkeleton label={`Searching for ${query}`} />
            </div>
        );
    } else if (results.data.length === 0) {
        content = (
            <EmptyState icon={MagnifyingGlassIcon} title="No movies found">
                Nothing matched “{query}”. Check the spelling or try a shorter title.
            </EmptyState>
        );
    } else {
        content = (
            <>
                <p className="mt-10 text-sm text-ink-400" role="status">
                    {results.data.length} {results.data.length === 1 ? "result" : "results"}
                </p>
                <div className="mt-6">
                    <MovieGrid items={results.data.map(itemFromTmdb)} />
                </div>
            </>
        );
    }

    return (
        <div className="shell pt-10 sm:pt-14">
            <Seo
                title={query ? `Results for “${query}”` : "Search movies"}
                description={
                    query
                        ? `Movies matching “${query}” on MovieBox.`
                        : "Search millions of movies by title and save the ones you love."
                }
                noindex={Boolean(query)}
            />
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                {query ? (
                    <>
                        Results for <span className="text-brand-400">“{query}”</span>
                    </>
                ) : (
                    "Search movies"
                )}
            </h1>
            <SearchForm initialQuery={query} />
            {content}
        </div>
    );
}
