const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movies");
const { verify, isAdmin } = require("../auth");

router.post("/addMovie", verify, isAdmin, movieController.addMovie);
router.patch("/:id", verify, isAdmin, movieController.updateMovie);
router.delete("/:id", verify, isAdmin, movieController.deleteMovie);
router.get("/", verify, movieController.getMovies);
router.post("/:id/comments", verify, movieController.addComment);

module.exports = router;
