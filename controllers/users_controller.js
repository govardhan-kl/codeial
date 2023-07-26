module.exports.profile = function(req,res){
    // res.end("<h1>User Profile Accesed</h1>")
    res.render('users',{
        title : "usersProfile",
        user : "this is the users profile section"
    })
}

module.exports.account = function(req,res){
    // res.end("<h1>User Account Accesed</h1>")
    res.render('users',{
        title : "usersAccount",
        user : "this is the users account section"
    })
}