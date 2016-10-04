'use strict';

var IndexModel = require('../models/index');
var User = require('../models/userModel');
var Order = require('../models/orderModel');
var Role = require('../models/roleModel');

module.exports = function (router) {

    var model = new IndexModel();

    router.get('/customer', function (req, res) {
        Role.findOne({name : "User"}, function(err, roleUser){
            User.find({role : roleUser._id}, function(err,users){
                if(err){
                    console.log(err);
                }
                var model = {
                    users: users
                }
                res.render('user/indexCustomer', model);
            })
        })
    });

     router.get('/manager', function (req, res) {
        Role.findOne({name : "Manager"}, function(err, roleUser){
            User.find({role : roleUser._id}, function(err,managers){
                if(err){
                    console.log(err);
                }
                var model = {
                    managers: managers
                }
                res.render('user/indexManager', model);
            })
        })
    });

     router.get('/viewCustomer/:id', function (req, res) {
        User.findOne({_id : req.params.id}, function(err,customer){
            if(err){
                console.log(err);
            }
            var model = {
                customer: customer
            }
            res.render('user/viewCustomer', model);
        })
    });

     router.get('/addManager', function (req, res) {
       res.render('user/add');
    });

    router.post('/addManager', function (req, res) {
        var name = req.body.name && req.body.name.trim();
        var username = req.body.username && req.body.username.trim();
        var phone = req.body.phone && req.body.phone.trim();
        var address = req.body.address && req.body.address.trim();
        var email = req.body.email && req.body.email.trim();

        User.findOne({username : username}, function(err, userFounded){
            if(userFounded === null){
                Role.findOne({name : "Manager"}, function(err, roleManager){
                    if(err){
                        console.log(err);
                    }
                    var newManager = new User({
                    name: name,
                    username: username,
                    phone: phone,
                    address: address,
                    email: email,
                    role: roleManager._id,
                    password: "macdinh"
                    });

                    newManager.save(function(err){
                        if(err){
                            console.log(err);
                        }
                });
                
                req.flash('success', 'Add success');
                res.location('/user/manager');
                res.redirect('/user/manager');
                })
            }else {
                res.redirect('/user/addManager');
            }
        })

        
    });

    router.get('/update/:id', function (req, res) {
        Category.find({}, function(err,categories){
            Book.findOne({_id:req.params.id}, function(err,book){
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

        Book.update({_id:req.params.id},{
            title: title,
            category: category,
            decription: decription,
            author: author,
            publisher: publisher,
            price: price,
            image: image,
            status: "true"
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
            status: "false"
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