const Posts = require('../models/posts')

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


