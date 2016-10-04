'use strict';

var mongoose = require('mongoose');

var categoryModel = function(){
	var categorySchema = mongoose.Schema({
		name: String,
		status: Boolean
	});
	return mongoose.model('Category', categorySchema);
};

module.exports = new categoryModel();