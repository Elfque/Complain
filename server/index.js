const express = require("express");
require("dotenv").config();
const connect = require("./mongoose/mongo");
const app = express();
const cors = require("cors");
connect();

app.use(cors());

app.use(express.json({ extended: false }));

app.use("/api/user", require("./Routes/user"));
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/complains", require("./Routes/complains"));
app.use("/api/adminComplains", require("./Routes/complain"));

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
