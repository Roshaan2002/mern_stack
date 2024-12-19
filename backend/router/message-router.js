const express = require("express");
const { sendMessage } = require("../controllers/message-controller");
const router = express.Router();

router.post("/send/:id", sendMessage);

module.exports = router;
