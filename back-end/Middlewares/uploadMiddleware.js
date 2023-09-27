const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { checkAndChange } = require("../modules/response");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = (req, res, next) => {
  upload.array("files", 5)(req, res, (err) => {
    console.log("ICI CA PASSE", err);
    if (err) {
      return res.json(checkAndChange(err));
    }
    const files = req.files;

    console.log("fiiiles", files);
    const errors = [];
    files.forEach((file) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });
    if (errors.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
      return res.json(checkAndChange(errors));
    }
    req.files = files;
  });
  next();
};

module.exports = uploadMiddleware;
