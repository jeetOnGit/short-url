require("dotenv").config();

const express = require('express')
const mongoose = require('mongoose')
const urlRoute  =require('./routes/url')
const URL = require('./models/url')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors());
app.use(express.json());

express.urlencoded({ extended: false })
// https://short-url-hk9t.onrender.com
app.use('/', urlRoute)

const MONGO_URI = process.env.MONGO_URI

mongoose.connect((MONGO_URI),{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));


app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      {
        $push: {
          userClicks: {
            timestamps: Date.now(),
          },
        },
      },
      { new: true } // Return the updated document
    );

    if (!entry) {
      // If entry is null, respond with a 404 error
      return res.status(404).send('URL not found');
    }

    // If entry exists, redirect to the original URL
    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Error fetching URL entry:', error);
    res.status(500).send('Server error');
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})