const { isValidObjectId } = require("mongoose");
const offModel = require("../../models/off");
const courseModel = require("../../models/course");
exports.create = async (req, res) => {
  const { code, maxusage, percent, course } = req.body;
  if (!isValidObjectId(course)) {
    return res.status(422).json({ message: "Not a Valid Course ID" });
  }
  if (!(await courseModel.find({ _id: course }))) {
    return res.status(404).json({ message: "There is No Course with this ID" });
  }
  const off = await offModel.create({
    code,
    maxusage,
    percent,
    course,
    creator: req.user._id,
  });
  if (off) {
    return res.status(201).json({ message: "sale code created succesfully" });
  } else {
    res.status(500).json({ message: "Unkown Error" });
  }
};
exports.getAll = async (req, res) => {
  const offs = await offModel
    .find({})
    .populate("course", "name")
    .populate("creator", "-password")
    .lean();
  if (offs) {
    res.status(200).json(offs);
  } else {
    res.status(404).json({ message: "There is No Off" });
  }
};
exports.campaign = async (req, res) => {
  const { discount } = req.body;
  const courses = await courseModel.updateMany({ discount });
  return res.json({ message: `Discounts Set Successfully` });
};
exports.remove = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  console.log(id);
  const deletedOff = await offModel.findOneAndDelete({ _id: id }).lean();
  if (!deletedOff) {
    return res.status(404).json({ message: "OffCode Not Found" });
  }
  return res.status(202).json({ message: "OffCode Deleted Successfully" });
};
exports.getOne = async (req, res) => {
  const { code } = req.params;
  const { course } = req.body;
  if (!isValidObjectId(course)) {
    return res.status(422).json({ message: "Course ID is not valid  " });
  }
  let off = await offModel.findOne({ code, course }).lean();
  if (!off) {
    return res.status(404).json({ message: "OffCode Not Found" });
  } else if (off.uses == off.maxusage) {
    return res.status(409).json({ message: "Code Is Already Used" });
  }
  off = await offModel
    .findOneAndUpdate({ _id: off._id }, { $set: { uses: off.uses + 1 } })
    .select("-uses -creator")
    .populate("course");
  return res.status(202).json({ message: "OK", off });
};
