var express = require("express");
var router = express.Router();
var passport    = require("passport");
const Image  = require("../models/image");
const User = require("../models/user");
var middleware = require("../middleware/index");


//route to get the home page
router.get("/", function(req, res){
    res.render("home", {currentUser: req.user});
});


// route to get the contact us page
router.get("/contact-us", function(req, res){
    res.render("contact_us");
});

router.get("/about-mux", function(req, res){
    res.render("about_us"); 
});

//register routes
router.get("/mux-media/register", function(req, res){
    res.render("register");
});

router.post("/mux-media/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register");
            console.log(err)
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/gallery");
        });
    });
})

//show login form
router.get("/mux-media/login", function(req, res){
    res.render("login",);
});

//handles login logic
//app.post("/login", middleware, callback)
router.post("/mux-media/login", passport.authenticate("local", {
    successRedirect: "/gallery/new-image", 
    failureRedirect: "/mux-media/login"
}), function(req, res){
});

//log out route
router.get("/mux-media/logout", function(req, res){
    req.logout();
    res.redirect("/gallery")
});

module.exports = router;