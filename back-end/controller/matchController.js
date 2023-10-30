const { checkAndChange } = require("../modules/response");
const { MatchModel } = require("../models/MatchModel");

class MatchController {
  static create = async (req, res) => {
    const requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    const match = await MatchModel.createLike(requesterId, receiverId);
    res.json(checkAndChange(match));
  };

  static update = async (req, res) => {
    const requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
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
    const match = await MatchModel.getRelationship(requesterId, receiverId);
    res.json(checkAndChange(match));
  };
}

module.exports = {
  MatchController,
};
