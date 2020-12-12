//routing for users
const express = require("express");
let router = express.Router();
const { signup ,signin} = require("../controllers/user-controller");
const { authenticate,validateFields } = require('../middlewares/auth-middleware')

router.post("/auth/signup",validateFields, signup);
router.post("/auth/signin", signin);


module.exports = router;