const shortid = require('shortid')
const URL = require('../models/url')
const generateShortURL = async (req, res) => {  
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortId = shortid();
    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        userClicks: []
    });

    return res.json({ id: shortId });
}

const generateAnalytics = async (req, res) => { 
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortID: shortId })
    return res.json({ totalClicks : result.userClicks.length, analytics : result.userClicks})
}

module.exports = {
    generateShortURL,
    generateAnalytics,
}