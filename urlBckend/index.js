require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const cors = require('cors');
const app = express();
const port = 8000;


const allowedOrigins = ['https://short-url-frontend-eiks.onrender.com', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true, 
};
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// app.options('*', cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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

    const entry = await URL.findOneAndUpdate(
      { shortID: shortId },
      {
        $push: {
          userClicks: { timestamps: Date.now() },
        },
      },
      { new: true }
    );

    if (!entry) {
 
      return res.status(404).send('URL not found');
    }


    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error('Error fetching URL entry:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
