const express = require('express');
const router = express.Router();
const { signup} = require('../controller/auth');
const { signin,requireSignin} = require('../controller/auth');

router.post('/signin',signin);

router.post('/signup',signup);



module.exports = router;
    
