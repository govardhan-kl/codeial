const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users_controller');
router.get('/profile',users_controller.profile);//this is like localhost/users/profile
router.get('/account',users_controller.account);

router.get('/signin',users_controller.signIn);
router.get('/signup',users_controller.signUp);

router.post('/create',users_controller.create);
router.post('/login',users_controller.createSession);

module.exports = router;