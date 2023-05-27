const myToken = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) return res.status(401).json({ msg: "Authorization required" });

  try {
    const decoded = myToken.verify(token, process.env.asiri);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Authorization Failed" });
  }
};
