const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; // this is used for decodeing encrypyted header
const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTstrategy(opts , async function(jwtPayload, done){
    try{
        let user = await User.findById(jwtPayload._id)
        if(user){
            return done(null,user)
        }else{
            return done(null,false)
        }
    }
    catch(err){
        console.log('Error is',err);
    }

}))

module.exports = passport