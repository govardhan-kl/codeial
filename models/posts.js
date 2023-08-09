const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // includes the array of comments for that particular post in postschema itself so that is faster to load comments of that particular posts
    comment:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
        }
    ]
},{
    timestamps:true
});

const Posts = mongoose.model('Posts',postSchema);

module.exports = Posts;