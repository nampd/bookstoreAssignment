'use strict';

var mongoose = require('mongoose');
var db = function(){
	return{
		config: function(conf){
			mongoose.connect('mongodb://localhost/BookStore')
			var db = mongoose.connection;
			db.on('error', console.error.bind(console, 'Connection was interupted on Database.js'));

			db.once('open', function(){
				console.log('Database.js connect success.')
			});
		}
	};
}

module.exports = db();