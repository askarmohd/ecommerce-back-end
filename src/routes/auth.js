const express = require("express");
const router = express.Router();
const { signup } = require("../controller/auth");
const { signin } = require("../controller/auth");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../validators/auth.js"); 

router.post("/signin", validateSigninRequest, isRequestValidated, signin);

router.post("/signup", validateSignupRequest, isRequestValidated, signup);

module.exports = router;
