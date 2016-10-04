'use strict';

var mongoose = require('mongoose');
var bookModel = function(){
	var bookSchema = mongoose.Schema({
		title: String,
		category: [{
					type: mongoose.Schema.Types.ObjectId, 
					ref: 'Category'
				  }],
		decription: String,
		author: String,
		publisher: String,
		price: Number,
		image: String,
		quantity: Number,
		status: Boolean
	});
	return mongoose.model('Book', bookSchema);
};

module.exports = new bookModel();