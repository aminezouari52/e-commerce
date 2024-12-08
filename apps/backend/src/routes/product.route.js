const express = require("express");
const router = express.Router();
const uploader = require("../config/multer");

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

const productController = require("../controllers/product.controller");

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

router.post(
  "/product",
  authCheck,
  adminCheck,
  uploader.single("images"),
  productController.create,
);
router.get("/products/:count", productController.listAll);
router.delete(
  "/product/:slug",
  authCheck,
  adminCheck,
  productController.remove,
);
router.get("/product/:slug", productController.read);
router.put("/product/:slug", authCheck, adminCheck, productController.update);

router.post("/products", productController.list);

// rating
router.put(
  "/product/star/:productId",
  authCheck,
  productController.productStar,
);
// related
router.get("/product/related/:productId", productController.listRelated);
// search
router.post("/search/filters", productController.searchFilters);

module.exports = router;
