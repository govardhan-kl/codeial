module.exports.home = function(req, res){
    res.end("<h1>Did controller action in different file called home controller<h1>")
}

module.exports.homeNo = function(req,res){
    res.end("<h1>This is a home number home from controller<h1>")
}

//module.exports.actionName = function(req,res){task}