var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX
router.get("/", function(req,res){
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds, campgrounds});
        }
    })
    
})

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var campground = {
        name: name,
        image: image,
        description: description,
        author: author
    };
    
    //create new campground in DB
    Campground.create(campground, function(err, campground){
        if(err){
            console.log(err);
        }else {
            console.log("new camp");

        }
    });
    
    res.redirect("/campgrounds");
});


//NEW
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
})


//SHOW 
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground,campground});
        }
    });
    
})

//campground edit route
router.get("/:id/edit", middleware.campOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: campground});
        }
    })
    
});

//campground UPDATE route
router.put("/:id", middleware.campOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Campground DESTROY Route
router.delete("/:id", middleware.campOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})



module.exports = router;