const express = require('express');
const router = express.Router();
const controller = require("../controllers/AdminController");

router.get("/", controller.findAllUsers);

module.exports = router; 