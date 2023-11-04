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
    const relationship = await MatchModel.getRelationShip(id_requester, id_receiver);
    if (relationship.block == true) {
      return {};
    }
    // if (type == "like") {
    //   // if like == true
    //   return;
    // }

    const resultat = await NotificationsModel.create(id_requester, id_receiver, action, type);
    return resultat;
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
