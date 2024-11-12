require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const cors = require('cors');
const app = express();
const port = 8000;

// Set up CORS middleware before using any routes
const corsOptions = {
  origin: 'https://short-url-frontend-q232.onrender.com',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Use CORS settings globally
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fix to parse URL-encoded data

// Use routes
app.use('/', urlRoute);

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  try {
    // Find URL by shortID and push a new click timestamp
    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      {
        $push: {
          userClicks: { timestamps: Date.now() }, // Push new click timestamp
        },
      },
      { new: true } // Ensure updated document is returned
    );

    if (!entry) {
      // If no matching entry, return 404
      return res.status(404).send('URL not found');
    }

    // If URL found, redirect to the original URL
    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Error fetching URL entry:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
