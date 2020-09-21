var mongoose = require("mongoose");

//Image Schema Setup
const imageSchema = new mongoose.Schema({
    image : String,
    caption: String,
    category: String
});

//Image Schema Model
var Image = mongoose.model("Image", imageSchema);
module.exports = Image;

