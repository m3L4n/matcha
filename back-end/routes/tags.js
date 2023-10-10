const express = require("express");
const router = express.Router();
const { isAuth } = require("../middlewares/userAuth");
const { TagsController } = require("../controller/tagsController");

router.get("/", isAuth, TagsController.getAllTags);
module.exports = router;
