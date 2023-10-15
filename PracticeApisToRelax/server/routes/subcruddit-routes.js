const express = require('express');
const router = express.Router();
const controller = require("../controllers/subcruddits-controller");

router.post("/", controller.createNew);
// TODO sql injection 
router.get("/:subcruddit", controller.findSubcruddit);
router.get("/all", controller.findAll);
router.patch("/toggle/:id", controller.toggleActive);
router.put("/wiki/:id", controller.editWiki);

module.exports = router;
