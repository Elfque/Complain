const express = require("express");
const router = express.Router();
const User = require("../Model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middle = require("../middleware/middle");

router.post(
  "/",
  [
    check("email", "Enter a valid Email").isEmail(),
    check("password", "Password must be between 6 and 8 characters")
      .not()
      .isLength({
        min: 6,
        max: 8,
      }),
  ],
  async (req, res) => {
    // REGISTER USER
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, userName } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) return res.status(400).json({ msg: "Account already exists" });

      user = new User({
        email,
        password,
        userName,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      const savedUser = await user.save();

      res.status(201).json({ msg: "Success" });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error");
    }
  }
);

// GET USER
router.get("/", middle, async (req, res) => {
  try {
    const { id } = req.user;
    let user = await User.findById(id);

    user.password = "";
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
