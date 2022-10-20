const multer = require("multer");

const imagesController = async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      callBack(null, "uploads");
    },
    filename: function (req, file, callBack) {
      callBack(null, file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callBack) {
      if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        callBack(null, true);
      } else {
        callBack(null, false);
        return callBack(new Error("Only jpg is allowed"));
      }
    },
  }).array("images", 2);
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(500).json({
        status: "failed",
        message: err.message,
      });
    } else if (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Image upload successful",
      });
    }
  });
};

module.exports = imagesController;
