const { checkAndChange } = require("../modules/response");
const { MatchModel } = require("../models/MatchModel");

class MatchController {
  static create = async (req, res) => {
    let requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    let match = MatchModel.createLike(requesterId, receiverId);
    res.json(checkAndChange(match));
  }

  static delete = async (req, res) => {
    let requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    let match = MatchModel.removeLike(requesterId, receiverId);
    res.json(checkAndChange(match));
  }
}

module.exports = {
  MatchController,
};
