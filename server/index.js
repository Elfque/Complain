const express = require("express");
require("dotenv").config();
const connect = require("./mongoose/mongo");
const app = express();

connect();

app.use(express.json({ extended: false }));

app.use("/api/user", require("./Routes/user"));
app.use("/api/auth", require("./Routes/auth"));

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
