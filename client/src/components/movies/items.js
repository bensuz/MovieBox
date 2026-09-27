import { imageFromUrl, posterImage } from "../../lib/tmdb";
import { yearOf } from "../../lib/format";
import { payloadFromRow, payloadFromTmdb } from "../../context/MyList";

// Cards render one shape regardless of where the movie came from.

export const itemFromTmdb = (movie) => ({
    key: `tmdb-${movie.id}`,
    href: `/movies/discover/${movie.id}`,
    title: movie.title,
    year: yearOf(movie.release_date),
    rating: movie.vote_average,
    image: posterImage(movie.poster_path),
    getPayload: () => payloadFromTmdb(movie),
});

export const itemFromRow = (row) => ({
    key: `row-${row.id}`,
    href: `/movies/${row.id}`,
    title: row.title,
    year: yearOf(row.release_date),
    rating: row.rating,
    image: imageFromUrl(row.poster),
    getPayload: () => payloadFromRow(row),
});
