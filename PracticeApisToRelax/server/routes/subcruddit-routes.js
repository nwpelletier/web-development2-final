const express = require('express');
const router = express.Router();
const controller = require("../controllers/subcruddits-controller");
const {authAdmin, authUser} = require("../middleware/auth");

router.post("/", authUser, controller.createNew);
// TODO sql injection 
router.get("/all", controller.findAll);
router.get("/:subcruddit", controller.findSubcruddit);
router.get("/exists/:subcruddit", controller.doesExist)

router.patch("/toggle/:id", authAdmin, controller.toggleActive);
router.put("/wiki/:id", authUser, controller.editWiki);

module.exports = router;
