const express = require('express');
const router = express.Router();

const userAPI = require('../../../controllers/api/v1/user_api')

router.post('/login',userAPI.login);

module.exports = router