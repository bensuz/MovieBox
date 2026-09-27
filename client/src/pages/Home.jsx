import { Link, useSearchParams } from "react-router";
import { ExclamationTriangleIcon, FireIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useMovieList } from "../hooks/useMovieList";
import { useAuth } from "../context/Auth";
import { useMyList } from "../context/MyList";
import { MOVIE_LISTS, backdropImage, genreNames } from "../lib/tmdb";
import { yearOf } from "../lib/format";
import Seo from "../components/ui/Seo";
import Rating from "../components/ui/Rating";
import Button, { ButtonLink } from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";
import MovieGrid, { MovieGridSkeleton } from "../components/movies/MovieGrid";
import MovieRow from "../components/movies/MovieRow";
import ListToggleButton from "../components/movies/ListToggleButton";
import { itemFromRow, itemFromTmdb } from "../components/movies/items";

const HERO_HEIGHT = "h-[68svh] min-h-[30rem] max-h-[52rem] sm:h-[78svh]";

// Feature one of today's top five, so the homepage changes daily but not on
// every visit. Mirrored in server/utils/featuredPreload.js, which preloads the
// same image from the HTML.
function pickFeatured(movies) {
    const candidates = movies.slice(0, 5).filter((m) => m.backdrop_path);
    if (candidates.length === 0) return null;
    const day = Math.floor(Date.now() / 86_400_000);
    return candidates[day % candidates.length];
}

function Hero({ movie }) {
    if (!movie) {
        return <div className={`-mt-16 animate-pulse bg-ink-900 ${HERO_HEIGHT}`} aria-hidden="true" />;
    }

    const backdrop = backdropImage(movie.backdrop_path);
    const item = itemFromTmdb(movie);
    const genres = genreNames(movie).slice(0, 3);

    return (
        <section
            aria-labelledby="featured-title"
            className={`relative isolate -mt-16 flex items-end overflow-hidden ${HERO_HEIGHT}`}
        >
            <img
                src={backdrop.src}
                srcSet={backdrop.srcSet}
                sizes="100vw"
                alt=""
                fetchPriority="high"
                className="absolute inset-0 -z-20 size-full object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/50 to-ink-950/10" />
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/90 via-ink-950/30 to-transparent" />

            <div className="shell animate-fade-up pb-10 sm:pb-16">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink-50 ring-1 ring-inset ring-white/15 backdrop-blur-md">
                    <FireIcon className="size-4 text-brand-400" aria-hidden="true" />
                    Trending today
                </p>
                <h2
                    id="featured-title"
                    className="mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
                >
                    {movie.title}
                </h2>
                <p className="mt-4 flex flex-wrap items-center gap-x-2 text-sm font-medium text-ink-100">
                    <Rating value={movie.vote_average} />
                    <span aria-hidden="true" className="text-ink-400">•</span>
                    <span>{yearOf(movie.release_date)}</span>
                    {genres.length > 0 && (
                        <>
                            <span aria-hidden="true" className="text-ink-400">•</span>
                            <span>{genres.join(", ")}</span>
                        </>
                    )}
                </p>
                <p className="mt-4 line-clamp-3 max-w-xl text-pretty text-base text-ink-200 sm:text-lg">
                    {movie.overview}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink to={item.href} variant="light" size="lg">
                        <InformationCircleIcon aria-hidden="true" />
                        More info
                        <span className="sr-only"> about {movie.title}</span>
                    </ButtonLink>
                    <ListToggleButton item={item} />
                </div>
            </div>
        </section>
    );
}

function ListTabs({ active }) {
    return (
        <nav aria-label="Movie lists" className="-mx-1 overflow-x-auto px-1 no-scrollbar">
            <ul className="flex w-max gap-1 rounded-full bg-white/5 p-1 ring-1 ring-inset ring-white/10">
                {MOVIE_LISTS.map((list) => {
                    const current = list.id === active;
                    return (
                        <li key={list.id}>
                            <Link
                                to={list.id === "popular" ? "/" : `/?list=${list.id}`}
                                replace
                                aria-current={current ? "page" : undefined}
                                className={`block rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    current
                                        ? "bg-ink-50 text-ink-950 shadow"
                                        : "text-ink-300 hover:bg-white/5 hover:text-ink-50"
                                }`}
                            >
                                {list.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default function Home() {
    const [params] = useSearchParams();
    const requested = params.get("list");
    const active = MOVIE_LISTS.some((l) => l.id === requested) ? requested : "popular";
    const activeLabel = MOVIE_LISTS.find((l) => l.id === active).label;

    const { user } = useAuth();
    const myList = useMyList();
    const popular = useMovieList("popular");
    const browse = useMovieList(active);

    const firstLoad = browse.movies.length === 0;

    return (
        <>
            <Seo
                title={active === "popular" ? undefined : `${activeLabel} movies`}
                path={active === "popular" ? "/" : `/?list=${active}`}
            />
            <h1 className="sr-only">MovieBox: discover movies and build your watchlist</h1>

            <Hero movie={pickFeatured(popular.movies)} />

            {user && myList.movies.length > 0 && (
                <MovieRow
                    title="Your list"
                    href="/mylist"
                    items={myList.movies.slice(0, 20).map(itemFromRow)}
                />
            )}

            <section aria-labelledby="browse-heading" className="shell mt-14">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 id="browse-heading" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                            Browse movies
                        </h2>
                        <p className="mt-1 text-sm text-ink-400">
                            Fresh from the TMDB catalog, updated daily.
                        </p>
                    </div>
                    <ListTabs active={active} />
                </div>

                <div className="mt-8">
                    {firstLoad && browse.status === "error" ? (
                        <EmptyState
                            icon={ExclamationTriangleIcon}
                            title="Movies didn't load"
                            actions={<Button onClick={browse.loadMore}>Try again</Button>}
                        >
                            We couldn&apos;t reach the movie catalog. Check your connection and try again.
                        </EmptyState>
                    ) : firstLoad ? (
                        <MovieGridSkeleton label={`Loading ${activeLabel.toLowerCase()} movies`} />
                    ) : (
                        <MovieGrid items={browse.movies.map(itemFromTmdb)} />
                    )}
                </div>

                {!firstLoad && !browse.done && (
                    <div className="mt-12 flex flex-col items-center gap-3">
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={browse.loadMore}
                            disabled={browse.status === "loading"}
                        >
                            {browse.status === "loading" && <Spinner />}
                            {browse.status === "error" ? "Try again" : "Load more movies"}
                        </Button>
                        <p className="text-xs text-ink-400" aria-live="polite">
                            {browse.status === "error"
                                ? "Couldn't load more movies."
                                : `Showing ${browse.movies.length} ${activeLabel.toLowerCase()} movies`}
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}
