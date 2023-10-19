const express = require('express');
const router = express.Router();
const controller = require("../controllers/users-controller");
const {authAdmin, authUser} = require("../middleware/auth");


router.post("/register", controller.createUser);
router.post("/verify/email", controller.findEmail);
router.post("/verify/username", controller.findUsername);
router.post("/login", controller.login);
router.patch("/make-admin/:id", authAdmin, controller.makeAdmin);


router.delete("/:id", authUser, controller.deleteUser)
router.delete("/admin/:id", authAdmin, controller.deleteUser)

router.patch("/email/:id", authUser, controller.addEmail)


router.patch("/reinstate/:id", authAdmin, controller.reinstateUser)
router.get("/karma/:id", controller.findKarma)



// router.post("/post", controller.createPost)
// router.post("/comment/:id([0-9]+)", controller.createComment)
// router.get("/posts/:order", controller.findAllActivePosts)
// router.get("/comments/:order/:id([0-9]+)", controller.findActiveComments);
// router.get("/:id([0-9]+)", controller.findActivePost)
// router.get("/posts/:id([0-9]+)/:order", controller.findAllActivePostsSubcruddit)
// router.get("/:id/posts", controller.findAllActivePostsUser)
// router.get("/:id/comments", controller.findAllActiveCommentsUser)





module.exports = router; 