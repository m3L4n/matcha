const { BlockModel } = require("../models/BlockModel");
const { MatchModel } = require("../models/MatchModel");
const { checkAndChange } = require("../modules/response");
const { MatchController } = require("./matchController");

class BlockController {
  static update = async (req, res) => {
    const { id } = req.authUser;
    const { id: id_receiver, block } = req.body;
    try {
      const update = await BlockModel.update(id_receiver, id, block);
      const updateRateFame = await MatchModel.blockUser(id, id_receiver, block);
      return res.status(200).json({ status: 200, result: "success" });
    } catch (error) {
      return res.status(404).json({ status: 404, message: "error you cant block this user" });
    }
  };
}

module.exports = {
  BlockController,
};
