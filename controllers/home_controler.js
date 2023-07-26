module.exports.home = function(req, res){
    // res.end("<h1>Did controller action in different file called home controller<h1>")
    return res.render('home',{
        title : "Home",
        heading : "This is about home page"
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