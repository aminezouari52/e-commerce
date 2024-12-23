const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const cloudinary = require("../config/cloudinary");

const upload = catchAsync(async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
  });
  res.status(httpStatus.OK).send({
    public_id: result.public_id,
    url: result.secure_url,
  });
});

const remove = catchAsync((req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err) => {
    if (err) return res.json({ success: false, err });
    res.status(httpStatus.OK).send("ok");
  });
});

module.exports = {
  upload,
  remove,
};
