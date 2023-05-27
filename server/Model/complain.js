const mongoose = require("mongoose");

const ComplainSchema = mongoose.Schema(
  {
    complainText: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
    complainant: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complain", ComplainSchema);
