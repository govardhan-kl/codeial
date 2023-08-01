const User = require("../models/user")

module.exports.profile = function(req,res){
    // res.end("<h1>User Profile Accesed</h1>")
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then(function(user){
            res.render('users',{
                title : "usersProfile",
                users : "this is the users profile section",
                user
            }) 
        })
        .catch(function(err){
            console.log(`Error in finding :${err}`)
            res.redirect('/users/signin')
        })
    }
    else{
        res.redirect('/users/signin')
    }
}

module.exports.account = function(req,res){
    // res.end("<h1>User Account Accesed</h1>")
    res.render('users',{
        title : "usersAccount",
        users : "this is the users account section"
    })
}

module.exports.signIn = function(req,res){
    res.cookie('user_id',null)//when logout we are seeting cookie to null
    res.render('users_signin',{
        title: "SignIn || codeila"
    })
}

module.exports.signUp = function(req,res){
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
    .then(function(user){
        if(!user){
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
    console.log(req)
    res.redirect('/users/profile')
}

module.exports.createSession = function(req,res){
    //find the user
    User.findOne({email: req.body.email})
    .then(function(user){
        //handle user found
        if(user){
            //handle password which doesn;t match
            if(user.password != req.body.password){
                return res.redirect('back')
            }

            //handle session creation
            res.cookie('user_id',user.id);
            console.log('created session')
            res.redirect('/users/profile')
        }
        else{
            //handle user not found
            return res.redirect('back')
        }
    })
    .catch(function(err){
        console.log(`Eror in finding user : ${err}`);
    })
}