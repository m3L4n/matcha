const { notificationsModel } = require("../models/notificationsModel");
const { checkAndChange } = require("../modules/response");

class notificationsController {
  static createNotification = async (req, res) => {
    const params = req.body;
    const resultat = await notificationsModel.create({ ...params });
    return res.json(checkAndChange(resultat));
  };
  static createNotification = async (id_requester, id_receiver, action, type) => {
    const resultat = await notificationsModel.create(id_requester, id_receiver, action, type);
    return resultat;
  };

  static findNotifidById = async (req, res) => {};
  static findNotifByUser = async (req, res) => {
    const { id } = req.authUser;
    const result = await notificationsModel.findByUser(id);
    return res.json(checkAndChange(resultat));
  };
  static findNotifByNoneView = async (req, res) => {
    const { id } = req.authUser;
    const result = await notificationsModel.findByUser(id, "false");
    return res.json(checkAndChange(resultat));
  };
  static updateNotification = async (req, res) => {
    const id_notif = req.params.id;
    const result = await notificationsModel.updateById(id_notif);
    return res.json(checkAndChange(resultat));
  };
}

module.exports = {
  notificationsController,
};
