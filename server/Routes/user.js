const express = require("express");
const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const middle = require("../middleware/middle");

const router = express.Router();

router.post("/", async (req, res) => {
  const { matric, name, password, adminLevel } = req.body;

  try {
    let user = await User.findOne({ matric });

    if (user) return res.status(400).json({ msg: "Account already exists" });

    user = new User({
      matric,
      name,
      password,
      adminLevel,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const savedUser = await user.save();

    res.status(201).json({ msg: "Success" });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

// GET USER
router.get("/", middle, async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    user.password = "";
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// GET COMPLAINANT BY ID
router.get("/:id", middle, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    const { matric } = user;

    res.status(200).json(matric);
  } catch (error) {
    res.json({ msg: error.msg });
  }
});
module.exports = router;
