const Comments = require('../models/comments');
const Posts = require('../models/posts');
const commentmailer = require('../mailers/comments_mailer');
const Likes = require('../models/likes');

module.exports.createComment = function(req,res){
    Posts.findById(req.body.post)
    .then(function(post){
        // we are creating commet for a particular post
        Comments.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        .then( async function(comnt){
            let comment = await comnt.populate('user');
            commentmailer.newComment(comment);
            console.log('Added comments successfully',comnt)
            //we also need to add comment id to the postsDB
            post.comment.push(comnt)
            post.save()//this tells DB to save the updated content
            res.redirect('back')
        })
        .catch(function(err){
            console.log(`Error occured while adding comments ${err}`);
        })
    })
    .catch(function(err){
        console.log(`Error occured while searching posts to comment ${err}`);
    })
}


module.exports.deleteComment = function(req,res){
    Comments.findById(req.params.id)
    .then(function(cmnt){
        if (cmnt.user == req.user.id){
            let postID = cmnt.post
            Comments.findByIdAndDelete(cmnt.id)
            .then(function(deletedcomment){
                Posts.findByIdAndUpdate(postID, {$pull: {comment:req.params.id}})// this is a default function where it pulls out the data from array and update
                .then(async function(deletedFromPostArray){
                    //deleting likes
                    await Likes.deleteMany({likeable:cmnt._id,onModel:'Comments'})
                    console.log(`deleted comment fromm both posts and comment schema ${deletedcomment}`)
                    res.redirect('back');
                })
                .catch(function(err){
                    console.log(`Error occured while  pulling comment from posts array ${err}`);
                })
            })
            .catch(function(err){
                console.log(`Error occured while  deleting comment ${err}`);
            })
        }
    })
    .catch(function(err){
        console.log(`Error occured while searching comment in DB ${err}`);
    })
}