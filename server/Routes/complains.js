const express = require("express");
const Complain = require("../Model/complain");
const middle = require("../middleware/middle");

const router = express.Router();

router.post("/", middle, async (req, res) => {
  const { id } = req.user;
  const { complainText, category, level } = req.body;

  try {
    const newComplain = new Complain({
      complainText,
      category,
      level,
      complainant: id,
    });

    const savedComplain = await newComplain.save();

    res.status(201).json({ msg: "Success" });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

router.patch("/:id", middle, async (req, res) => {
  const { messageText } = req.body;
  const { id } = req.params;

  try {
    let complain = await Complain.findById(id);

    const newMessages = [
      ...complain.message,
      { messageText, sender: req.user.id },
    ];

    complain.message = newMessages;
    await complain.save();

    res.status(200).json(complain);
  } catch (error) {
    console.log(error.message);
    console.log("Server error");
  }
});

router.get("/", middle, async (req, res) => {
  const { id } = req.user;

  try {
    const complain = await Complain.find({ complainant: id });

    res.status(200).json(complain);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/:id", middle, async (req, res) => {
  const { id } = req.params;

  try {
    const complain = await Complain.findById(id);

    res.status(200).json({ complain });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
