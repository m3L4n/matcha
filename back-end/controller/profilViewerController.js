const { ProfilViewerModel } = require("../models/ProfilViewerModel");
const { checkAndChange } = require("../modules/response");

class ProfilViewerController {
  static create = async (req, res) => {
    const { id } = req.authUser;
    const { id_watched } = req.body;
    return res.json(checkAndChange(await ProfilViewerModel.create(id, id_watched)));
  };
  static getAll = async (req, res) => {
    const { id } = req.authUser;
    return res.json(checkAndChange(await ProfilViewerModel.getAll(id)));
  };
}

module.exports = {
  ProfilViewerController,
};
