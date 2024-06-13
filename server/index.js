const express = require("express");
require("dotenv").config();
const connect = require("./mongoose/mongo");
const chats = require("./Routes/chat");
const message = require("./Routes/message");

const app = express();
const cors = require("cors");
connect();

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/api/user", require("./Routes/user"));
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/complains", require("./Routes/complains"));
app.use("/api/adminComplains", require("./Routes/complain"));
app.use("/api/chats", chats);
app.use("/api/message", message);

const PORT = Number(process.env.PORT) || 4000;
const server = app.listen(PORT, () =>
  console.log(`Server started on Port ${PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: process.env.CLIENT_URL },
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData?._id);
    socket.emit("Connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender[0]._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  //   socket.off("setup", () => {
  //     // console.log("USER DISCONNECTED");
  //     socket.leave(userData._id);
  //   });
});
