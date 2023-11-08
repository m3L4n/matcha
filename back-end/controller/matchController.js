const { checkAndChange } = require("../modules/response");
const { MatchModel } = require("../models/MatchModel");

class MatchController {
  static create = async (req, res) => {
    // to do empecher de liker si block
    const requesterId = req.authUser.id;
    const receiverId = req.body.receiverId;
    const match = await MatchModel.createLike(requesterId, receiverId);
    res.json(checkAndChange(match));
  };

  static update = async (req, res) => {
    // to do empecher de liker si block
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
    // console.log("in controller", requesterId, receiverId);
    try {
      const match = await MatchModel.getRelationShip(requesterId, receiverId);
      console.log("match", match);
      return res.status(200).json({ status: 200, result: { ...match } });
    } catch (error) {}
    res.json(checkAndChange(match));
  };
}

module.exports = {
  MatchController,
};
