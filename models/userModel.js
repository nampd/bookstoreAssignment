'use strict';

var mongoose = require('mongoose');

var userModel = function(){
	var userSchema = mongoose.Schema({
		name: String,
		username: String,
		password: String,
		phone: String,
		address: String,
		birthDay: String,
		email: String,
		role: [
				{type: mongoose.Schema.Types.ObjectId,
            	ref: 'Role'}
              ]
	});
	return mongoose.model('User', userSchema);
};

module.exports = new userModel();