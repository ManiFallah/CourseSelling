const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Types.ObjectId,
      ref: "department",
    },
  },
  { timestamps }
);
const model = mongoose.model("subdepartment", schema);
module.exports = model;
