const User = require("../models/user");
const Posts = require('../models/posts');

module.exports.profile = function(req,res){
    // res.end("<h1>User Profile Accesed</h1>")
    Posts.find({})
    .populate('user') //this is used to populate the user so that we can display the name instead of userID
    .populate({
        path:'comment',
        populate:{
            path:'user'
        }
    }).exec()
    .then(function(done){
        User.find({})
        .then(function(all_users){
            res.render('users',{
                title : "usersProfile",
                userPage : "this is the users profile section",
                posts : done,
                all_users
            })
        })
    })
    .catch(function(err){
        console.log(`Error occured in showing users page ${err}`);
    })
}


module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.user.id, {name:req.body.name, email:req.body.email})
        .then(function(updated){
            return res.redirect('back')
        })
        .catch(function(err){
            console.log(`Error in updating`);
        })
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
        res.redirect('/users/signin');
      });
}