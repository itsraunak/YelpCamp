var mongoose    = require("mongoose"),
    campground  = require("./models/campground"),
    Comment     = require("./models/comment");


var data = [
    {
        name: "Blue Flower",
        image: "https://www.hdwallpapers.in/thumbs/2020/abstract_hexagon_4k_hd_abstract-t2.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Beautiful tree",
        image: "https://www.hdwallpapers.in/thumbs/2020/snow_covered_trees_with_bridge_under_lake_4k_hd_nature-t1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
]

function seedDB(){
    //Remove all campgrounds
    campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed Campgrounds!");
        }
        // //Add a few campgrounds
        // data.forEach(function(seed){
        //     campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err)
        //         }else{
        //             console.log("added a campground")
        //         }
        //         //Add a few comments
        //         Comment.create({
        //             text: "This Place Was Great But i Wish There Was internet",
        //             author: "Raunak"
        //         },function(err, Comment){
        //             if(err){
        //                 console.log(err);   
        //             }else{
        //                 campground.comments.push(Comment);
        //                 campground.save();
        //                 console.log("Created new comment");
        //             }
        //         });
        //     });
        // });
    });
}

module.exports = seedDB;