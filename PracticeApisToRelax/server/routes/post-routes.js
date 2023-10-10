const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts-controller");
// const authenticate = require("../authentication/auth");

// router.patch("/update/:id([0-9]+)", authenticate, controller.updateToComplete);
// router.post("/new", authenticate, controller.createTodo);
// router.delete("/:id([0-9]+)", authenticate, controller.deleteTodo);
// router.get("/all/:id([0-9]+)", authenticate, controller.viewAll)
// router.get("/:id([0-9]+)", authenticate, controller.findById)
router.post("/post", controller.createPost)
router.post("/comment/:id([0-9]+)", controller.createComment)
router.get("/posts/:order", controller.findActivePosts)


module.exports = router; 