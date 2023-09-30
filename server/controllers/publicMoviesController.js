const { Pool } = require("pg");
const axios = require("axios");
require("dotenv/config");

const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

module.exports = {
    getTMDBMovies: async (req, res) => {
        // Controller logic to fetch movies from TMDB
        try {
            const options = {
                method: "GET",
                url: "https://api.themoviedb.org/3/movie/popular",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                },
            };

            const response = await axios.request(options);
            res.json(response.data.results);
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
                url: `https://api.themoviedb.org/3/movie/${id}`,
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
                },
            };

            const response = await axios.request(options);
            res.json(response.data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            res.status(500).json({ error: "Failed to fetch movie details" });
        }
    },
};
