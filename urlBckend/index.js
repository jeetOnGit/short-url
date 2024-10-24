require("dotenv").config();

const express = require('express')
const mongoose = require('mongoose')
const urlRoute  =require('./routes/url')
const URL = require('./models/url')
const app = express()
const port = 8000

app.use(express.json());
express.urlencoded({ extended: true })
// https://short-url-hk9t.onrender.com
app.use('/url', urlRoute)
// mongoose
// .connect('https://short-url-hk9t.onrender.com')
// .then(()=>console.log("DB connected"))
// .catch((err)=>{console.log(err)})

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/:shortId', async(req, res) => {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate({
    shortID: shortId,
  }, {
    $push :{
      userClicks : {
        timestamps : Date.now()
      },
    },
  })
    return res.redirect(entry.redirectURL)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})