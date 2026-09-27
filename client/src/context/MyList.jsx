import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { listApi } from "../lib/api";
import { genreNames, imageUrl } from "../lib/tmdb";
import { languageName, parseGenres, toDateOnly } from "../lib/format";
import { useAuth } from "./Auth";

const MyListContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useMyList() {
    return useContext(MyListContext);
}

const titleKey = (title = "") => title.trim().toLowerCase();

// Payload for POST/PUT /api/usermovies from a TMDB movie (list item or details).
// eslint-disable-next-line react-refresh/only-export-components
export const payloadFromTmdb = (movie) => ({
    title: movie.title,
    genre: genreNames(movie),
    releaseDate: movie.release_date || null,
    rating: Number(movie.vote_average ?? 0).toFixed(1),
    language: languageName(movie.original_language),
    poster: imageUrl(movie.poster_path, "w780") ?? "",
    overview: movie.overview ?? "",
});

// Payload from a saved row, used to restore a movie after "Undo".
// eslint-disable-next-line react-refresh/only-export-components
export const payloadFromRow = (row) => ({
    title: row.title,
    genre: parseGenres(row.genre),
    releaseDate: toDateOnly(row.release_date) || null,
    rating: row.rating,
    language: row.language,
    poster: row.poster,
    overview: row.overview,
});

export function MyListProvider({ children }) {
    const { user } = useAuth();
    const userId = user?.id ?? null;
    const [state, setState] = useState({ userId: null, movies: [], status: "idle" });

    useEffect(() => {
        if (!userId) return;
        let active = true;
        listApi.all(userId).then(
            (movies) =>
                active &&
                setState({
                    userId,
                    movies: [...movies].sort((a, b) => b.id - a.id),
                    status: "ready",
                }),
            () => active && setState({ userId, movies: [], status: "error" })
        );
        return () => {
            active = false;
        };
    }, [userId]);

    // Ignore data that belongs to a previous session.
    const isCurrent = userId != null && state.userId === userId;
    const movies = useMemo(() => (isCurrent ? state.movies : []), [isCurrent, state.movies]);
    const status = !userId ? "idle" : isCurrent ? state.status : "loading";

    const byTitle = useMemo(
        () => new Map(movies.map((m) => [titleKey(m.title), m])),
        [movies]
    );
    const findByTitle = useCallback((title) => byTitle.get(titleKey(title)), [byTitle]);

    const addMovie = useCallback(
        async (payload) => {
            const row = await listApi.create({ ...payload, user_id: userId });
            setState((s) => ({ ...s, movies: [row, ...s.movies] }));
            return row;
        },
        [userId]
    );

    const updateMovie = useCallback(async (id, payload) => {
        const row = await listApi.update(id, payload);
        setState((s) => ({
            ...s,
            movies: s.movies.map((m) => (m.id === row.id ? row : m)),
        }));
        return row;
    }, []);

    const removeMovie = useCallback(async (id) => {
        await listApi.remove(id);
        setState((s) => ({ ...s, movies: s.movies.filter((m) => m.id !== id) }));
    }, []);

    const value = useMemo(
        () => ({ movies, status, findByTitle, addMovie, updateMovie, removeMovie }),
        [movies, status, findByTitle, addMovie, updateMovie, removeMovie]
    );

    return <MyListContext value={value}>{children}</MyListContext>;
}
