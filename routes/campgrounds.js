var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middlewere = require("../middlewere");
const { route } = require("./comments");
const { Router } = require("express");


//INDEX ROUTE -SHOW ALL CAMPGROUND
router.get("/", function(req, res){
    //Get all the campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });
});


//CREATE ROUTE - CREATE NEW TODATABASE
router.post("/",middlewere.isLoggedIn, function(req, res){
    //get data from form and add data to array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name,price: price, image: image, description: desc, author: author}
    //Create new campground to save data to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campgrounds page
            console.log("newlyCreated");
            res.redirect("/campgrounds");            
        }
    });
});


//NEW ROUTE - show form to create new campgrounds
router.get("/new",middlewere.isLoggedIn, function(req, res){
    req.flash("error", "You need to login First");
    res.render("campgrounds/new");  
});


//SHOWS - Shows More info about one camgrounds
router.get("/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middlewere.checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middlewere.checkCampgroundOwnership, function(req, res){
    //find and update the correct campgrounds
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere(show page)
});

// DESTROY CAMPGROUND ROUTES
router.delete("/:id",middlewere.checkCampgroundOwnership, function(req, res){
    Campground.findOneAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;