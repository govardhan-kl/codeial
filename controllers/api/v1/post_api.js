const Posts = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function(req,res){
    try{
        let posts = await Posts.find({})
        .sort('-createdAt')
        .populate({path:'user',select:['id','name','email']})
        .populate({
            path:'comment',
            populate:{
                path:'user',select:['id','name','email']
            }
        });

        return res.status(200).json({
            message:'List of Posts',
            post : posts
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Server error'
        }) 
    }
    
}


module.exports.destroyPost = async function(req,res){
    try{
        let post = await Posts.findById(req.params.id);
        if (post.user == req.user.id){
            let post = await Posts.findByIdAndDelete(req.params.id)
            await Comment.deleteMany({post:req.params.id})

            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message: 'post and associated comments deleted',
                post: post
            })
        }
        else{
            res.status(403).json({
                meassage:"can't delete"
            })
        }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Server error'
        })    
    }
}