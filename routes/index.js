const express = require('express');
const router = express.Router(); //this  module helps in seperating routers controllers
const home_controller = require('../controllers/home_controler'); // this is to import controllers from controller folder
const passport = require('passport');
console.log('router loaded');

// below one is just for understanding but actually function(re,res){tasks} we will do all controller tasks in controllers folder
router.get('/fromrouter', function(req,res){
    res.end("<h1>Fetched from Router Module</h1>")
})

router.get('/:id', passport.checkAuthentication, home_controller.home);
router.get('/homeNo',home_controller.homeNo);

//instead of going to main index file and accesing routes of users.js seperately, we can do it in here itself as below
router.use('/users',require('./users')); //users.js routes are called whenever user enters localjost:/users
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'))

module.exports = router;
