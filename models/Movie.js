const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    comments: [commentSchema]
});

module.exports = mongoose.model("Movie", movieSchema);
