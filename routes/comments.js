const express = require('express');
const router = express.Router();
const comments_controller = require('../controllers/comments_controller');

router.post('/create-comments',comments_controller.createComment);
router.get('/delete/:id', comments_controller.deleteComment);

module.exports = router;