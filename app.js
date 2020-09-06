const express = require("express");
const ejs     = require("ejs");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
// var fancybox = require('@fancyapps/fancybox');

var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded(
    {
        extended: true
    })
);

//route to get the home page
app.get("/", function(req, res){
    res.render("home");
});

// route to get the gallery page
app.get("/gallery", function(req, res){
    res.render("images")
});

// route to get the contact us page
app.get("/contact-us", function(req, res){
    res.render("contact_us");
});

//route that handles the logical part of the messsage post request
app.post("/", function(req, res){
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.msg);
    var name = req.body.name,
        email = req.body.email,
        message = req.body.msg;

    const mailer = async (options) => {
        const fastaMailer = await nodemailer.createTransport(smtpTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: 
                {
                        user: "taiwodaniel1998@gmail.com", // gmail used just for testing purposes
                        pass: "08087016021" // for testing purposes
                }
        }));

        const mailOptions = {
                from: "<taiwodaniel1998@gmail.com>",
                to: 'taiwodaniel2020@gmail.com',
                subject: 'Message to Mux_Media',
                text: message + " from " + name + " with email " +  email
        };

        await fastaMailer.sendMail(mailOptions, (error) => {
                // console.log(mailOptions, info);
                if (error) {
                        throw error;
                        // console.log(error);
                }
                return "Mail sent";
        });
        res.redirect("/contact-us");
    };
    mailer();

})

app.get("/about-mux", function(req, res){
    res.render("about_us"); 
});


var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log("app started");
});
