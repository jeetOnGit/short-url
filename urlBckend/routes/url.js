const express = require("express")
const {generateShortURL, generateAnalytics} = require('../controllers/url')
const router = express.Router()

router.post('/', generateShortURL)
router.get('/analytics/:shortId', generateAnalytics)

module.exports = router