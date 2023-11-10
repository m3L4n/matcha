const { checkAndChange } = require("../modules/response");
const { MatchModel } = require("../models/MatchModel");

class MatchController {
  static create = async (req, res) => {
    const requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    const relationship = await MatchModel.getRelationShip(requesterId, receiverId);
    if (relationship.blocked || relationship.isReceiverBlockRequester) {
      return res.status(403).json({ status: 403, msg: "user blocked or you are blocked by the user" });
    }
    const match = await MatchModel.createLike(requesterId, receiverId);
    res.json(checkAndChange(match));
  };

  static update = async (req, res) => {
    const requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    const relationship = await MatchModel.getRelationShip(requesterId, receiverId);
    if (relationship.blocked || relationship.isReceiverBlockRequester) {
      return res.status(403).json({ status: 403, msg: "user blocked or you are blocked by the user" });
    }
    const matchToUpdate = await MatchModel.removeLike(requesterId, receiverId);
    res.json(checkAndChange(matchToUpdate));
  };
  static block = async (req, res) => {
    let requesterId = req.authUser.id;
    const receiverId = req.params.id;
    let match = await MatchModel.blockUser(requesterId, receiverId);
    res.json(checkAndChange(match));
  };

  static getRelationShip = async (req, res) => {
    const requesterId = req.authUser.id;
    const receiverId = req.params.id;
    try {
      const match = await MatchModel.getRelationShip(requesterId, receiverId);
      return res.status(200).json({ status: 200, result: { ...match } });
    } catch (error) {
      return res.status(404).json({ status: 404, msg: "cant get relationship" });
    }
  };
}

module.exports = {
  MatchController,
};
