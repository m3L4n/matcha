const db = require("../db/db");

class notificationsModel {
  static create = async (id_receiver, id_requester, content, type) => {};
  static findById = async (id) => {};
  static findByIdByUser = async (id_user) => {};
  static updateById = async (id, view) => {};
}

module.exports = {
  notificationsModel,
};
