var express = require("express");
var passport    = require("passport");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware/index");
const Image  = require("../models/image");
const User = require("../models/user");


// route to get the gallery page
router.get("/gallery", function(req, res){
    //Get all images from DB
    Image.find({}, function(err, allImages){
        if(err){
            console.log(err); 
        }else{
            res.render('./gallery/images', {images: allImages});
        }
    })
});

router.get("/gallery/new-image", middleware.isLoggedIn, function(req, res){
    res.render("./gallery/newImage");
});

router.post("/gallery", function(req, res){
    //get data from form and add to campgrounds array
    var image = req.body.image;
    var caption = req.body.caption;
    var category = req.body.category;

    var newImage = {image: image, caption: caption, category: category};

    //CREATE A NEW IMAGE AND SAVE TO DB
    Image.create(newImage, function(err, newlyCreated){
        if (err){
            console.log(err);
        }else{
            //redirect back to gallery page
            res.redirect("./gallery/" + category);
        }
    })
});

router.get("/gallery/products", function(req, res){
    //Get all images from DB
    Image.find({category: "products"}, function(err, allImages){
        if(err){
            console.log(err); 
        }else{
            res.render('./gallery/products', {images: allImages});
        }
    })
});

router.get("/gallery/pre-wedding", function(req, res){
    //Get all images from DB
    Image.find({category: "pre-wedding"}, function(err, allImages){
        if(err){
            console.log(err); 
        }else{
            res.render('./gallery/pre-wedding', {images: allImages});
        }
    })
});

router.get("/gallery/wedding", function(req, res){
    //Get all images from DB
    Image.find({category: "wedding"}, function(err, allImages){
        if(err){
            console.log(err); 
        }else{
            res.render('./gallery/wedding', {images: allImages});
        }
    })
});

router.get("/gallery/studio-shoot", function(req, res){
    //Get all images from DB
    Image.find({category: "studio-shoot"}, function(err, allImages){
        if(err){
            console.log(err); 
        }else{
            res.render('./gallery/studio-shoot', {images: allImages});
        }
    })
});

router.get("/gallery/beauty", function(req, res){
    //Get all images from DB
    Image.find({category: "beauty"}, function(err, allImages){
        if(err){
            console.log(err); 
        }else{
            res.render('./gallery/beauty', {images: allImages});
        }
    })
});

router.get("/gallery/portrait", function(req, res){
    //Get all images from DB
    Image.find({category: "portrait"}, function(err, allImages){
        if(err){
            console.log(err); 
        }else{
            res.render('./gallery/portrait', {images: allImages});
        }
    })
});


module.exports = router;

