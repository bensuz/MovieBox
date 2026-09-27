const { Pool } = require("pg");
const axios = require("axios");
require("dotenv/config");
const { requestTMDB } = require("../utils/tmdb");

const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const MOVIE_LISTS = ["popular", "top_rated", "now_playing", "upcoming"];

// Let browsers reuse public catalog responses for a few minutes too.
const PUBLIC_CACHE = "public, max-age=600";

module.exports = {
    getTMDBMovies: async (req, res) => {
        // Controller logic to fetch movies from TMDB.
        // ?category=popular|top_rated|now_playing|upcoming&page=N (defaults: popular, 1)
        try {
            const category = MOVIE_LISTS.includes(req.query.category)
                ? req.query.category
                : "popular";
            const page = Math.min(Math.max(parseInt(req.query.page, 10) || 1, 1), 500);
            const options = {
                method: "GET",
                url: `https://api.themoviedb.org/3/movie/${category}`,
                params: { page },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                },
            };

            const data = await requestTMDB(options);
            res.set("Cache-Control", PUBLIC_CACHE).json(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
            res.status(500).json({ error: "Failed to fetch movies" });
        }
    },

    getTMDBSearch: async (req, res) => {
        // Controller logic to fetch movies from TMDB
        try {
            const { query } = req.params;
            console.log("backend query", query);
            const options = {
                method: "GET",
                url: "https://api.themoviedb.org/3/search/movie",
                params: { query, include_adult: false },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                },
            };

            const data = await requestTMDB(options);
            res.set("Cache-Control", PUBLIC_CACHE).json(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
            res.status(500).json({ error: "Failed to fetch movies" });
        }
    },
    getTMDBMovieDetails: async (req, res) => {
        // Controller logic to fetch a single movie details from TMDB
        try {
            const { id } = req.params;
            const options = {
                method: "GET",
                url: `https://api.themoviedb.org/3/movie/${encodeURIComponent(id)}`,
                // Trailers, cast and recommendations in the same request.
                params: { append_to_response: "videos,credits,recommendations" },
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                },
            };

            const data = await requestTMDB(options);
            res.set("Cache-Control", PUBLIC_CACHE).json(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            res.status(500).json({ error: "Failed to fetch movie details" });
        }
    },

    getTrailer: async (req, res) => {
        try {
            const { title, releaseYear } = req.body;
            // Make a request to the YouTube Data API to get trailers based on the movie title
            const response = await axios.get(
                "https://www.googleapis.com/youtube/v3/search",
                {
                    params: {
                        key: process.env.YOUTUBE_API_KEY,
                        q: `${title} official trailer ${releaseYear}`,
                        part: "snippet",
                        type: "video",
                        maxResults: 1,
                    },
                }
            );
            res.json(response.data);
            // Extract the video IDs from the API response
            // const trailerId = response.data.items[0]?.id?.videoId;

            // Set the trailers state variable with the video URLs
            // setTrailer(trailerId);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            res.status(500).json({ error: "Failed to fetch trailer" });
        }
    },
};
