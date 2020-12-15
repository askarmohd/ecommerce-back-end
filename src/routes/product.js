const express = require("express");
const { requireSignin, AdminMiddleware } = require("../common-middleware");
const router = express.Router();
//const { addCategory, getCategories } = require("../controller/category");
const { createProduct, getProducts } = require("../controller/product");
const multer = require("multer");
const shortid = require("shortid");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname),'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});

const upload = multer({ storage });
router.post("/product/create", requireSignin, AdminMiddleware,upload.array('productPicture'),createProduct);
router.get("/product/getproduct", getProducts);

module.exports = router;
