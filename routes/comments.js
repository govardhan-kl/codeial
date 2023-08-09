const express = require('express');
const router = express.Router();
const comments_controller = require('../controllers/comments_controller');

router.post('/create-comments',comments_controller.createComment);

module.exports = router;