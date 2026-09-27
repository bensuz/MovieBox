import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ExclamationTriangleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useQuery } from "../hooks/useQuery";
import { listApi } from "../lib/api";
import { imageFromUrl } from "../lib/tmdb";
import { formatDate, parseGenres, truncate, yearOf } from "../lib/format";
import { useAuth } from "../context/Auth";
import { useMyList } from "../context/MyList";
import Seo from "../components/ui/Seo";
import Rating from "../components/ui/Rating";
import Button, { ButtonLink } from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import MovieHeader, { FactList, MovieHeaderSkeleton } from "../components/movies/MovieHeader";
import TrailerButton from "../components/movies/TrailerButton";

// A movie from the signed-in user's list (saved from TMDB or added by hand).
export default function SavedMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const list = useMyList();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [removing, setRemoving] = useState(false);

    const fromList = list.movies.find((m) => String(m.id) === id);
    const query = useQuery(fromList || removing ? null : `saved-movie:${id}`, () => listApi.get(id));
    const movie = fromList ?? query.data;

    const remove = async () => {
        setRemoving(true);
        try {
            await list.removeMovie(movie.id);
            toast("Removed from My List", { description: movie.title });
            navigate("/mylist", { replace: true });
        } catch {
            setRemoving(false);
            toast.error("Couldn't remove the movie. Please try again.");
        }
    };

    if (!movie && query.status === "error") {
        const missing = query.error?.status === 404;
        return (
            <div className="shell pt-10">
                <Seo title="Movie not found" noindex />
                <EmptyState
                    as="h1"
                    icon={ExclamationTriangleIcon}
                    title={missing ? "This movie isn't in any list" : "We couldn't load this movie"}
                    actions={
                        <>
                            {!missing && <Button onClick={query.retry}>Try again</Button>}
                            <ButtonLink to="/mylist" variant={missing ? "primary" : "secondary"}>
                                Go to My List
                            </ButtonLink>
                        </>
                    }
                >
                    {missing
                        ? "It may have been removed. Movies you save appear in My List."
                        : "Check your connection and try again."}
                </EmptyState>
            </div>
        );
    }

    if (!movie) return <MovieHeaderSkeleton />;

    const year = yearOf(movie.release_date);
    const genres = parseGenres(movie.genre);
    const isOwner = user && String(movie.user_id) === String(user.id);

    return (
        <>
            <Seo
                title={year ? `${movie.title} (${year})` : movie.title}
                description={truncate(movie.overview || `${movie.title} on MovieBox.`, 158)}
                noindex
            />
            <MovieHeader
                title={movie.title}
                poster={imageFromUrl(movie.poster)}
                meta={[
                    movie.rating && <Rating value={movie.rating} className="font-semibold text-ink-50" />,
                    year,
                    movie.language,
                ].filter(Boolean)}
                genres={genres}
                overview={movie.overview}
                actions={
                    <>
                        <TrailerButton lookupId={`saved-${movie.id}`} title={movie.title} year={year} />
                        {isOwner && (
                            <>
                                <ButtonLink to={`/movies/${movie.id}/update`} variant="secondary" size="lg">
                                    <PencilSquareIcon aria-hidden="true" />
                                    Edit details
                                </ButtonLink>
                                <Button variant="ghost" size="lg" onClick={() => setConfirmOpen(true)}>
                                    <TrashIcon aria-hidden="true" />
                                    Remove
                                </Button>
                            </>
                        )}
                    </>
                }
            />

            <FactList
                facts={[
                    { label: "Release date", value: formatDate(movie.release_date) },
                    { label: "Language", value: movie.language },
                    { label: "Genres", value: genres.join(", ") },
                ]}
            />

            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={remove}
                busy={removing}
                title="Remove from My List?"
                confirmLabel="Remove movie"
            >
                <p>
                    <strong className="font-semibold text-ink-100">{movie.title}</strong> will be
                    removed from your list, including any details you edited. This can&apos;t be
                    undone.
                </p>
            </ConfirmDialog>
        </>
    );
}
