const express = require('express');
const router = express.Router();
const {userRegister , userLogin , getUser} = require("../controllers/auth");
const isAuth = require("../middlewres/isAuth")

router.post("/register" , userRegister);
router.post("/login" , userLogin);
router.get("/",isAuth , getUser);

module.exports = router;