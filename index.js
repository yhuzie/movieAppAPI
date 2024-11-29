const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const userRoutes = require("./routes/users");
const movieRoutes = require("./routes/movies");

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

mongoose.connect("mongodb+srv://admin123:admin123@wdc028-b461.2niyc.mongodb.net/movieApp?retryWrites=true&w=majority&appName=WDC028-B461", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Database connection error:", err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
