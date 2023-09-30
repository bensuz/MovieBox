const { Pool } = require("pg");
const axios = require("axios");
require("dotenv/config");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});

module.exports = {
    getMovies: (req, res) => {
        const { user_id } = req.params;
        console.log("tring to find user id", user_id);
        // Controller logic to get movies from PG
        pool.query("SELECT * FROM user_movies WHERE user_id = $1;", [user_id])
            .then((data) => res.json(data.rows))
            .catch((e) => res.status(500).json({ message: e.message }));
    },

    getMovieById: (req, res) => {
        // Controller logic to get a movie by ID from PG
        const { id } = req.params;
        pool.query("SELECT * FROM user_movies where id=$1;", [id])
            .then(({ rowCount, rows }) => {
                if (rowCount === 0) {
                    res.status(404).json({
                        message: `Movie with id ${id} Not Found`,
                    });
                } else {
                    res.json(rows[0]);
                }
            })
            .catch((e) => res.status(500).json({ message: e.message }));
    },

    createMovie: (req, res) => {
        // Controller logic to add a new movie to PG

        const { user_id, title, director, year, rating, poster } = req.body;
        pool.query(
            "INSERT INTO user_movies (user_id, title, director, year, rating, poster) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
            [user_id, title, director, year, rating, poster]
        )
            .then(({ rows }) => {
                res.status(200).json(rows[0]);
                console.log("sending movie to db:", rows[0]);
            })
            .catch((e) => res.status(500).json({ message: e.message }));
    },

    updateMovie: (req, res) => {
        // Controller logic to update a movie by ID in PG
        const { id } = req.params;
        const { title, director, year, rating, poster } = req.body;
        pool.query(
            "UPDATE user_movies SET title = $1, director=$2, year=$3, rating=$4, poster=$5 WHERE id=$6 RETURNING *;",
            [title, director, year, rating, poster, id]
        )
            .then(({ rows }) => {
                res.status(200).json(rows[0]);
            })
            .catch((e) => res.status(500).json({ message: e.message }));
    },

    deleteMovie: (req, res) => {
        // Controller logic to delete a movie by ID from PG
        const { id } = req.params;
        pool.query("DELETE FROM user_movies WHERE id=$1 RETURNING *;", [id])
            .then(({ rows }) => {
                res.status(200).json(rows[0]);
            })
            .catch((e) => res.status(500).json({ message: e.message }));
    },
};
