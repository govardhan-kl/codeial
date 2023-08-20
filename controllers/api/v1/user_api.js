const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.login = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email})

        if(!user || user.password != req.body.password){
            res.status(403).json({
                message:"Invalid username/password"
            })
        }

        return res.status(200).json({
            message:"Login successful, here is your token please keep it safe",
            data:{
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn: '200000'})
            }
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:'Server error'
        }) 
    }

}