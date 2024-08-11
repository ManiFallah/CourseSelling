const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    body: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    published: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("article", schema);
module.exports = model;
