const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const { getUsersForSideBar } = require("../controllers/user-controller");
const router = express.Router();

router.get("/", protectRoute, getUsersForSideBar);

module.exports = router;
