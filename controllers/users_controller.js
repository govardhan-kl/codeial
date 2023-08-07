const User = require("../models/user");
const Posts = require('../models/posts');

module.exports.profile = function(req,res){
    // res.end("<h1>User Profile Accesed</h1>")
    Posts.find({user: req.user._id}).populate('user') //this is used to populate the user so that we can display the name instead of userID
    .then(function(done){
        res.render('users',{
            title : "usersProfile",
            userPage : "this is the users profile section",
            comments : done
        })
    })
    .catch(function(err){
        console.log(`Error occured in showing users page ${err}`);
    })
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
    console.log("logged in")
    //console.log("requests",req)
    res.redirect('/users/profile')
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) { //logout function is given to req by passport
        if (err) { return next(err); }
        res.redirect('/');
      });
}