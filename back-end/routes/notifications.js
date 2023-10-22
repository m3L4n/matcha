const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { notificationsController } = require("../controller/notificationsController");

router.get("/", isAuth, notificationsController.findNotifByUser);

module.exports = router;
