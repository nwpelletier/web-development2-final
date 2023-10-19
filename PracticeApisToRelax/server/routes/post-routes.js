const express = require('express');
const router = express.Router();
const controller = require("../controllers/posts-controller");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {authAdmin, authUser} = require("../middleware/auth");




//router.post("/text", controller.createPost)
router.post("/image", authUser, upload.single('content'), controller.createImgPost)
router.post("/text", authUser,  controller.createTextPost)
router.post("/comment/:id([0-9]+)", authUser, controller.createComment)

router.get("/posts/:order", controller.findAllActivePosts)
router.get("/comments/:order/:id([0-9]+)", controller.findComments);
router.get("/:id([0-9]+)", controller.findActivePost)
router.get("/posts/:subcruddit/:order", controller.findAllActivePostsSubcruddit)


// USER PAGE ROUTES 
router.get("/:id/posts", controller.findAllActivePostsUser)
router.get("/:id/comments", controller.findAllActiveCommentsUser)
router.get("/user/:id", controller.findAllByUser)


router.delete("/:id", authUser, controller.deletePost)
router.delete("/admin/:id", authAdmin, controller.deletePost)

router.patch("/lock/:id", authUser, controller.toggleLock)
router.patch("/admin/lock/:id", authAdmin, controller.toggleLock)

router.patch("/sticky/:id", authUser, controller.toggleSticky)

router.put("/comments/:id", authUser, controller.editComment)
router.put("/post/:id", authUser, controller.editPost)





module.exports = router; 