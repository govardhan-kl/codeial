const Posts = require('../models/posts')
const Comment = require('../models/comments');

module.exports.createPosts = function(req,res){
    console.log({content:req.body.content,
                user:req.user._id
    })
    Posts.create({
        content: req.body.content,
        user: req.user._id
    })
    .then(function(done){
        console.log(`successfully added comments ${done}`);
        res.redirect('back')
    })
    .catch(function(err){
        console.log(`Error occured while adding comments ${err}`);
    })
}


module.exports.destroyPost = function(req,res){
    Posts.findById(req.params.id)
    .then(function(post){
        //.id meand we are converting object id to string, whnever we need to compare object IDs we need to convert to string
        console.log(post)
        if (post.user == req.user.id){
            //post.remove()// depricated: this removes post from DB, mongoose itself searches id of post and deletes it
            Posts.findByIdAndDelete(post.id)
            .then(function(postdeleted){
                Comment.deleteMany({post:req.params.id})
                .then(function(commentdeleted){
                    console.log('Deleted',postdeleted, commentdeleted);
                    return res.redirect('back');
                })
                .catch(function(err){
                    console.log(`Error occured while deleting comments of a ${post.user} ${err}`);
                })
            })
            .catch(function(err){
                console.log(`Error occured while deleting post of a ${post.user} ${err}`);
            })
        }
    })
    .catch(function(err){
        console.log(`Error occured while fetching post to delete ${err}`);
    })
}