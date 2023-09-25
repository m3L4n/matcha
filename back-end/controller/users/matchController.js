const { checkAndChange } = require("../../modules/response");

class MatchController {
  static create = async (_req, res) => {
    let match = null; /** call model here */
    res.json(checkAndChange(match))
  }
}

module.exports = {
  MatchController,
};
