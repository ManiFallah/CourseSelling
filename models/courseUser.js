const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestams: true }
);
const model = mongoose.model("courseUser", schema);
module.exports = model;
