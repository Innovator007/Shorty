const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlShortenSchema = new Schema({
	originalUrl: {
		type: String,
		required: true
	},
	urlCode: String,
	shortUrl: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

mongoose.model("UrlShorten", urlShortenSchema);