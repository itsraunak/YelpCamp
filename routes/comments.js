var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middlewere = require("../middlewere");
const { route } = require("./campgrounds");

//Comments New
router.get("/new",middlewere.isLoggedIn, function(req, res){
    //Find Campground By id 
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: campground});
        }
    });

});

//Comments Create
router.post("/",middlewere.isLoggedIn, function(req, res){
    //look campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }else{
                    //add the username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect campground show page
                    req.flash("success", "Successfully added comment")
                    res.redirect("/campgrounds/" +  campground._id);
                }
            });
        }
    });
});

// Comments Edit Route
router.get("/:comments_id/edit",middlewere.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comments_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit",{campground_id: req.params.id, comment: foundComment});
        }
    });
});

// Update Comments Route
router.put("/:comments_id",middlewere.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
        if(err){
            req.flash("error", err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated Successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Comment Destroy Route
router.delete("/:comments_id",middlewere.checkCommentOwnership, function(req, res){
     //findByIdandRemove
    //  res.send("deleted!!!")
    Comment.findByIdAndRemove(req.params.comments_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;