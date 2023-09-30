const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/publicMoviesController");

router.get("/public", moviesController.getTMDBMovies);

router.get("/public/:id", moviesController.getTMDBMovieDetails);

module.exports = router;
