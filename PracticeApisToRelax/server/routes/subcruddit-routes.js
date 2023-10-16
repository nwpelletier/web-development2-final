const express = require('express');
const router = express.Router();
const controller = require("../controllers/subcruddits-controller");

router.post("/", controller.createNew);
// TODO sql injection 
router.get("/all", controller.findAll);
router.get("/:subcruddit", controller.findSubcruddit);

router.patch("/toggle/:id", controller.toggleActive);
router.put("/wiki/:id", controller.editWiki);

module.exports = router;
