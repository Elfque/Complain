const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const url =
  "mongodb+srv://rayz:mzta@rayz.xrdnn5i.mongodb.net/?retryWrites=true&w=majority&appName=Rayz";

const connectMongo = async () => {
  // console.log(process.env.mongoUrl.slice(-1));

  try {
    await mongoose.connect(url, {
      useNewURLParser: true,
    });

    // await client.connect();
    console.log("Database Connected");
  } catch {
    (err) => {
      console.log(err.message);
      process.exit(1);
    };
  }
};

module.exports = connectMongo;
