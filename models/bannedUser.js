const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("bannedUsers", Schema);

module.exports = model;
