const express = require("express");
const router = express.Router();

const dayCtrl = require("../controllers/dayCtrl");

router.get("/", dayCtrl.getAll);
router.get("/:id", dayCtrl.getById);
router.post("/", dayCtrl.create);

module.exports = router;
