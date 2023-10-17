const express = require('express');
const router = express.Router();
const controller = require("../controllers/PostUserController");

router.get("/:id", controller.findAllActivePostsCommentsByUser);

module.exports = router; 