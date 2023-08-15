const User = require("../models/user");
const Posts = require('../models/posts');
const fs = require('fs');
const path = require('path');

// module.exports.profile = function(req,res){
//     // res.end("<h1>User Profile Accesed</h1>")
//     Posts.find({})
//     .populate('user') //this is used to populate the user so that we can display the name instead of userID
//     .populate({
//         path:'comment',
//         populate:{
//             path:'user'
//         }
//     }).exec()
//     .then(function(done){
//         User.find({})
//         .then(function(all_users){
//             res.render('users',{
//                 title : "usersProfile",
//                 userPage : "this is the users profile section",
//                 posts : done,
//                 all_users
//             })
//         })
//     })
//     .catch(function(err){
//         console.log(`Error occured in showing users page ${err}`);
//     })
// }

// to make the code simpler and cleaner we can use async await , implemeted below for the profile page
module.exports.profile = async function(req,res){
    try{
    let posts = await Posts.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comment',
            populate:{
                path:'user'
            }
        });
    let all_users = await User.find({})
    
    return res.render('users',{
        title : "usersProfile",
        userPage : "this is the users profile section",
        posts,
        all_users
    })
    }catch(err){
        console.log(`Error: ${err}`);
        return
    } 
}


module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{
            // let user = await User.findByIdAndUpdate(req.user.id, {name:req.body.name, email:req.body.email});// we cant do update like this for images, bcoz in multer it doesnt recognize req.body so we use mukter fun to access req.body
            let user = await User.findById(req.params.id);
            User.uploadAvatar(req,res,function(err){
                if(err){ console.log('******multer-err****',err)}
                user.name = req.body.name;
                user.email= req.body.email
                if(req.file){
                    if(user.avatar){//to remove file if already exists
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    console.log(req.file)
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save()//saving edited
                return res.redirect('back')
            })
            
        }
        catch(err){
            console.log(`Error in updating`,err);
        }    
    }
    else{
        return res.status(401).send('<h2>Access is denied</h2>');
    }
}


module.exports.account = function(req,res){
    // res.end("<h1>User Account Accesed</h1>")
    console.log(req);
    res.render('users',{
        title : "usersAccount",
        userPage : "this is the users account section"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    res.render('users_signin',{
        title: "SignIn || codeila"
    })
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    res.render('users_signup',{
        title: "SignUp || codeila"
    })
}

module.exports.create = function(req,res){
    req.flash('success','Created account successfully'); //first paraemter is type of flash message
    console.log(req.body)
    if(req.body.password != req.body.confirm_password){
        res.redirect('back')
    }

    User.findOne({email: req.body.email})
    .then(function(data){
        if(!data){
            User.create(req.body)
            .then(function(){
                console.log('Created  a user')
                res.redirect('/users/signin')
            })
            .catch(function(err){
                console.log(`Eror in creating user : ${err}`);
            })
        }
        else{
            console.log('user already exists');
            res.redirect('back');
        }
    })
    .catch(function(err){
        console.log(`Eror in finding user : ${err}`);
    })
}

module.exports.login = function(req,res){
    req.flash('success','Logged in to account successfully');
    console.log("logged in",req.flash)
    //console.log("requests",req)
    res.redirect('/users/profile')
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) { //logout function is given to req by passport
        if (err) { return next(err); }
        req.flash('success','LoggedOut of account successfully');
        res.redirect('/users/signin');
      });
}