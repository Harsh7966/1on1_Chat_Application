const express= require("express");
const router= express.Router();
const controller= require("../controllers/authController");
const userAuthentication= require("../middlewares/authMiddleware");


router.route("/details").get(userAuthentication, controller.getUserDetails);
router.route("/login").post(controller.Login);
router.route("/signup").post(controller.Signup);
router.route("/Logout").post(controller.Logout);


module.exports=router;