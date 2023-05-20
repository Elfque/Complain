const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.mongoUrl, {
      useNewURLParser: true,
    });

    console.log("Database Connected");
  } catch {
    (err) => {
      console.log(err.message);
      process.exit(1);
    };
  }
};

module.exports = connectMongo;
