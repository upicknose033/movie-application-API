const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required:[true, "Title is Required"]
	},
	director:{
		type: String,
		required:[true, "Name of Director is Required"]
	},
	year:{
		type: Number,
		required: [true, "Year of Release is Required"]
	},
	description:{
		type: String,
		required: [true, "Description is Required"]
	},
	comments:{
		type: String,
		required: [true, "Comments are required"]
	}

});

module.exports = mongoose.model('Movie', movieSchema);