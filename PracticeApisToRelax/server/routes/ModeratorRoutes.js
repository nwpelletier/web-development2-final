const express = require("express");
const router = express.Router();
const controller = require('../controllers/ModeratorController');

router.post("/", controller.create);

router.get("/:id", controller.findById);

router.get("/",controller.findAll);

router.get("/ismod/:subcruddit", controller.isModerator)

module.exports =  router;