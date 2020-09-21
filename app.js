const express = require("express");
var app = express();
const ejs     = require("ejs");
const bodyParser = require("body-parser");
const mongoose    = require("mongoose");
const { ConnectionStates } = require("mongoose");
const path = require ("path");
const flash       = require("connect-flash");
const passport    = require("passport");
const localStrategy = require("passport-local");
const Image  = require("./models/image");
const User = require("./models/user");
var middleware = require("./middleware/index");

var image = require("./routes/image");
var index = require("./routes/index");


var url = "mongodb://localhost/mux_v4";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");

//This line tells points makes public directory the default for all styles
app.use(express.static(__dirname + "/public")); 
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));
app.use(flash());


//passport config
app.use(require("express-session")({
    secret: "I really am wholly_tdm",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passing currentUser tol every of the templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Using all routes connected to the app.js file
app.use(image);
app.use(index);



var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log("app started");
});
