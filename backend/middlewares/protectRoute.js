const jwt = require("jsonwebtoken");

const protectRoute = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
  } catch (error) {
    console.log("error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
