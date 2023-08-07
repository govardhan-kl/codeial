const User = require("../models/user")

module.exports.profile = function(req,res){
    // res.end("<h1>User Profile Accesed</h1>")
    res.render('users',{
        title : "usersProfile",
        userPage : "this is the users profile section"
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
    console.log("requests",req)
    res.redirect('/users/profile')
}

module.exports.destroySession = function(req,res){
    req.logout(function(err) { //logout function is given to req by passport
        if (err) { return next(err); }
        res.redirect('/');
      });
}