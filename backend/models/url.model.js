import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },

    ip: String,

    userAgent: String,

    referrer: String
});

const urlSchema = new mongoose.Schema({

    originalUrl: {
        type: String,
        required: true,
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    clicks: {
        type: Number,
        default: 0
    },

    lastVisited: {
        type: Date
    },

    visitHistory: [visitSchema],

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;