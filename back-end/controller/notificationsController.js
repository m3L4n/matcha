const { NotificationsModel } = require("../models/NotificationsModel");
const { checkAndChange } = require("../modules/response");

class notificationsController {
  static createNotification = async (req, res) => {
    const params = req.body;
    const resultat = await NotificationsModel.create({ ...params });
    return res.json(checkAndChange(resultat));
  };
  static createNotification = async (id_requester, id_receiver, action, type) => {
    const resultat = await NotificationsModel.create(id_requester, id_receiver, action, type);
    return resultat;
  };

  static findNotifidById = async (req, res) => {};

  static findNotifByUser = async (req, res) => {
    const { id } = req.authUser;
    const result = await NotificationsModel.findByUserDetail(id);
    return res.json(checkAndChange(result));
  };
  static findNotifByNoneView = async (req, res) => {
    const { id } = req.authUser;
    const result = await NotificationsModel.findByUser(id, "false");
    return res.json(checkAndChange(result));
  };
  static findNotifByNoneView = async (idUser) => {
    const result = await NotificationsModel.findByUser(idUser, "false");
    return result;
  };
  static updateNotification = async (req, res) => {
    const id_notif = req.params.id;
    const result = await NotificationsModel.updateById(id_notif);
    return res.json(checkAndChange(result));
  };
}

module.exports = {
  notificationsController,
};
