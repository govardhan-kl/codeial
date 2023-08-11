const User = require('../models/user');


module.exports.home = function(req, res){
    // res.end("<h1>Did controller action in different file called home controller<h1>")
    console.log(req.cookies);
    res.cookie('user_id', 25);//we are setting cookie value
    let id = req.params.id;
    User.findById(id)
    .then(function(current_user){
        return res.render('home',{
            title : "Home",
            heading : "This is about home page",
            current_user
        })
    })
    .catch(function(err){
        console.log(`Error occured in showing home page ${err}`);
    })
}

module.exports.homeNo = function(req,res){
    // res.end("<h1>This is a home number home from controller<h1>")
    return res.render('home',{
        title: "homeNo",
        heading: "This is about House Number detail"
    })
}

//module.exports.actionName = function(req,res){task}