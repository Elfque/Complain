const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    matric: {
      type: String,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", UsersSchema);
