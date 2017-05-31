var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require("../models/user");
var flash = require("connect-flash");

router.get("/", function(req,res){
    res.render("landing");
});

//======================
//AUTH ROUTE
//======================

//show register form
router.get("/register", function(req,res){
    res.render("register");
})
//handle registration
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            })
        }
    })
})

//login routes
router.get('/login', function(req,res){
    res.render("login", {message:req.flash("error")});
})

router.post("/login", passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
})

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You successfully logged out!");
    res.redirect("/campgrounds");
})


//middelware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect("/login")
    }
}

module.exports = router;