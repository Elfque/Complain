const express = require("express");
const User = require("../Model/user");
const middle = require("../middleware/middle");
const Chat = require("../Model/chat");

const route = express.Router();

route.get("/", middle, async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

route.get("/:userId", middle, async (req, res) => {
  const { id } = req.user;
  const { userId } = req.params;

  let isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

route.get("/chat/:chatId", middle, async (req, res) => {
  const { chatId } = req.params;

  try {
    const chat = await Chat.findOne({ _id: chatId }).populate(
      "users",
      "-password"
    );

    res.send(chat);
  } catch (error) {}
});

module.exports = route;
