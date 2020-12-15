const express = require("express");
const { requireSignin, userMiddleware } = require("../common-middleware");
const router = express.Router();
const { addItemToCart, getCart } = require("../controller/cart");

router.post("/user/cart/add", requireSignin, userMiddleware, addItemToCart);
router.get("/user/cart/viewcart", getCart);

module.exports = router;
