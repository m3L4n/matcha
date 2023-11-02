const { BlockModel } = require("../models/BlockModel");
const { checkAndChange } = require("../modules/response");

class BlockController {
  static update = async (req, res) => {
    const { id } = req.authUser;
    const { id: id_receiver, block } = req.body;
    const result = await BlockModel.update(id_receiver, id, block);
    res.json(checkAndChange(result));
  };
}

module.exports = {
  BlockController,
};
