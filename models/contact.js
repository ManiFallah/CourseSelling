const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("contact", schema);
module.exports = model;
