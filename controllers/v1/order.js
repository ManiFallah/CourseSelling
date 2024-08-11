const { isValidObjectId } = require("mongoose");
const courseUserModel = require("../../models/courseUser");
exports.getOne = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const order = await courseUserModel
    .find({
      _id: req.params.id,
      user: req.user._id,
    })
    .populate("course")
    .lean();
  if (!order) {
    return res.status(404).json({ message: "Order Not Found" });
  }
  return res.status(200).json(order);
};
exports.getAll = async (req, res) => {
  const orders = await courseUserModel
    .find({ user: req.user._id })
    .populate("course")
    .lean();
  return res.json(orders);
};
