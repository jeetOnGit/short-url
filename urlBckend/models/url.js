const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    // Each click will have a timestamp stored as a Date object
    userClicks: [
        { 
            timestamps: {
                type: Date,
                default: Date.now 
            }
        }
    ]
}, 
{ timestamps: true }  // This will add createdAt and updatedAt fields automatically
);

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
