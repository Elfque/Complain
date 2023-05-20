const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    complain: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UsersSchema);
