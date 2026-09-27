import { useCallback, useEffect, useSyncExternalStore } from "react";
import { moviesApi } from "../lib/api";

// Paginated TMDB lists ("popular", "top_rated", ...). Pages accumulate per
// list and survive navigation, so switching tabs or going back is instant.

const PAGE_SIZE = 20;
const MAX_PAGES = 25;
const EMPTY = { movies: [], page: 0, status: "idle", done: false, error: null };

const lists = new Map();
const listeners = new Set();

const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};
const getList = (category) => lists.get(category) ?? EMPTY;

async function loadNextPage(category) {
    const current = getList(category);
    if (current.status === "loading" || current.done) return;

    lists.set(category, { ...current, status: "loading", error: null });
    emit();

    const page = current.page + 1;
    try {
        const results = await moviesApi.list(category, page);
        const seen = new Set(current.movies.map((m) => m.id));
        lists.set(category, {
            movies: [...current.movies, ...results.filter((m) => !seen.has(m.id))],
            page,
            status: "idle",
            done: results.length < PAGE_SIZE || page >= MAX_PAGES,
            error: null,
        });
    } catch (error) {
        lists.set(category, { ...current, status: "error", error });
    }
    emit();
}

export function useMovieList(category) {
    const list = useSyncExternalStore(subscribe, () => getList(category));

    useEffect(() => {
        if (getList(category).page === 0) loadNextPage(category);
    }, [category]);

    const loadMore = useCallback(() => loadNextPage(category), [category]);

    return { ...list, loadMore };
}
