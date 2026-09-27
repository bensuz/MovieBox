import { useParams } from "react-router";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useQuery } from "../hooks/useQuery";
import { moviesApi } from "../lib/api";
import { backdropImage, imageUrl, pickTrailer, posterImage } from "../lib/tmdb";
import {
    formatCount,
    formatDate,
    formatMoney,
    formatRuntime,
    languageName,
    truncate,
    yearOf,
} from "../lib/format";
import Seo from "../components/ui/Seo";
import Rating from "../components/ui/Rating";
import Button, { ButtonLink } from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import MovieHeader, { FactList, MovieHeaderSkeleton } from "../components/movies/MovieHeader";
import CastGrid from "../components/movies/CastGrid";
import MovieRow from "../components/movies/MovieRow";
import ListToggleButton from "../components/movies/ListToggleButton";
import TrailerButton from "../components/movies/TrailerButton";
import ShareButton from "../components/movies/ShareButton";
import { itemFromTmdb } from "../components/movies/items";

// schema.org/Movie structured data for rich search results.
function MovieJsonLd({ movie, directors, cast }) {
    const data = {
        "@context": "https://schema.org",
        "@type": "Movie",
        name: movie.title,
        description: movie.overview || undefined,
        image: imageUrl(movie.poster_path, "w780") ?? undefined,
        datePublished: movie.release_date || undefined,
        duration: movie.runtime ? `PT${movie.runtime}M` : undefined,
        genre: movie.genres?.map((g) => g.name),
        director: directors.map((d) => ({ "@type": "Person", name: d.name })),
        actor: cast.slice(0, 5).map((a) => ({ "@type": "Person", name: a.name })),
        aggregateRating:
            movie.vote_count > 0
                ? {
                      "@type": "AggregateRating",
                      ratingValue: movie.vote_average.toFixed(1),
                      bestRating: 10,
                      worstRating: 0,
                      ratingCount: movie.vote_count,
                  }
                : undefined,
    };
    return (
        <script
            type="application/ld+json"
            // Escape "<" so text from the API can never close the script tag.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
        />
    );
}

function MovieDetails({ movie }) {
    const year = yearOf(movie.release_date);
    const item = itemFromTmdb(movie);
    const directors = movie.credits?.crew?.filter((c) => c.job === "Director") ?? [];
    const cast = movie.credits?.cast?.slice(0, 12) ?? [];
    const recommendations =
        movie.recommendations?.results?.filter((m) => m.poster_path).slice(0, 18) ?? [];

    const meta = [
        movie.vote_average > 0 && (
            <span className="inline-flex items-center gap-1.5">
                <Rating value={movie.vote_average} className="font-semibold text-ink-50" />
                <span className="text-ink-400">({formatCount(movie.vote_count)} votes)</span>
            </span>
        ),
        year,
        formatRuntime(movie.runtime),
        languageName(movie.original_language),
    ].filter(Boolean);

    return (
        <>
            <Seo
                title={year ? `${movie.title} (${year})` : movie.title}
                description={truncate(
                    movie.overview || `Details, cast and trailer for ${movie.title}.`,
                    158
                )}
            />
            <MovieJsonLd movie={movie} directors={directors} cast={cast} />

            <MovieHeader
                title={movie.title}
                tagline={movie.tagline}
                backdrop={backdropImage(movie.backdrop_path)}
                poster={posterImage(movie.poster_path)}
                meta={meta}
                genres={movie.genres?.map((g) => g.name)}
                overview={movie.overview}
                actions={
                    <>
                        <ListToggleButton item={item} />
                        <TrailerButton
                            lookupId={movie.id}
                            title={movie.title}
                            year={year}
                            trailerKey={pickTrailer(movie.videos)}
                        />
                        <ShareButton title={movie.title} />
                    </>
                }
            />

            <FactList
                facts={[
                    { label: "Release date", value: formatDate(movie.release_date) },
                    { label: directors.length > 1 ? "Directors" : "Director", value: directors.map((d) => d.name).join(", ") },
                    { label: "Status", value: movie.status },
                    { label: "Original title", value: movie.original_title !== movie.title ? movie.original_title : "" },
                    { label: "Budget", value: formatMoney(movie.budget) },
                    { label: "Box office", value: formatMoney(movie.revenue) },
                ]}
            />

            {cast.length > 0 && <CastGrid cast={cast} />}

            {recommendations.length > 0 && (
                <MovieRow title="More like this" items={recommendations.map(itemFromTmdb)} />
            )}
        </>
    );
}

export default function TmdbMovie() {
    const { id } = useParams();
    const { status, data, retry } = useQuery(`movie:${id}`, () => moviesApi.details(id));

    if (status === "error") {
        return (
            <div className="shell pt-10">
                <Seo title="Movie unavailable" noindex />
                <EmptyState
                    as="h1"
                    icon={ExclamationTriangleIcon}
                    title="We couldn't load this movie"
                    actions={
                        <>
                            <Button onClick={retry}>Try again</Button>
                            <ButtonLink to="/" variant="secondary">
                                Browse movies
                            </ButtonLink>
                        </>
                    }
                >
                    It may have been removed from the catalog, or the connection dropped.
                </EmptyState>
            </div>
        );
    }

    if (status !== "success") return <MovieHeaderSkeleton />;

    // Keyed so per-movie state (like a loaded trailer) resets between movies.
    return <MovieDetails key={data.id} movie={data} />;
}
