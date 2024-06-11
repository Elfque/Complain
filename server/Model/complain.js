const mongoose = require("mongoose");

const ComplainSchema = mongoose.Schema(
  {
    complainText: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    messages: {
      type: Array,
      default: [],
    },
    complainant: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complain", ComplainSchema);
