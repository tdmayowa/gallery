var mongoose = require("mongoose");
var passportLocalmongoose = require("passport-local-mongoose");
var middleware = require("../middleware/index");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalmongoose); 

module.exports = mongoose.model("User", UserSchema);