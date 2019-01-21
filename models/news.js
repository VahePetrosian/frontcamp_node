const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const NewsSchema = new Schema({
    author: { type: String, trim: true },
    urlToImage: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    publishedAt: { type: Date, default: Date.now },
    country: { type: String, trim: true },
    category: { type: String, trim: true },
    source: { type: String, trim: true }
});

module.exports = mongoose.model('News', NewsSchema);