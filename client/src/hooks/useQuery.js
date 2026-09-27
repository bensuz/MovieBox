import { useCallback, useEffect, useSyncExternalStore } from "react";

// A tiny request cache. Results are kept for the session so navigating back
// to a page renders instantly instead of showing a spinner again.

const cache = new Map();
const listeners = new Set();

const IDLE = { status: "idle" };
const LOADING = { status: "loading" };

const emit = () => listeners.forEach((listener) => listener());
const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

function run(key, fetcher) {
    cache.set(key, LOADING);
    emit();
    fetcher().then(
        (data) => cache.set(key, { status: "success", data }),
        (error) => cache.set(key, { status: "error", error })
    ).finally(emit);
}

export function invalidateQuery(key) {
    cache.delete(key);
    emit();
}

/**
 * @param {string | null} key Unique description of the request; null skips it.
 * @param {() => Promise<unknown>} fetcher
 */
export function useQuery(key, fetcher) {
    const entry = useSyncExternalStore(subscribe, () =>
        key == null ? IDLE : (cache.get(key) ?? LOADING)
    );

    useEffect(() => {
        if (key != null && !cache.has(key)) run(key, fetcher);
        // The key fully describes the request, so the fetcher can be inline.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const retry = useCallback(() => {
        if (key != null) run(key, fetcher);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    return { ...entry, retry };
}
