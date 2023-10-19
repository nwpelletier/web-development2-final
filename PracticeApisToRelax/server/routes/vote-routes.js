const express = require('express');
const router = express.Router();
const controller = require("../controllers/votes-controller");
const {authAdmin, authUser} = require("../middleware/auth");

router.post("/:id", authUser, controller.addVote)
router.delete("/:id", authUser, controller.deleteVote)
// add get method 
router.get("/:commentid/:userid", controller.getVote);








module.exports = router; 