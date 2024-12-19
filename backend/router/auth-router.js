const express = require("express");
const router = express.Router();
const authContollers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authContollers.home);
router.route("/register").post(validate(signupSchema), authContollers.register);
router.route("/login").post(validate(loginSchema), authContollers.login);
router.route("/logout").post(authContollers.logoutUser);

router.route("/user").get(authMiddleware, authContollers.user);

module.exports = router;
