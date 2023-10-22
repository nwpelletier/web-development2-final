const express = require('express');
const router = express.Router();
const controller = require("../controllers/AdminController");


router.get("/", controller.findAllUsers);
router.patch("/active/:id", controller.toggleActive);
router.patch("/role/:id", controller.changeRole);
router.get("/:id", controller.findOneUser);

module.exports = router; 