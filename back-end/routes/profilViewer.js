const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { ProfilViewerController } = require("../controller/profilViewerController");

router.post("/", isAuth, ProfilViewerController.create);
router.get("/", isAuth, ProfilViewerController.getAll);

module.exports = router;
