const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    isParent: {
      type: Number,
      required: true,
      default: 1,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("menu", schema);
module.exports = model;
