const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    matric: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    adminLevel: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UsersSchema);
