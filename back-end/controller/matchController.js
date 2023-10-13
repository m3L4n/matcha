const { checkAndChange } = require("../modules/response");
const { MatchModel } = require("../models/MatchModel");

class MatchController {
  static create = async (req, res) => {
    let requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    let match = MatchModel.createLike(requesterId, receiverId);
    res.json(checkAndChange(match));
  };

  static delete = async (req, res) => {
    let requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    let match = MatchModel.removeLike(requesterId, receiverId);
    res.json(checkAndChange(match));
  };
  static block = async (req, res) => {
    let requesterId = req.authUser.id;
    const receiverId = req.params.id;
    const block = req.body.block;
    let match = await MatchModel.blockUser(requesterId, receiverId, block);
    res.json(checkAndChange(match));
  };

  static getRelationShip = async (req, res) => {
    let requesterId = req.authUser.id;
    const receiverId = req.params.id;
    let match = await MatchModel.getRelationship(requesterId, receiverId);
    res.json(checkAndChange(match));
  };
}

module.exports = {
  MatchController,
};
