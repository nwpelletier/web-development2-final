const express = require('express');
const router = express.Router();
const controller = require("../controllers/users-controller");

router.get("/:id/user/posts", controller.findAllActivePostsUser)