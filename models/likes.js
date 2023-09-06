const mongoose = require('mongoose');
const { schema } = require('./user');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //this defines the object id of liked post
    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        refPath: 'onModel'
    },
    //this field is used for defining the type of liked objects since it is dynamic reference
    onModel:{
        type: String,
        require: true,
        enum : ['Posts','Comments']
    }
},{
    timestamps:true
})

const Likes = mongoose.model('Likes',likeSchema);
module.exports = Likes;