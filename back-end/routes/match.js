const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { MatchController } = require("../controller/matchController");

router.post("/create", isAuth, MatchController.create);
router.put("/unlike", isAuth, MatchController.delete);
router.put("/block/:id", isAuth, MatchController.block);
router.get("/:id", isAuth, MatchController.getRelationShip);
module.exports = router;
