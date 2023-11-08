const { MatchModel } = require("../models/MatchModel");
const { NotificationsModel } = require("../models/NotificationsModel");
const { checkAndChange } = require("../modules/response");
const { MatchController } = require("./matchController");

class notificationsController {
  static createNotification = async (req, res) => {
    const params = req.body;
    const resultat = await NotificationsModel.create({ ...params });
    return res.json(checkAndChange(resultat));
  };
  static createNotification = async (id_requester, id_receiver, action, type, currentLike) => {
    try {
      const relationship = await MatchModel.getRelationShip(id_requester, id_receiver);
      if (relationship.block == true || relationship.isReceiverBlockRequester == true) {
        return {};
      }
      if (relationship.match && type == "like" && currentLike) {
        await NotificationsModel.create(id_requester, id_receiver, "its a match", type);
        await NotificationsModel.create(id_receiver, id_requester, "its a match", type);
      }
      if (relationship.userLike && type == "like" && !currentLike) {
        await NotificationsModel.create(id_requester, id_receiver, "a match unlike you ", type);
      }
      if (currentLike || type != "like") {
        const result = await NotificationsModel.create(id_requester, id_receiver, action, type);
        return result;
      }
      return;
    } catch (err) {
      return;
    }
  };

  static findNotifidById = async (req, res) => {};

  static findNotifByUser = async (req, res) => {
    const { id } = req.authUser;
    try {
      const result = await NotificationsModel.findByUserDetail(id);
      return res.json(checkAndChange(result));
    } catch (err) {
      return res.status(404).json({ status: 404, msg: "its impossible to do that now, please retry later" });
    }
  };

  static findNotifByNoneView = async (idUser) => {
    try {
      const result = await NotificationsModel.findByUser(idUser, false);
      return result;
    } catch (error) {
      return 0;
    }
  };

  static updateNotification = async (idUser) => {
    try {
      const result = await NotificationsModel.updateById(idUser);
      return result;
    } catch (err) {
      return;
    }
  };
}

module.exports = {
  notificationsController,
};
