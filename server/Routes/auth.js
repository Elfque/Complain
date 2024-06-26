const express = require("express");
const router = express.Router();
const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const middle = require("../middleware/middle");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) return res.status(400).json({ msg: "Invalid Username" });

    const compPass = await bcrypt.compare(password, user.password);
    if (!compPass) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.asiri, {
      expiresIn: "1d",
    });

    delete user.password;
    res.status(200).json({
      msg: "Success",
      token,
      userId: user._id,
      accountType: user.accountType,
    });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

// GET USER
router.get("/", middle, async (req, res) => {
  const { id } = req.user;

  try {
    let user = await User.findById(id);
    user.password = "";
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
