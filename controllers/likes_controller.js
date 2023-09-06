const Likes = require('../models/likes');
const Posts = require('../models/posts');
const Comments = require('../models/comments');

module.exports.toggle_like = async function(req,res){
    try{
        let likeable;
        let deleted = false;

        if(req.query.type == 'Posts'){
            likeable = await Posts.findById(req.query.id).populate('likes')
        }
        else{
            likeable = await Comments.findById(req.query.id).populate('likes')
        }
        // console.log("Likeable is:",likeable)

        //check if there is like already
        let existingLike = await Likes.findOne({
            user: req.user.id,
            likeable: req.query.id,
            onModel: req.query.type
        })
        // console.log("existing like  is:",existingLike)
        //if there is alike already thn delete it
        if(existingLike){
            likeable.likes.pull(existingLike.id)
            likeable.save()
            
            // existingLike.remove()
            await Likes.deleteOne(existingLike._id)
            deleted= true
        }
        else{
            let newLike = await Likes.create({
                user: req.user.id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            // console.log("New Like is:",newLike)
            likeable.likes.push(newLike._id)
            likeable.save()
        }

        return res.status(200).json({
            message:'Request successful',
            data:{
                deleted:deleted,
            }
        })


    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}