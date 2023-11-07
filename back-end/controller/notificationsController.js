const { MatchModel } = require("../models/MatchModel");
const { NotificationsModel } = require("../models/NotificationsModel");
const { checkAndChange } = require("../modules/response");

class notificationsController {
  static createNotification = async (req, res) => {
    const params = req.body;
    const resultat = await NotificationsModel.create({ ...params });
    return res.json(checkAndChange(resultat));
  };
  static createNotification = async (
    id_requester,
    id_receiver,
    action,
    type,
    currentLike,
  ) => {
    const relationship = await MatchModel.getRelationShip(
      id_requester,
      id_receiver,
    );
    if (relationship.block == true) {
      return {};
    }
    if (relationship.match && type == "like" && currentLike) {
      await NotificationsModel.create(
        id_requester,
        id_receiver,
        "its a match",
        type,
      );
      await NotificationsModel.create(
        id_receiver,
        id_requester,
        "its a match",
        type,
      );
    }
    if (relationship.userLike && type == "like" && !currentLike) {
      await NotificationsModel.create(
        id_requester,
        id_receiver,
        "a match unlike you ",
        type,
      );
    }
    if (currentLike || type != "like") {
      const result = await NotificationsModel.create(
        id_requester,
        id_receiver,
        action,
        type,
      );
      return result;
    }
    return;
  };

  static findNotifidById = async (req, res) => {};

  static findNotifByUser = async (req, res) => {
    const { id } = req.authUser;
    const result = await NotificationsModel.findByUserDetail(id);
    return res.json(checkAndChange(result));
  };

  static findNotifByNoneView = async (idUser) => {
    const result = await NotificationsModel.findByUser(idUser, false);
    return result;
  };

  static updateNotification = async (idUser) => {
    const result = await NotificationsModel.updateById(idUser);
    return result;
  };
}

module.exports = {
  notificationsController,
};
