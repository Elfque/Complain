const express = require("express");
const router = express.Router();
const Complain = require("../Model/complain");
const middle = require("../middleware/middle");

router.get("/", middle, async (req, res) => {
  try {
    const complain = await Complain.find({}).sort({ updatedAt: -1 });

    res.status(200).json(complain);
  } catch (error) {
    // console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
