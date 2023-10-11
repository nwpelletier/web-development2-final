const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts-controller");
// const authenticate = require("../authentication/auth");



router.post("/post", controller.createPost)
router.post("/comment/:id([0-9]+)", controller.createComment)
router.get("/posts/:order", controller.findAllActivePosts)
router.get("/comments/:order/:id([0-9]+)", controller.findComments);
router.get("/:id([0-9]+)", controller.findActivePost)
router.get("/posts/:id([0-9]+)/:order", controller.findAllActivePostsSubcruddit)
router.get("/:id/posts", controller.findAllActivePostsUser)
router.get("/:id/comments", controller.findAllActiveCommentsUser)
router.get("/user/:id", controller.findAllByUser)
router.delete("/:id", controller.deletePost)
router.patch("/lock/:id", controller.toggleLock)
router.patch("/sticky/:id", controller.toggleSticky)
router.put("/comments/:id", controller.editComment)
router.put("/post/:id", controller.editPost)





module.exports = router; 