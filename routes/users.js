const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');
router.get('/profile',users_controller.profile);//this is like localhost/users/profile
router.get('/account',users_controller.account);

module.exports = router;