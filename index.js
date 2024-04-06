const express = require('express');
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieRecommendation', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define movie schema
const movieSchema = new mongoose.Schema({
  movieId: String,
  title: String,
  genres:String
});

// Define Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Route for /movies
app.get('/movies', async (req, res) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
