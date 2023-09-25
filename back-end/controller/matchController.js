const { checkAndChange } = require("../modules/response");
const { MatchModel } = require("../models/MatchModel");

class MatchController {
  static create = async (req, res) => {
    let requesterId = req.isAuth.id;
    const receiverId = req.body.receiverId;
    let match = MatchModel.create(requesterId, receiverId);
    res.json(checkAndChange(match));
  }
}

module.exports = {
  MatchController,
};
