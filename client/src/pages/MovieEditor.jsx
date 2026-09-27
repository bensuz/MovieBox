import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useMyList } from "../context/MyList";
import { parseGenres, toDateOnly } from "../lib/format";
import Seo from "../components/ui/Seo";
import { ButtonLink } from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { PageLoader } from "../components/ui/Spinner";
import MovieForm from "../components/movies/MovieForm";

const EMPTY = { title: "", genre: [], releaseDate: "", rating: "", language: "", poster: "", overview: "" };

const valuesFromRow = (row) => ({
    title: row.title ?? "",
    genre: parseGenres(row.genre),
    releaseDate: toDateOnly(row.release_date),
    rating: row.rating == null ? "" : String(Number(row.rating)),
    language: row.language ?? "",
    poster: row.poster ?? "",
    overview: row.overview ?? "",
});

function PageHeader({ backTo, backLabel, title, description }) {
    return (
        <header className="mb-10">
            <Link
                to={backTo}
                className="inline-flex items-center gap-2 rounded-full py-1 text-sm font-medium text-ink-400 transition hover:text-ink-50"
            >
                <ArrowLeftIcon className="size-4" aria-hidden="true" />
                {backLabel}
            </Link>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-2 max-w-xl text-ink-400">{description}</p>
        </header>
    );
}

export function NewMovie() {
    const navigate = useNavigate();
    const { addMovie, findByTitle } = useMyList();

    const onSubmit = async (payload) => {
        const row = await addMovie(payload);
        toast.success("Added to My List", { description: row.title });
        navigate(`/movies/${row.id}`, { replace: true });
    };

    return (
        <div className="shell pt-10 sm:pt-14">
            <Seo title="Add a movie" noindex />
            <PageHeader
                backTo="/mylist"
                backLabel="My List"
                title="Add a movie"
                description="Can't find it in the catalog? Add it yourself. Only the title is required."
            />
            <MovieForm
                initialValues={EMPTY}
                submitLabel="Add to My List"
                cancelTo="/mylist"
                onSubmit={onSubmit}
                isDuplicate={(title) => Boolean(findByTitle(title))}
            />
        </div>
    );
}

export function EditMovie() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { movies, status, updateMovie, findByTitle } = useMyList();
    const movie = movies.find((m) => String(m.id) === id);

    if (status === "loading" || status === "idle") return <PageLoader label="Loading movie" />;

    if (!movie) {
        return (
            <div className="shell pt-10">
                <Seo title="Movie not found" noindex />
                <EmptyState
                    as="h1"
                    icon={ExclamationTriangleIcon}
                    title="This movie isn't in your list"
                    actions={<ButtonLink to="/mylist">Go to My List</ButtonLink>}
                >
                    You can only edit movies you&apos;ve saved.
                </EmptyState>
            </div>
        );
    }

    const onSubmit = async (payload) => {
        await updateMovie(movie.id, payload);
        toast.success("Changes saved", { description: payload.title });
        navigate(`/movies/${movie.id}`, { replace: true });
    };

    return (
        <div className="shell pt-10 sm:pt-14">
            <Seo title={`Edit ${movie.title}`} noindex />
            <PageHeader
                backTo={`/movies/${movie.id}`}
                backLabel={movie.title}
                title="Edit details"
                description="Update anything that's missing or wrong. Changes only affect your list."
            />
            <MovieForm
                key={movie.id}
                initialValues={valuesFromRow(movie)}
                submitLabel="Save changes"
                cancelTo={`/movies/${movie.id}`}
                onSubmit={onSubmit}
                isDuplicate={(title) => {
                    const match = findByTitle(title);
                    return Boolean(match) && match.id !== movie.id;
                }}
            />
        </div>
    );
}
