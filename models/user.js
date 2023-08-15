const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATHAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
},{
    timestamps:true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATHAR_PATH));// models../uploads/users/avatar
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


  //static func
  userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar')
  userSchema.statics.avatarPath = AVATHAR_PATH;



const User = mongoose.model('User',userSchema);

module.exports = User