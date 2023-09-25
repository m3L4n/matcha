const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");

router.post("/create", isAuth, /** matchController */);

module.exports = router;
