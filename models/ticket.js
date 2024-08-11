const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    isAnswered: {
      type: Number,
      required: true,
      default: 0,
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
      required: false,
    },
    departmentId: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    departmentSubId: {
      type: mongoose.Types.ObjectId,
      ref: "subdepartment",
      required: true,
    },
    priorty: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("ticket", schema);
module.exports = model;
