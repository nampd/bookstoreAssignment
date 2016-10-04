'use strict';

var IndexModel = require('../models/index');
var Book = require('../models/bookModel');
var Category = require('../models/categoryModel');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        Book.find({status: true },null,{ $sort: {'_id' : -1}}, function(err,book){
            if(err){
                console.log(err);
            }
            var model = {
                book: book
            }
            res.render('book/index', model);
        })
    });

     router.get('/addBook', function (req, res) {
        Category.find({}, function(err,categories){
            if(err){
                console.log(err);
            }
            var model = {
                categories: categories
            }
            res.render('book/add', model);
        })
    });

    router.post('/addBook', function (req, res) {
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var decription = req.body.decription && req.body.decription.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var image = req.body.image && req.body.image.trim();
        var quantity = req.body.quantity && req.body.quantity.trim();
        var listCategory = req.body.categories;


        var bookAdd = new Book({
        title: title,
        quantity : quantity,
        category: listCategory,
        decription: decription,
        author: author,
        publisher: publisher,
        price: price,
        image: image,
        status : true
        });
        
        bookAdd.save(function(err){
        if(err){
            console.log(err);
        }


        req.flash('success', "Add success");
        res.location('/book/');
        res.redirect('/book/');
        })
    });

    router.get('/update/:id', function (req, res) {
        Category.find({}, function(err,categories){
            Book.findOne({_id:req.params.id}).populate('category').exec(function(err,book){
            if(err){
                console.log(err);
            }

            var model = {
                categories: categories,
                book : book
            };
            res.render('book/update', model);
            })
        });
    });

    router.post('/update/:id', function (req, res) {
        var title = req.body.title && req.body.title.trim();
        var category = req.body.category && req.body.category.trim();
        var decription = req.body.decription && req.body.decription.trim();
        var author = req.body.author && req.body.author.trim();
        var publisher = req.body.publisher && req.body.publisher.trim();
        var price = req.body.price && req.body.price.trim();
        var image = req.body.image && req.body.image.trim();
        var quantity = req.body.quantity && req.body.quantity.trim();
        var listCategory = req.body.categories;

        Book.update({_id:req.params.id},{
            title: title,
            quantity : quantity,
            $set : {
                category : listCategory
            },
            decription: decription,
            author: author,
            publisher: publisher,
            price: price,
            image: image,
            status: true
        },function(err){
            if(err){
                console.log(err);
            }
            req.flash("messages", "LELELELELELEL");
            res.location('/book/');
            res.redirect('/book/');
        });
    });    

    router.get('/delete/:id', function (req, res) {
        Book.update({_id:req.params.id},{
            status: false
        },function(err){
            if(err){
                console.log(err);
            }
            req.flash('success', "Update success");
            res.location('/book/');
            res.redirect('/book/');
        });
    });


};