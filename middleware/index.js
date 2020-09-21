var User = require("../models/user");

//all middlewares goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/mux-media/login");
} 


module.exports = middlewareObj;