const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/userMoviesController");
const authenticate = require("../middlewares/auth");

router.get("/:user_id",  moviesController.getMovies);

router.get("/:id",  moviesController.getMovieById);

router.post("/",  moviesController.createMovie);

router.put("/:id",  moviesController.updateMovie);

router.delete("/:id",  moviesController.deleteMovie);

module.exports = router;
