var express = require("express");
var router = express.Router({mergeParams: true});
var Treatment = require("../models/treatment");
var Comment = require("../models/comment");
var middleware = require("../middleware");


//NEW - show form to create new comment.
router.get("/new", middleware.isLoggedIn, function(req, res){
  //Find treatment by ID
  Treatment.findById(req.params.id, function(err, treatment){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {treatment: treatment});
    }
  })
});

////CREATE  - add new comment to database
router.post("/", middleware.checkTreatmentOwnership, function(req, res){
  //Find treatment by ID
  Treatment.findById(req.params.id, function(err, treatment){
    if(err){
      console.log(err);
      res.redirect("/treatments/:id/comments/new");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err)
        } else {
          //add username & id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          treatment.comments.push(comment._id);
          treatment.save();
          req.flash("success", "Successfully added comment");
          res.redirect("/treatments/" + treatment._id);
        }
      });
    }
  });
});

//EDIT Comment - show form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {treatment_id: req.params.id, comment: foundComment});
    }
  });
});

//UPDATE Comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect('back');
    } else {
      res.redirect("/treatments/" + req.params.id);
    }
  })
});

//DELETE comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  //findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/treatments/" + req.params.id);
    }
  });
});



module.exports = router;
