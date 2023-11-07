const multer = require("multer");

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const fileExtension = file.originalname.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error("extension forbidden"));
  }

  const maxFileSize = 40000;
  if (file.size > maxFileSize) {
    return cb(new Error("image are too big"));
  }

  cb(null, true);
};

const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter });

module.exports = upload;
