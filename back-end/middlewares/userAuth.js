const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/Usermodel");
const extractBearerToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return false;
  }

  const matches = headerValue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

const isAuth = (req, res, next) => {
  const token = req.cookies["jwt"];

  if (!token) {
    return res.status(401).json({ message: "Error. Need a token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Bad token" });
    } else {
      try {
        await UserModel.findbyIwithouthPassword("id", decodedToken.id);
        req.authUser = { id: decodedToken.id, username: decodedToken.username };
        return next();
      } catch (error) {
        res.status(401).json({ message: "Error. Bad token" });
      }
    }
  });
};

module.exports = {
  extractBearerToken,
  isAuth,
};
