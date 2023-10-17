const { TagsModel } = require("../models/TagsModel");
const { checkAndChange } = require("../modules/response");

class TagsController {
  static getAllTags = async (req, res) => {
    const alltags = await TagsModel.getAll();
    res.json(checkAndChange(alltags));
  };
}
module.exports = {
  TagsController,
};
