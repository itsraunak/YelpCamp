var Campground = require("../models/campground");
var Comment = require("../models/comment");
const user = require("../models/user");

// ALL THE MIDDLE WERE GOES HERE
var middlewereObj = {};


middlewereObj.checkCampgroundOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }   else{
                //does User own the campground?
                if(foundCampground.author.id.equals(req.user.id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        //Otherwise redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewereObj.checkCommentOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }   else{
                //does User own the comment?
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        //Otherwise redirect
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewereObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}
module.exports = middlewereObj;