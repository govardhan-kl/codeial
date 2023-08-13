const Posts = require('../models/posts')
const Comment = require('../models/comments');

module.exports.createPosts = async function(req,res){
    try{
        let post = await Posts.create({
            content: req.body.content,
            user: req.user._id
        })

        if (req.xhr){ // this is to check if a request is ajax or not ajax are xhr requests
            return res.status(200).json({
                data:{
                    post:post
                },
                message: 'post created'
            })
        }
        console.log(`successfully added post ${post}`);
        req.flash('success','Post succefully posted')
        res.redirect('back')
    }
    catch(err){
        console.log(`Error occured while adding comments ${err}`);
    }
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

                    if(req.xhr){//AJAX
                        return res.status(200).json({
                            data:{
                                post_id:req.params.id
                            },
                            message: 'post deleted'
                        })
                    }
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