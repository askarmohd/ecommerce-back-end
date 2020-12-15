const express = require("express");
const router = express.Router();
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth.js");
const { requireSignin } = require("../../common-middleware");

const { signup, signin, signout } = require("../../controller/admin/auth");

router.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signout", signout);

module.exports = router;
