// Helpers for TMDB image URLs and data shapes.
// Image sizes: https://developer.themoviedb.org/docs/image-basics

const IMAGE_BASE = "https://image.tmdb.org/t/p";

const POSTER_WIDTHS = [185, 342, 500, 780];
const BACKDROP_WIDTHS = [300, 780, 1280];

export const imageUrl = (path, size) =>
    path ? `${IMAGE_BASE}/${size}${path.startsWith("/") ? "" : "/"}${path}` : null;

const srcSet = (path, widths) =>
    path ? widths.map((w) => `${imageUrl(path, `w${w}`)} ${w}w`).join(", ") : undefined;

export const posterImage = (path) =>
    path
        ? { src: imageUrl(path, "w342"), srcSet: srcSet(path, POSTER_WIDTHS) }
        : null;

export const backdropImage = (path) =>
    path
        ? { src: imageUrl(path, "w1280"), srcSet: srcSet(path, BACKDROP_WIDTHS) }
        : null;

export const profileImage = (path) =>
    path ? { src: imageUrl(path, "w185") } : null;

// Saved movies store a full poster URL. When it points at TMDB we can still
// serve a right-sized image instead of the multi-megabyte "original".
const TMDB_URL = /^https:\/\/image\.tmdb\.org\/t\/p\/[^/]+(\/.+)$/;

export function imageFromUrl(url) {
    if (!url) return null;
    const match = url.match(TMDB_URL);
    return match ? posterImage(match[1]) : { src: url };
}

export function tmdbPathFromUrl(url) {
    return url?.match(TMDB_URL)?.[1] ?? null;
}

export const GENRES = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
};

export const genreNames = (movie) =>
    movie.genres?.map((g) => g.name) ??
    movie.genre_ids?.map((id) => GENRES[id]).filter(Boolean) ??
    [];

export function pickTrailer(videos) {
    const youtube = (videos?.results ?? []).filter((v) => v.site === "YouTube");
    const score = (v) =>
        (v.type === "Trailer" ? 4 : v.type === "Teaser" ? 2 : 0) +
        (v.official ? 1 : 0);
    return youtube.sort((a, b) => score(b) - score(a))[0]?.key ?? null;
}

export const MOVIE_LISTS = [
    { id: "popular", label: "Popular" },
    { id: "top_rated", label: "Top rated" },
    { id: "now_playing", label: "Now playing" },
    { id: "upcoming", label: "Upcoming" },
];
