const express = require('express');
const router = express.Router();
const controller = require("../controllers/votes-controller");
// const authenticate = require("../authentication/auth");

router.post("/:id", controller.addVote)
router.delete("/:id", controller.deleteVote)
// add get method 








module.exports = router; 