const express = require("express");
const router = express.Router();
const uploader = require("../../config/multer");

// middlewares
const { authCheck, adminCheck } = require("../../middlewares/auth");

const productController = require("../../controllers/product.controller");

// uploader.single("consultant_cv"),
//   uploader.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//     {
//       name: "cv",
//       maxCount: 1,
//     },
//   ]),

router
  .route("/")
  .post(
    authCheck,
    adminCheck,
    uploader.single("images"),
    productController.create,
  );

router.route("/products/:count").get(productController.listAll);

router
  .route("/:slug")
  .get(productController.read)
  .put(authCheck, adminCheck, productController.update)
  .delete(authCheck, adminCheck, productController.remove);

router.route("/products").post(productController.list);

router.route("/star/:productId").put(authCheck, productController.productStar);

router.route("/related/:productId").get(productController.listRelated);

router.route("/search/filters").post(productController.searchFilters);

module.exports = router;
