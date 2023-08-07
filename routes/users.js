const express = require('express');
const router = express.Router();
const passport = require('passport');

const users_controller = require('../controllers/users_controller');
router.get('/profile', passport.checkAuthentication , users_controller.profile);//this is like localhost/users/profile
router.get('/account',users_controller.account);

router.get('/signin',users_controller.signIn);
router.get('/signup',users_controller.signUp);
router.get('/signout', users_controller.destroySession)

router.post('/create',users_controller.create);

//use passport as a middleware to authenticate
router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
) , users_controller.login);

module.exports = router;