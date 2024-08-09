const express = require("express");
const router= express.Router();
const userAuthentication= require("../middlewares/authMiddleware");
const controller= require("../controllers/userController");

router.route("/getAllUsers").get(userAuthentication, controller.getAllUser)

module.exports= router;