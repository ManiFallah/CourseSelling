const { isValidObjectId } = require("mongoose");
const commentModel = require("../../models/comment");
const courseModel = require("../../models/course");
exports.create = async (req, res) => {
  const { body, href, score } = req.body;
  const course = await courseModel.findOne({ href });
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  const comment = await commentModel.create({
    body,
    course: course._id,
    score,
    user: req.user._id,
    isAnswer: 0,
    isAccepted: 0,
  });
  if (!comment) {
    return res.status(500).json({ message: "Unkown Error" });
  }
  res.status(201).json({ message: "Comment Created Succesfully" });
};
exports.accept = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const { id } = req.params;
  const mainComment = await commentModel
    .findByIdAndUpdate(id, {
      $set: {
        isAccepted: 1,
      },
    })
    .lean();
  if (!mainComment) {
    return res.status(404).json({ message: "Comment Not Found" });
  }
  res
    .status(202)
    .json({ message: "Comment Accepted", commentBody: mainComment.body });
};
exports.reject = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not a Valid ID" });
  }
  const { id } = req.params;
  const mainComment = await commentModel
    .findByIdAndUpdate(id, {
      $set: {
        isAccepted: -1,
      },
    })
    .lean();
  if (!mainComment) {
    return res.status(404).json({ message: "Comment Not Found" });
  }
  res
    .status(202)
    .json({ message: "Comment Rejected", commentBody: mainComment.body });
};
exports.answer = async (req, res) => {
  const { body, href, score } = req.body;
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(422).json({ message: "Not A Valid ID" });
  }
  const course = await courseModel.findOne({ href });
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  const comment = await commentModel.create({
    body,
    course: course._id,
    score,
    user: req.user._id,
    isAnswer: 1,
    isAccepted: 0,
    mainComment: id,
  });
  if (!comment) {
    return res.status(500).json({ message: "Unkown Error" });
  }
  res.status(201).json({ message: "Comment Created Succesfully" });
};
exports.getAll = async (req, res) => {
  const comments = await commentModel
    .find({})
    .populate("course", "name")
    .populate("user", "username")
    .lean();
  res.status(200).json(comments);
};
exports.getCourseComments = async (req, res) => {
  const course = await courseModel.findOne({ href: req.params.href });
  if (!course) {
    return res.status(404).json({ message: "Course Not Found" });
  }
  const courseComments = await commentModel
    .find({ course: course._id })
    .populate("course", "name")
    .populate("user", "username")
    .lean();
  res.status(200).json(courseComments);
};
exports.delete = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not A Valid ID" });
  }
  const { id } = req.params;
  const deletedComment = await commentModel
    .findOneAndDelete({ _id: id })
    .lean();
  if (!deletedComment) {
    return res.status(404).json({ message: "Comment Not Found" });
  }
  res.status(202).json({
    message: "Comment Deleted Successfully",
    deletedComment: deletedComment.body,
  });
};
exports.getComment = async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(422).json({ message: "Not A Valid ID" });
  }
  const comment = await commentModel
    .findOne({ _id: req.params.id })
    .populate("course", "name")
    .populate("user", "username")
    .lean();
  if (!comment) {
    return res.status(404).json({ message: "Comment Not Found" });
  }
  res.status(200).json(comment);
};
