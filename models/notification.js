const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    seen: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("notification", schema);
module.exports = model;
