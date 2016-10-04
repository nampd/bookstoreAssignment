'use strict';

var IndexModel = require('../models/index');
var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        Category.find({status:true}, function(err,category){
            if(err){
                console.log(err);
            }
            var model = {
                category: category
            }
            res.render('category/index', model);
        })
    });

     router.get('/addCategory', function (req, res) {
            res.render('category/add');
    });

    router.post('/addCategory', function (req, res) {
        var name = req.body.name && req.body.name.trim();

        var bookCategory = new Category({
            name: name,
            status : true
        });

        bookCategory.save(function(err){
        if(err){
            console.log(err);
        }
        req.flash('success', "Add success");
        res.location('/category/');
        res.redirect('/category/');
        })
    });

    router.get('/update/:id', function (req, res) {
        Category.findOne({_id:req.params.id}, function(err,categories){
            if(err){
                console.log(err);
            }
            console.log(categories);
            var model = {
                categories: categories,
            }
            res.render('category/update', model);
            })
    });

    router.post('/update/:id', function (req, res) {
        var name = req.body.name && req.body.name.trim();
        
        Category.update({_id:req.params.id},{
            name: name,
            status: true
        },function(err){
            if(err){
                console.log(err);
            }
            req.flash('success', "Update success");
            res.location('/category/');
            res.redirect('/category/');
        });
    });    

    router.get('/delete/:id', function (req, res) {
            Book.findOne({category:req.params.id}, function(err, book){
                if(err){
                    console.log(err);
                }
                if(book === "null"){
                    Category.update({_id:req.params.id},{
                    status: false
                    },function(err){
                    if(err){
                        console.log(err);
                    }
                    req.flash('success', "Update success");
                    res.location('/category/');
                    res.redirect('/category/');
                    });
                }else {
                    req.flash('error', "Can't delete that category");
                    res.location('/category/');
                    res.redirect('/category/');
                }
            })

       
    });


};