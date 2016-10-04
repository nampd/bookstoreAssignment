'use strict';

var mongoose = require('mongoose');

var roleModel = function(){
	var roleSchema = mongoose.Schema({
		name: String
	});
	return mongoose.model('Role', roleSchema);
};

module.exports = new roleModel();