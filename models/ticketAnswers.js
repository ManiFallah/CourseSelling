const mongoose = require("mongoose");
const schema = mongoose.Schema({
  ticket: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});
const model = mongoose.model("ticketAnswer", schema);
module.exports = model;
