const express = require("express");
const router = express.Router();
const controller = require("../controllers/messageController");
const userAuthentication = require("../middlewares/authMiddleware");

router.route("/send/:receiverId").post(userAuthentication, controller.sendMessage);
router.route("/get/:userId").get(userAuthentication, controller.getMessage);

module.exports = router;
