const express = require("express");
const app = express();
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
const middleware = require("./middleware/index");

const image = require("./routes/image");
const index = require("./routes/index");

const URL = "mongodb://tdm:08087016021@cluster0-shard-00-00.6tcng.mongodb.net:27017,cluster0-shard-00-01.6tcng.mongodb.net:27017,cluster0-shard-00-02.6tcng.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-f0ytmy-shard-0&authSource=admin&retryWrites=true&w=majority"
var url = "mongodb://localhost/mux_v4";
mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connection.on("connected", function(){
    console.log("Mongoose is connected");
})
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
