const mongoose = require("mongoose");
const schema = mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isAccepted: {
      type: Number, //1 is Accepted -1 is Rejected 0 means it havent been checked
      required: true,
      default: 0,
    },
    score: {
      type: Number,
      required: true,
      default: 5,
    },
    isAnswer: {
      type: Number,
      required: true,
    },
    mainComment: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
    },
  },
  { timestamps: true }
);

const model = mongoose.model("comment", schema);
module.exports = model;
