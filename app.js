var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var flash = require("connect-flash");
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require("./seeds");
var methodOverride = require("method-override");
var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require("./models/user");
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

//seedDB();
app.use(flash());

//PASSPORT configuration
app.use(require('express-session')({
    secret: "Rusty is the cuteest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect to mongoDB
console.log(process.env.DATABASEURL);
mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));


//pass current user for all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.set("view engine", "ejs");

//routes
app.use("/", indexRoutes);
app.use("/campgrounds/", campgroundRoutes);
app.use("/campgrounds/:id/comments/", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp app listening on port: " + process.env.PORT);
});

