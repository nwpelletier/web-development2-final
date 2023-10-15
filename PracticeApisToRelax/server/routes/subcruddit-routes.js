const express = require('express');
const router = express.Router();
const controller = require("../controllers/subcruddits-controller");

router.post("/subcruddit", controller.createNew);
router.get("/subcruddits/:id", controller.findSubcruddit);
router.get("/subcruddits", controller.findAll);
router.patch("/subcruddits/toggle/:id", controller.toggleActive);
router.put("/subcruddits/wiki/:id", controller.editWiki);

module.exports = router;
