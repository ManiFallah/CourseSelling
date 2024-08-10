const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    percent: {
      type: Number,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      reuqired: true,
    },
    maxusage: {
      type: Number,
      required: true,
      default: 1,
    },
    uses: {
      type: Number,
      required: true,
      default: 0,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      reuqired: true,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("off", schema);
module.exports = model;
