module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success': req.flash('success'),
        'failure': req.flash('failure')
    }
    console.log('flashing');
    next();
}