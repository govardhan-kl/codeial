const express = require('express');
const router = express.Router();

const posts_controller = require('../controllers/posts_controller');

router.post('/create-comments', posts_controller.createPosts);
router.get('/delete/:id',posts_controller.destroyPost);

module.exports = router;
