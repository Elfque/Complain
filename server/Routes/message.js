const express = require("express");
const User = require("../Model/user");
const middle = require("../middleware/middle");
const Chat = require("../Model/chat");
const Message = require("../Model/mossage");

const route = express.Router();

route.get("/:chatId", middle, async (req, res) => {
  const { id } = req.user;
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

route.post("/:chatId", middle, async (req, res) => {
  const { id } = req.user;
  const { chatId } = req.params;
  const { content } = req.body;

  var newMessage = {
    sender: id,
    content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message?.populate("sender", "name");
    message = await message.populate("chat");

    message = await User.populate(message, {
      path: "chat.users",
      select: "name email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = route;
