const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// Home Login
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to my mern stack website using router");
  } catch (error) {
    console.log("error");
  }
};

// Registration Logic
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).json({
      msg: "Registration Successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

// User login logic
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    // res
    //   .status(500)
    //   .json({ msg: "Internal server error", error: error.message });
    next(error);
  }
};

//logout User logic
const logoutUser = async (req, res) => {
  try {
    if (!req.session) {
      return res.status(400).json({ msg: "No active session to destroy" });
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res
          .status(500)
          .json({ msg: "Logout failed", error: err.message });
      }

      res.clearCookie("connect.sid"); // Match this with your session configuration
      console.log("Session destroyed and cookie cleared");
      res.status(200).json({ msg: "Logged out successfully" });
    });
  } catch (error) {
    console.error("Unexpected error during logout:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

//to send user data - user logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the route ${error}`);
  }
};
module.exports = { home, register, login, user, logoutUser };
