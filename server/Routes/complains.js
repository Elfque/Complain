const express = require("express");
const Complain = require("../Model/complain");
const middle = require("../middleware/middle");

const router = express.Router();

// SEND COMPLAINS
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

    let savedComplain = await newComplain.save();
    savedComplain = await savedComplain.populate("complainant", "userame");

    res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

// SEND MESSAGE
router.patch("/:id", middle, async (req, res) => {
  const { messageText } = req.body;
  const { id } = req.params;

  try {
    const complain = await Complain.findById(id);

    const newMessages = [
      ...complain.messages,
      { messageText, sender: req.user.id, date: new Date().toISOString() },
    ];

    complain.messages = newMessages;

    const newCom = await complain.save();

    res.status(200).json({ msg: "Success", newCom });
  } catch (error) {
    console.log(error.message);
    console.log("Server error");
  }
});

// GET COMPLAIN FOR USERS
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

//GET A PARTICULAR COMPLAIN
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
