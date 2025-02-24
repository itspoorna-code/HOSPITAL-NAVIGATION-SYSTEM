// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Review = require('./models/review');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // To parse JSON bodies

// MongoDB connection


const uri = "mongodb+srv://poornachandrass11:Poorna%400@cluster0.ffsoo.mongodb.net/Maps?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


// Define the review route
app.post('/api/reviews', async (req, res) => {
  const { title, feedback, rating } = req.body;

  try {
    const newReview = new Review({ title, feedback, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit review', message: error.message });
  }
});

// Optional: GET all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews', message: error.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
