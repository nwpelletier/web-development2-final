const express = require("express");
const router = express.Router();
const controller = require('../controllers/ModeratorController');
const {authAdmin, authUser} = require("../middleware/auth");

router.post("/", authUser, controller.create);

router.get("/:id", controller.findById);

router.get("/",controller.findAll);

router.get("/ismod/:subcruddit", authUser, controller.isModerator)

module.exports =  router;