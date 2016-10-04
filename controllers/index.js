'use strict';

var IndexModel = require('../models/index');
var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        
        
        res.render('index', model);
        
        
    });
};
