const express = require('express');
const router = express.Router(); //this  module helps in seperating routers controllers
const home_controller = require('../controllers/home_controler'); // this is to import controllers from controller folder
console.log('router loaded');

// below one is just for understanding but actually function(re,res){tasks} we will do all controller tasks in controllers folder
router.get('/fromrouter', function(req,res){
    res.end("<h1>Fetched from Router Module</h1>")
})

router.get('/',home_controller.home);











module.exports = router;
