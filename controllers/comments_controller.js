const Comments = require('../models/comments');
const Posts = require('../models/posts');

module.exports.createComment = function(req,res){
    Posts.findById(req.body.post)
    .then(function(post){
        // we are creating commet for a particular post
        Comments.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        })
        .then(function(comnt){
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