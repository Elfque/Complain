const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    matric: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    adminLevel: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UsersSchema);
