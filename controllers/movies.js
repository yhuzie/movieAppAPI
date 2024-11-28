const Movie = require("../models/Movie");

module.exports.addMovie = async (req, res) => {
    const { title, director, year, description, genre } = req.body;
    try {
        const newMovie = new Movie({ title, director, year, description, genre });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(500).json({ message: "Error adding movie." });
    }
};

module.exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) return res.status(404).json({ message: "Movie not found." });
        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(500).json({ message: "Error updating movie." });
    }
};

module.exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ message: "Movie not found." });
        res.status(200).json({ message: "Movie deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error deleting movie." });
    }
};

module.exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving movies." });
    }
};

module.exports.addComment = async (req, res) => {
    const { text } = req.body;
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Movie not found." });

        movie.comments.push({ userId: req.user.id, text });
        await movie.save();
        res.status(201).json({ message: "Comment added.", comments: movie.comments });
    } catch (err) {
        res.status(500).json({ message: "Error adding comment." });
    }
};
