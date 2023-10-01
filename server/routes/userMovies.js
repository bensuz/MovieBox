const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/userMoviesController");
const authenticate = require("../middlewares/auth");

router.get("/:user_id", moviesController.getMovies);

router.get("/details/:id", moviesController.getMovieById);

router.post("/", moviesController.createMovie);

router.put("/details/:id", moviesController.updateMovie);

router.delete("/details/:id", moviesController.deleteMovie);

module.exports = router;
