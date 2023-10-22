const express = require('express');
const router = express.Router();
const controller = require("../controllers/AdminController");

router.get("/", controller.findAllUsers);
router.patch("/:id", controller.toggleActive);

module.exports = router; 