const multer = require("multer");

//  Define storage location and file naming function for documents
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "images") {
      cb(null, "./public/products");
    }
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        file.fieldname +
        "." +
        extension
    );
  },
});
// Define file filter function
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/msword" ||
    file.mimetype === "application/vnd" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "text/csv"
  ) {
    cb(null, true);
  } else {
    req.fileValidationError = "Forbidden extension";
    return cb(null, false, req.fileValidationError);
    //cb(new Error("You tried to send a file which is not PDF"), false);
  }
};

module.exports = multer({ storage: storage, fileFilter: fileFilter });
